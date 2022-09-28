import styled, {css} from "styled-components";
import {scale} from "style-value-types";

interface IButton {
    variant?: "white" | "green" | "red",
    block?: boolean,
    type?: "submit" | "reset" | "button" | undefined,
    scaled?: boolean,
    shadow?: boolean,
    disabled?: boolean
}

export const StyledButton = styled.button<IButton>`
  
  border: none;
  cursor: pointer;
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  color: #12c48b;
  background-color: white;
  
  ${({block}) => block && css`
    display: block;
    width: 100%;
  `}
  
  ${({shadow}) => shadow && css`
    box-shadow: ${({theme}) => theme.shadows.base};
  `}
  ${({variant}) => variant === 'green' && css`
    color: white;
    background-color: #12c48b;
  `}
  ${({variant}) => variant === 'red' && css`
    color: white;
    background-color: #f87171;
  `}
  ${({disabled}) => disabled && css`
    color: #7b93a4;
    background-color: #e5ebee;
  `}
  &:hover {
    ${({scaled}) => scaled && css`
      transform: scaleX(1.05) scaleY(1.05);
    `}

    ${({shadow, disabled}) => shadow && !disabled && css`
      box-shadow: ${({theme}) => theme.shadows.hover};
    `}
  }
`