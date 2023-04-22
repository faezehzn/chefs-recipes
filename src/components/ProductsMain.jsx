import { useState, useEffect } from "react";
import { Col, Container, Row, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../utilities/Loading";
import Pagination from "../utilities/Pagination";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import { GetSlug } from "../utilities/StringSlugConverter";
import CustomButton from "../utilities/CustomButton";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import { useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { formatCurrency } from "../utilities/formatCurrency";

const ProductsMain = () => {
  const {
    loading,
    handleGetItemQuantity,
    handleIncreaseCartQuantity,
    handleDecreaseCartQuantity,
    handleRemoveFromCart,
    dataAvailable,
    location,
    valueSorting,
    arraySorting,
    setValueSorting,
    isAuthenticated
  } = useCustomContext();
  const [buttonTxt, setButtonTxt] = useState("+ Add to cart");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const [search, setSearch] = useState("");
  const [data, setData] = useState(dataAvailable);
  const filteredDataWithSearch = data.filter((item) => {
    if (search === "") {
      return item;
    } else if (
      item.title.toLowerCase().includes(search.toLowerCase())
    ) {
      return item;
    }
    return null;
  });

  const catInputRefCallback = useCallback((element) => {
    element.firstChild.children[1].children[0].children[0].setAttribute(
      "placeholder",
      ""
    );
    element.firstChild.children[1].children[0].classList.remove(
      "border-primary"
    );
  }, []);

  const options = arraySorting.map((value) => {
    if (value === valueSorting[0]) {
      return {
        labelKey: "optionItem1",
        value: value,
        className: "sort-category__option",
        isSelected: true,
      };
    } else {
      return {
        labelKey: "optionItem1",
        value: value,
        className: "sort-category__option",
      };
    }
  });

  // related tag products data
  const productsWithRelatedTag = dataAvailable.filter((product) =>
    product.importantBadges.find(
      (item) =>
        GetSlug(item.replaceAll("_", " ")) === location.pathname.slice(11)
    )
  );

  // related category products data
  const productsWithRelatedCat = dataAvailable.filter((product) =>
    product.breadcrumbs.find(
      (item) => GetSlug(item) === location.pathname.slice(17)
    )
  );

  useEffect(() => {
    const handlePagination = () => {
      if (992 < window.innerWidth) {
        setItemsPerPage(8);
      }
      if (window.innerWidth < 992) {
        setItemsPerPage(6);
      }
      if (window.innerWidth < 770) {
        setItemsPerPage(4);
      }
    };
    window.addEventListener("resize", handlePagination);
    window.addEventListener("load", handlePagination);
  }, []);

  useEffect(() => {
    if (location.pathname.slice(6, 10) === "tags") {
      setData(productsWithRelatedTag);
    } else if (location.pathname.slice(6, 16) === "categories") {
      setData(productsWithRelatedCat);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Container fluid className="products__main">
        <Row className="justify-content-center">
          <Col
            lg={8}
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
          <Col lg={12} xl={10} className="mb-3 result-sort__container">
            <span className="result">
              {filteredDataWithSearch.length === 0
                ? "No Result"
                : `${filteredDataWithSearch.length} ${
                    filteredDataWithSearch.length > 1 ? "Results" : "Result"
                  }`}
            </span>
            <div className="sort-category" ref={catInputRefCallback}>
              <BootstrapSelect
                className="sort-category__select"
                options={options}
                menuSize={5}
                onChange={(e) => setValueSorting(e.selectedValue)}
              />
            </div>
          </Col>
          <Col xl={10} className="products__main--result">
            {filteredDataWithSearch.length === 0 ? (
              <>
                <h3 className="nothing__card--title">Nothing Found</h3>
                <p className="nothing__card--text">
                  Try to find your favorite product using another term
                </p>
              </>
            ) : (
              <div className="products__cards">
                {filteredDataWithSearch
                  .slice(firstItemIndex, lastItemIndex)
                  .map((item) => {
                    return (
                      <Card className="products__card" key={item.id}>
                        <div className="products__card--top">
                          <Link
                            reloadDocument
                            to={`/shop/${GetSlug(item.title.toLowerCase())}`}
                          >
                            {item.spoonacularScore === 0.0 ||
                            item.spoonacularScore ===
                              null ? null : item.price !== 0.0 ? (
                              <Badge className="products__card--badge">
                                {Math.ceil(item.spoonacularScore)} % off
                              </Badge>
                            ) : null}
                            <Card.Img
                              variant="top"
                              className="products__card--img"
                              src={item.image}
                              alt={item.title}
                            />
                          </Link>
                        </div>
                        <Card.Body className="products__card--body">
                          <Link
                            reloadDocument
                            to={`/shop/${GetSlug(item.title.toLowerCase())}`}
                          >
                            <Card.Title className="products__card--title">
                              <Tooltip
                                html={
                                  <p className="tooltip-style">{item.title}</p>
                                }
                                position="bottom"
                                trigger="mouseenter "
                                delay={300}
                                animation="fade"
                                size="small"
                              >
                                {item.title.length > 20
                                  ? item.title.slice(0, 20) + "..."
                                  : item.title}
                              </Tooltip>
                            </Card.Title>
                          </Link>
                          <Card.Text
                            className={
                              item.price === 0.0
                                ? "unavailable products__card--txt"
                                : "products__card--txt"
                            }
                          >
                            {item.spoonacularScore === 0.0 ||
                            item.spoonacularScore === null ? (
                              item.price === 0.0 ? (
                                "Unavailable"
                              ) : (
                                `${formatCurrency(item.price.toFixed(2))}`
                              )
                            ) : item.price === 0.0 ? (
                              "Unavailable"
                            ) : (
                              <>
                                {`${formatCurrency(item.price.toFixed(2))}`}
                                <span className="off-price">{`${formatCurrency(
                                  (
                                    item.price /
                                    (1 - item.spoonacularScore / 100)
                                  ).toFixed(2)
                                )}`}</span>
                              </>
                            )}
                          </Card.Text>
                          {isAuthenticated ? (handleGetItemQuantity(item.id) === 0 ? (
                            <CustomButton
                              classNameParent="justify-content-center m-0"
                              className="products__card--btn"
                              textBtn={buttonTxt}
                              onClick={() =>
                                handleIncreaseCartQuantity(item.id)
                              }
                            />
                          ) : (
                            <div className="d-flex flex-column align-items-center">
                              <div className="d-flex align-items-center justify-content-center">
                                <CustomButton
                                  classNameParent="justify-content-center m-0"
                                  className="products__card--btn add-reduce__btn"
                                  textBtn="-"
                                  onClick={() =>
                                    handleDecreaseCartQuantity(item.id)
                                  }
                                />
                                <div>
                                  <span className="fs-5">
                                    {handleGetItemQuantity(item.id)}
                                  </span>{" "}
                                  in cart
                                </div>
                                <CustomButton
                                  classNameParent="justify-content-center m-0"
                                  className="products__card--btn add-reduce__btn"
                                  textBtn="+"
                                  onClick={() =>
                                    handleIncreaseCartQuantity(item.id)
                                  }
                                />
                              </div>
                              <CustomButton
                                classNameParent="justify-content-center m-0"
                                className="products__card--btn remove__btn"
                                textBtn="Remove"
                                onClick={() => handleRemoveFromCart(item.id)}
                              />
                            </div>
                          )): 
                          <CustomButton
                            classNameParent="justify-content-center m-0"
                            className="products__card--btn"
                            textBtn={buttonTxt}
                            onClick={() =>
                              setButtonTxt("Must be logged in!")
                            }
                          />
                          }
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

export default ProductsMain;

const Wrapper = styled.section`
  .products__main {
    display: block;
    position: relative;
    z-index: 5;
    background-color: var(--white) !important;
    height: fit-content;
    padding: 7rem 3rem;
    .search__container {
      border-bottom: 0.125rem solid var(--gray);
      .search__input {
      }
      .search__input::placeholder {
        color: var(--gray-opacity7);
        font-weight: 500;
      }
    }
    .result-sort__container {
      display: flex;
      justify-content: space-between;
      .result {
        font-weight: 800;
        font-size: calc(var(--bodyFontSize) + 0.2rem);
        width: fit-content;
      }
      .sort-category {
        width: fit-content !important;
        padding-left: 1rem;
        border: none;
        background-color: transparent;
        .sort-category__select {
          font-family: var(--bodyFont);
          border: 0;
          color: var(--light);
          border-radius: 0;
          background-color: transparent;
          .sort-category__option {
            font-family: var(--bodyFont);
            .dropdown-item {
              text-transform: capitalize !important;
              padding-left: 1rem;
            }
          }
        }
        .btn {
          background-color: transparent;
          border: none;
          color: var(--dark);
          font-family: var(--bodyFont);
          padding: 0;
          margin: 0;
          vertical-align: baseline;
        }
        .btn:hover,
        .btn:first-child:active {
          box-shadow: none !important;
          background-color: transparent;
          color: var(--orange);
        }
      }
    }

    /********** Bootstrap Default Dropdown-select **********/
    .hk--custom--select:not([class*="col-"]):not([class*="form-control"]):not(
        .input-group-btn
      ) {
      width: 100% !important;
      text-transform: capitalize !important;
      vertical-align: baseline;
    }
    .hk--custom--select > .dropdown-toggle.bs-placeholder,
    .hk--custom--select > .dropdown-toggle.bs-placeholder:hover,
    .hk--custom--select > .dropdown-toggle.bs-placeholder:focus,
    .hk--custom--select > .dropdown-toggle.bs-placeholder:active {
      color: var(--orange) !important;
    }
    .dropdown-toggle::after,
    .dropup .dropdown-toggle::after {
      display: inline-block;
      font-family: "FontAwesome";
      content: "\f078";
      border: none;
      font-size: var(--extrasmallFontSize);
      transform: translate(0, 0.1rem);
    }
    .sort-category .dropdown-menu {
      --bs-dropdown-zindex: 1000;
      --bs-dropdown-width: 15rem;
      --bs-dropdown-padding-x: 0;
      --bs-dropdown-padding-y: 0;
      --bs-dropdown-font-size: var(--smallFontSize);
      --bs-dropdown-color: var(--dark);
      --bs-dropdown-bg: var(--light);
      --bs-dropdown-link-color: var(--dark);
      --bs-dropdown-link-hover-color: var(--light);
      --bs-dropdown-link-hover-bg: var(--orange);
      --bs-dropdown-link-active-color: var(--light);
      --bs-dropdown-link-active-bg: var(--gray);
      --bs-dropdown-link-disabled-color: var(--dark);
      --bs-dropdown-item-padding-x: 0.5rem;
      --bs-dropdown-item-padding-y: 0.5rem;
      --bs-dropdown-border-radius: var(--borderRadius) !important;
      width: var(--bs-dropdown-width);
      border: none;
      top: 2rem !important;
      left: -6.5rem;
    }
    .dropdown-menu .inner {
      max-height: fit-content !important;
      border-radius: var(--borderRadius) !important;
    }
    .filter-option-inner-inner {
      text-transform: capitalize;
      padding-right: 0.5rem;
    }

    /********** main part **********/
    .products__main--result {
      padding: 0;
      .products__cards {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        row-gap: 1.5rem;
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
          margin: 0.8rem;
          overflow: hidden;
          height: 30vh;
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
          }
          .products__card--img::after {
            content: "";
            overflow: hidden;
            width: 100%;
            z-index: 15;
          }
          .products__card--img:hover {
            transform: scale(1.1);
            opacity: 0.9;
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
          }
          .products__card--title:hover {
            color: var(--orange);
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
          }
          .products__card--btn:hover,
          .products__card--btn::before {
            color: var(--orange) !important;
            background-color: var(--white) !important;
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
    @media only screen and (max-width: 992px) {
      .products__main--result,
      .result-sort__container {
        .products__cards {
          grid-template-columns: repeat(3, 1fr) !important;
        }
      }
      .products__card--btn:hover {
        opacity: 1 !important;
        box-shadow: var(--shadow) !important;
      }
      .custom-style-pagination {
        .pagination__btn {
          opacity: 1 !important;
        }
      }
    }
    @media only screen and (max-width: 768px) {
      .products__main--result,
      .result-sort__container {
        .products__cards {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
    }
    @media only screen and (max-width: 576px) {
      .products__main--result,
      .result-sort__container {
        width: 90% !important;
        .products__cards {
          grid-template-columns: repeat(1, 1fr) !important;
          .products__card--top {
            height: 35vh !important;
          }
        }
      }
      .result {
        font-size: var(--bodyFontSize) !important;
      }
      .filter-option-inner-inner {
        font-size: var(--smallFontSize);
      }
    }
    @media only screen and (max-width: 450px) {
      .result-sort__container {
        flex-direction: column;
        .sort-category {
          padding: 0 !important;
        }
      }
      .products__main--result {
        .products__card--top {
          height: 25vh !important;
        }
        .products__card--body .products__card--title {
          width: 80% !important;
          margin: 1.5rem auto 0.5rem !important;
        }
      }
    }
  }
`;
