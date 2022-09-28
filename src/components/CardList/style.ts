import styled from "styled-components";

export const StyledCardList = styled.div`
  display: grid;
  gap: 1.25rem;
  //grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-template-columns: repeat( auto-fit, minmax(280px, 1fr) );
  //@media (min-width: 640px) {
  //  grid-template-columns: repeat(4, 1fr);
  //}
`