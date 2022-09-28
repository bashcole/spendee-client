import React from 'react';
import {StyledActionsCard} from "@components/Card/variants/ActionsCard/style";

const ActionsCard = (props: { children: any }) => (
    <StyledActionsCard>{props.children}</StyledActionsCard>
);

export default ActionsCard;