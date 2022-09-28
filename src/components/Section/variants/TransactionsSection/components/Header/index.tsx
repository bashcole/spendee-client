import React from 'react';
import {useRouter} from "next/router";
import {StyledHeader, StyledDate, StyledDifference} from './style'
import {formatNumber, isBalanceNegative, sumTransactions, sumOtherTransactions} from "@utils/index";

interface IProps {
    date: any;
    transactions: any;
    wallet: any;
}

const Header = ({date, transactions, wallet}: IProps) => {
    const router = useRouter()

    const total = sumTransactions(transactions)
    const otherTotal = wallet?.otherCurrency ? sumOtherTransactions(transactions) : null

    return (
        <StyledHeader>
            <StyledDate>{date}</StyledDate>
            <span style={{marginLeft: 'auto'}}>
            <StyledDifference>{isBalanceNegative(total) ? '' : '+'}{formatNumber(total, router.locale, wallet.currency)
            }</StyledDifference>
                {
                    otherTotal &&
                    <StyledDifference>{isBalanceNegative(otherTotal) ? '' : '+'}{formatNumber(otherTotal, router.locale, 'BGN')
                    }</StyledDifference>}
                </span>
        </StyledHeader>
    )
}

export default Header;