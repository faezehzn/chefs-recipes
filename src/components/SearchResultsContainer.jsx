import { useState, useEffect } from "react";
import { Col, Container, Row, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../utilities/Loading";
import Pagination from "../utilities/Pagination";
import styled from "styled-components";
import { GiCook } from "react-icons/gi";
import { useCustomContext } from "../context/customContext";
import { GetSlug } from "../utilities/StringSlugConverter";
import Fade from "react-reveal/Fade";

// const url = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${process.env.REACT_APP_API_KEY}`;

const SearchResultsContainer = () => {
  const { loading, randomData } = useCustomContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  useEffect(() => {
    const handlePagination = () => {
      if (992 < window.innerWidth) {
        setItemsPerPage(6);
      }
      if (window.innerWidth < 992) {
        setItemsPerPage(4);
      }
      if (window.innerWidth < 770) {
        setItemsPerPage(2);
      }
    };
    window.addEventListener("resize", handlePagination);
    window.addEventListener("load", handlePagination);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Container fluid className="recipes__searching-container">
        <Row>
          <Col className="justify-content-center d-flex mb-3">
            <span className="result">
              {randomData.length} {randomData.length > 1 ? "Results" : "Result"}
            </span>
            <div className="line"></div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={10} className="searching__main">
            {randomData.length < 1 ? (
              <>
                <h3 className="nothing__card--title">Nothing Found</h3>
                <p className="nothing__card--text">
                  Try to find your favorite recipe using another term
                </p>
              </>
            ) : (
              <Fade bottom cascade>
                <div className="searching__cards">
                  {randomData
                    .slice(firstItemIndex, lastItemIndex)
                    .map((item) => {
                      return (
                        <Card className="searching__card" key={item.id}>
                          <div className="searching__card--top">
                            <Badge pill className="searching__card--badge">
                              {item.healthScore}%
                            </Badge>
                            <Link
                              reloadDocument
                              to={`/recipes/${GetSlug(
                                item.title.toLowerCase()
                              )}`}
                            >
                              <Card.Img
                                variant="top"
                                className="searching__card--img"
                                src={item.image}
                                alt={item.title}
                              />
                            </Link>
                          </div>
                          <Card.Body className="searching__card--body">
                            <Link
                              reloadDocument
                              to={`/recipes/${GetSlug(
                                item.title.toLowerCase()
                              )}`}
                            >
                              <Card.Title className="searching__card--title">
                                {item.title.length > 35
                                  ? item.title.slice(0, 35) + "..."
                                  : item.title}
                              </Card.Title>
                            </Link>
                            <Link
                              reloadDocument
                              to={`/authors/${GetSlug(
                                item.sourceName.toLowerCase()
                              )}`}
                            >
                              <GiCook color="var(--orange)" />
                              <Card.Text className="searching__card--text">
                                {item.sourceName}
                              </Card.Text>
                            </Link>
                          </Card.Body>
                        </Card>
                      );
                    })}
                </div>
              </Fade>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {randomData.length > itemsPerPage && (
              <Pagination
                totalItems={randomData.length}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                className="custom-style-pagination"
              />
            )}
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default SearchResultsContainer;

const Wrapper = styled.section`
  .recipes__searching-container {
    display: block;
    position: relative;
    z-index: 5;
    background-color: var(--white) !important;
    height: fit-content;
    padding: 7rem 2rem;
    .result {
      font-weight: 800;
      font-size: calc(var(--bodyFontSize) + 0.2rem);
      width: fit-content;
    }
    .line {
      display: flex;
      width: 85%;
      height: 0.125rem;
      background-color: var(--black);
      align-items: center;
      justify-content: center;
      margin: auto 0 auto 1rem;
    }

    /********** main part **********/
    .searching__main {
      padding: 0;
      .searching__cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 2rem;
      }
      .searching__card {
        border: none;
        margin: 0 1rem;
        background-color: var(--white);
        overflow: hidden;
        .searching__card--top {
          overflow: hidden;
          border-radius: var(--borderRadius);
        }
        .searching__card--badge {
          position: absolute;
          top: 5%;
          z-index: 20;
          right: 5%;
          padding: 0.4rem 0.8rem;
          font-size: var(--smallFontSize);
          background-color: var(--orange) !important;
        }
        .searching__card--img {
          border-radius: var(--borderRadius);
          overflow: hidden;
          height: 35vh;
          z-index: 7;
          transition: var(--transition-fast);
        }
        .searching__card--img::after {
          content: "";
          overflow: hidden;
          width: 100%;
          z-index: 15;
        }
        .searching__card--img:hover {
          transform: scale(1.1);
          opacity: 0.9;
        }
        .searching__card--body {
          padding: 0.5rem 0;
        }
        .searching__card--title {
          width: 100%;
          text-align: start;
          font-family: var(--bodyFont);
          font-weight: 800;
          font-size: calc(var(--bodyFontSize) + 0.1rem);
          color: var(--dark);
          transition: var(--transition-fast);
        }
        .searching__card--title:hover {
          color: var(--orange);
        }
        .searching__card--text {
          font-size: var(--smallFontSize);
          color: var(--gray);
          display: inline-flex;
          margin-left: 0.5rem;
        }
      }
      .nothing__card--title {
        font-weight: 800;
        text-align: center;
      }
      .nothing__card--text {
        padding: 1rem 3rem;
        text-align: center;
      }
    }

    /********** pagination part **********/
    .custom-style-pagination {
      .pagination__btn {
        color: var(--orange) !important;
      }
      .pagination__btn:disabled {
        background-color: transparent;
        color: var(--gray) !important;
      }
      .active,
      .pagination__btn:hover {
        color: var(--white) !important;
      }
      .pagination__btn:disabled:hover {
        color: var(--gray) !important;
      }
      .pagination__btn:disabled::before {
        background-color: transparent !important;
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 1200px) {
      .searching__card--img {
        height: 25vh;
      }
    }
    @media only screen and (max-width: 992px) {
      .searching__main {
        width: 90%;
        .searching__cards {
          grid-template-columns: repeat(2, 1fr) !important;
          .searching__card--img {
            height: 35vh;
          }
        }
      }
      .line {
        width: 80%;
      }
      .custom-style-pagination {
        .pagination__btn {
          opacity: 1 !important;
        }
      }
    }
    @media only screen and (max-width: 768px) {
      .searching__main {
        width: 80%;
        .searching__cards {
          grid-template-columns: repeat(1, 1fr);
          .searching__card--img {
            height: 30vh !important;
          }
        }
      }
      .line {
        width: 75%;
      }
    }
    @media only screen and (max-width: 576px) {
      .searching__main {
        .searching__cards {
          grid-template-columns: 1fr !important;
          .searching__card--img {
            height: 35vh;
          }
        }
      }
      .result {
        font-size: var(--bodyFontSize);
      }
    }
    @media only screen and (max-width: 450px) {
      .searching__main {
        width: 90% !important;
        .searching__card--img {
          height: 25vh;
        }
      }
      .line {
        width: 55%;
      }
    }
  }
`;
