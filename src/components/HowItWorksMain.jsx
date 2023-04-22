import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import CustomButton from "../utilities/CustomButton";
import { Link } from "react-router-dom";

const HowItWorksMain = ({
  title,
  text1,
  text2,
  text3,
  img,
  order1,
  order2,
  textBtn,
  colorBg,
  textAlign,
  link,
}) => {
  return (
    <Wrapper>
      <Container
        fluid
        className="How-it-works__main"
        style={{ backgroundColor: colorBg }}
      >
        <Row className="align-items-center justify-content-center">
          <Col
            xs={{ order: order2 }}
            md={{ span: 6, order: order1 }}
            lg={{ span: 5, order: order1 }}
            className="col-left"
            style={{ textAlign: textAlign }}
          >
            <h3 className="How-it-works__main--title">{title}</h3>
            <p className="How-it-works__main--txt">{text1}</p>
            <p className="How-it-works__main--txt">{text2}</p>
            <p className="How-it-works__main--txt">{text3}</p>
            <Link reloadDocument to={link}>
              <CustomButton
                classNameParent={`mx-0 justify-content-${textAlign} mt-5`}
                className="How-it-works__main--btn"
                textBtn={textBtn}
              />
            </Link>
          </Col>
          <Col
            xs={{ order: order1 }}
            md={{ span: 6, order: order2 }}
            lg={{ span: 5, order: order2 }}
            className="col-right d-flex justify-content-center"
          >
            <img
              className="How-it-works__main--img"
              src={img}
              alt={title}
            />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default HowItWorksMain;

const Wrapper = styled.section`
  .How-it-works__main {
    display: block;
    position: relative;
    z-index: 5;
    height: fit-content;
    padding: 5rem 2rem;
    .How-it-works__main--title {
      font-weight: 900;
      margin-bottom: 2rem;
    }
    .How-it-works__main--txt {
      color: var(--gray);
      font-weight: 300;
      line-height: 1.5;
      font-size: var(--smallFontSize);
    }
    .How-it-works__main--btn {
      width: 35%;
      border: none !important ;
      color: var(--light) !important;
      background-color: var(--orange);
    }
    .How-it-works__main--btn:hover {
      color: var(--orange) !important;
      border-right: 0.05rem solid var(--gray) !important;
      border-left: 0.05rem solid var(--gray) !important;
      background-color: transparent;
    }
    .How-it-works__main--btn::before {
      background-color: var(--light);
      width: 100%;
    }
    .How-it-works__main--img {
      width: 90%;
    }
    /************ Responsive Css ************/
    @media only screen and (max-width: 768px) {
      .col-right {
        margin: 1rem 0;
      }
    }
    @media only screen and (max-width: 576px) {
      .How-it-works__main--title {
        font-size: var(--headingFontSize) !important;
      }
      .How-it-works__main--btn {
      width: 40%;
    }
    }
    @media only screen and (max-width: 450px) {
      .How-it-works__main--btn {
      width: 50%;
    }
    }
  }
`;
