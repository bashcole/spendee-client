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
import PositionDialog from "@components/UI/Dialog/variants/PositionDialog";

interface IProps {
    wallet?: IWallet | undefined;
}

interface IEmptyPosition {
    createdAt: string,
    amount: number
}

const PortfolioActionsSection = () => {

    const {wallet} = useContext(WalletContext)
    const t = useTranslations("Wallet");
    const [newPositionDialogShown, setNewPositionDialogShown] = useState(false)
    const [position, setPosition] = useState<IEmptyPosition | null>(null)

    const newPositionCancel = () => {
        setPosition(null)
        setNewPositionDialogShown(false)
    }

    if (!wallet) {
        return <Section title={<Skeleton width="240px"/>}>
            <Skeleton height="420px"/>
        </Section>
    }

    return (
        <>
            <Section title={wallet.name}>
                <StyledWalletActions>
                    <Button shadow={true}
                            onClick={() => setNewPositionDialogShown(true)}>{t("Add position")}</Button>
                </StyledWalletActions>
                {newPositionDialogShown &&
                    <PositionDialog editMode={false} position={position} onClose={newPositionCancel}/>}
            </Section>
        </>
    )
}

export default PortfolioActionsSection;