import { useState } from "react";
import { useEffect } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import { GetSlug } from "../utilities/StringSlugConverter";
import Loading from "../utilities/Loading";
import Pagination from "../utilities/Pagination";
import { GiCook } from "react-icons/gi";
import CustomButton from "../utilities/CustomButton";
import { formatCurrency } from "../utilities/formatCurrency";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";

const SearchedTotalMain = () => {
  const {
    allData,
    loading,
    handleDecreaseCartQuantity,
    handleGetItemQuantity,
    handleIncreaseCartQuantity,
    handleRemoveFromCart,
  } = useCustomContext();
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
      <Container fluid className="search-total__main">
        <Row className="justify-content-center">
          <Col xl={10} className="justify-content-center d-flex mb-3">
            <span className="result">
              {`${allData.length} ${allData.length > 1 ? "Results" : "Result"}`}
            </span>
            <div className="line"></div>
          </Col>
          {allData.length > 0 ? (
            <Col xl={10} className="cards">
              {allData.slice(firstItemIndex, lastItemIndex).map((data) => {
                return data.dataType === "blog" ? (
                  <Card className="blogs__card" key={data.id}>
                    <div className="blogs__card--top">
                      <Link
                        reloadDocument
                        to={`/blogs/${GetSlug(data.title.toLowerCase())}`}
                      >
                        <Card.Img
                          variant="top"
                          className="blogs__card--img"
                          src={data.bgImg}
                          alt={data.title}
                        />
                      </Link>
                    </div>
                    <Card.Body className="blogs__card--body">
                      <Link
                        reloadDocument
                        to={`/blogs/${GetSlug(data.title.toLowerCase())}`}
                      >
                        <Card.Title className="blogs__card--title">
                          {data.title.length > 35
                            ? data.title.slice(0, 35) + "..."
                            : data.title}
                        </Card.Title>
                      </Link>
                      <Card.Text className="blogs__card--txt">
                        {data.summary.length > 120
                          ? data.summary.slice(0, 120) + " [...]"
                          : data.summary}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ) : data.dataType === "recipe" ? (
                  <Card className="recipes__card" key={data.id}>
                    <div className="recipes__card--top">
                      <Badge pill className="recipes__card--badge">
                        {data.healthScore}%
                      </Badge>
                      <Link
                        reloadDocument
                        to={`/recipes/${GetSlug(data.title.toLowerCase())}`}
                      >
                        <Card.Img
                          variant="top"
                          className="recipes__card--img"
                          src={data.image}
                          alt={data.title}
                        />
                      </Link>
                    </div>
                    <Card.Body className="recipes__card--body">
                      <Link
                        reloadDocument
                        to={`/recipes/${GetSlug(data.title.toLowerCase())}`}
                      >
                        <Card.Title className="recipes__card--title">
                          {data.title.length > 35
                            ? data.title.slice(0, 35) + "..."
                            : data.title}
                        </Card.Title>
                      </Link>
                      <Link
                        reloadDocument
                        to={`/authors/${GetSlug(
                          data.sourceName.toLowerCase()
                        )}`}
                      >
                        <GiCook color="var(--orange)" />
                        <Card.Text className="recipes__card--text">
                          {data.sourceName}
                        </Card.Text>
                      </Link>
                    </Card.Body>
                  </Card>
                ) : (
                  <Card className="products__card" key={data.id}>
                    <div className="products__card--top">
                      <Link
                        reloadDocument
                        to={`/shop/${GetSlug(data.title.toLowerCase())}`}
                      >
                        {data.spoonacularScore === 0.0 ||
                        data.spoonacularScore === null ? null : data.price !==
                          0.0 ? (
                          <Badge className="products__card--badge">
                            {Math.ceil(data.spoonacularScore)} % off
                          </Badge>
                        ) : null}
                        <Card.Img
                          variant="top"
                          className="products__card--img"
                          src={data.image}
                          alt={data.title}
                        />
                      </Link>
                    </div>
                    <Card.Body className="products__card--body">
                      <Link
                        reloadDocument
                        to={`/shop/${GetSlug(data.title.toLowerCase())}`}
                      >
                        <Card.Title className="products__card--title">
                          <Tooltip
                            html={<p className="tooltip-style">{data.title}</p>}
                            position="bottom"
                            trigger="mouseenter "
                            delay={300}
                            animation="fade"
                            size="small"
                          >
                            {data.title.length > 20
                              ? data.title.slice(0, 20) + "..."
                              : data.title}
                          </Tooltip>
                        </Card.Title>
                      </Link>
                      <Card.Text
                        className={
                          data.price === 0.0
                            ? "unavailable products__card--txt"
                            : "products__card--txt"
                        }
                      >
                        {data.spoonacularScore === 0.0 ||
                        data.spoonacularScore === null ? (
                          data.price === 0.0 ? (
                            "Unavailable"
                          ) : (
                            `${formatCurrency(data.price.toFixed(2))}`
                          )
                        ) : data.price === 0.0 ? (
                          "Unavailable"
                        ) : (
                          <>
                            {`${formatCurrency(data.price.toFixed(2))}`}
                            <span className="off-price">{`${formatCurrency(
                              (
                                data.price /
                                (1 - data.spoonacularScore / 100)
                              ).toFixed(2)
                            )}`}</span>
                          </>
                        )}
                      </Card.Text>
                      {handleGetItemQuantity(data.id) === 0 ? (
                        <CustomButton
                          classNameParent="justify-content-center m-0"
                          className="products__card--btn"
                          textBtn="+ Add to Cart"
                          onClick={() => handleIncreaseCartQuantity(data.id)}
                        />
                      ) : (
                        <div className="d-flex flex-column align-items-center">
                          <div className="d-flex align-items-center justify-content-center">
                            <CustomButton
                              classNameParent="justify-content-center m-0"
                              className="products__card--btn add-reduce__btn"
                              textBtn="-"
                              onClick={() =>
                                handleDecreaseCartQuantity(data.id)
                              }
                            />
                            <div>
                              <span className="fs-5">
                                {handleGetItemQuantity(data.id)}
                              </span>{" "}
                              in cart
                            </div>
                            <CustomButton
                              classNameParent="justify-content-center m-0"
                              className="products__card--btn add-reduce__btn"
                              textBtn="+"
                              onClick={() =>
                                handleIncreaseCartQuantity(data.id)
                              }
                            />
                          </div>
                          <CustomButton
                            classNameParent="justify-content-center m-0"
                            className="products__card--btn remove__btn"
                            textBtn="Remove"
                            onClick={() => handleRemoveFromCart(data.id)}
                          />
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>
          ) : (
            <Col xl={10}>
              <h3 style={{ fontWeight: "900", textAlign: "center" }}>
                Nothing Found
              </h3>
              <p style={{ textAlign: "center", padding: "1rem 2rem" }}>
                Try to find your favorite things using another term
              </p>
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            {allData.length > itemsPerPage && (
              <Pagination
                totalItems={allData.length}
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

export default SearchedTotalMain;

const Wrapper = styled.section`
  .search-total__main {
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
    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      row-gap: 2rem;
      justify-items: center;
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
            ::after {
              content: "";
              overflow: hidden;
              width: 100%;
              z-index: 15;
            }
            :hover {
              transform: scale(1.1);
              opacity: 0.9;
            }
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
            :hover {
              color: var(--orange);
            }
          }
          .blogs__card--txt {
            font-size: var(--smallFontSize);
            color: var(--gray);
            display: inline-flex;
            margin: 0.3rem 1.5rem 1.5rem;
          }
        }
      }
      .recipes__card {
        border: none;
        margin: 0 1rem;
        background-color: var(--white);
        overflow: hidden;
        .recipes__card--top {
          overflow: hidden;
          border-radius: var(--borderRadius);
        }
        .recipes__card--badge {
          position: absolute;
          top: 5%;
          z-index: 20;
          right: 5%;
          padding: 0.4rem 0.8rem;
          font-size: var(--smallFontSize);
          background-color: var(--orange) !important;
        }
        .recipes__card--img {
          border-radius: var(--borderRadius);
          overflow: hidden;
          height: 35vh;
          z-index: 7;
          transition: var(--transition-fast);
          ::after {
            content: "";
            overflow: hidden;
            width: 100%;
            z-index: 15;
          }
          :hover {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
        .recipes__card--body {
          padding: 0.5rem 0;
        }
        .recipes__card--title {
          width: 100%;
          text-align: start;
          font-family: var(--bodyFont);
          font-weight: 800;
          font-size: calc(var(--bodyFontSize) + 0.1rem);
          color: var(--dark);
          transition: var(--transition-fast);
          :hover {
            color: var(--orange);
          }
        }
        .recipes__card--text {
          font-size: var(--smallFontSize);
          color: var(--gray);
          display: inline-flex;
          margin-left: 0.5rem;
        }
      }
      .products__card {
        border: none;
        margin: 0 0.2rem;
        background-color: var(--white);
        overflow: hidden;
        .products__card--top {
          /* background: linear-gradient(white, white) padding-box, */
          /* linear-gradient(45deg, var(--gray), var(--orange)) border-box; */
          /* border: 0.05rem solid transparent; */
          margin: 0.5rem 0.8rem;
          overflow: hidden;
          height: 33vh;
          background-color: transparent;
          box-shadow: var(--shadow);
          border-radius: var(--borderRadius);
          position: relative;
          .products__card--badge {
            position: absolute;
            top: 5%;
            left: 3%;
            background-color: var(--orange) !important;
            border-radius: var(--borderRadius);
            z-index: 1;
          }
          .products__card--img {
            overflow: hidden;
            height: 100%;
            z-index: 7;
            border-radius: var(--borderRadius) !important;
            transition: var(--transition-fast);
            ::after {
              content: "";
              overflow: hidden;
              width: 100%;
              z-index: 15;
            }
            :hover {
              transform: scale(1.1);
              opacity: 0.9;
            }
          }
        }
        .products__card--body {
          padding: 0.5rem 0;
          text-align: center;
          .products__card--title {
            width: 100%;
            font-family: var(--bodyFont);
            font-weight: 800;
            font-size: calc(var(--bodyFontSize) + 0.2rem);
            color: var(--dark);
            transition: var(--transition-fast);
            margin: 1rem 0 0.5rem;
            :hover {
              color: var(--orange);
            }
          }
          .products__card--txt {
            font-size: calc(var(--bodyFontSize) + 0.2rem);
            color: var(--orange);
            display: inline-flex;
            margin: 0 !important;
            font-weight: 700;
            .off-price {
              text-decoration: var(--gray-opacity7) line-through 0.1rem;
              margin-left: 0.5rem;
              color: var(--gray-opacity7);
              font-weight: 400;
              display: flex;
              align-items: flex-end;
              font-size: var(--smallFontSize);
            }
          }
          .unavailable {
            color: var(--gray-opacity7);
          }
          .products__card--btn {
            background-color: var(--orange) !important;
            color: var(--light) !important;
            border: none !important;
            height: 2.3rem;
            width: 8rem;
            font-size: var(--extrasmallFontSize) !important;
            font-weight: 500;
            text-transform: uppercase;
            margin: 0.2rem;
            box-shadow: var(--shadow);
            :hover,
            ::before {
              color: var(--orange) !important;
              background-color: var(--white) !important;
            }
          }
          .add-reduce__btn {
            font-size: var(--bodyFontSize) !important;
            width: 2rem !important;
            height: 2rem !important;
            padding: 0 !important;
          }
          .remove__btn {
            background-color: var(--red-dark) !important;
            :hover {
              color: var(--red-dark) !important;
            }
          }
        }
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
      .cards {
        .recipes__card,
        .blogs__card,
        .products__card {
          .recipes__card--img {
            height: 30vh;
          }
          .blogs__card--top {
            .blogs__card--img {
              height: 30vh;
            }
          }
          .blogs__card--body .blogs__card--title {
            width: 80% !important;
          }
          .products__card--top {
            height: 28vh;
          }
        }
      }
    }
    @media only screen and (max-width: 992px) {
      .cards {
        grid-template-columns: repeat(2, 1fr) !important;
        .recipes__card,
        .blogs__card,
        .products__card {
          .recipes__card--img {
            height: 35vh;
          }
          .blogs__card--top {
            .blogs__card--img {
              height: 35vh;
            }
          }
          .products__card--top {
            height: 33vh;
          }
          .products__card--btn:hover {
            opacity: 1 !important;
            box-shadow: var(--shadow) !important;
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
        grid-template-columns: repeat(1, 1fr) !important;
        .recipes__card,
        .blogs__card,
        .products__card {
          width: 85%;
          .recipes__card--img {
            height: 40vh;
          }
          .blogs__card--top {
            .blogs__card--img {
              height: 40vh;
            }
          }
          .products__card--top {
            height: 40vh;
          }
          .products__card--btn:hover {
            opacity: 1 !important;
            box-shadow: var(--shadow) !important;
          }
        }
      }
      .line {
        width: 75%;
      }
    }
    @media only screen and (max-width: 576px) {
      .cards {
        .recipes__card,
        .blogs__card,
        .products__card {
          width: 100%;
          .recipes__card--img {
            height: 35vh;
          }
          .blogs__card--top {
            .blogs__card--img {
              height: 35vh;
            }
          }
          .products__card--top {
            height: 33vh;
          }
          .products__card--btn:hover {
            opacity: 1 !important;
            box-shadow: var(--shadow) !important;
          }
        }
      }
      .result {
        font-size: var(--bodyFontSize);
      }
      .line {
        width: 65%;
      }
    }
    @media only screen and (max-width: 450px) {
      .cards {
        .recipes__card,
        .blogs__card,
        .products__card {
          .recipes__card--img {
            height: 25vh;
          }
          .blogs__card--top {
            .blogs__card--img {
              height: 25vh;
            }
          }
          .products__card--top {
            height: 23vh;
          }
          .products__card--body .products__card--title {
            width: 80% !important;
            margin: 1.5rem auto 0.5rem !important;
          }
          .products__card--btn:hover {
            opacity: 1 !important;
            box-shadow: var(--shadow) !important;
          }
        }
      }
      .line {
        width: 55%;
      }
    }
  }
`;
