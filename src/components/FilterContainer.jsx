import { Col, Container, Row, Card, Badge, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiCook } from "react-icons/gi";
import { GetString, GetSlug } from "../utilities/StringSlugConverter";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Loading from "../utilities/Loading";
import Pagination from "../utilities/Pagination";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import Fade from 'react-reveal/Fade';

// const url = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${process.env.REACT_APP_API_KEY}`;

const FilterRecipes = ({ recipe__type, submenu__type }) => {
  const { loading, setLoading, allCategories, randomData } = useCustomContext();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [toggler, setToggler] = useState({ open: false, id: "filter--1" });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const recipeType = GetString(recipe__type);
  const submenuType = GetString(submenu__type);

  useEffect(() => {
    // async function fetchData() {
    //   setLoading(true);

    //   return fetch(url)
    //     .then((res) => {
    //       if (res.status === 200) {
    //         // console.log(res);
    //         return res.json();
    //       }
    //     })
    //     .then((data) => {
    //       setrandomData(data.recipes)
    //       // setCategories(allCategories)
    //       console.log(randomData);
    //       setLoading(false)
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    //   }
    // fetchData();

    setMenuItems(randomData);
  }, [randomData]);

  useEffect(() => {
    setCategories(allCategories);

    function handleEmptyCatItems() {
      const fullCatItems = categories.filter(
        (item) => item.items.slice(1).length !== 0
      );
      setCategories(fullCatItems);
    }
    window.addEventListener("load", handleEmptyCatItems);
  }, [allCategories, categories]);

  useEffect(() => {
    if (recipeType === "Meal Types".toLowerCase()) {
      if (
        submenuType === "More".toLowerCase() ||
        submenuType === "All Meals".toLowerCase()
      ) {
        const currentData = randomData.filter(
          (item) => item.dishTypes.length !== 0
        );
        setMenuItems(currentData);
      } else {
        const currentData = randomData.filter((item) =>
          item.dishTypes.find((i) => i === submenuType.toLowerCase())
        );
        setMenuItems(currentData);
      }
    } else if (recipeType === "Cuisine Types".toLowerCase()) {
      if (
        submenuType === "More".toLowerCase() ||
        submenuType === "All Cuisines".toLowerCase()
      ) {
        const currentData = randomData.filter(
          (item) => item.cuisines.length !== 0
        );
        setMenuItems(currentData);
      } else {
        const currentData = randomData.filter((item) =>
          item.cuisines.find(
            (i) => i.toLowerCase() === submenuType.toLowerCase()
          )
        );
        setMenuItems(currentData);
      }
    } else if (recipeType === "Diet Types".toLowerCase()) {
      if (
        submenuType === "More".toLowerCase() ||
        submenuType === "All Diets".toLowerCase()
      ) {
        const currentData = randomData.filter(
          (item) => item.diets.length !== 0
        );
        setMenuItems(currentData);
      } else {
        const currentData = randomData.filter((item) =>
          item.diets.find((i) => i === submenuType.toLowerCase())
        );
        setMenuItems(currentData);
      }
    } else if (recipeType === "Ingredients".toLowerCase()) {
      if (submenuType === "All Ingredients".toLowerCase()) {
        setMenuItems(randomData);
      } else {
        const currentData = randomData.filter((item) =>
          item.extendedIngredients
            .map((i) => i.name)
            .find((i) => i === submenuType.toLowerCase())
        );
        setMenuItems(currentData);
      }
    }
  }, [recipeType, submenuType, randomData]);

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

  const handleFilter = (e, type) => {
    setLoading(true);
    let newData = [];
    const typeParent =
      e.target.parentElement.parentElement.firstChild.innerHTML;

    if (type.toLowerCase() === "all meals") {
      newData = randomData.filter((item) => item.dishTypes.length !== 0);
      setMenuItems(newData);
      return;
    }
    if (type.toLowerCase() === "all cuisines") {
      newData = randomData.filter((item) => item.cuisines.length !== 0);
      setMenuItems(newData);
      return;
    }
    if (type.toLowerCase() === "all diets") {
      newData = randomData.filter((item) => item.diets.length !== 0);
      setMenuItems(newData);
      return;
    }
    if (type.toLowerCase() === "all ingredients") {
      setMenuItems(randomData);
      return;
    }
    if (typeParent === "Meal Types") {
      newData = randomData.filter((item) =>
        item.dishTypes.find((dishType) => dishType === type.toLowerCase())
      );
      setMenuItems(newData);
    }
    if (typeParent === "Cuisine Types") {
      newData = randomData.filter((item) =>
        item.cuisines.find((cuisine) => cuisine === type)
      );
      setMenuItems(newData);
    }
    if (typeParent === "Diet Types") {
      newData = randomData.filter((item) =>
        item.diets.find((diet) => diet === type.toLowerCase())
      );
      setMenuItems(newData);
    }
    if (typeParent === "Ingredients") {
      newData = randomData.filter((item) =>
        item.extendedIngredients
          .map((i) => i.name)
          .find((ingredient) => ingredient === type.toLowerCase())
      );
      setMenuItems(newData);
    }
  };

  const onChangeActiveFilter = (id) => {
    if (toggler.open && toggler.id === id) {
      setToggler({ open: false, id: id });
    } else {
      setToggler({ open: true, id: id });
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Container fluid className="recipes__filtering-container">
        <Row className="justify-content-center">
          <Col lg={3} className="filtering__sidebar">
            <h4 className="filtering__sidebar--main-title">
              Find Your Favorite
            </h4>
            <Form className="filtering__sidebar--form">
              <Form.Group className="filtering__sidebar--search-box mb-3 ps-2">
                <Form.Label
                  htmlFor="search"
                  className="filtering__sidebar--sub-titles"
                >
                  Search Recipe
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="filtering__sidebar--search-input"
                  id="search"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 ps-2">
                <Form.Label className="filtering__sidebar--sub-titles">
                  Filter Recipes
                </Form.Label>
                {categories.map((cat) => {
                  return (
                    <Form.Group
                      className="filtering__sidebar--options ps-2"
                      key={cat.id}
                    >
                      <Form.Label
                        className="filtering__sidebar--inner-title"
                        onClick={() => onChangeActiveFilter(cat.id)}
                      >
                        {cat.name}
                      </Form.Label>
                      <div
                        aria-expanded={toggler.id === cat.id && toggler.open}
                        className="filtering__sidebar--toggle"
                      >
                        <span className="filtering__sidebar--toggle-icon"></span>
                        <span className="filtering__sidebar--toggle-icon"></span>
                      </div>
                      <div
                        in={
                          toggler.id === cat.id ? toggler.open.toString() : null
                        }
                        className="filtering__sidebar--expands"
                      >
                        {cat.items.map((item) => {
                          return (
                            <Link
                              key={item}
                              onClick={(e) => handleFilter(e, item)}
                              to={`/recipes/${GetSlug(
                                cat.name.toLowerCase()
                              )}/${GetSlug(item).toLowerCase()}`}
                              className="filtering__sidebar-submenu"
                              reloadDocument
                            >
                              {item}
                            </Link>
                          );
                        })}
                      </div>
                    </Form.Group>
                  );
                })}
              </Form.Group>
            </Form>
          </Col>
          <Col lg={7} className="filtering__main">
            {menuItems.length < 1 ? (
              <>
                <h3 className="nothing__cart--title">Nothing Found</h3>
                <p className="nothing__cart--text">
                  <AiOutlineArrowLeft color="var(--orange)" />
                  Try to find your favorite recipe using another term
                </p>
              </>
            ) : (
              <Fade bottom cascade>
                <div className="filtering__carts">
                  {menuItems
                    .slice(firstItemIndex, lastItemIndex)
                    .filter((item) => {
                      if (search === "") {
                        return item;
                      } else if (
                        item.title
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return item;
                      }
                      return null;
                    })
                    .map((item) => {
                      return (
                        <Card className="filtering__cart" key={item.id}>
                          <div className="filtering__cart--top">
                            <Badge pill className="filtering__cart--badge">
                              {item.healthScore}%
                            </Badge>
                            <Link
                              reloadDocument
                              to={`/recipes/${GetSlug(item.title.toLowerCase())}`}
                            >
                              <Card.Img
                                variant="top"
                                className="filtering__cart--img"
                                src={item.image}
                                alt={item.title}
                              />
                            </Link>
                          </div>
                          <Card.Body className="filtering__cart--body">
                            <Link
                              reloadDocument
                              to={`/recipes/${GetSlug(item.title.toLowerCase())}`}
                            >
                              <Card.Title className="filtering__cart--title">
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
                              <Card.Text className="filtering__cart--text">
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
            {menuItems.length > itemsPerPage && (
              <Pagination
                totalItems={menuItems.length}
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

export default FilterRecipes;

const Wrapper = styled.section`
  .recipes__filtering-container {
    display: block;
    position: relative;
    z-index: 5;
    background-color: var(--white) !important;
    height: fit-content;
    padding: 5rem 2rem;

    /********** sidebar **********/
    .filtering__sidebar {
      box-shadow: var(--shadow);
      border-radius: var(--borderRadius);
      padding: 1rem;
      background-color: var(--light);
      height: 80vh;
      .filtering__sidebar--main-title {
        font-weight: 600;
        letter-spacing: 0;
        text-transform: uppercase !important;
        margin-bottom: 1.5rem;
        background: var(--gray-opacity7);
        padding: 0.2rem;
        text-align: center;
        border-radius: var(--borderRadius);
      }
      .filtering__sidebar--form {
        /********** search box **********/
        .filtering__sidebar--search-box {
          border-bottom: 0.125rem solid var(--gray-opacity3);
          padding-bottom: 1rem;
          .filtering__sidebar--search-input {
            font-size: var(--bodyFontSize) !important;
            color: var(--dark) !important;
            background-color: var(--light) !important;
            border: 0.125rem solid var(--gray) !important;
            border-radius: var(--borderRadius) !important;
          }
          .filtering__sidebar--search-input:focus {
            box-shadow: none !important;
            background-color: var(--white) !important;
          }
        }
        .filtering__sidebar--sub-titles {
          font-weight: 600;
        }

        /********** filtering **********/
        .filtering__sidebar--options {
          width: 100%;
          padding: 1rem 0;
          border-bottom: 0.125rem solid var(--gray);
          position: relative;
          .filtering__sidebar--inner-title {
            margin: 0;
            width: 100%;
          }
          .filtering__sidebar--toggle {
            position: absolute;
            top: 2rem;
            right: 0.5rem;
            width: 1rem;
            height: 1rem;
          }
          .filtering__sidebar--toggle .filtering__sidebar--toggle-icon {
            position: absolute;
            top: 0;
            left: 0;
            background: var(--gray);
            width: 1rem;
            height: 0.25rem;
            transform-origin: center;
            transition: var(--transition-slow);
          }
          .filtering__sidebar--toggle
            .filtering__sidebar--toggle-icon:last-child {
            transform: rotateZ(90deg);
          }
          .filtering__sidebar--toggle[aria-expanded="true"]
            .filtering__sidebar--toggle-icon {
            transform: rotateZ(360deg) !important;
          }
          .filtering__sidebar--expands {
            max-height: 0;
            width: 100%;
            overflow: hidden;
            transition: var(--transition-slow);
          }
          .filtering__sidebar--toggle[aria-expanded="true"]
            + .filtering__sidebar--expands {
            max-height: 5rem;
            overflow-y: auto;
            margin-top: 0.5rem;
          }
          .filtering__sidebar-submenu {
            padding-left: 0.5rem;
            color: var(--dark);
            font-family: var(--bodyFont);
            text-transform: capitalize;
            font-size: var(--smallFontSize);
            display: block;
            text-align: start;
          }
          .filtering__sidebar-submenu:hover {
            box-shadow: none;
            color: var(--orange);
          }
        }
      }
    }

    /********** main part **********/
    .filtering__main {
      margin-left: 2rem;
      padding: 0;
      height: 80vh;
      .nothing__cart--title {
        font-weight: 800;
      }
      .nothing__cart--text {
        padding: 1rem 3rem;
      }
      .filtering__carts {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 2rem;
        .filtering__cart {
          border: none;
          margin: 0 1rem;
          background-color: var(--white);
          overflow: hidden;
          .filtering__cart--top {
            overflow: hidden;
            border-radius: var(--borderRadius);
            .filtering__cart--badge {
              position: absolute;
              top: 5%;
              z-index: 20;
              right: 5%;
              padding: 0.4rem 0.8rem;
              font-size: var(--smallFontSize);
              background-color: var(--orange) !important;
            }
            .filtering__cart--img {
              border-radius: var(--borderRadius);
              overflow: hidden;
              height: 25vh;
              z-index: 7;
              transition: var(--transition-fast);
            }
            .filtering__cart--img::after {
              content: "";
              overflow: hidden;
              width: 100%;
              z-index: 15;
            }
            .filtering__cart--img:hover {
              transform: scale(1.1);
              opacity: 0.9;
            }
          }
          .filtering__cart--body {
            padding: 0.5rem 0;
            .filtering__cart--title {
              width: 100%;
              text-align: start;
              font-family: var(--bodyFont);
              font-weight: 800;
              font-size: calc(var(--bodyFontSize) + 0.1rem);
              color: var(--dark);
              transition: var(--transition-fast);
            }
            .filtering__cart--title:hover {
              color: var(--orange);
            }
            .filtering__cart--text {
              font-size: var(--smallFontSize);
              color: var(--gray);
              display: inline-flex;
              margin-left: 0.5rem;
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
      .filtering__cart--img {
        height: 20vh;
      }
    }
    @media only screen and (max-width: 992px) {
      .filtering__sidebar {
        width: 30% !important;
      }
      .filtering__main {
        width: 60% !important;
      }
      .filtering__carts {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media only screen and (max-width: 768px) {
      .filtering__main {
        width: 45% !important;
      }
      .filtering__sidebar {
        width: 35% !important;
      }
      .filtering__carts {
        grid-template-columns: repeat(1, 1fr);
      }
    }
    @media only screen and (max-width: 576px) {
      .filtering__main {
        width: 80% !important;
        height: fit-content;
        margin: 2rem 0 0 0;
      }
      .filtering__sidebar {
        width: 90% !important;
        height: fit-content;
      }
      .filtering__carts {
        grid-template-columns: repeat(1, 1fr);
      }
      .filtering__cart--img {
        height: 30vh;
      }
    }
    @media only screen and (max-width: 450px) {
      .filtering__main {
        width: 90% !important;
      }
      .filtering__cart--img {
        height: 25vh;
      }
    }
  }
`;
