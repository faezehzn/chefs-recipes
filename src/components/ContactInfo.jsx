import { Container, Row, Col, Card } from "react-bootstrap";
import styled from "styled-components";
import { MdOutlineLocationOn, MdEmail, MdLocalPhone } from 'react-icons/md';


const ContactInfo = () => {
  return (
    <Wrapper>
      <Container fluid className="contact__info">
        <Row className="align-items-center justify-content-center">
          <Col md={3} className="p-0 col__info">
            <Card className="card__info">
              <h3 className="card__title"><MdEmail className="me-2 card__icon" color="var(--orange)"/>Email Address</h3>
              <p className="card__txt">chef2022@example.com</p>
              <p className="card__txt">chef.recipe@example.com</p>
            </Card>
          </Col>
          <Col md={3} className="p-0 col__info">
            <Card className="card__info">
              <h3 className="card__title"><MdOutlineLocationOn className="me-2 card__icon" color="var(--orange)"/>Location</h3>
              <p className="card__txt">3 Avenue, Eram</p>
              <p className="card__txt">Georgia(GA), 30295</p>
            </Card>
          </Col>
          <Col md={3} className="p-0 col__info">
            <Card className="card__info">
              <h3 className="card__title"><MdLocalPhone className="me-2 card__icon" color="var(--orange)"/>Phone No.</h3>
              <p className="card__txt">0912 345 67 89</p>
              <p className="card__txt">(+880) 7788 4488</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ContactInfo;

const Wrapper = styled.section`
  .contact__info {
    display: block;
    position: relative;
    z-index: 5;
    background-color: var(--white) !important;
    height: fit-content;
    padding: 5rem 2rem 0;
    .col__info {
      width: 28% !important;
    }
    .card__info {
      border: none;
      box-shadow: var(--shadow);
      padding: 2rem 1rem !important;
      margin: 1rem;
      height: 25vh;
      justify-content: center;
    }
    .card__title {
      font-size: calc(var(--headingFontSize) - 0.2rem) !important;
      font-family: var(--headingFont);
      font-weight: 900;
      color: var(--black);
      margin-bottom: 1rem;
      .card__icon {
        transform: translateY(-2px);
      }
    }
    .card__txt {
      color: var(--gray);
      margin: 0 0 0 2rem;
      font-weight: 300;
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 1200px) {
      .col__info {
        width: 30% !important;
      }
      .card__info {
        margin: 1rem 0.5rem;
      }
    }
    @media only screen and (max-width: 992px) {
      .col__info {
        width: 33% !important;
      }
      .card__info {
        margin: 1rem 0.5rem;
      }
      .card__txt {
        margin: 0;
        font-size: var(--smallFontSize);
      }
    }
    @media only screen and (max-width: 768px) {
      .row {
        flex-direction: column;
        padding-bottom: 0.5rem;
      }
      .col__info {
        width: 60% !important;
      }
      .card__info {
        margin: 0.5rem;
        align-items: center;
      }
    }
    @media only screen and (max-width: 576px) {
      .col__info {
        width: 85% !important;
      }
    }
    @media only screen and (max-width: 450px) {
      .card__title {
      font-size: calc(var(--headingFontSize) - 0.3rem) !important;
    }
    }
  }
`;
