import styled, {css, keyframes} from "styled-components";

const StyledDate = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`

const StyledDateText = styled.span`

`
const StyledDateAgo = styled.span`
  color: #9ca3af;
`


const StyledTransactionWrap = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
`

const StyledTransaction = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f4f6f8;
  }
`

const StyledNote = styled.div`
  display: none;
  @media (min-width: 640px) {
    display: initial;
    flex: 1;
  }
`
const StyledAmountContrainer = styled.div`
  margin-left: auto;
`

const StyledAmount = styled.span<{ negative?: boolean, other?: boolean }>`
  display: block;
  color: #34d399;
  ${props => props.negative && css`
    color: #F87171;
  `}

  ${props => props.other && css`
    color: #bbcdd8;
  `}
`

export const StyledTransactionEdit = styled.div<{editMode?: boolean}>`
  background-color: #f4f7fa;
  margin-bottom: 2rem;

  ${({editMode}) => editMode && css`
    border-top: 1rem solid #f4f7fa;
    border-bottom: 1rem solid #f4f7fa;
  `}
  
`

export const slideDown = keyframes`
  from {
    transform: translateY(-20px);
  }

  to {
    transform: translateY(0px);
  }
`;

export const StyledTransactionEditDialog = styled.div`
  background-color: #ffff;
  transform: translateY(-20px);
  position: relative;
  z-index: 5000;
  animation: ${slideDown} 0.2s linear forwards;
`

export const StyledTransactionEditDialogClose = styled.span`
  cursor: pointer;
  background-color: #324c5b;
  height: 30px;
  width: 30px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  border-radius: 50%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledTransactionEditDialogContent = styled.div`
  //display: flex;
  //justify-content: center;
  //align-items: center;
  //font-weight: bold;
`

export const StyledTransactionEditDialogCloseIcon = styled.svg`
  height: 20px;
  width: 20px;
  `