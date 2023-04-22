import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Counter from "../utilities/Counter";
import counterBg from "../assets/images/bg/counterBg.jpg";

const AboutCounter = () => {
  return (
    <Wrapper>
      <Container fluid className="counter__container">
        <Row className="justify-content-center">
          <Col>
            <Counter />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default AboutCounter;

const Wrapper = styled.section`
  .counter__container {
    height: 50vh;
    background-image: url(${counterBg});
    background-position: 0 -22rem;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    /************ Responsive Css ************/
    @media only screen and (max-width: 1300px) {
      background-position: 0 -16rem;
    }
    @media only screen and (max-width: 1200px) {
      background-position: 0 -13rem;
    }
    @media only screen and (max-width: 992px) {
      background-position: 0 -9rem;
    }
    @media only screen and (max-width: 768px) {
      justify-content: center;
      background-position: center;
    }
  }
`;
