import styled from "styled-components";

export const StyledMobileMenuClose = styled.div`

  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 0.375rem;
  padding: 0.5rem;
  color: #6b7280;

  &:hover {
    background-color: #f3f4f6;
  }
`

export const StyledDivider = styled.div`
  margin: 0.74rem 0;
  height: 1px;
  background: #ccc;
`

export const StyledMenuNav = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
`

export const StyledMenuNavItem = styled.a`
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  color: #1f2937;
  cursor: pointer;

  &:hover {
    border-radius: 0.375rem;
    background-color: #f3f4f6;
  }
  
`

export const StyledUserMenu = styled.div`
  display: flex;
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  padding-bottom: 0.75rem;
`

export const StyledUserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

export const StyledUseDetails = styled.div`
  margin-left: 1rem;
`