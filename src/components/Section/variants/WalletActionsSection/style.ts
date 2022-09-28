import styled from "styled-components";

export const StyledWalletActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > *:first-child {
    display: block;
    margin-bottom: 1rem;
  }

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;

    > *:first-child {
      display: initial;
      margin-bottom: 0;
    }
    
  }
  
`