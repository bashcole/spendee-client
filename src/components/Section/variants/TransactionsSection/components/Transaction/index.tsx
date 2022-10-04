import React, {useState} from 'react';
import {ITransaction} from "@interfaces/transaction";
import {
    StyledTransactionWrap,
    StyledTransaction,
    StyledTransactionColumn,
    StyledSecondaryText,
    StyledPrimaryText,
    StyledTransactionDateColumn,
    StyledAmount, StyledCategoryColumn, StyledCategoryIcon, StyledCategoryName
} from './style'
import {formatNumber, timeSince} from "@utils/index";
import {useRouter} from "next/router";
import TransactionDialog from "@components/UI/Dialog/variants/TransactionDialog";
import {ITransactionCategory} from "@interfaces/category";

interface IProps {
    transaction: ITransaction;
}

const Transaction = ({transaction}: IProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const createdAt = new Date(transaction.createdAt)

    return (<>
        {isOpen && <TransactionDialog editMode={true} transaction={transaction} onClose={() => setIsOpen(false)}/>}
        {!isOpen && <StyledTransactionWrap>
            <StyledTransaction onClick={() => setIsOpen(true)}>
                <StyledTransactionColumn collapseOnMobile={true}>
                    <StyledCategoryColumn>
                        <StyledCategoryIcon color={transaction.category.hex}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={transaction.category.icon} alt={"..."}/>
                        </StyledCategoryIcon>
                        <StyledCategoryName hideOnMobile={true}>
                            {transaction.category.name}
                        </StyledCategoryName>
                    </StyledCategoryColumn>
                </StyledTransactionColumn>
                <StyledTransactionDateColumn>
                    <StyledPrimaryText>{createdAt.toISOString().split('T')[0]}</StyledPrimaryText>
                    <StyledSecondaryText>{timeSince(createdAt)} ago</StyledSecondaryText>
                </StyledTransactionDateColumn>
                <StyledTransactionColumn hideOnMobile={true}>
                    {transaction.note}
                </StyledTransactionColumn>
                <StyledTransactionColumn rightAlign={true} width="250px" useFlex={true}>
                    <StyledAmount
                        negative={transaction.category.type === "expense"}>{transaction.category.type === "expense" ? '-' : '+'}{formatNumber(transaction.amount / 100, router.locale, transaction.currency)}</StyledAmount>
                    {transaction.otherCurrency &&
                        <StyledAmount
                            other={true}>{transaction.category.type === "expense" ? '-' : '+'}{formatNumber(transaction.otherCurrency.amount / 100, router.locale, transaction.otherCurrency.currency)}</StyledAmount>}

                </StyledTransactionColumn>
            </StyledTransaction>
        </StyledTransactionWrap>}
    </>)
}

export default Transaction;