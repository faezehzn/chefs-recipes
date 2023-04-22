import { Container } from "react-bootstrap";
import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <Container fluid className="loading-container">
        <div id="load">
          <div>G</div>
          <div>N</div>
          <div>I</div>
          <div>D</div>
          <div>A</div>
          <div>O</div>
          <div>L</div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.section`
  .loading-container {
    background: var(--light);
    height: 90vh;
    position: relative;
    display: block;
    z-index: 5;
    padding: 5rem 2rem;
  }
  #load {
    position: absolute;
    width: 40rem;
    height: 2.5rem;
    left: 50%;
    top: 40%;
    margin-left: -20rem;
    overflow: visible;
    user-select: none;
    cursor: default;
  }
  #load div {
    position: absolute;
    width: 1.5rem;
    height: 2.5rem;
    opacity: 0;
    font-family: var(--bodyFont);
    font-size: var(--headingFontSize);
    font-weight: 800;
    animation: move 2s linear infinite;
    transform: rotate(180deg);
    color: var(--orange);
  }
  #load div:nth-child(2) {
    animation-delay: 0.2s;
  }
  #load div:nth-child(3) {
    animation-delay: 0.4s;
  }
  #load div:nth-child(4) {
    animation-delay: 0.6s;
  }
  #load div:nth-child(5) {
    animation-delay: 0.8s;
  }
  #load div:nth-child(6) {
    animation-delay: 1s;
  }
  #load div:nth-child(7) {
    animation-delay: 1.2s;
  }

  @keyframes move {
    0% {
      left: 0;
      opacity: 0;
    }
    35% {
      left: 41%;
      transform: rotate(0deg);
      opacity: 1;
    }
    65% {
      left: 59%;
      transform: rotate(0deg);
      opacity: 1;
    }
    100% {
      left: 100%;
      transform: rotate(-180deg);
      opacity: 0;
    }
  }
`;
