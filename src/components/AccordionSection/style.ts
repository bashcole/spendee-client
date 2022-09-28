import styled, {css} from "styled-components";


export const StyledAccordionSectionHeader = styled.div`
  display: flex;
  align-items: center;
  //justify-content: space-between;
`

export const StyledAccordionSectionContent = styled.div`
  margin-top: 1rem;
`

export const StyledAccordionSectionHeadingTitle = styled.h2`
  line-height: 1.5rem;
  margin: 0;
  font-weight: 500;
  font-size: 1.5rem;
  color: #111827;
`

export const StyledAccordionSectionAction = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
`
export const StyledAccordionSectionIcon = styled.span<{ isOpen: boolean }>`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 8px;
  width: 8px;
  margin-top: -4px;
  border: 2px solid #bbcdd8;
  border-right-width: 0;
  border-top-width: 0;
  transform: rotate(-45deg);
  transition: all 0.2s ease-in-out;
  transform-origin: center center;
  ${props => props.isOpen && css`
    transform: rotate(135deg) translate(3px, -3px);
  `
};
`
