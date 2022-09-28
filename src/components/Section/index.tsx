import React from 'react';
import {StyledSection, StyledSectionHeading} from "@components/Section/style";

interface IProps {
    title: any;
    children :any;
}

const Section = ({title,children}: IProps) => {
    return <StyledSection>
        <StyledSectionHeading>{title}</StyledSectionHeading>
        {children}
    </StyledSection>
}

export default Section;