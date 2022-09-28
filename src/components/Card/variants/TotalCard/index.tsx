import React from 'react';
import {StyledTotalItem, StyledTotalItemName, StyledTotalItemPrice} from "./style";

interface IProps {
    positive: boolean;
    title: string;
    amount: string;
}

const TotalCard = ({title, amount, positive}: IProps) => {
    return (
        <StyledTotalItem>
            <StyledTotalItemName>{title}</StyledTotalItemName>
            <StyledTotalItemPrice positive={positive}>{amount}</StyledTotalItemPrice>
        </StyledTotalItem>
    )
}

export default TotalCard;