import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 40px;
    height: 40px;
  }

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      color: ${(props) => props.theme['gray-100']};

      &.active {
        color: ${(props) => props.theme['blue-500']};
      }

      svg {
        margin: 0 auto;
      }

      /* this is used to help to centralize the link, since we are setting 
        an ::after pseudo-element
      */
      &::before {
        content: '';
        display: block;
        width: 100%;
        height: 3px;
        background-color: transparent;
        margin-bottom: 0.5rem;
      }

      &::after {
        content: '';
        display: block;
        width: 0%;
        height: 3px;
        background: ${(props) => props.theme['blue-300']};
        margin-top: 0.5rem;
        transition: all ease-out 0.2s;
      }

      &:hover::after {
        width: 100%;
      }
    }

    button {
      width: 3rem;
      height: 3rem;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      color: ${(props) => props.theme['gray-100']};
      background: ${(props) => props.theme['gray-600']};
      border-radius: 4px;
      border: 1px solid transparent;
      cursor: pointer;

      svg {
        margin: 0 auto;
      }
    }
  }
`
