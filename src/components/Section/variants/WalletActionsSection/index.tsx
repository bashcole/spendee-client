import React, {useContext, useState} from 'react';
import {IWallet} from "@interfaces/wallet";
import Section from "@components/Section";
import Skeleton from "react-loading-skeleton";
import {useTranslations} from "next-intl";
import {StyledWalletActions} from "./style"
import Button from "@components/UI/Button";
import OverlayPortal from "@components/HOC/OverlayPortal";
import QRScanDialog from "@components/UI/Dialog/variants/QRScanDialog";
import TransactionDialog from "@components/UI/Dialog/variants/TransactionDialog";
import WalletContext from "@contexts/wallet";

interface IProps {
    wallet?: IWallet | undefined;
}

interface IEmptyTransaction {
    createdAt: string,
    amount: number
}

const WalletActionsSection = () => {

    const {wallet} = useContext(WalletContext)
    const t = useTranslations("Wallet");
    const [newTransactionDialogShown, setNewTransactionDialogShown] = useState(false)
    const [QRDialog, setQRDialog] = useState(false)
    const [transaction, setTransaction] = useState<IEmptyTransaction | null>(null)

    const QRScan = (data: any) => {
        console.log(data)
        setTransaction({
            createdAt: data.date,
            amount: data.amount * 100,
        })
        setNewTransactionDialogShown(true)
    }

    const newTransactionCancel = () => {
        setTransaction(null)
        setNewTransactionDialogShown(false)
    }


    if (!wallet) {
        return <Section title={<Skeleton width="240px"/>}>
            <Skeleton height="420px"/>
        </Section>
    }

    return (
        <>
            <OverlayPortal>
                <QRScanDialog onSuccess={QRScan} isShown={QRDialog} onClose={() => setQRDialog(false)}/>
            </OverlayPortal>

            <Section title={wallet.name}>
                <StyledWalletActions>
                    <Button shadow={true} onClick={() => setNewTransactionDialogShown(true)}>{t("Add transaction")}</Button>
                    <Button shadow={true} onClick={() => setQRDialog(true)}>{t("QR Scan")}</Button>
                </StyledWalletActions>
            </Section>
            {newTransactionDialogShown && <TransactionDialog editMode={false} transaction={transaction} onClose={newTransactionCancel} />}
        </>
    )
}

export default WalletActionsSection;