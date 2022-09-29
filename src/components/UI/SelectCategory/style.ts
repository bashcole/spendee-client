import styled, {css} from "styled-components";

export const NoneSelected = styled.div`
  color: ${({theme}) => theme.colors.neutral100};
  background-color: ${({theme}) => theme.colors.neutralBright100};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
  width: 100%;
  min-width: 200px;
`

export const Wrap = styled.div`
  position: relative;
`

export const Popout = styled.div`
  border-radius: 4px;
  z-index: 9999;
  position: absolute;
  border: 1px solid rgb(204, 204, 204);
  background-color: rgb(255, 255, 255);
  padding: 10px;
  top: 0;
  width: 208px;
  max-width: 208px;
  overflow-x: hidden;
`

export const Types = styled.div`
  display: flex;
`

export const Type = styled.span<{ type: string, active: boolean }>`
  color: ${({theme}) => theme.colors.neutral100};
  background-color: ${({theme}) => theme.colors.neutralBright100};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;

  ${({type, active}) => type === "income" && active && css`
    color: white;
    background-color: ${({theme}) => theme.colors.primary};
  `}

  ${({type, active}) => type === "expense" && active && css`
    color: white;
    background-color: ${({theme}) => theme.colors.secondary};
  `}
`

export const Categories = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow-y: auto;
`

export const StyledSelectedWrap = styled.div`
  padding: 0.5rem;
  display: flex;
  max-height: 37px;
  flex: 1;
  align-items: center;
  border-radius: 0.5rem;
`

export const StyledSelecedCategoryItem = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;
  cursor: pointer;

`


export const StyledCategoryIconSmall = styled.figure<{ color: string }>`
  width: 34px;
  height: 34px;
  background: ${({color}) => color};
  border-radius: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;

  img {
    color: white;
    width: 24px;
    height: 24px;
  }
`