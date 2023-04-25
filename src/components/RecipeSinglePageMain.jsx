import styled from "styled-components";
import {
  Col,
  Container,
  Row,
  OverlayTrigger,
  Tooltip,
  Card,
  Alert,
} from "react-bootstrap";
import Tippy from "@tippyjs/react";
import { useCustomContext } from "../context/customContext";
import {
  GiFullFolder,
  GiSandsOfTime,
  GiForkKnifeSpoon,
  GiCampCookingPot,
  GiBowlOfRice,
  GiTomato,
  GiNotebook,
  GiChefToque,
} from "react-icons/gi";
import { FaPhoneAlt, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { TbRelationManyToMany, TbBrandYoutube } from "react-icons/tb";
import { GrFacebookOption, GrMail } from "react-icons/gr";
import { HiCurrencyDollar } from "react-icons/hi";
import { GetCapitalize, GetSlug } from "../utilities/StringSlugConverter";
import { Link } from "react-router-dom";
import chef from "../assets/images/chefs/chef.png";
import CustomButton from "../utilities/CustomButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Keyboard, Mousewheel } from "swiper";
import TrackVisibility from "react-on-screen";
import { ImClock, ImCheckmark } from "react-icons/im";
import { useEffect, useState, useRef } from "react";
import StarRating from "../utilities/StarRating";
import SocialMediaBtn from "../utilities/SocialMediaBtn";
import AnimatedProgressBar from "../utilities/AnimatedProgressBar";
import * as yup from "yup";
import { useFormik } from "formik";
import History from "../components/History";
import { dataApi } from "../context/constants";

const RecipeSinglePageMain = () => {
  const {
    singleRecipe,
    relatedData,
    setRelatedData,
    handleRelatedRecipes,
    recipesCommentsData,
    costPercentTotal,
    difficultyPercentTotal,
    timePercentTotal,
    healthyPercentTotal,
    totalRating,
    data,
    isAuthenticated,
    user,
    handleLogout
  } = useCustomContext();

  if (window.location.hash === "#reviews") {
    window.scrollTo({
      top: 3500,
      behavior: "smooth",
    });
    setTimeout(() => {
      History.push();
    }, 1000);
  } 

  const now = new Date();
  const infoTable = [
    {
      icon: <GiFullFolder className="mx-2 recipe-single-page__icon" />,
      key: "Meal Types",
      value: singleRecipe.dishTypes,
    },
    {
      icon: <GiBowlOfRice className="mx-2 recipe-single-page__icon" />,
      key: "Diet Types",
      value: singleRecipe.diets,
    },
    {
      icon: <GiCampCookingPot className="mx-2 recipe-single-page__icon" />,
      key: "Cuisine Types",
      value: singleRecipe.cuisines,
    },
    {
      icon: <GiSandsOfTime className="mx-2 recipe-single-page__icon" />,
      key: "Total Time",
      value: singleRecipe.readyInMinutes + " min",
    },
    {
      icon: <GiForkKnifeSpoon className="mx-2 recipe-single-page__icon" />,
      key: "Yields",
      value:
        singleRecipe.servings > 1
          ? singleRecipe.servings + " servings"
          : singleRecipe.servings + " serving",
    },
    {
      icon: <HiCurrencyDollar className="mx-2 recipe-single-page__icon" />,
      key: "Price Per Serving",
      value: singleRecipe.pricePerServing + " $",
    },
  ];
  const breakpointsCarousel = {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
  };
  const breakpointsComments = {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    576: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    1200: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  };

  const [buttonText, setButtonText] = useState("Add Comment");
  const [status, setStatus] = useState({});
  const refAlert = useRef(null);

  yup.setLocale({
    string: {
      required: "Required",
      min: ({ min }) => ({ key: "Field Too Short", values: { min } }),
      max: ({ max }) => ({ key: "Field Too Big", values: { max } }),
    },
  });

  const schema = yup.object().shape({
    name: yup
      .string("Please Enter Correct Name")
      .min(3, "Must be at least 3 characters long")
      .max(20, "Must be maximum 20 characters long")
      .trim()
      .required("Required"),
    email: yup.string("Please Enter valid Email").email().required("Required"),
    comment: yup
      .string()
      .max(500, "Must be maximum 500 characters long")
      .required("Required"),
    cost: yup.number().positive().integer().required("Required"),
    difficulty: yup.number().positive().integer().required("Required"),
    time: yup.number().positive().integer().required("Required"),
    healthy: yup.number().positive().integer().required("Required"),
    createdOn: yup.date().default(() => now.toDateString()),
    recipeTitle: yup.string().default(singleRecipe.title),
    recipeImage: yup.mixed().default(singleRecipe.image),
  });

  const formFormik = useFormik({
    initialValues: {
      name: (isAuthenticated ? user.username : ""),
      email: (isAuthenticated ? user.email : ""),
      comment: "",
      cost: 0,
      difficulty: 0,
      time: 0,
      healthy: 0,
      createdOn: now.toDateString(),
      recipeTitle: singleRecipe.title,
      recipeImage: singleRecipe.image
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: schema,
  });

  const handleSubmit = async (values) => {
    setButtonText("Sending...");

    await fetch(`${dataApi}/recipesComments`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      formFormik.resetForm();
      if (res.ok === true) {
        setStatus({ succes: true, message: "Comment added successfully" });
        setTimeout(() => {
          refAlert.current.className += " d-none";
          window.location.reload();
        }, 3000);
      } else {
        setStatus({
          succes: false,
          message: "Something went wrong, please try again later.",
        });
        setTimeout(() => {
          refAlert.current.className += " d-none";
        }, 5000);
      }
    });
    setButtonText("Add Comment");
  };

  const relatedRecipeWithAuthor = relatedData.filter(
    (data) =>
      data.sourceName === singleRecipe.sourceName &&
      data.title !== singleRecipe.title
  );

  useEffect(() => {
    let relatedDatas = [];
    let words = [];
    const titleWords = singleRecipe.title.toLowerCase().split(" ");
    const ingredientSWords = singleRecipe.extendedIngredients.map((item) => {
      const name =
        item.name !== null
          ? item.name.includes(" ")
            ? item.name.split(" ")
            : [item.name]
          : [];
      const nameClean =
        item.nameClean !== null
          ? item.nameClean.includes(" ")
            ? item.nameClean.split(" ")
            : [item.nameClean]
          : [];

      words = [...words, ...name, ...nameClean];
      return words;
    });
    words = [
      ...new Set(ingredientSWords[ingredientSWords.length - 1], ...titleWords),
    ];

    for (let i = 0; i < words.length; i++) {
      const x = handleRelatedRecipes(words[i]);
      relatedDatas = [...relatedDatas, ...x];
    }
    relatedDatas = [...new Set(relatedDatas)].filter(
      (item) => item.title.toLowerCase() !== singleRecipe.title.toLowerCase()
    );
    setRelatedData(relatedDatas);
  }, [singleRecipe]);

  return (
    <Wrapper>
      <Container fluid className="recipe-single-page__main">
        {/********** description part **********/}
        <Row className="justify-content-center">
          <Col md={10} lg={6} className="description__main">
            <div className="">
              <h3 className="description__main--title">Description</h3>
              <p
                className="description__main--txt"
                dangerouslySetInnerHTML={{ __html: singleRecipe.summary }}
              />
            </div>
          </Col>
          <Col md={10} lg={4} className="description__sidebar">
            <div className="description__sidebar--info-table">
              {infoTable.map((item, index) => {
                return (
                  <div key={index}>
                    {item.value.length !== 0 && (
                      <div
                        className={
                          typeof item.value != "string" && item.value.length > 1
                            ? "flex-column description__sidebar--info-row"
                            : "description__sidebar--info-row"
                        }
                        style={
                          infoTable.length - 1 === index
                            ? { borderBottom: "none" }
                            : null
                        }
                      >
                        <div>
                          {item.icon}
                          <span className="me-2">{item.key}</span>
                        </div>
                        {typeof item.value == "string" ? (
                          <span className="me-2 description__sidebar--info-value">
                            {item.value}
                          </span>
                        ) : (
                          <span
                            className={
                              item.value.length > 1
                                ? "text-end me-2 description__sidebar--info-value"
                                : "me-2 description__sidebar--info-value"
                            }
                          >
                            {item.value.map((cat, index) => {
                              return (
                                <Link
                                  key={index}
                                  reloadDocument
                                  to={`/recipes/${GetSlug(
                                    item.key.toLowerCase()
                                  )}/${GetSlug(cat)}`}
                                  className="description__main--info-value-link"
                                >
                                  {GetCapitalize(cat)}
                                  {item.value.length - 1 === index ? "" : ", "}
                                </Link>
                              );
                            })}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
        
        {/********** end of description part **********/}
        <Row className="justify-content-center">
          <Col md={10}>
            {/********** ingredients part **********/}
            <div className="ingredients__main">
              <h4 className="ingredients__main--title">
                <GiTomato
                  color="var(--orange)"
                  className="me-2 recipe-single-page__icon"
                />
                Ingredients
              </h4>
              <p className="ingredients__main--txt">
                <i>
                  First of all, check if you have all the necessary ingredients
                  for this recipe. Pay attention to the quantities!
                </i>
              </p>
              <div className="mt-4">
                {singleRecipe.extendedIngredients.map((item, index) => {
                  return (
                    <div key={index} className="mb-2 d-flex align-items-center">
                      <div>
                        <img
                          src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                          alt={item.original}
                          className="mx-3 ingredients__main-ingredient-img"
                        />
                      </div>
                      <span className="ingredients__main--ingredient-name">
                        {item.original}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/********** instructions part **********/}
            <div className="instructions__main">
              <h4 className="instructions__main--title">
                <GiNotebook
                  color="var(--orange)"
                  className="me-2 recipe-single-page__icon"
                />
                <span>The Steps</span>
              </h4>
              <p className="instructions__main--txt">
                <i>
                  Next, follow the steps to finalize your dish and finally be
                  able to enjoy it!
                </i>
              </p>
              <div className="mt-4">
                {singleRecipe.analyzedInstructions.length !== 0 ? (
                  singleRecipe.analyzedInstructions[0].steps.map(
                    (item, index) => {
                      return (
                        <div key={index} className="instructions__main--step">
                          <span className="instructions__main--step-num">
                            {item.number}.
                          </span>{" "}
                          <span>{GetCapitalize(item.step.slice(0,1))}</span>{item.step.slice(1)}
                          <div>
                            {item.equipment &&
                              item.equipment.map((equi, i) => {
                                return (
                                  <OverlayTrigger
                                    key={i}
                                    placement="bottom"
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
                  )
                ) : (
                  <p className="instructions__main--no-instruction">
                    {" "}
                    -Read the detailed instructions{" "}
                    <a
                      style={{ color: "var(--orange)" }}
                      target="_blank"
                      rel="noreferrer"
                      href={singleRecipe.sourceUrl}
                    >
                      here
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/********** author part **********/}
            <div className="author__main">
              <h4 className="author__main--title">
                <GiChefToque
                  color="var(--orange)"
                  className="me-2 recipe-single-page__icon"
                />
                <span>Author</span>
              </h4>
              <Card className="author__main--card">
                <div className="author__main--card--left">
                  <Link
                    reloadDocument
                    to={`/authors/${GetSlug(
                      singleRecipe.sourceName.toLowerCase()
                    )}`}
                  >
                    <Card.Img
                      className="author__main--card--img"
                      src={chef}
                      alt={singleRecipe.sourceName}
                    />
                  </Link>
                </div>
                <Card.Body className="author__main--card--body">
                  <Link
                    reloadDocument
                    to={`/authors/${GetSlug(
                      singleRecipe.sourceName.toLowerCase()
                    )}`}
                  >
                    <span className="author__main--card--txt">added by</span>
                    <Card.Title className="author__main--card--title">
                      {singleRecipe.sourceName.length > 25
                        ? singleRecipe.sourceName.slice(0, 25) + "..."
                        : singleRecipe.sourceName}
                    </Card.Title>
                  </Link>
                  <div className="author__main--card--social">
                    <a href="tel:+98-912-345-6789">
                      <CustomButton
                        className="author__main--card--social-item"
                        classNameParent="m-0"
                        textBtn={<FaPhoneAlt size={15} />}
                      />
                    </a>
                    <a href="mailto:example@gmail.com">
                      <CustomButton
                        className="author__main--card--social-item"
                        classNameParent="m-0"
                        textBtn={<GrMail size={15} />}
                      />
                    </a>
                    <a href="https://www.facebook.com">
                      <CustomButton
                        className="author__main--card--social-item"
                        classNameParent="m-0"
                        textBtn={<GrFacebookOption size={15} />}
                      />
                    </a>
                    <a href="https://www.instagram.com">
                      <CustomButton
                        className="author__main--card--social-item"
                        classNameParent="m-0"
                        textBtn={<FaInstagram size={15} />}
                      />
                    </a>
                  </div>
                </Card.Body>
              </Card>
              <div className="author__main--related">
                <TrackVisibility>
                  {({ isVisible }) => (
                    <Swiper
                      spaceBetween={0}
                      grabCursor={true}
                      autoplay={{
                        delay: isVisible ? 3000 : 60000,
                        disableOnInteraction: false,
                      }}
                      keyboard={{
                        enabled: true,
                      }}
                      mousewheel={false}
                      loop={
                        relatedRecipeWithAuthor &&
                        relatedRecipeWithAuthor.length > 4
                          ? true
                          : false
                      }
                      breakpoints={breakpointsCarousel}
                      slidesPerView={4}
                      modules={[Autoplay, Keyboard, Mousewheel]}
                      className="mt-4 d-flex"
                    >
                      {relatedRecipeWithAuthor &&
                        relatedRecipeWithAuthor.map((item) => {
                          return (
                            <SwiperSlide className="d-flex" key={item.id}>
                              <Card className="author__main--related--card">
                                <div className="author__main--related--card-top">
                                  <Link
                                    reloadDocument
                                    to={`/recipes/${GetSlug(
                                      item.title.toLowerCase()
                                    )}`}
                                  >
                                    <Card.Img
                                      variant="top"
                                      className="author__main--related--card-img"
                                      src={item.image}
                                      alt={item.title}
                                    />
                                  </Link>
                                </div>
                                <Card.Body className="author__main--related--card-body">
                                  <Link
                                    reloadDocument
                                    to={`/recipes/${GetSlug(
                                      item.title.toLowerCase()
                                    )}`}
                                  >
                                    <Card.Title className="author__main--related--card-title">
                                      {item.title.length > 35
                                        ? item.title.slice(0, 30) + "..."
                                        : item.title}
                                    </Card.Title>
                                  </Link>
                                </Card.Body>
                              </Card>
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                  )}
                </TrackVisibility>
              </div>
            </div>

            {/********** related recipes part **********/}
            <div className="related__main">
              <h4 className="related__main--title">
                <TbRelationManyToMany
                  color="var(--orange)"
                  className="me-2 recipe-single-page__icon"
                />
                <span>Related</span>
              </h4>
              <div className="related__main--row">
                {relatedData &&
                  (relatedData.length > 6
                    ? relatedData.slice(0, 6).map((item) => {
                        return (
                          <Card key={item.id} className="related__main--card">
                            <Link
                              reloadDocument
                              to={`/recipes/${GetSlug(
                                item.title.toLowerCase()
                              )}`}
                              className="d-flex justify-content-center"
                            >
                              <div className="related__main--card-left">
                                <Card.Img
                                  className="related__main--card-img"
                                  src={item.image}
                                  alt={item.title}
                                />
                              </div>
                            </Link>
                            <Card.Body className="related__main--card-body">
                              <Link
                                reloadDocument
                                to={`/recipes/${GetSlug(
                                  item.title.toLowerCase()
                                )}`}
                              >
                                <Card.Title className="related__main--card-title">
                                  {item.title.length > 25
                                    ? item.title.slice(0, 25) + "..."
                                    : item.title}
                                </Card.Title>
                              </Link>
                              <Card.Text className="related__main--card-badges">
                                <span className="d-flex align-items-center">
                                  <ImClock className="related__main--card-icon" />
                                  {item.readyInMinutes} min
                                </span>
                                {item.analyzedInstructions.length !== 0 && (
                                  <span className=" ms-4 d-flex align-items-center">
                                    <ImCheckmark className="related__main--card-icon" />
                                    {`${
                                      item.analyzedInstructions[0].steps.length
                                    } ${
                                      item.analyzedInstructions[0].steps
                                        .length === 1
                                        ? "Step"
                                        : "Steps"
                                    }`}
                                  </span>
                                )}
                              </Card.Text>
                              <Card.Text className="related__main--card-author">
                                <span>
                                  Recipe by{" "}
                                  <b>
                                    <Link
                                      className="related__main--card-author-link"
                                      to={`/authors/${GetSlug(
                                        item.sourceName.toLowerCase()
                                      )}`}
                                    >
                                      {item.sourceName}
                                    </Link>
                                  </b>
                                </span>
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        );
                      })
                    : relatedData.map((item) => {
                        return (
                          <Card key={item.id} className="related__main--card">
                            <Link
                              reloadDocument
                              to={`/recipes/${GetSlug(
                                item.title.toLowerCase()
                              )}`}
                              className="d-flex justify-content-center"
                            >
                              <div className="related__main--card-left">
                                <Card.Img
                                  className="related__main--card-img"
                                  src={item.image}
                                  alt={item.title}
                                />
                              </div>
                            </Link>
                            <Card.Body className="related__main--card-body">
                              <Link
                                reloadDocument
                                to={`/recipes/${GetSlug(
                                  item.title.toLowerCase()
                                )}`}
                              >
                                <Card.Title className="related__main--card-title">
                                  {item.title.length > 25
                                    ? item.title.slice(0, 25) + "..."
                                    : item.title}
                                </Card.Title>
                              </Link>
                              <Card.Text className="related__main--card-badges">
                                <span className="d-flex align-items-center">
                                  <ImClock className="related__main--card-icon" />
                                  {item.readyInMinutes} min
                                </span>
                                {item.analyzedInstructions.length !== 0 && (
                                  <span className=" ms-4 d-flex align-items-center">
                                    <ImCheckmark className="related__main--card-icon" />
                                    {`${
                                      item.analyzedInstructions[0].steps.length
                                    } ${
                                      item.analyzedInstructions[0].steps
                                        .length === 1
                                        ? "Step"
                                        : "Steps"
                                    }`}
                                  </span>
                                )}
                              </Card.Text>
                              <Card.Text className="related__main--card-author">
                                <span>
                                  Recipe by{" "}
                                  <b>
                                    <Link
                                      className="related__main--card-author-link"
                                      to={`/authors/${GetSlug(
                                        item.sourceName.toLowerCase()
                                      )}`}
                                    >
                                      {item.sourceName}
                                    </Link>
                                  </b>
                                </span>
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        );
                      }))}
              </div>
            </div>

            {/********** comment & review part **********/}
            <div className="comments__main">
              {/********** left part **********/}
              <Col md={{ span: 12, order: 1 }} lg={8}>
                {/********** reading comments part **********/}
                <h4 className="comments__main--reading-title" id="reviews">
                  Comments & Reviews{" "}
                  {data.recipesComments.length > 0 &&
                    recipesCommentsData.length > 0 &&
                    (recipesCommentsData.length > 1
                      ? ` - ${recipesCommentsData.length} comments`
                      : ` - ${recipesCommentsData.length} comment`)}
                </h4>
                <>
                  {data.recipesComments.length > 0 &&
                  recipesCommentsData.length > 0 ? (
                    <TrackVisibility>
                      {({ isVisible }) => (
                        <Swiper
                          spaceBetween={0}
                          grabCursor={true}
                          autoplay={{
                            delay: isVisible ? 5000 : 1200000,
                            disableOnInteraction: false,
                          }}
                          breakpoints={breakpointsComments}
                          keyboard={{
                            enabled: true,
                          }}
                          mousewheel={false}
                          loop={false}
                          slidesPerView={1}
                          modules={[Autoplay, Keyboard, Mousewheel]}
                          className="d-flex"
                          style={{ margin: "1rem 0 0 0" }}
                        >
                          {recipesCommentsData.map((item) => {
                            return (
                              <SwiperSlide className="d-flex" key={item.id}>
                                <Card className="comments__main--reading-card">
                                  <div className="comments__main--reading-card--left">
                                    <Card.Img
                                      className="comments__main--reading-card--img"
                                      src={chef}
                                      alt={item.name}
                                    />
                                  </div>
                                  <Card.Body className="comments__main--reading-card--body">
                                    <Card.Title className="comments__main--reading-card--title">
                                      {item.name}
                                    </Card.Title>
                                    <div className="comments__main--reading-card--stars">
                                      <StarRating
                                        labelText="Cost"
                                        defaultState={Number(item.cost)}
                                        readOnly={true}
                                        className="ms-2"
                                      />
                                      <StarRating
                                        labelText="Difficulty"
                                        defaultState={Number(item.difficulty)}
                                        readOnly={true}
                                        className="ms-2"
                                      />
                                      <StarRating
                                        labelText="Time"
                                        defaultState={Number(item.time)}
                                        readOnly={true}
                                        className="ms-2"
                                      />
                                      <StarRating
                                        labelText="Healthy"
                                        defaultState={Number(item.healthy)}
                                        readOnly={true}
                                        className="ms-2"
                                      />
                                    </div>
                                    <p className="comments__main--reading-card--text">
                                      {item.comment}
                                    </p>
                                    <p className="comments__main--reading-card--date">
                                      {item.createdOn}
                                    </p>
                                  </Card.Body>
                                </Card>
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      )}
                    </TrackVisibility>
                  ) : (
                    <div
                      className="flex-column comments__main--reading-card"
                      style={{ marginTop: "2rem", width: "auto" }}
                    >
                      <h5 className="d-block">NO Comment</h5>
                      <p>Be the first to post your review</p>
                    </div>
                  )}
                </>

                {/********** writting comment part **********/}
                <h4 className="mt-5 comments__main--writting-title">
                  Leave a Review
                </h4>
                <form
                  onSubmit={formFormik.handleSubmit}
                  method="POST"
                  className="mt-4 comments__main--writting-form"
                >
                  {/********** stars **********/}
                  <div className="comments__main--writting-form--stars">
                    <Col
                      size={12}
                      sm={12}
                      className={
                        formFormik.touched.cost && formFormik.errors.cost
                          ? "star-error px-1"
                          : "px-1"
                      }
                    >
                      <StarRating
                        className={
                          formFormik.touched.cost && formFormik.errors.cost
                            ? "d-none"
                            : "comments__main--writting-form--star"
                        }
                        labelText="Cost"
                        formFormik={formFormik}
                      />
                      {formFormik.touched.cost && formFormik.errors.cost && (
                        <Tippy
                          placement="bottom"
                          render={(attrs) => (
                            <div className="custom__tooltip" {...attrs}>
                              <div data-popper-arrow />
                              {formFormik.errors.cost}
                            </div>
                          )}
                        >
                          <StarRating
                            className="comments__main--writting-form--star"
                            labelText="Cost"
                            formFormik={formFormik}
                          />
                        </Tippy>
                      )}
                    </Col>
                    <Col
                      size={12}
                      sm={12}
                      className={
                        formFormik.touched.difficulty &&
                        formFormik.errors.difficulty
                          ? "star-error px-1"
                          : "px-1"
                      }
                    >
                      <StarRating
                        className={
                          formFormik.touched.difficulty &&
                          formFormik.errors.difficulty
                            ? "d-none"
                            : "comments__main--writting-form--star"
                        }
                        labelText="Difficulty"
                        formFormik={formFormik}
                      />
                      {formFormik.touched.difficulty &&
                        formFormik.errors.difficulty && (
                          <Tippy
                            placement="bottom"
                            render={(attrs) => (
                              <div className="custom__tooltip" {...attrs}>
                                <div data-popper-arrow />
                                {formFormik.errors.difficulty}
                              </div>
                            )}
                          >
                            <StarRating
                              className="comments__main--writting-form--star"
                              labelText="Difficulty"
                              formFormik={formFormik}
                            />
                          </Tippy>
                        )}
                    </Col>
                    <Col
                      size={12}
                      sm={12}
                      className={
                        formFormik.touched.time && formFormik.errors.time
                          ? "star-error px-1"
                          : "px-1"
                      }
                    >
                      <StarRating
                        className={
                          formFormik.touched.time && formFormik.errors.time
                            ? "d-none"
                            : "comments__main--writting-form--star"
                        }
                        labelText="Time"
                        formFormik={formFormik}
                      />
                      {formFormik.touched.time && formFormik.errors.time && (
                        <Tippy
                          placement="bottom"
                          render={(attrs) => (
                            <div className="custom__tooltip" {...attrs}>
                              <div data-popper-arrow />
                              {formFormik.errors.time}
                            </div>
                          )}
                        >
                          <StarRating
                            className="comments__main--writting-form--star"
                            labelText="Time"
                            formFormik={formFormik}
                          />
                        </Tippy>
                      )}
                    </Col>
                    <Col
                      size={12}
                      sm={12}
                      className={
                        formFormik.touched.healthy && formFormik.errors.healthy
                          ? "star-error px-1"
                          : "px-1"
                      }
                    >
                      <StarRating
                        className={
                          formFormik.touched.healthy &&
                          formFormik.errors.healthy
                            ? "d-none"
                            : "comments__main--writting-form--star"
                        }
                        labelText="Healthy"
                        formFormik={formFormik}
                      />
                      {formFormik.touched.healthy &&
                        formFormik.errors.healthy && (
                          <Tippy
                            placement="bottom"
                            render={(attrs) => (
                              <div className="custom__tooltip" {...attrs}>
                                <div data-popper-arrow />
                                {formFormik.errors.healthy}
                              </div>
                            )}
                          >
                            <StarRating
                              className="comments__main--writting-form--star"
                              labelText="Healthy"
                              formFormik={formFormik}
                            />
                          </Tippy>
                        )}
                    </Col>
                  </div>

                  {/********** alert **********/}
                  <div className="comments__main--writting-form--alert">
                    <Col className="d-block">
                      {Object.keys(formFormik.errors).length === 0 &&
                        status.message && (
                          <Alert
                            ref={refAlert}
                            variant={
                              status.success === false ? "danger" : "success"
                            }
                          >
                            {status.message}
                          </Alert>
                        )}
                    </Col>
                  </div>

                  {/********** form **********/}
                  <div
                    className="mt-3 comments__main--writting-form--inputs"
                    style={{ textAlign: "start" }}
                  >
                    {isAuthenticated ? (
                      <p className="mb-2" style={{ fontWeight: "300", color: "var(--gray)" }}>
                        Logged in as{" "}
                        <Link style={{ color: "var(--orange)" }} reloadDocument to={`/my-account`}>
                          {user.username}
                        </Link>
                        .{" "}
                        <span style={{ color: "var(--orange)", cursor: "pointer" }} onClick={handleLogout}>
                          Log out
                        </span>
                        ?
                      </p>
                    ) : (
                      <p className="mb-2" style={{ fontWeight: "300", color: "var(--gray)" }}>
                        You must be logged in!
                      </p>
                    )}
                    <Col
                      size={12}
                      sm={12}
                      className={
                        formFormik.touched.comment && formFormik.errors.comment
                          ? "input-error px-1"
                          : "px-1"
                      }
                    >
                      <textarea
                        type="text"
                        rows="6"
                        className={
                          formFormik.touched.comment &&
                          formFormik.errors.comment
                            ? "d-none"
                            : "comments__main--writting-form--input"
                        }
                        placeholder="Comment *"
                        {...formFormik.getFieldProps("comment")}
                      />
                      {formFormik.touched.comment &&
                        formFormik.errors.comment && (
                          <Tippy
                            placement="bottom"
                            render={(attrs) => (
                              <div className="custom__tooltip" {...attrs}>
                                <div data-popper-arrow />
                                {formFormik.errors.comment}
                              </div>
                            )}
                          >
                            <textarea
                              type="text"
                              rows="6"
                              placeholder="Comment *"
                              className="comments__main--writting-form--input"
                              {...formFormik.getFieldProps("comment")}
                            />
                          </Tippy>
                        )}
                    </Col>
                    <Col size={12} sm={12} className="px-1">
                      <CustomButton
                        classNameParent="mx-0 justify-content-center justify-content-lg-start"
                        className="comments__main--writting-form--btn"
                        textBtn={buttonText}
                        type="submit"
                      />
                    </Col>
                  </div>
                </form>
              </Col>

              {/********** right part **********/}
              <Col md={{ span: 12, order: 2 }} className="mt-5 mt-lg-0" lg={4}>
                {/********** share part **********/}
                <h4 className="comments__main--share-title">Share Recipe</h4>
                <Card className=" mx-0 comments__main--share-card">
                  <SocialMediaBtn
                    icon={<GrFacebookOption size={20} />}
                    className="justify-content-center me-2 comments__main--share-card-btn btn-facebook"
                  />
                  <SocialMediaBtn
                    icon={<FaInstagram size={20} />}
                    className="justify-content-center me-2 comments__main--share-card-btn btn-instagram"
                  />
                  <SocialMediaBtn
                    icon={<FaTelegramPlane size={20} />}
                    className="justify-content-center me-2 comments__main--share-card-btn btn-telegram"
                  />
                  <SocialMediaBtn
                    icon={<TbBrandYoutube size={20} />}
                    className="justify-content-center me-2 comments__main--share-card-btn btn-youtube"
                  />
                </Card>

                {/********** rating part **********/}
                <h4 className="mt-5 comments__main--rating-title">
                  Current Rating
                </h4>
                {recipesCommentsData.length > 0 ? (
                  <Card className="comments__main--rating-card flex-column">
                    <span className="comments__main--rating-card--title d-block">
                      {totalRating > 1 ? `${totalRating}.0 stars` : "1 star"}{" "}
                      {recipesCommentsData.length > 1
                        ? `(${recipesCommentsData.length} reviews)`
                        : "(1 review)"}
                    </span>
                    <AnimatedProgressBar
                      className="comments__main--rating-card--progressbar"
                      label="Cost"
                      percent={costPercentTotal}
                      color1="#09C"
                      color2="#F44"
                    />
                    <AnimatedProgressBar
                      className="comments__main--rating-card--progressbar"
                      label="Time"
                      percent={timePercentTotal}
                      color1="#C09"
                      color2="#4F4"
                    />
                    <AnimatedProgressBar
                      className="comments__main--rating-card--progressbar"
                      label="Difficulty"
                      percent={difficultyPercentTotal}
                      color1="#90C"
                      color2="#44F"
                    />
                    <AnimatedProgressBar
                      className="comments__main--rating-card--progressbar"
                      label="Healthy"
                      percent={healthyPercentTotal}
                      color1="#C90"
                      color2="#F44"
                    />
                  </Card>
                ) : (
                  <div className="comments__main--rating-card">
                    <p>No Rating</p>
                  </div>
                )}
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default RecipeSinglePageMain;

const Wrapper = styled.section`
  .recipe-single-page__main {
    display: block;
    position: relative;
    z-index: 5;
    background-color: var(--white) !important;
    height: fit-content;
    padding: 8rem 2rem;
    .recipe-single-page__icon {
      transform: translateY(-0.2rem) !important;
    }

    /********** description part **********/
    .description__main {
      padding-right: 3rem;
      .description__main--title {
        font-weight: 900;
      }
      .description__main--txt {
        font-weight: 300;
        line-height: 1.5rem;
        font-size: var(--smallFontSize);
        text-align: justify;
        padding-top: 1rem;
        a {
          color: var(--orange);
        }
        a:hover {
          color: var(--orange);
          text-decoration: underline !important;
        }
      }
    }
    .description__sidebar {
      box-shadow: var(--shadow);
      border-radius: var(--borderRadius);
      padding: 1rem;
      background-color: var(--light);
      height: inherit;
      .description__sidebar--info-table {
        font-size: var(--smallFontSize) !important;
        .description__sidebar--info-row {
          padding: 1rem 0;
          border-bottom: 0.05rem dashed var(--gray-opacity3);
          color: var(--dark);
          font-weight: 500;
          display: flex;
          justify-content: space-between;
        }
        .description__sidebar--info-value,
        .description__main--info-value-link {
          color: var(--gray);
          font-weight: 300;
        }
        .description__main--info-value-link:hover {
          color: var(--orange);
          text-decoration: underline !important;
        }
      }
    }

    /********** ingredients part **********/
    .ingredients__main {
      margin-top: 5rem;
      text-align: justify;
      .ingredients__main--title {
        font-weight: 900;
      }
      .ingredients__main--txt {
        padding-left: 1rem;
        font-weight: 400;
      }
      .ingredients__main-ingredient-img {
        width: 3rem;
        height: 3rem;
      }
      .ingredients__main--ingredient-name {
        color: var(--gray);
        font-size: calc(var(--bodyFontSize) + 0.2rem);
      }
    }

    /********** instructions part **********/
    .instructions__main {
      margin-top: 5rem;
      text-align: justify;
      .instructions__main--title {
        font-weight: 900;
      }
      .instructions__main--txt {
        padding-left: 1rem;
        font-weight: 400;
      }
      .instructions__main--step {
        color: var(--gray);
        font-size: calc(var(--bodyFontSize) + 0.2rem);
        padding-left: 1rem;
      }
      .instructions__main--step-num {
        color: var(--orange);
        font-weight: 700;
        line-height: 2rem;
      }
      .recipe-single-page__main--no-instruction {
        padding-left: 1rem;
        padding-bottom: 1.5rem;
      }
    }

    /********** author part **********/
    .author__main {
      margin-top: 5rem;
      text-align: justify;
      .author__main--title {
        font-weight: 900;
      }
      .author__main--card {
        border: none;
        flex-direction: row;
        border-radius: var(--borderRadius);
        background-color: var(--white);
        margin-top: 2rem;
        .author__main--card--left {
          width: 6rem;
          min-width: 6rem;
          height: 6rem;
          min-height: 6rem;
          border-radius: 50%;
          padding: 0.3rem;
          border: 0.125rem solid var(--gray);
          overflow: auto;
          position: relative;
          .author__main--card--img {
            border-radius: 50%;
            height: 100%;
            min-height: 100%;
          }
        }
        .author__main--card--body {
          padding: 0 0 0 2rem;
          .author__main--card--txt {
            color: var(--gray);
          }
          .author__main--card--title {
            font-size: var(--headingFontSize) !important;
            color: var(--dark);
            font-weight: 900 !important;
            margin-bottom: 0.8rem !important;
          }
          .author__main--card--social {
            display: flex;
            .author__main--card--social-item {
              width: fit-content !important;
              padding: 0.5rem !important;
              margin-right: 0.5rem !important;
              color: var(--orange) !important;
              border: 0.05rem solid var(--orange) !important;
              height: fit-content !important;
            }
            .author__main--card--social-item::before {
              background-color: var(--orange) !important;
            }
            .author__main--card--social-item:hover {
              color: var(--light) !important;
              background-color: var(--orange) !important;
            }
          }
        }
      }
      .author__main--related {
        margin-top: 3rem;
        .author__main--related--card {
          border: none;
          margin: 0 1rem;
          background-color: var(--white);
          overflow: hidden;
          .author__main--related--card-top {
            overflow: hidden;
            border-radius: var(--borderRadius);
            .author__main--related--card-img {
              border-radius: var(--borderRadius);
              overflow: hidden;
              height: 35vh;
              z-index: 7;
              transition: var(--transition-fast);
            }
            .author__main--related--card-img::after {
              content: "";
              overflow: hidden;
              width: 100%;
              z-index: 15;
            }
            .author__main--related--card-img:hover {
              transform: scale(1.1);
              opacity: 0.9;
            }
          }
          .author__main--related--card-body {
            padding: 0.5rem 0;
            .author__main--related--card-title {
              width: 100%;
              text-align: start;
              font-family: var(--bodyFont);
              font-weight: 800;
              font-size: calc(var(--bodyFontSize) + 0.3rem);
              color: var(--dark);
              transition: var(--transition-fast);
            }
            .author__main--related--card-title:hover {
              color: var(--orange);
            }
          }
        }
      }
    }

    /********** related recipes part **********/
    .related__main {
      margin-top: 5rem;
      text-align: justify;
      .related__main--title {
        font-weight: 900;
      }
      .related__main--row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin: 2rem 0 0 0;
        gap: 2rem;
        .related__main--card {
          border: none;
          overflow: hidden;
          background-color: var(--white);
          flex-direction: row;
          .related__main--card-left {
            overflow: hidden;
            border-radius: var(--borderRadius);
            height: 15vh;
            width: 10vw;
            .related__main--card-img {
              border-radius: var(--borderRadius);
              overflow: hidden;
              height: inherit;
              width: inherit;
              z-index: 7;
              transition: var(--transition-fast);
            }
            .related__main--card-img::after {
              content: "";
              overflow: hidden;
              width: 100%;
              z-index: 15;
            }
            .related__main--card-img:hover {
              transform: scale(1.1);
              opacity: 0.9;
            }
          }
          .related__main--card-body {
            padding: 0 0 0 1.2rem;
            .related__main--card-title {
              width: 100%;
              text-align: start;
              font-family: var(--bodyFont);
              font-weight: 800;
              font-size: calc(var(--bodyFontSize) + 0.2rem);
              transition: var(--transition-fast);
              color: var(--dark);
            }
            .related__main--card-title:hover {
              color: var(--orange);
            }
            .related__main--card-badges {
              width: 100%;
              margin-top: 0.5rem;
              text-align: start;
              font-family: var(--bodyFont);
              font-size: var(--smallFontSize);
              color: var(--gray);
              display: flex;
              justify-content: flex-start;
            }
            .related__main--card-icon {
              color: var(--orange);
              margin-right: 0.3rem;
            }
            .related__main--card-author {
              .related__main--card-author-link {
                color: var(--gray);
                font-weight: 700 !important;
              }
              .related__main--card-author-link:hover {
                color: var(--orange) !important;
              }
            }
          }
        }
      }
    }

    /********** comment & review part **********/
    .comments__main {
      margin-top: 5rem;
      display: flex;

      /********** reading comments part **********/
      .comments__main--reading-title {
        font-weight: 900;
      }
      .comments__main--reading-card {
        border: none;
        display: flex;
        flex-direction: row;
        justify-content: center;
        box-shadow: var(--shadow);
        margin: 1rem 3rem 1rem 1rem;
        padding: 1.5rem;
        border-radius: var(--borderRadius);
        width: 100%;
        .comments__main--reading-card--left {
          border-radius: 50%;
          border: 0.125rem solid var(--gray);
          height: 4rem;
          width: 4rem;
          overflow: hidden;
          padding: 0.3rem;
          .comments__main--reading-card--img {
            height: 100%;
            width: 100%;
          }
        }
        .comments__main--reading-card--body {
          width: 85%;
          padding: 0 1rem;
          .comments__main--reading-card--title {
            font-weight: 900;
          }
          .comments__main--reading-card--stars {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            font-size: var(--smallFontSize);
            color: var(--gray);
            margin-top: 1.5rem;
            font-weight: 700;
          }
          .comments__main--reading-card--text {
            font-size: var(--smallFontSize);
            font-weight: 300;
            color: var(--gray);
            margin-top: 1.5rem;
          }
          .comments__main--reading-card--date {
            font-size: var(--extrasmallFontSize);
            font-weight: 300;
            margin-top: 1.5rem;
            color: var(--gray);
          }
        }
      }

      /********** writting comment part **********/
      .comments__main--writting-title {
        font-weight: 900;
      }
      .comments__main--writting-form {
        margin-right: 3rem;

        /* stars */
        .comments__main--writting-form--stars {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          .star-error .comments__main--writting-form--star {
            border-radius: calc(var(--borderRadius) + 1.5rem);
            border: 0.125rem solid var(--red-dark);
          }
          .comments__main--writting-form--star {
            width: fit-content;
            padding: 0.2rem 0.5rem;
            margin-bottom: 0.5rem;
          }
        }

        /* alert */
        .comments__main--writting-form--alert {
          position: fixed;
          top: 5%;
          width: 50%;
          left: 25%;
          z-index: 5;
          text-align: center;
          .alert {
            animation: moveDownToUp 1s ease-in;
            transition: var(--transition-fast);
          }
        }

        /* form */
        .comments__main--writting-form--inputs {
          .comments__main--writting-form--input {
            width: 90%;
            border-radius: calc(var(--borderRadius) + 1.5rem);
            border: 0.05rem solid var(--gray-opacity7);
            color: var(--dark);
            margin-bottom: 1rem;
            padding: 0.8rem 1.5rem;
            font-weight: 500;
            transition: var(--transition-fast);
          }
          textarea {
            border-radius: var(--borderRadius) !important;
          }
          .comments__main--writting-form--input:focus {
            background: var(--light);
            border: 0.125rem solid var(--orange);
          }
          .comments__main--writting-form--input::placeholder {
            font-weight: 400;
            color: var(--gray);
          }
          .comments__main--writting-form--input:focus::placeholder {
            opacity: 0.8;
          }
          .input-error .comments__main--writting-form--input {
            border-radius: calc(var(--borderRadius) + 1.5rem);
            border: 0.125rem solid var(--red-dark);
          }
          .input-error .comments__main--writting-form--input:focus {
            border: 0.125rem solid var(--orange);
            background-color: var(--light);
          }
          .input-error .comments__main--writting-form--input::placeholder {
            color: var(--red-dark);
            font-weight: 700;
          }
          .input-error
            .comments__main--writting-form--input:focus::placeholder {
            color: var(--orange);
          }

          /* form btn */
          .comments__main--writting-form--btn {
            width: 30%;
            border: 0.125rem solid var(--orange) !important ;
            color: var(--white) !important;
            background-color: var(--orange);
          }
          .comments__main--writting-form--btn:hover {
            color: var(--orange) !important;
            background-color: var(--white);
          }
          .comments__main--writting-form--btn::before {
            background-color: var(--white);
            width: 100%;
          }
        }
      }

      /********** share part **********/
      .comments__main--share-title {
        font-weight: 900;
      }
      .comments__main--share-card {
        border: none;
        margin-top: 2rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        box-shadow: var(--shadow);
        padding: 1.5rem;
        border-radius: var(--borderRadius);
        .comments__main--share-card-btn {
          border-radius: var(--borderRadius);
          padding: 0;
          width: 4rem;
          height: 3rem;
          margin-bottom: 0;
          .social-media__icon {
            position: relative !important;
            display: flex;
            left: auto !important;
            top: auto !important;
            justify-content: center;
            align-items: center;
          }
        }
        .comments__main--share-card-btn:hover {
          opacity: 0.8;
        }
        .btn-facebook {
          background-color: blue !important;
        }
        .btn-instagram {
          background-color: DarkOrange !important;
        }
        .btn-telegram {
          background-color: cornflowerblue !important;
        }
        .btn-youtube {
          background-color: red !important;
        }
      }

      /********** rating part **********/
      .comments__main--rating-title {
        font-weight: 900;
      }
      .comments__main--rating-card {
        border: none;
        margin-top: 2rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        box-shadow: var(--shadow);
        padding: 1.5rem;
        border-radius: var(--borderRadius);
        .comments__main--rating-card--title {
          color: var(--gray);
          letter-spacing: var(--letterSpacing);
          margin-bottom: 1.5rem;
        }
        .comments__main--rating-card--progressbar {
          font-size: var(--smallFontSize);
          margin-bottom: 0.5rem;
        }
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 1300px) {
      /* author */
      .author__main--related--card-img {
        height: 30vh !important;
      }

      /* comments */
      .comments__main--share-card {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr);
        .comments__main--share-card-btn {
          margin: 0.2rem auto !important;
          width: 7rem !important;
        }
      }
    }
    @media only screen and (max-width: 1200px) {
      /* comments */
      .comments__main {
        .comments__main--reading-card--stars {
          display: block !important;
        }
        .comments__main--writting-form--btn {
          width: 35% !important;
        }
        .comments__main--share-card {
          .comments__main--share-card-btn {
            width: 6rem !important;
          }
        }
      }
    }
    @media only screen and (max-width: 992px) {
      /* author */
      .author__main--related--card {
        .author__main--related--card-img {
          height: 28vh !important;
        }
        .author__main--related--card-title {
          font-size: calc(var(--bodyFontSize) + 0.2rem) !important;
        }
      }

      /* related */
      .related__main--row {
        .related__main--card {
          flex-direction: column !important;
          .related__main--card-left {
            height: 35vh !important;
            width: 35vw !important;
          }
          .related__main--card-body {
            padding: 1rem 0 0 0.8rem !important;
          }
          .related__main--card-badges {
            margin: 0.5rem 0 !important;
          }
        }
      }

      /* comments */
      .comments__main {
        flex-direction: column;
        .comments__main--reading-card {
          margin-right: 1rem;
        }
        .comments__main--writting-form {
          margin-right: 0;
          .comments__main--writting-form--inputs {
            text-align: center !important;
          }
          .comments__main--writting-form--btn {
            width: 90% !important;
          }
        }
        .comments__main--share-card {
          display: flex !important;
          .comments__main--share-card-btn {
            width: 16vw !important;
            margin: 0 0.2rem !important;
          }
        }
      }
    }
    @media only screen and (max-width: 768px) {
      /* related */
      .related__main--row {
        .related__main--card {
          flex-direction: column !important;
          .related__main--card-left {
            width: 40vw !important;
          }
        }
      }

      /* comments */
      .comments__main {
        .comments__main--share-card {
          .comments__main--share-card-btn {
            width: 18vw !important;
          }
        }
      }
    }
    @media only screen and (max-width: 576px) {
      /* description */
      .description__main--title {
        font-size: calc(var(--bodyFontSize) + 0.7rem) !important;
      }

      /* ingredients */
      .ingredients__main {
        text-align: start;
        .ingredients__main--ingredient-name {
          font-size: var(--bodyFontSize) !important;
        }
      }

      /* ingredients */
      .instructions__main {
        .instructions__main--step {
          font-size: var(--bodyFontSize) !important;
        }
      }

      /* author */
      .author__main {
        .swiper-slide {
          justify-content: center;
        }
        .author__main--related--card {
          width: 100%;
          .author__main--related--card-img {
            height: 35vh !important;
          }
        }
        .author__main--related--card-img {
          height: 35vh !important;
        }
      }

      /* related */
      .related__main--row {
        grid-template-columns: repeat(1, 1fr) !important;
        gap: 1.5rem !important;
        .related__main--card {
          margin-bottom: 1rem !important;
          .related__main--card-left {
            height: 50vh !important;
            width: 80vw !important;
          }
          .related__main--card-body {
            padding: 1rem 0 0 1.5rem !important;
          }
        }
      }
    }
    @media only screen and (max-width: 450px) {
      /* description */
      .description__sidebar--info-row {
        flex-direction: column;
        .description__sidebar--info-value {
          text-align: start !important;
          padding-left: 2rem;
        }
      }

      /* ingredients */
      .ingredients__main {
        text-align: start;
        .ingredients__main--ingredient-name {
          font-size: var(--smallFontSize) !important;
        }
      }

      /* ingredients */
      .instructions__main {
        .instructions__main--step {
          font-size: var(--smallFontSize) !important;
        }
      }

      /* author */
      .author__main--card {
        flex-direction: column !important;
        .author__main--card--body {
          padding: 1rem 0 0 1rem !important;
        }
        .author__main--related--card-img {
          height: 30vh !important;
        }
      }

      /* related */
      .related__main--row {
        .related__main--card {
          .related__main--card-left {
            height: 35vh !important;
            width: 80vw !important;
          }
          .related__main--card-body {
            padding: 1rem 0 0 0.5rem !important;
          }
        }
      }

      /* comments */
      .comments__main {
        .comments__main--reading-card {
          flex-direction: column !important;
          .comments__main--reading-card--left {
            margin: 1rem;
          }
          .comments__main--reading-card--body {
            width: 100%;
            .comments__main--reading-card--title {
              margin-left: 0.8rem !important;
            }
            .comments__main--reading-card--stars {
              section {
                flex-direction: column !important;
                margin-bottom: 0.8rem;
              }
            }
          }
        }
        .comments__main--writting-form--stars {
          display: block !important;
        }
        .comments__main--share-card {
          display: grid !important;
          .comments__main--share-card-btn {
            width: 28vw !important;
            margin-bottom: 0.5rem !important;
          }
        }
      }
    }
  }
`;
