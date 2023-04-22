import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const SocialMediaBtn = ({ className, textBtn, icon }) => {
  return (
    <Wrapper>
      <Link reloadDocument to={"/"}>
        <Button className={className + " social-media__box"}>
          <span className="social-media__icon">{icon}</span>
          <span className="social-media__text">{textBtn}</span>
        </Button>
      </Link>
    </Wrapper>
  );
};

export default SocialMediaBtn;

const Wrapper = styled.section`
  .social-media__box {
    font-size: var(--bodyFontSize);
    width: 100%;
    border: none;
    height: 4rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: var(--light);
    border-radius: var(--borderRadius);
    font-family: var(--bodyFont);
    line-height: 1.2;
    position: relative;
    transition: var(--transition-fast);
    z-index: 2;
    overflow: hidden;
    margin-bottom: 2rem;
  }
  .social-media__box::before {
    content: "";
    width: 105%;
    transform: translateY(-5rem);
    height: 5rem;
    /* background-color: var(--light); */
    display: block;
    position: absolute;
    top: 0;
    padding: 0;
    margin: 0;
    transition: var(--transition-fast);
    z-index: -1 !important;
  }
  .social-media__box:hover,
  .social-media__box:hover .social-media__icon {
    color: var(--light) !important;
  }
  .social-media__box:hover::before {
    transform: translateY(0);
  }
  .social-media__icon {
    position: absolute;
    z-index: 15;
    top: 35%;
    transition: var(--transition-fast);
    left: 10%;
  }
  .social-media__text {
    position: absolute;
    z-index: 15;
    top: 35%;
    left: 20%;
  }

  /************ Responsive Css ************/
  @media only screen and (max-width: 1200px) {
    .social-media__icon {
      display: none;
    }
    .social-media__text {
      position: relative;
      top: 0;
      left: 0;
    }
  }
  @media only screen and (max-width: 992px) {
    .social-media__box {
      margin: 0 1rem 0 0;
      width: 4rem;
      height: 4rem;
      display: flex;
      justify-content: space-evenly;
      background-color: transparent;
      border-radius: 50%;
    }
    .social-media__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      left: auto;
      font-size: 2rem;
      top: auto;
    }
    .social-media__text {
      display: none;
    }
  }
  @media only screen and (max-width: 768px) {
    .social-media__box {
      margin: 0 0.5rem 0 0;
      width: 3rem;
      height: 3rem;
    }
    .social-media__icon {
      font-size: 1.5rem;
    }
  }
`;
