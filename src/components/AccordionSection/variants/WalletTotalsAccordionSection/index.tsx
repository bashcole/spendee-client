import React, {useContext} from 'react';
import {useTranslations} from "next-intl";
import Section from "@components/Section";
import Skeleton from "react-loading-skeleton";
import AccordionSection from "@components/AccordionSection";
import {IWallet} from "@interfaces/wallet";
import {ITransaction} from "@interfaces/transaction";
import {calculateTotalExpense, calculateTotalIncome, formatWalletBalance} from "@utils/index";
import CardList from "@components/CardList";
import {useRouter} from "next/router";
import TotalCard from "@components/Card/variants/TotalCard"
import WalletContext from "@contexts/wallet";
interface IProps {
    transactions: ITransaction[] | undefined;
}

const WalletTotalsAccordionSection = ({transactions}: IProps) => {
    const router = useRouter()
    const {wallet} = useContext(WalletContext)
    const t = useTranslations("Wallet");

    if (!wallet || !transactions) {
        return <Skeleton/>
    }

    const Income = calculateTotalIncome(transactions)
    const Expense = calculateTotalExpense(transactions)
    const Change = Income - Expense

    return (
        <>
            <AccordionSection title={t("Totals")}>
                <CardList>
                    <TotalCard positive={wallet.balance > 0} title={t("Current Wallet Balance")}
                               amount={formatWalletBalance(wallet.balance, wallet.currency, router.locale)}/>
                    <TotalCard positive={Change > 0} title={t("Total Period Change")}
                               amount={formatWalletBalance(Change, wallet.currency, router.locale)}/>
                    <TotalCard positive={false} title={t("Total Period Expenses")}
                               amount={`-${formatWalletBalance(Expense, wallet.currency, router.locale)}`}/>
                    <TotalCard positive={true} title={t("Total Period Income")}
                               amount={`+${formatWalletBalance(Income, wallet.currency, router.locale)}`}/>
                </CardList>
            </AccordionSection>
        </>
    )
}

export default WalletTotalsAccordionSection;