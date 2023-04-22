import CustomButton from "../utilities/CustomButton";
import { Link } from "react-router-dom";
import e404 from "../assets/images/bg/404.png";
import styled from "styled-components";

const NotFoundMain = () => {
  return (
    <Wrapper>
      <div className="e404">
        <img className="e404__img" src={e404} alt="Not Found" />
        <h3 className="e404__title">Oops!!</h3>
        <p className="e404__txt">
          The page you were looking for was eaten alive.
        </p>
        <Link reloadDocument to={`/`}>
          <CustomButton
            classNameParent="justify-content-center"
            className="e404__btn"
            textBtn={"Back to Home"}
          />
        </Link>
      </div>
    </Wrapper>
  );
};

export default NotFoundMain;

const Wrapper = styled.section`
  .e404 {
    display: block;
    position: relative;
    z-index: 5;
    height: fit-content;
    padding: 5rem 2rem;
    text-align: center;
    .e404__title {
      font-weight: 900;
      font-size: calc(var(--headingFontSize) + 1rem) !important;
    }
    .e404__txt {
      color: var(--gray);
      margin: 2rem 0 1rem 0;
      font-size: var(--headingFontSize);
      font-weight: 300;
    }
    .e404__btn {
      width: 15rem;
      border: none !important;
      font-size: var(--bodyFontSize);
      text-transform: uppercase;
      color: var(--light) !important;
      background-color: var(--orange);
    }
    .e404__btn:hover {
      color: var(--orange) !important;
      background-color: transparent;
    }
    .e404__btn::before {
      background-color: var(--light);
      width: 100%;
    }
  }
  /************ Responsive Css ************/
  @media only screen and (max-width: 992px) {
    .e404 {
      padding: 10rem 2rem 5rem;
    }
  }
  @media only screen and (max-width: 768px) {
    .e404__img,
    .e404__txt {
      width: 80%;
    }
    .e404__txt {
      margin: 2rem auto 1rem !important;
    }
  }
  @media only screen and (max-width: 576px) {
    .e404__img {
      width: 100%;
    }
  }
  @media only screen and (max-width: 450px) {
    .e404__txt {
      font-size: calc(var(--bodyFontSize) + 0.2rem) !important;
    }
    .e404__btn {
      width: 12rem !important;
    }
  }
`;
