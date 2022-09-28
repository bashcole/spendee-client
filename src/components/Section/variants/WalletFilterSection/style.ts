import styled from "styled-components";

export const StyledIsMobile = styled.div`
    @media (max-width: 640px) {
      display: none;
    }
`

export const StyledIsDesktop = styled.div`
    @media (min-width: 640px) {
      display: none;
    }
`