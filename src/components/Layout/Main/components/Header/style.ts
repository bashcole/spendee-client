import styled, {css} from "styled-components";

interface IActive {
  active?: boolean
}

export const StyledHeader = styled.header`
  height: 60px;
  background-color: white;
  border-bottom: solid 1px #e5ebee;
  box-shadow: 0 4px 8px 0 rgb(48 82 120 / 3%);
  display: flex;
`

export const StyledHeaderContent = styled.div<{ isAuth: boolean }>`
  max-width: 1240px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 1rem;
  ${props => !props.isAuth && css`
    justify-content: center;
  `}
`

export const StyledHeaderNav = styled.nav`
  display: none;
  margin: 0 auto;

  @media (min-width: 640px) {
    display: block;
  }
`

export const StyledHeaderNavList = styled.nav`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`

export const StyledHeaderNavItemLink = styled.a<IActive>`
  line-height: 59px;
  display: block;
  padding: 0 20px;
  text-decoration: none;
  font-weight: 600;
  color: #7b93a4;
  text-align: center;
  transition: color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #12c48b;
  }

  ${props => props.active && css`
    color: #12c48b;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #12c48b;
      bottom: 0;
      left: 0;
    }
  `};
`

export const StyledHeaderUser = styled.header`
  display: none;

  @media (min-width: 640px) {
    display: flex;
    position: relative;
    z-index: 1;
    flex-direction: column;
  }
`

export const StyledHeaderUserMain = styled.div`
  z-index: 900;
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 4px 4px 0 0;
`

export const StyledHeaderUserAvatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 100%;
  object-fit: cover;
`

export const StyledHeaderUserMenu = styled.div<{ isOpen: boolean }>`
  visibility: hidden;
  opacity: 1;
  position: absolute;
  background: white;
  width: 100%;
  top: 100%;
  left: 0;
  z-index: 900;
  border-radius: 0 0 4px 4px;
  transition: all .15s ease-out;
  ${props => props.isOpen && css`
    visibility: visible;
    opacity: 1;
  `}
`
export const StyledHeaderUserMenuList = styled.ul<{ isOpen: boolean }>`
  margin: 0;
  list-style: none;
  max-height: 0;
  overflow: hidden;
  visibility: hidden;
  opacity: 1;
  transition: all .15s ease-out;

  ${props => props.isOpen && css`
    visibility: visible;
    opacity: 1;
    transition: max-height 0.35s ease-in;
    max-height: 500px;
    overflow-y: auto;
  `}
`
export const StyledHeaderUserMenuItem = styled.li`
  display: block;
  line-height: 36px;
`
export const StyledHeaderUserFlag = styled.svg`
  width: 22px;
`

export const StyledHeaderUserMenuLink = styled.a`
  display: block;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 400;
  text-align: left;
  font-size: 1rem;
  text-decoration: none;
  color: rgb(51, 61, 66);
  cursor: pointer;

  &:hover {
    color: #12c48b;
  }
`

export const StyledHeaderOverlay = styled.div<IActive>`
  transition: opacity 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 800;
  width: 100vw;

  ${props => props.active && css`
    opacity: 0.6;
    pointer-events: all;
  `}
`

export const StyledHeaderMobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 99999;
  ${props => props.isOpen && css`
    display: initial;
  `}

`

export const StyledHeaderMobileMenuWrap = styled.div`
  padding: 0.5rem;
  width: 100%;
`

export const StyledHeaderMobileMenuBody = styled.div`
  border-radius: 0.5rem;
  background-color: white;
  width: 100%;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
`

export const StyledHeaderMobileMenuHeader = styled.div`
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
`

export const StyledHeaderMobileMenuButton = styled.div`
  cursor: pointer;
  border-radius: 0.375rem;
  padding: 0.5rem;
  color: #6b7280;
  display: block;
  margin-left: auto;

  &:hover {
    background-color: #f3f4f6;
  }

  ${({theme}) => theme.mediaQueries.sm} {
    display: none;
  }
`

export const StyledHeaderMobileMenuButtonSvg = styled.svg`
  height: 24px;
  width: 24px;
  display: inline-block;
`

export const StyledHeaderUserName = styled.span`
  margin-left: 0.7em;
  margin-right: 0.8em;
  font-weight: 600;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
`
export const StyledHeaderUserIcon = styled.span<{ isOpen: boolean }>`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 8px;
  width: 8px;
  margin-top: -4px;
  border: 2px solid #bbcdd8;
  border-right-width: 0;
  border-top-width: 0;
  transform: rotate(-45deg);
  transition: all 0.2s ease-in-out;
  transform-origin: center center;
  ${({isOpen}) => isOpen && css`
    transform: rotate(135deg) translate(3px, -3px);
  `};
`

export const StyledHeaderLogo = styled.a`
  cursor: pointer;
`