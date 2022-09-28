import React, {useState} from 'react';
import {
    StyledAccordionSectionAction, StyledAccordionSectionContent,
    StyledAccordionSectionHeader,
    StyledAccordionSectionHeadingTitle, StyledAccordionSectionIcon
} from "@components/AccordionSection/style";

interface IProps {
    title: any;
    children :any;
}

const AccordionSection = ({title,children}: IProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => {
        setIsOpen(prevState => !prevState)
    }

    return (<>
        <StyledAccordionSectionHeader>
            <StyledAccordionSectionHeadingTitle>{title}</StyledAccordionSectionHeadingTitle>
            <StyledAccordionSectionAction onClick={handleClick}>
                <StyledAccordionSectionIcon isOpen={isOpen}></StyledAccordionSectionIcon>
            </StyledAccordionSectionAction>
        </StyledAccordionSectionHeader>
        {isOpen && <StyledAccordionSectionContent>{children}</StyledAccordionSectionContent>}
    </>)
}

export default AccordionSection;