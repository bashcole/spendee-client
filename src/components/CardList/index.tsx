import React from 'react';
import {StyledCardList} from "@components/CardList/style";

const CardList = ({children}: {children: any}) => (
    <StyledCardList>{children}</StyledCardList>
);

export default CardList;