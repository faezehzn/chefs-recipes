import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import bg from "../assets/images/bg/paprika2.jpg";
import CategorySearchBox from "../utilities/CategorySearchBox";
import TitleTxtContainer from "../utilities/TitleTxtContainer";
import Tada from "react-reveal/Tada";

const SearchContainer = () => {
  return (
    <Wrapper>
      <Container fluid className="recipes__search-container">
        <Row className="justify-content-center">
          <Col>
            <TitleTxtContainer
              className="search-title"
              title={"Search for Recipes"}
              text={"Explicabo vitae id repellendus, provident mollitia."}
            />
            <Tada>
              <CategorySearchBox />
            </Tada>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default SearchContainer;

const Wrapper = styled.section`
  .recipes__search-container {
    height: 50vh;
    background-image: url(${bg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    display: block;
    z-index: 5;
    margin-bottom: 5rem;
    .search-title {
      position: absolute;
      right: 0;
      top: 18vh;
      width: 50vw;
      .title__container {
        color: var(--light);
        font-size: var(--headingFontSize) !important;
      }
      .text__container {
        color: var(--light);
        opacity: 0.6;
        font-size: var(--smallFontSize);
      }
    }
    .loading-container {
      background: transparent !important;
      height: 20vh !important;
      position: absolute;
      left: 0;
      transform: translateY(12rem);
      padding: 0;
    }
    .search-form {
      text-align: end;
      position: absolute;
      transform: translateY(12rem);
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 1200px) {
      .search-title {
        right: 2vw;
      }
    }
    @media only screen and (max-width: 992px) {
      .search-title {
        top: 5vh;
        width: 70vw;
      }
      .search-form,
      .loading-container {
        transform: translateY(4rem);
      }
      .search-form {
        flex-direction: column;
        left: 0;
      }
      .search-form--input,
      .search-form--category,
      .search-form--btn {
        margin: 1rem 0 1rem auto !important;
      }
      .search-form--btn {
        text-align: center;
      }
    }
    @media only screen and (max-width: 576px) {
      .search-title {
        width: 90vw;
      }
      .search-form--input,
      .search-form--category,
      .search-form--btn {
        margin: 1rem auto;
      }
    }
  }
`;
