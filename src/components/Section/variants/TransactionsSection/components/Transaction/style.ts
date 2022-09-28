import styled, {css} from "styled-components";

export const StyledTransactionWrap = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
`

export const StyledPrimaryText = styled.span`
`

export const StyledSecondaryText = styled.span`
  color: #9ca3af;
`

export const StyledTransaction = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f4f6f8;
  }
`

export const StyledTransactionColumn = styled.div<{ rightAlign?: boolean, width?: string, hideOnMobile?: boolean }>`
  flex: 1;

  ${({rightAlign}) => rightAlign && css`
    text-align: right;
  `}

  ${({hideOnMobile}) => hideOnMobile && css`
    @media (max-width: 640px) {
      display: none;
    }
  `}

  ${({width}) => width && css`
    @media (min-width: 640px) {
      min-width: ${width};
      max-width: ${width};
    }
  `}

`

export const StyledTransactionDateColumn = styled.div<{ rightAlign?: boolean, width?: string, hideOnMobile?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`


export const StyledAmount = styled.span<{ negative?: boolean, other?: boolean }>`
  display: block;
  color: #34d399;
  ${props => props.negative && css`
    color: #F87171;
  `}

  ${props => props.other && css`
    color: #bbcdd8;
  `}
`

export const StyledCategoryColumn = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  width: 150px;
  cursor: pointer;
  padding: 0.5rem;
`

export const StyledCategoryItem = styled(StyledCategoryColumn)`
  margin-right: 0;
  width: 100%;
  &:hover {
    background-color: ${({theme}) => theme.colors.neutralBright100};
  }
`

export const StyledCategoryIcon = styled.figure<{ color: string }>`
  width: 24px;
  height: 24px;
  background: ${({color}) => color};
  border-radius: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    color: white;
    width: 30px;
    height: 30px;
  }
`

export const StyledCategorySmallIcon = styled(StyledCategoryIcon)`
  width: 28px;
  height: 28px;
  padding: 0;
`

export const StyledCategoryName = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
`