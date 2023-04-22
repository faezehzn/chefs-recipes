import { useState } from "react";
import { useEffect } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../utilities/Loading";
import PlayVideo from "../utilities/PlayVideo";
import { GetSlug } from "../utilities/StringSlugConverter";
import { ImStarFull, ImEye } from "react-icons/im";
import Time from "../utilities/time";
import { useCustomContext } from "../context/customContext";
import Pagination from "../utilities/Pagination";
import { FaSearch } from "react-icons/fa";

const AllVideos = () => {
  const { loading, videoRecipesData } = useCustomContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const [search, setSearch] = useState("");
  const filteredDataWithSearch = videoRecipesData.filter((item) => {
    if (search === "") {
      return item;
    } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
      return item;
    }
    return null;
  });

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
      <Container fluid className="all-videos__main">
        <Row className="justify-content-center">
          <Col
            md={8}
            xl={6}
            className="mb-5 search__container align-items-center d-flex p-0"
          >
            <FaSearch className="me-2" color="var(--gray-opacity7)" />
            <input
              type="text"
              placeholder={`Search`}
              className="search__input"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col lg={10} className="justify-content-center d-flex mb-3">
            <span className="result">
              {`${filteredDataWithSearch.length} ${
                filteredDataWithSearch.length > 1 ? "Results" : "Result"
              }`}
            </span>
            <div className="line"></div>
          </Col>
          <Col lg={10}>
            {filteredDataWithSearch.length === 0 ? (
              <>
                <h3 className="nothing__card--title">Nothing Found</h3>
                <p className="nothing__card--text">
                  Try to find your favorite video recipe using another term
                </p>
              </>
            ) : (
              <div className="cards">
                {filteredDataWithSearch
                  .slice(firstItemIndex, lastItemIndex)
                  .map((video, index) => {
                    return (
                      <Card key={index} className="card">
                        <div className="card--left">
                          <Link
                            reloadDocument
                            to={`/videos/${GetSlug(
                              video.shortTitle.toLowerCase()
                            )}`}
                          >
                            <Card.Img
                              className="card--img"
                              src={video.thumbnail}
                              alt={video.shortTitle}
                            />
                          </Link>
                          <PlayVideo
                            size={10}
                            className="card--play-icon"
                            youTubeId={video.youTubeId}
                          />
                        </div>
                        <Card.Body className="card--body">
                          <Link
                            reloadDocument
                            to={`/videos/${GetSlug(
                              video.shortTitle.toLowerCase()
                            )}`}
                          >
                            <Card.Title className="card--title">
                              {video.shortTitle.length > 25
                                ? video.shortTitle.slice(0, 25) + "..."
                                : video.shortTitle}
                            </Card.Title>
                          </Link>
                          <Card.Text className="card--badges">
                            <Badge className="d-flex align-items-center card--badge">
                              <ImStarFull className="card--badge-icon" />
                              {Math.round(video.rating * 5)}.0
                            </Badge>
                            <Badge className="d-flex align-items-center card--badge">
                              <ImEye className="card--badge-icon" />
                              {video.views}
                            </Badge>
                          </Card.Text>
                          <Card.Text className="card--text">
                            Time: {Time(video.length * 1000)}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    );
                  })}
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {filteredDataWithSearch.length > itemsPerPage && (
              <Pagination
                totalItems={filteredDataWithSearch.length}
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

export default AllVideos;

const Wrapper = styled.section`
  .all-videos__main {
    background-color: var(--white);
    position: relative;
    z-index: 5;
    padding: 5rem 2rem;
    .search__container {
      border-bottom: 0.125rem solid var(--gray);
      .search__input {
      }
      .search__input::placeholder {
        color: var(--gray-opacity7);
        font-weight: 500;
      }
    }
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

    .cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      .card {
        border: none;
        flex-direction: row;
        border-radius: var(--borderRadius);
        background-color: var(--white);
        .card--left {
          width: 10vw;
          min-width: 10vw;
          border-radius: var(--borderRadius);
          overflow: auto;
          position: relative;
          .card--img {
            border-radius: var(--borderRadius);
            height: 15vh;
            min-height: 15vh;
          }
          .card--play-icon {
            top: 30%;
            left: 33%;
            font-size: 3rem;
          }
        }
        .card--body {
          padding: 0 0.5rem 0 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .card--title {
            font-size: calc(var(--bodyFontSize) + 0.1rem);
            color: var(--dark);
            font-weight: 700;
            width: 90%;
            :hover {
              background: -webkit-linear-gradient(var(--gray), var(--orange));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
          .card--badges {
            display: flex;
            margin-bottom: 0.5rem;
            .card--badge {
              background-color: var(--orange) !important;
              border-radius: var(--borderRadius);
              margin-right: 0.5rem;
              .card--badge-icon {
                margin-right: 0.5rem;
              }
            }
          }
          .card--text {
            font-size: var(--smallFontSize);
            color: var(--gray);
            font-weight: 700;
          }
        }
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
      .cards {
        .card {
          .card--left {
            width: 13vw;
          }
        }
      }
    }
    @media only screen and (max-width: 992px) {
      .cards {
        .card {
          .card--left {
            width: 15vw;
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
      .cards {
        grid-template-columns: 1fr;
        .card {
          .card--left {
            width: 25vw;
            .card--img {
              height: 18vh;
            }
            .card--play-icon {
              left: 38%;
            }
          }
        }
      }
      .line {
        width: 75%;
      }
    }
    @media only screen and (max-width: 576px) {
      .cards {
        .card {
          .card--left {
            width: 25vw;
            .card--img {
              height: 15vh;
            }
            .card--play-icon {
              left: 35%;
            }
          }
        }
      }
      .result {
        font-size: var(--bodyFontSize);
      }
    }
    @media only screen and (max-width: 450px) {
      .cards {
        gap: 2rem;
        .card {
          flex-direction: column;
          align-items: center;
          .card--left {
            width: 100%;
            .card--img {
              height: 25vh;
            }
            .card--play-icon {
              left: 42%;
              top: 40%;
            }
          }
          .card--body {
            width: 100%;
            padding-top: 0.5rem;
          }
        }
      }
      .line {
        width: 55%;
      }
    }
  }
`;
