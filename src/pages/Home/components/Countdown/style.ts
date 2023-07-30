import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;
  user-select: none;

  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  @media (max-width: 720px) {
    font-size: 6rem;
    line-height: 4rem;
  }

  @media (max-width: 550px) {
    font-size: 4rem;
    line-height: 2rem;
  }

  @media (max-width: 460px) {
    font-size: 2rem;
    line-height: 1rem;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['blue-300']};
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

  @media (max-width: 720px) {
    width: 3rem;
  }

  @media (max-width: 550px) {
    width: 2rem;
  }

  @media (max-width: 460px) {
    width: 1rem;
  }
`
