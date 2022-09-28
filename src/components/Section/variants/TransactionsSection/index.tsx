import React, {useContext} from 'react';
import {ITransaction} from "@interfaces/transaction";
import Skeleton from "react-loading-skeleton";
import {StyledTransactions} from "@components/Section/variants/TransactionsSection/style";
import {dateToMY, sumTransactions} from "@utils/index";
import Header from "@components/Section/variants/TransactionsSection/components/Header";
import Transaction from "@components/Section/variants/TransactionsSection/components/Transaction";
import {ITransactionCategory} from "@interfaces/category";
import WalletContext from "@contexts/wallet";

interface IProps {
    transactions: ITransaction[] | undefined;
}

interface IGroupedTransactions {
    [key: string]: ITransaction[]
}

const TransactionsSection = ({transactions}: IProps) => {

    const {wallet} = useContext(WalletContext)
    if (!transactions) {
        return <Skeleton height="420px"></Skeleton>
    }

    const groupedTransactions = transactions.reduce<IGroupedTransactions>((groups, transaction) => {

        const date = dateToMY(new Date(transaction.createdAt))

        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {})

    const monthKeys = Object.keys(groupedTransactions)

    return (
        <>
            {monthKeys.map((monthKey: string) => (
                <StyledTransactions key={monthKey}>
                    <Header wallet={wallet} date={monthKey} transactions={groupedTransactions[monthKey]} />
                    {
                        groupedTransactions[monthKey].map((transaction) => (
                            <Transaction key={transaction._id} transaction={transaction}/>
                        ))
                    }
                </StyledTransactions>
            ))
            }
        </>)
}

export default TransactionsSection;