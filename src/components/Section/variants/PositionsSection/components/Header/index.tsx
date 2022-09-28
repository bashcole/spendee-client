import React from 'react';
import {useRouter} from "next/router";
import {StyledHeader, StyledDate, StyledDifference} from './style'
import {formatNumber, isBalanceNegative, timeSince} from "@utils/index";
import {
    StyledPrimaryText, StyledSecondaryText,
    StyledTransactionColumn,
    StyledTransactionDateColumn
} from "@components/Section/variants/PositionsSection/components/Position/style";
import {useTranslations} from "next-intl";

interface IProps {
    date: any;
}

const Header = () => {
    const t = useTranslations("Wallet")

    return (
        <StyledHeader>
            <StyledTransactionDateColumn hideOnMobile={true}>
                <strong>{t("Date")}</strong>
            </StyledTransactionDateColumn>
            <StyledTransactionColumn>
                <strong>{t("Ticker")}</strong>
            </StyledTransactionColumn>
            <StyledTransactionColumn>
                <strong>{t("Units")}</strong>
            </StyledTransactionColumn>
            <StyledTransactionColumn>
                <strong>{t("Open")}</strong>
            </StyledTransactionColumn>
            <StyledTransactionColumn hideOnMobile={true}>
                <strong>{t("Invested")}</strong>
            </StyledTransactionColumn>
            <StyledTransactionColumn hideOnMobile={true}>
                <strong>{t("p_and_l_fiat")}</strong>
            </StyledTransactionColumn>
            <StyledTransactionColumn>
                <strong>{t("Value")}</strong>
            </StyledTransactionColumn>
        </StyledHeader>
    )
}

export default Header;