import React from 'react';
import {StyledAuthCard} from "@components/Card/variants/AuthCard/style";

const AuthCard = ({children}: {children: any}) => {
    return (
        <StyledAuthCard>
            {children}
        </StyledAuthCard>
    )
}

export default AuthCard;