import styled from "styled-components";

export const StyledForm = styled.form`
  margin-left: auto;
  margin-right: auto;

  @media only screen and (min-width: 48.001em) {
    max-width: 360px;
  }
`

export const StyledDateInputWrapper = styled.div`
  input {
    display: block;
    font: inherit;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid ${({theme}) => theme.colors.neutralBright};
    width: 100%;
    max-width: 100%;
  }
`
export const StyledSelect = styled.select`
  display: block;
  font: inherit;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.neutralBright};
  width: 20rem;
  max-width: 100%;

  &:focus, &:hover {
    outline: none;
    border-color: ${({theme}) => theme.colors.neutral};
  }
`

export const StyledInput = styled.input`
  display: block;
  font: inherit;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.neutralBright};
  width: 20rem;
  max-width: 100%;
  
  &:focus, &:hover {
    outline: none;
    border-color: ${({theme}) => theme.colors.neutral};
  }
`

export const StyledFormControl = styled.div`
  margin-bottom: 1rem;
  
  input {
    display: block;
    font: inherit;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid ${({theme}) => theme.colors.neutralBright};
    //width: 20rem;
    min-width: 100%;

    &:focus, &:hover {
      outline: none;
      border-color: ${({theme}) => theme.colors.neutral};
    }
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
`

export const StyledLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

export const StyledErrorBadge = styled.p`
  background-color: ${({theme}) => theme.colors.secondary};
  color: ${({theme}) => theme.colors.white};
  margin: ${({theme}) => theme.spacing[2]} 0;
  padding: 0.5rem;
`

export const StyledError = styled.p`
  color: ${({theme}) => theme.colors.secondary};
  margin: ${({theme}) => theme.spacing[2]} 0;
`
