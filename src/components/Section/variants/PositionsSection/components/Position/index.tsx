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
import PositionDialog from "@components/UI/Dialog/variants/PositionDialog";
import {ITransactionCategory} from "@interfaces/category";
import {IPosition} from "@interfaces/position";

interface IProps {
    position: IPosition;
}

const Position = ({position}: IProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const createdAt = new Date(position.createdAt)

    return (<>
        {isOpen && <PositionDialog editMode={true} position={position} onClose={() => setIsOpen(false)}/>}
        {!isOpen && <StyledTransactionWrap>
            <StyledTransaction onClick={() => setIsOpen(true)}>
                <StyledTransactionDateColumn hideOnMobile={true}>
                    <StyledPrimaryText>{createdAt.toISOString().split('T')[0]}</StyledPrimaryText>
                    <StyledSecondaryText>{timeSince(createdAt)} ago</StyledSecondaryText>
                </StyledTransactionDateColumn>
                <StyledTransactionColumn>
                    {position.currency}
                </StyledTransactionColumn>
                <StyledTransactionColumn>
                    {position.units}
                </StyledTransactionColumn>
                <StyledTransactionColumn>
                    {position.open}
                </StyledTransactionColumn>
                <StyledTransactionColumn hideOnMobile={true}>
                    {(position.units * position.open).toFixed(2)} USD
                </StyledTransactionColumn>
                <StyledTransactionColumn hideOnMobile={true}>
                    <StyledAmount negative={(position.amount.value - (position.units * position.open)) < 0}>
                        {(position.amount.value - (position.units * position.open * 100)) >= 0 && '+'}{((position.amount.value / 100) - (position.units * position.open)).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} USD
                    </StyledAmount>
                    <StyledAmount other={true}
                                  negative={(position.otherAmount!.value - (position.units * position.open)) < 0}>
                        {(position.otherAmount!.value - (position.units * position.open * 100)) >= 0 && '+'}{((position.otherAmount!.value / 100) - (position.units * position.open)).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} BGN
                    </StyledAmount>
                </StyledTransactionColumn>
                <StyledTransactionColumn>
                    {(position.amount.value / 100).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} USD
                    <StyledAmount other={true} negative={position.otherAmount!.value < position.open}>
                        {(position.otherAmount!.value / 100).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })} BGN
                    </StyledAmount>
                </StyledTransactionColumn>
            </StyledTransaction>
        </StyledTransactionWrap>}
    </>)
}

export default Position;