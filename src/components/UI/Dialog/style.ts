import styled, {css, keyframes} from "styled-components";

export const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  padding: 4rem 1rem 1rem 1rem;
  z-index: 700;
`

export const StyledDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  background-color: transparent;
  padding: 4rem 1rem 1rem 1rem;
  z-index: 800;
`

export const StyledDialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyledDialogTitle = styled.h2`
`

export const StyledDialogCloseButton = styled.div`
  border: none;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`

interface IDialogWidth {
    width: string;
}

const FadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const FadeOut = keyframes`
  100% { opacity: 0; }
`

export const StyledDialogContent = styled.div<IDialogWidth>`
  background: white;
  width: 80%;
  margin: 0 auto;
  border-radius: 0.5rem;
  padding: 1rem;
  z-index: 900;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({theme}) => theme.mediaQueries.sm} {
    width: ${({width}) => width};
  }
`