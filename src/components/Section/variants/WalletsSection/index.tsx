import React, {useState} from 'react';
import {useTranslations} from "next-intl";

import {calculateWalletTotalBalance} from "@utils/index";
import {IWallet} from "@interfaces/wallet";

import Section from "@components/Section";
import WalletCard from "@components/Card/variants/WalletCard";
import Button from "@components/UI/Button";
import WalletsSectionSkeleton from "@components/Section/variants/WalletsSection/skeleton";
import CardList from "@components/CardList";
import ActionsCard from "@components/Card/variants/ActionsCard";
import OverlayPortal from "@components/HOC/OverlayPortal";
import WalletDialog from "@components/UI/Dialog/variants/WalletDialog";
import {mutate} from "swr";

interface IProps {
    wallets: IWallet[] | undefined;
}

const WalletsSection = ({wallets}: IProps) => {

    const t = useTranslations("Index");
    const [walletDialogShown, setWalletDialogShown] = useState(false)
    const onWalletDialogClose = () => {
        setWalletDialogShown(false)
    }

    const onWalletDialogSuccess = async () => {
        setWalletDialogShown(false)
        await mutate("/wallets")
    }

    if (wallets) {

        const totalBalance: IWallet = {
            _id: "total_balance",
            type: 'cash',
            currency: "BGN",
            name: "Total Balance",
            balance: calculateWalletTotalBalance(wallets)
        }

        return (
            <>
                <OverlayPortal>
                    <WalletDialog isShown={walletDialogShown} onClose={onWalletDialogClose}
                           onSuccess={onWalletDialogSuccess}/>
                </OverlayPortal>
                <Section title={t("Wallets")}>
                    <CardList>
                        {
                            wallets.map(wallet => (
                                    <WalletCard
                                        data-testid={`wallet_${wallet._id}`}
                                        key={wallet._id}
                                        shadow={true}
                                        scaled={true}
                                        href={`/wallet/${wallet._id}`}
                                        wallet={wallet}
                                    />
                                )
                            )
                        }

                        <WalletCard shadow={false} scaled={false} wallet={totalBalance} href="javascript:;"/>

                        <ActionsCard>
                            <Button data-testid="button-new-wallet" scaled={true}
                                    block={true}
                                    shadow={true}
                                    onClick={setWalletDialogShown}>{t("Add New Wallet")}</Button>
                            <Button scaled={false}
                                    block={true}>{t("Connect a Bank Account")}</Button>
                        </ActionsCard>
                    </CardList>
                </Section>
            </>
        )
    }

    // Return the Skeleton layout
    return <WalletsSectionSkeleton/>
}

export default WalletsSection;