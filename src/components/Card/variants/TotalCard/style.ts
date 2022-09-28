import styled, {css} from "styled-components";

export const StyledTotalItem = styled.div`
  padding: 1.5rem;
  height: 120px;
  border-radius: 0.5rem;
  background-color: white;
`
export const StyledTotalItemName = styled.div`
  font-weight: 500;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 1.25rem;
  font-size: 1rem;
  display: block;
`
export const StyledTotalItemPrice = styled.div<{ positive?: boolean }>`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
  color: #f87171;
  ${props => props.positive && css`
    color: #34d399;
  `}
  display: block;
`