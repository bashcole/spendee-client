import styled from "styled-components";

export const StyledActions = styled.div`
display: flex;
justify-content: flex-end;
  & > button {
    margin-left: 0.5rem;
  }
`
export const StyledWrap = styled.div`
  display: block;
  padding: 20px;
`
export const StyledFields = styled.div`

  gap: 2rem;
  display: flex;

  flex: 1;
  margin-bottom: 1rem;
  flex-direction: column;
  @media (min-width: 640px) {
    flex-direction: row;
    align-items: baseline;
  }
`

export const StyledForm = styled.form`

`

export const StyledColumn = styled.div`
    flex: 1;
`

export const StyledInput = styled.input`
  display: block;
  font: inherit;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.neutralBright};
  //width: 20rem;
  width: 100%;
  max-width: 100%;

  &:focus, &:hover {
    outline: none;
    border-color: ${({theme}) => theme.colors.neutral};
  }
`