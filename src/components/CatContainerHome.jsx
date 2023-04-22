import { Col, Container, Row, Card } from "react-bootstrap";
import items from "../assets/data/NavbarData";
import { Link } from "react-router-dom";
import TitleTxtContainer from "../utilities/TitleTxtContainer";
import styled from "styled-components";
import Fade from 'react-reveal/Fade';

const CatContainerHome = () => {
  return (
    <Wrapper>
      <Container fluid className="category__home">
        <Row>
          <Col lg={10} className="mx-auto">
            <TitleTxtContainer
              title={"Most Popular Categories"}
              text={
                "Explicabo vitae id repellendus, provident mollitia voluptate consequuntur ipsum pariatur iusto nobis."
              }
            />
            <Fade bottom cascade>
            <div className="d-md-flex justify-content-sm-around mt-5">
              {items[1].subnavItems[0].subsubnavItems.map((item) => {
                return (
                    <div key={item.id}>
                      {item.title === "More" ? null : (
                        <Card className="category__cart" key={item.id}>
                          <Card.Body className="category__cart--body">
                            <Link reloadDocument to={`/recipes/meal-types/${item.link}`}>
                              <Card.Img
                                variant="top"
                                className="category__cart--img"
                                src={item.img}
                                alt={item.title}
                              />
                              <Card.Title className="category__cart--title">
                                {item.title}
                              </Card.Title>
                            </Link>
                          </Card.Body>
                        </Card>
                      )}
                    </div>
                );
              })}
            </div>
            </Fade>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default CatContainerHome;

const Wrapper = styled.section`
  .category__home {
    display: block;
    position: relative;
    z-index: 5;
    background-color: var(--light) !important;
    height: fit-content;
    padding: 5rem 2rem;
  }
  .category__cart {
    width: 100%;
    border-radius: var(--borderRadius);
    display: flex;
    border: 0.05rem solid var(--gray-opacity7);
    overflow: hidden;
  }
  .category__cart--img {
    border-radius: var(--borderRadius);
    transition: var(--transition-fast);
    width: 100%;
    height: 50vh;
  }
  .category__cart--img::after {
    box-shadow: inset 0 -16px 32px -8px #2b2c2b;
    content: "";
    width: 100%;
    height: 100%;
  }
  .category__cart--img:hover {
    transform: scale(1.25);
    opacity: 0.8;
  }
  .category__cart--body {
    background: linear-gradient(
      0deg,
      var(--dark) 0%,
      var(--gray) 40%,
      var(--light) 90%
    );
    z-index: 15;
    width: 100%;
    height: 100%;
  }
  .category__cart--title {
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;
    text-align: center;
    font-family: var(--headingFontExtraBold);
    font-size: var(--headingFontSize);
    color: var(--light);
  }

  /************ Responsive Css ************/
  @media only screen and (max-width: 1200px) {
    .category__cart--title {
      font-size: 1.2rem;
    }
    .category__cart--img {
      height: 40vh;
    }
  }
  @media only screen and (max-width: 768px) {
    .category__cart {
      width: 60%;
      margin: 0px auto 2rem auto;
    }
    .category__cart--img {
      height: 45vh;
    }
    .category__cart--title {
      font-size: var(--headingFontSize);
    }
  }
  @media only screen and (max-width: 576px) {
    .category__cart {
      width: 75%;
    }
    .category__cart--img {
      height: 40vh;
    }
  }
  @media only screen and (max-width: 450px) {
    .category__txt {
      width: 100%;
    }
    .category__cart {
      width: 90%;
    }
    .category__cart--img {
      height: 35vh;
    }
  }
`;
