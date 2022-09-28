import styled from "styled-components";

export const StyledFooter = styled.footer`
  background-color: ${({theme}) => theme.colors.white};
  font-size: 0.8rem;
  padding: ${({theme}) => theme.spacing[4]};
  text-align: center;
  
  strong {
    color: ${({theme}) => theme.colors.gray};
  }
`