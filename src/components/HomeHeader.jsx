import { Col } from "react-bootstrap";
import CategorySearchBox from "../utilities/CategorySearchBox";
import styled from "styled-components";
import homeHeaderBg from "../assets/images/bg/pizza1.jpg";
import Fade from 'react-reveal/Fade';

const HomeHeader = () => {
  return (
    <Wrapper>
      <header className="header">
        <div className="header__img"></div>
        <div className="header__box">
          <Col md={8} className="ms-auto">
            <h3 className="header__title">
              It is even better than an expensive cookery book
            </h3>
            <p className="header__txt">Make your favorite food yourself.</p>
            <Fade bottom>
              <CategorySearchBox />
            </Fade>
          </Col>
        </div>
      </header>
    </Wrapper>
  );
};

export default HomeHeader;

const Wrapper = styled.section`
  .header {
    height: 100vh;
    width: 100%;
    display: inline-block;
    position: relative;
  }
  .header__img {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: -1;
    background-image: url(${homeHeaderBg});
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .header__box {
    width: 100%;
    position: absolute;
    top: 35%;
    color: var(--light);
    text-align: center;
  }
  .header__title {
    font-weight: 800;
    width: 60%;
    margin: 1rem auto;
    font-family: var(--headingFont);
  }
  .header__txt {
    font-family: var(--bodyFont);
  }
  .loading-container {
    background: transparent !important;
    height: 60vh !important;
  }

  /************ Responsive Css ************/
  @media only screen and (max-width: 1200px) {
    .header__title {
      font-weight: 800;
      width: 80%;
      margin: 1rem auto;
    }
  }
  @media only screen and (max-width: 992px) {
    .header__box {
      top: 20%;
    }
  }
  @media only screen and (max-width: 576px) {
    .header__title {
      width: 90%;
    }
  }
`;
