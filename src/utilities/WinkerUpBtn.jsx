import { FaArrowCircleUp } from "react-icons/fa";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { useEffect, useState } from "react";

const WinkerUpBtn = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 500) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", onScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Wrapper>
      {scroll && (
        <Button onClick={goToTop} className="up-btn">
          <FaArrowCircleUp color="var(--orange)" />
        </Button>
      )}
    </Wrapper>
  );
};

export default WinkerUpBtn;

const Wrapper = styled.section`
  .up-btn,
  .up-btn:active {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    border: none;
    background-color: transparent;
    font-size: 2rem;
    z-index: 10;
    animation: winker 0.5s infinite alternate linear;
  }
  .up-btn:hover {
    box-shadow: none;
  }
  @keyframes winker {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }

  /************ Responsive Css ************/
  @media only screen and (max-width: 450px) {
    .up-btn,
    .up-btn:active {
      bottom: 0.5rem;
      right: 0.5rem;
      font-size: 2rem;
    }
  }
`;
