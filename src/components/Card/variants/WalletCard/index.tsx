import React from "react";
import {useRouter} from "next/router";

import Link from "next/link";
import {formatWalletBalance, isBalanceNegative} from "@utils/index";
import {IWallet} from "@interfaces/wallet";
import {StyledWalletBalance, StyledWalletCard, StyledWalletName} from "@components/Card/variants/WalletCard/style";

const WalletCard = ({
                        wallet,
                        href,
                        shadow,
                        scaled, ...props}: { wallet: IWallet, href: string, shadow?: boolean, scaled?: boolean }) => {

    const router = useRouter()

    return (
        <Link href={href}>
            <StyledWalletCard scaled={scaled} shadow={shadow} {...props}>
                <StyledWalletName>{wallet.name}

                    {wallet.type === 'portfolio' &&

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '20px', height: '20px', float: 'right'}}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                        </svg>
                    }

                </StyledWalletName>
                <StyledWalletBalance
                    negative={isBalanceNegative(wallet.balance)}>{formatWalletBalance(wallet.balance, wallet.currency, router.locale)}</StyledWalletBalance>
                {wallet.otherCurrency &&
                    <StyledWalletBalance
                        other={true}>{formatWalletBalance(wallet.otherCurrency.balance, wallet.otherCurrency.currency, router.locale)}</StyledWalletBalance>}
            </StyledWalletCard>
        </Link>
    )
}

export default WalletCard