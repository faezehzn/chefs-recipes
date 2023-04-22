import { Col, Container, Form, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import CustomButton from "../utilities/CustomButton";
import { HiPrinter } from "react-icons/hi";
import {
  GiFullFolder,
  GiSandsOfTime,
  GiForkKnifeSpoon,
  GiCampCookingPot,
  GiBowlOfRice,
  GiReturnArrow,
} from "react-icons/gi";
import { GetCapitalize, GetSlug } from "../utilities/StringSlugConverter";
import { HiCurrencyDollar } from "react-icons/hi";
import { useRef } from "react";
import { Link } from "react-router-dom";
import useDynamicRefs from "use-dynamic-refs";

const PrintPage = () => {
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const descRef = useRef(null);
  const fImgRef = useRef(null);
  const ingrRef = useRef(null);
  const instRef = useRef(null);
  const [getEquiRef, setEquiRef] = useDynamicRefs();
  const { singleRecipe } = useCustomContext();
  const options = [
    "Title",
    "Description",
    "Information",
    "Featured Image",
    "Ingredients",
    "Instructions",
    "Equipments",
  ];
  const infoTable = [
    {
      icon: <GiFullFolder />,
      key: "Meal Types",
      value: singleRecipe.dishTypes,
    },
    {
      icon: <GiBowlOfRice />,
      key: "Diet Types",
      value: singleRecipe.diets,
    },
    {
      icon: <GiCampCookingPot />,
      key: "Cuisine Types",
      value: singleRecipe.cuisines,
    },
    {
      icon: <GiSandsOfTime />,
      key: "Total Time",
      value: singleRecipe.readyInMinutes + " min",
    },
    {
      icon: <GiForkKnifeSpoon />,
      key: "Yields",
      value:
        singleRecipe.servings > 1
          ? singleRecipe.servings + " servings"
          : singleRecipe.servings + " serving",
    },
    {
      icon: <HiCurrencyDollar />,
      key: "Price Per Serving",
      value: singleRecipe.pricePerServing + " $",
    },
  ];

  const handleCheckBox = (e, id) => {
    if (id === titleRef.current.id && !e.target.checked) {
      titleRef.current.className += " d-none";
    } else if (id === titleRef.current.id && e.target.checked) {
      titleRef.current.className -= " d-none";
      titleRef.current.className += " print-page__main--title";
    }

    if (id === descRef.current.id && !e.target.checked) {
      descRef.current.className += " d-none";
    } else if (id === descRef.current.id && e.target.checked) {
      descRef.current.className -= " d-none";
      descRef.current.className +=
        " print-page__main--text print-page__main--desc";
    }

    if (id === infoRef.current.id && !e.target.checked) {
      infoRef.current.className += " d-none";
    } else if (id === infoRef.current.id && e.target.checked) {
      infoRef.current.className -= " d-none";
      infoRef.current.className += " print-page__main--info-table";
    }

    if (id === fImgRef.current.id && !e.target.checked) {
      fImgRef.current.className += " d-none";
    } else if (id === fImgRef.current.id && e.target.checked) {
      fImgRef.current.className -= " d-none";
      fImgRef.current.className += " print-page__main--featured-img";
    }

    if (id === ingrRef.current.id && !e.target.checked) {
      ingrRef.current.className += " d-none";
    } else if (id === ingrRef.current.id && e.target.checked) {
      ingrRef.current.className -= " d-none";
      ingrRef.current.className += " print-page__main--ingredients";
    }

    if (id === instRef.current.id && !e.target.checked) {
      instRef.current.className += " d-none";
    } else if (id === instRef.current.id && e.target.checked) {
      instRef.current.className -= " d-none";
      instRef.current.className += " print-page__main--instructions";
    }

    for (
      let i = 0;
      i < singleRecipe.analyzedInstructions[0].steps.length;
      i++
    ) {
      if (id === getEquiRef(`equiRef${i}`).current.id && !e.target.checked) {
        getEquiRef(`equiRef${i}`).current.className += " d-none";
      } else if (
        id === getEquiRef(`equiRef${i}`).current.id &&
        e.target.checked
      ) {
        getEquiRef(`equiRef${i}`).current.className -= " d-none";
      }
    }
  };

  return (
    <Wrapper>
      <Container fluid className="print-page">
        <Row className="justify-content-center">
          <Col md={10} lg={3} xl={2} className="print-page__sidebar no-print">
            <h4 className="print-page__sidebar--main-title">Print Options:</h4>
            <Form className="print-page__sidebar--form">
              {options.map((item, index) => {
                return (
                  <Form.Check
                    label={item}
                    type="checkbox"
                    key={index}
                    defaultChecked
                    id={item.toLowerCase()}
                    className="print-page__sidebar--form-checkbox"
                    onClick={(e) => handleCheckBox(e, item.toLowerCase())}
                  ></Form.Check>
                );
              })}
            </Form>
            <CustomButton
              classNameParent="ms-4 print-page__print-btn-parent"
              className="print-page__print-btn"
              textBtn={<HiPrinter size={20} />}
              onClick={() => window.print()}
            />
          </Col>
          <Col md={10} lg={7} xl={8} className="print-page__main print">
            <div className="">
              <h3 ref={titleRef} id="title" className="print-page__main--title">
                {singleRecipe.title}
              </h3>
              <p
                ref={descRef}
                id="description"
                className="print-page__main--text print-page__main--desc"
                dangerouslySetInnerHTML={{ __html: singleRecipe.summary }}
              />
              <div
                ref={infoRef}
                id="information"
                className="print-page__main--info-table"
              >
                {infoTable.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.value.length !== 0 ? (
                        <div
                          className="print-page__main--info-row"
                          style={
                            infoTable.length - 1 === index
                              ? { borderBottom: "none" }
                              : null
                          }
                        >
                          <div>
                            <span className="mx-2">
                              {item.icon}
                            </span>
                            <span className="me-2">
                              {item.key}
                            </span>
                          </div>
                          {typeof item.value == "string" ? (
                            <span className="me-2 print-page__main--info-value">
                              {item.value}
                            </span>
                          ) : (
                            <span className="me-2 print-page__main--info-value">
                              {item.value.map((cat, index) => {
                                return (
                                  <span key={index}>
                                    {GetCapitalize(cat)}
                                    {item.value.length - 1 === index
                                      ? ""
                                      : ", "}
                                  </span>
                                );
                              })}
                            </span>
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <img
                ref={fImgRef}
                id="featured image"
                className="print-page__main--featured-img"
                src={singleRecipe.image}
                alt={singleRecipe.title}
              />
              <div
                ref={ingrRef}
                id="ingredients"
                className="print-page__main--ingredients"
              >
                <h4 className="print-page__main--ingredients-title">
                  Recipe Ingredients
                </h4>
                <p className="print-page__main--text print-page__main--ingredients-txt">
                  <i>
                    First of all, check if you have all the necessary
                    ingredients for this recipe. Pay attention to the
                    quantities!
                  </i>
                </p>
                <div className="mt-4">
                  {singleRecipe.extendedIngredients.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="mb-2 d-flex align-items-center"
                      >
                        <div>
                          <img
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                            alt={item.original}
                            className="mx-3 print-page__main--ingredients-img"
                          />
                        </div>
                        <span className="print-page__main--text">
                          {item.original}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                ref={instRef}
                id="instructions"
                className="print-page__main--instructions"
              >
                <h4 className="print-page__main--instructions-title">
                  Recipe Instructions
                </h4>
                <p className="print-page__main--text print-page__main--instructions-txt">
                  <i>
                    Next, follow the steps to finalize your dish and finally be
                    able to enjoy it!
                  </i>
                </p>
                <div className="mt-4">
                  {singleRecipe.analyzedInstructions[0].steps.map(
                    (item, index) => {
                      return (
                        <div key={index}>
                          <p
                            className="print-page__main--text print-page__main--instructions-txt"
                          >
                            {item.number}. <span>{GetCapitalize(item.step.slice(0,1))}</span>{item.step.slice(1)}
                          </p>
                          <div
                            ref={setEquiRef(`equiRef${index}`)}
                            id="equipments"
                          >
                            {item.equipment &&
                              item.equipment.map((equi, i) => {
                                return (
                                  <OverlayTrigger
                                    key={i}
                                    placement='bottom'
                                    overlay={
                                      <Tooltip id={equi.name}>
                                        {GetCapitalize(equi.name)}
                                      </Tooltip>
                                    }
                                  >
                                    <img
                                      src={`https://spoonacular.com/cdn/equipment_100x100/${equi.image}`}
                                      alt={equi.name}
                                      className="ms-3"
                                    />
                                  </OverlayTrigger>
                                );
                              })}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
            <CustomButton
              classNameSection="mt-3 mt-sm-5 d-sm-inline-flex  no-print"
              classNameParent="ms-4 justify-content-start"
              className="print-page__print-btn"
              textBtn={<HiPrinter size={20} />}
              onClick={() => window.print()}
            />
            <Link
              reloadDocument
              to={`/recipes/${GetSlug(singleRecipe.title.toLowerCase())}`}
            >
              <CustomButton
                classNameSection="mt-3 mt-sm-5 d-sm-inline-flex  no-print"
                classNameParent="ms-4 justify-content-start"
                className="print-page__back-btn"
                textBtn={<GiReturnArrow className="me-2" />}
                icon={"Back to Recipe"}
              />
            </Link>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default PrintPage;

const Wrapper = styled.section`
  .print-page {
    padding: 10rem 0rem;
    .print-page__print-btn,
    .print-page__back-btn {
      color: var(--light) !important;
      background-color: var(--orange) !important;
      width: 7rem;
    }
    .print-page__print-btn:hover,
    .print-page__back-btn:hover {
      color: var(--orange) !important;
    }
    .print-page__back-btn,
    .print-page__back-btn::before {
      width: 12rem !important;
    }

    /********** sidebar **********/
    .print-page__sidebar {
      box-shadow: var(--shadow);
      border-radius: var(--borderRadius);
      padding: 1rem;
      background-color: var(--light);
      height: fit-content;

      .print-page__sidebar--main-title {
        font-weight: 600;
        letter-spacing: 0;
        text-transform: uppercase !important;
        margin-bottom: 1.5rem;
        background: var(--gray-opacity7);
        padding: 0.2rem;
        text-align: center;
        border-radius: var(--borderRadius);
      }
      .print-page__sidebar--form {
        .print-page__sidebar--form-checkbox {
          color: var(--gray);
          margin-bottom: 0.7rem;
          .form-check-input {
            box-shadow: none !important;
          }
          .form-check-input:focus {
            border-color: var(--orange) !important;
          }
          .form-check-input:checked {
            background-color: var(--orange);
            border-color: var(--orange);
          }
        }
      }
    }

    /********** main **********/
    .print-page__main {
      padding-left: 2rem;
      .print-page__main--title,
      .print-page__main--ingredients-title,
      .print-page__main--instructions-title {
        font-weight: 800;
      }
      .print-page__main--text {
        font-weight: 400;
        color: var(--gray);
      }
      .print-page__main--desc,
      .print-page__main--info-table,
      .print-page__main--featured-img,
      .print-page__main--ingredients,
      .print-page__main--instructions {
        padding-top: 2rem;
        text-align: justify;
      }
      .print-page__main--desc {
        line-height: 1.5rem;
        a {
          color: var(--orange);
        }
        a:hover {
          color: var(--orange);
          text-decoration: underline !important;
        }
      }
      .print-page__main--info-table {
        .print-page__main--info-row {
          padding: 1rem 0;
          border-bottom: 0.05rem dashed var(--gray-opacity3);
          color: var(--dark);
          font-weight: 500;
          display: flex;
          justify-content: space-between;
        }
        .print-page__main--info-value {
          color: var(--gray);
          font-weight: 300;
        }
      }
      .print-page__main--featured-img {
        width: 100%;
      }
      .print-page__main--ingredients,
      .print-page__main--instructions {
        .print-page__main--ingredients-txt,
        .print-page__main--instructions-txt {
          padding-left: 1rem;
        }
        .print-page__main--ingredients-img {
          width: 3rem;
          height: 3rem;
        }
      }
    }

    /********** Print Css **********/
    @media print {
      .no-print {
        display: none !important;
      }
      .print {
        display: block !important;
      }
    }

    /********** Responsive Css **********/
    @media only screen and (max-width: 1200px) {
      padding: 10rem 2rem !important;
      .print-page__sidebar--form {
        padding: 0.5rem 1rem;
      }
    }
    @media only screen and (max-width: 992px) {
      .print-page__sidebar {
        padding: 2rem;
        margin-bottom: 2rem;
      }
      .print-page__main {
        padding: 0 2rem;
      }
      .print-page__print-btn-parent {
        justify-content: flex-start;
        margin-left: 2rem;
      }
      .print-page__print-btn:hover,
      .print-page__back-btn:hover {
        background-color: var(--light) !important;
        opacity: 1 !important;
        border-left: 0.05rem solid var(--orange) !important;
        border-right: 0.05rem solid var(--orange) !important;
      }
      .print-page__back-btn {
        margin-left: 2rem;
      }
    }
    @media only screen and (max-width: 768px) {
      .print-page__main--title {
        font-size: calc(var(--headingFontSize) + 0.2rem) !important;
      }
      .print-page__main--info-table {
        .print-page__main--info-row {
          flex-direction: column;
        }
        .print-page__main--info-value {
          margin-left: 1.8rem;
        }
      }
    }
    @media only screen and (max-width: 576px) {
      padding: 5rem 2rem !important;
      .print-page__back-btn {
        margin-left: 0 !important;
      }
      .print-page__main--info-value {
        margin-left: 0.5rem !important;
      }
    }
    @media only screen and (max-width: 450px) {
      .print-page__main--desc,
      .print-page__main--info-table,
      .print-page__main--featured-img,
      .print-page__main--ingredients,
      .print-page__main--instructions {
        text-align: start !important;
      }
    }
  }
`;
