import { useState, useEffect } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../utilities/Loading";
import Pagination from "../utilities/Pagination";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import { GetSlug } from "../utilities/StringSlugConverter";

const RecentBlogsMain = () => {
  const { loading, blogsData, location } = useCustomContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const [data, setData] = useState(blogsData);
  // recent blogs data
  const recentBlogsData = blogsData
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
    .slice(0, 6);
  // related tag blogs data
  const blogsWithRelatedTag = blogsData.filter((blog) =>
    blog.tags.find((item) => item.toLowerCase() === location.pathname.slice(12))
  );

  // related category blogs data
  const blogsWithRelatedCat = blogsData.filter((blog) =>
    blog.categories.find(
      (item) => item.toLowerCase() === location.pathname.slice(18)
    )
  );

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

  useEffect(() => {
    if (location.pathname.slice(7, 19) === "recent-blogs") {
      setData(recentBlogsData);
    } else if (location.pathname.slice(7, 11) === "tags") {
      setData(blogsWithRelatedTag);
    } else if (location.pathname.slice(7, 17) === "categories") {
      setData(blogsWithRelatedCat);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Container fluid className="recent-blogs__main">
        <Row className="justify-content-center">
          <Col xl={10} className="justify-content-center d-flex mb-3">
            <span className="result">
              {`${data.length} ${data.length > 1 ? "Results" : "Result"}`}
            </span>
            <div className="line"></div>
          </Col>
          <Col xl={10} className="blogs__main">
            {blogsData.length === 0 ? (
              <>
                <h3 className="nothing__card--title">Nothing Found</h3>
                <p className="nothing__card--text">
                  Try to find your favorite blog using another term
                </p>
              </>
            ) : (
              <div className="blogs__cards">
                {data.slice(firstItemIndex, lastItemIndex).map((item) => {
                  return (
                    <Card className="blogs__card" key={item.id}>
                      <div className="blogs__card--top">
                        <Link
                          reloadDocument
                          to={`/blogs/${GetSlug(item.title.toLowerCase())}`}
                        >
                          <Card.Img
                            variant="top"
                            className="blogs__card--img"
                            src={item.bgImg}
                            alt={item.title}
                          />
                        </Link>
                      </div>
                      <Card.Body className="blogs__card--body">
                        <Link
                          reloadDocument
                          to={`/blogs/${GetSlug(item.title.toLowerCase())}`}
                        >
                          <Card.Title className="blogs__card--title">
                            {item.title.length > 35
                              ? item.title.slice(0, 35) + "..."
                              : item.title}
                          </Card.Title>
                        </Link>
                        <Card.Text className="blogs__card--txt">
                          {item.summary.length > 120
                            ? item.summary.slice(0, 120) + " [...]"
                            : item.summary}
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
            {data.length > itemsPerPage && (
              <Pagination
                totalItems={data.length}
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

export default RecentBlogsMain;

const Wrapper = styled.section`
  .recent-blogs__main {
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
    .blogs__main {
      padding: 0;
      .blogs__cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 2rem;
      }
      .blogs__card {
        border: none;
        box-shadow: var(--shadow);
        border-radius: var(--borderRadius);
        margin: 0 1rem;
        background-color: var(--white);
        overflow: hidden;
        .blogs__card--top {
          overflow: hidden;
          .blogs__card--img {
            overflow: hidden;
            height: 30vh;
            z-index: 7;
            transition: var(--transition-fast);
          }
          .blogs__card--img::after {
            content: "";
            overflow: hidden;
            width: 100%;
            z-index: 15;
          }
          .blogs__card--img:hover {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
        .blogs__card--body {
          padding: 0.5rem 0;
          .blogs__card--title {
            width: 100%;
            text-align: start;
            font-family: var(--bodyFont);
            font-weight: 800;
            font-size: calc(var(--bodyFontSize) + 0.1rem);
            color: var(--dark);
            transition: var(--transition-fast);
            margin: 1.5rem 1.5rem 0.3rem;
          }
          .blogs__card--title:hover {
            color: var(--orange);
          }
          .blogs__card--txt {
            font-size: var(--smallFontSize);
            color: var(--gray);
            display: inline-flex;
            margin: 0.3rem 1.5rem 1.5rem;
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
      padding: 7rem 3rem !important;
    }
    @media only screen and (max-width: 992px) {
      .blogs__main {
        width: 90%;
        .blogs__cards {
          grid-template-columns: repeat(2, 1fr) !important;
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
      .blogs__main {
        width: 85%;
        .blogs__cards {
          grid-template-columns: repeat(1, 1fr) !important;
          .blogs__card--img {
            height: 35vh !important;
          }
        }
      }
      .line {
        width: 75%;
      }
    }
    @media only screen and (max-width: 576px) {
      .result {
        font-size: var(--bodyFontSize);
      }
    }
    @media only screen and (max-width: 450px) {
      .blogs__main {
        width: 95% !important;
        .blogs__cards {
          .blogs__card--img {
            height: 25vh !important;
          }
          .blogs__card--body .blogs__card--title {
            width: 80% !important;
          }
        }
      }
      .line {
        width: 55%;
      }
    }
  }
`;
