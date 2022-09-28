import styled, {css} from "styled-components";

export const StyledWalletCard = styled.a<{ shadow?: boolean, scaled?: boolean, disabled?: boolean }>`
  text-decoration: none;
  cursor: pointer;
  padding: ${({theme}) => theme.spacing[6]};
  min-height: 120px;
  border-radius: 0.5rem;
  background-color: white;
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1),
  box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  ${({shadow}) => shadow && css`
    box-shadow: ${({theme}) => theme.shadows.base};
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

export const StyledWalletName = styled.span`
  font-weight: 500;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 1.25rem;
  font-size: 1rem;
  display: block;
`

export const StyledWalletBalance = styled.span<{ negative?: boolean, other?: boolean }>`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
  color: #34d399;
  display: block;
  ${props => props.negative && css`
    color: #F87171;
  `}

  ${props => props.other && css`
    margin-top: 0.25rem;
    color: #9ca3af;
    font-size: 1rem;
  `}

`