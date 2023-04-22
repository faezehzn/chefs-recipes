import styled from "styled-components";
import { Col, Container, Row, Card, Alert, Badge } from "react-bootstrap";
import { useCustomContext } from "../context/customContext";
import CustomButton from "../utilities/CustomButton";
import { formatCurrency } from "../utilities/formatCurrency";
import { GetCapitalize, GetSlug } from "../utilities/StringSlugConverter";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SideBySideMagnifier } from "react-image-magnifiers";
import FullScreenImages from "../utilities/FullScreenImages";
import { GiForkKnifeSpoon, GiFoldedPaper, GiRoundStar } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Keyboard, Mousewheel } from "swiper";
import TrackVisibility from "react-on-screen";
import chef from "../assets/images/chefs/chef.png";
import StarRating from "../utilities/StarRating";
import { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Tippy from "@tippyjs/react";
import { Tooltip } from "react-tippy";
import { useEffect } from "react";
import History from "./History";
import { dataApi, LOCAL_URL } from "../context/constants";


const ProductSinglePageMain = () => {
  const {
    singleProduct,
    productsCommentsData,
    data,
    handleRelatedProducts,
    handleGetItemQuantity,
    handleIncreaseCartQuantity,
    handleDecreaseCartQuantity,
    handleRemoveFromCart,
    allProductsData, isAuthenticated, user, handleLogout
  } = useCustomContext();
  const [buttonDCart, setButtonCart] = useState("+ Add to cart");
  const [buttonDCarts, setButtonCarts] = useState("+ Add to cart");
  const [main, setMain] = useState(singleProduct.image);
  const [info, setInfo] = useState("desc");
  const [relatedProducts, setRelatedProducts] = useState(allProductsData);
  const now = new Date();

  const [buttonText, setButtonText] = useState("Submit");
  const [status, setStatus] = useState({});
  const refAlert = useRef(null);

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

  const schema = yup.object().shape({
    username: yup.string().default(user.username).required("Required"),
    email: yup.string("Please Enter valid Email").email().default(user.email).required("Required"),
    comment: yup
      .string()
      .max(500, "Must be maximum 500 characters long")
      .required("Required"),
    rating: yup.number().positive().integer().required("Required"),
    createdOn: yup.date().default(() => now.toDateString()),
    productTitle: yup.string().default(singleProduct.title),
    productImage: yup.mixed().default(singleProduct.image),
  });

  const formFormik = useFormik({
    initialValues: {
      email: (isAuthenticated ? user.email : ""),
      username: (isAuthenticated ? user.username : ""),
      comment: "",
      rating: 0,
      createdOn: now.toDateString(),
      productTitle: singleProduct.title,
      productImage: singleProduct.image,
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: schema,
  });

  const handleSubmit = async (values) => {
    setButtonText("Sending...");

    await fetch(`${dataApi}/productsComments`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
        "Access-Control-Allow-Credentials": "true",
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
    setButtonText("Submit");
  };

  const handleExtraInfoTabs = (title) => {
    if (title === "desc") {
      setInfo("desc");
    } else if (title === "add") {
      setInfo("add");
    } else if (title === "rev") {
      setInfo("rev");
    }
  };

  useEffect(() => {
    let relatedDatas = [];
    let words = [];
    const titleWords = singleProduct.title.toLowerCase().split(" ");
    const importantBadgesWords = singleProduct.importantBadges.map((item) => {
      words = [...words, ...item];
      return words;
    });
    const badgesWords = singleProduct.badges.map((item) => {
      words = [...words, ...item];
      return words;
    });
    words = [
      ...new Set(...importantBadgesWords, ...titleWords, ...badgesWords),
    ];

    for (let i = 0; i < words.length; i++) {
      const x = handleRelatedProducts(words[i]);
      relatedDatas = [...relatedDatas, ...x];
    }
    relatedDatas = [...new Set(relatedDatas)].filter(
      (item) => item.title.toLowerCase() !== singleProduct.title.toLowerCase()
    );
    setRelatedProducts(relatedDatas);
  }, [singleProduct]);

  if (window.location.hash === "#reviews") {
    window.scrollTo({
      top: 1300,
      behavior: "smooth",
    });
    setTimeout(() => {
      History.push();
      handleExtraInfoTabs("rev")
    }, 2000);
  } 

  return (
    <Wrapper>
      <Container fluid className="product-single-page__main">
        <Row className="justify-content-center">
          <Col md={10} lg={4} className="product__images">
            <FullScreenImages />
            <SideBySideMagnifier
              className="img-big"
              imageSrc={main}
              imageAlt={singleProduct.title}
              alwaysInPlace
            ></SideBySideMagnifier>
            <div className="d-flex" style={{ margin: "0 1rem" }}>
              {singleProduct.images.slice(-3).map((img, index) => {
                return (
                  <img
                    key={index}
                    className={`${
                      img === main ? " img-small active" : "img-small"
                    }`}
                    src={img}
                    alt={singleProduct.title}
                    onClick={() => setMain(singleProduct.images[index])}
                  />
                );
              })}
            </div>
          </Col>
          <Col md={10} lg={6} className="product__info">
            <div>
              <h3 className="product__title">{singleProduct.title}</h3>
              <h4 className="product__price">
                {singleProduct.spoonacularScore === 0.0 ||
                singleProduct.spoonacularScore === null ? (
                  singleProduct.price === 0.0 ? (
                    "Unavailable"
                  ) : (
                    `${formatCurrency(singleProduct.price.toFixed(2))}`
                  )
                ) : singleProduct.price === 0.0 ? (
                  "Unavailable"
                ) : (
                  <>
                    <span style={{ color: "var(--orange)" }}>{`${formatCurrency(
                      singleProduct.price.toFixed(2)
                    )}`}</span>
                    <span className="off-price">{`${formatCurrency(
                      (
                        singleProduct.price /
                        (1 - singleProduct.spoonacularScore / 100)
                      ).toFixed(2)
                    )}`}</span>
                  </>
                )}
              </h4>
              <p className="product__desc">{singleProduct.description}</p>
              <div className="product__btns">
                {isAuthenticated ? (
                  handleGetItemQuantity(singleProduct.id) === 0 ? (
                  <CustomButton
                    classNameParent="justify-content-center justify-content-lg-start m-0"
                    className="product__count-btn"
                    textBtn={buttonDCart}
                    onClick={() => handleIncreaseCartQuantity(singleProduct.id)}
                  />
                ) : (
                  <div className=" mt-3 d-lg-flex justify-content-center justify-content-lg-start">
                    <div className="d-flex align-items-center justify-content-center">
                      <CustomButton
                        classNameParent="justify-content-center m-0"
                        className="product__count-btn add-reduce-btn"
                        textBtn="-"
                        onClick={() =>
                          handleDecreaseCartQuantity(singleProduct.id)
                        }
                      />
                      <div>
                        <span className="fs-5">
                          {handleGetItemQuantity(singleProduct.id)}
                        </span>{" "}
                        in cart
                      </div>
                      <CustomButton
                        classNameParent="justify-content-center m-0"
                        className="product__count-btn add-reduce-btn"
                        textBtn="+"
                        onClick={() =>
                          handleIncreaseCartQuantity(singleProduct.id)
                        }
                      />
                    </div>
                    <CustomButton
                      classNameParent="justify-content-center m-0"
                      className="product__count-btn remove-btn"
                      textBtn="Remove"
                      onClick={() => handleRemoveFromCart(singleProduct.id)}
                    />
                  </div>
                )
                ): 
                <CustomButton
                    classNameParent="justify-content-center justify-content-lg-start m-0"
                    className="product__count-btn"
                    textBtn={buttonDCart}
                    onClick={() => setButtonCart("Must be logged in!")}
                  />}
              </div>
              {singleProduct.breadcrumbs.length > 0 && (
                <p style={{ fontWeight: "700" }}>
                  Categories:{" "}
                  {singleProduct.breadcrumbs.map((cat, i) => (
                    <span key={i} style={{ fontWeight: "300" }}>
                      <Link
                        className="product__categories"
                        reloadDocument
                        to={`/shop/categories/${GetSlug(cat)}`}
                      >
                        <i>{GetCapitalize(cat)}</i>
                      </Link>
                      {i + 1 !== singleProduct.breadcrumbs.length && ", "}
                    </span>
                  ))}
                </p>
              )}
              {singleProduct.importantBadges.length > 0 && (
                <p style={{ fontWeight: "700" }}>
                  Tags:{" "}
                  {singleProduct.importantBadges.map((tag, i) => (
                    <span key={i} style={{ fontWeight: "300" }}>
                      <Link
                        className="product__tags"
                        reloadDocument
                        to={`/shop/tags/${GetSlug(tag.replaceAll("_", "-"))}`}
                      >
                        <i>{GetCapitalize(tag.replaceAll("_", " "))}</i>
                      </Link>
                      {i + 1 !== singleProduct.importantBadges.length && ", "}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </Col>
          <Col md={10} className="product__extra-info">
            <div className="product__extra-info--titles">
              <h4
                onClick={() => handleExtraInfoTabs("desc")}
                className={
                  info === "desc"
                    ? " active product__extra-info--title"
                    : "product__extra-info--title"
                }
              >
                <GiForkKnifeSpoon />
                Description
              </h4>
              <h4
                onClick={() => handleExtraInfoTabs("add")}
                className={
                  info === "add"
                    ? " active product__extra-info--title"
                    : "product__extra-info--title"
                }
              >
                <GiFoldedPaper />
                Additional information
              </h4>
              <h4
                onClick={() => handleExtraInfoTabs("rev")}
                className={
                  info === "rev"
                    ? " active product__extra-info--title"
                    : "product__extra-info--title"
                }
                id="reviews"
              >
                <GiRoundStar />
                Reviews ({productsCommentsData.length})
              </h4>
            </div>
            <div className="product__extra-info--text">
              {info === "desc" ? (
                <div className="desc">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                    incidunt cupiditate culpa. Quia voluptatibus tempora
                    explicabo dolorum pariatur enim totam. Nulla ullam
                    asperiores animi eveniet alias aliquid! Placeat illum
                    reprehenderit voluptates sapiente praesentium temporibus
                    doloremque eius labore est, commodi explicabo.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem ea velit, consectetur eaque architecto tenetur
                    nostrum quaerat voluptate dolores eos, nemo magni dolore
                    placeat quas impedit! Dignissimos rerum minus dolor.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. In
                    quaerat officiis aspernatur ducimus commodi beatae quisquam
                    exercitationem odit eos, quod corporis maxime! Repellendus
                    sit officia iste explicabo quaerat, porro nostrum nesciunt
                    iure quae. Ratione, accusamus. Laudantium officiis repellat
                    tenetur? Fugit, non dignissimos! Quasi, soluta quisquam
                    voluptatibus, mollitia quidem reprehenderit quae aliquam
                    tenetur dolorum ipsam eum. Laborum quidem nulla odit
                    accusamus sed. Dolores, iure suscipit? Facere a consectetur
                    autem expedita quis?
                  </p>
                </div>
              ) : info === "add" ? (
                <div className="add">
                  {singleProduct.badges.length > 0 &&
                  singleProduct.ingredientList ? (
                    <table className="table table-bordered table-striped">
                      <tbody>
                        {singleProduct.badges.length > 0 && (
                          <tr>
                            <th className="table__th">Condition </th>
                            <td className="table__td">
                              {singleProduct.badges.map((badge, index) => (
                                <span key={index}>
                                  {GetCapitalize(badge.replaceAll("_", " "))}
                                  {index + 1 !== singleProduct.badges.length
                                    ? ", "
                                    : ""}
                                </span>
                              ))}
                            </td>
                          </tr>
                        )}
                        {singleProduct.ingredientList && (
                          <tr>
                            <th className="table__th">Ingredient List </th>
                            <td className="table__td">
                              {singleProduct.ingredientList}
                            </td>
                          </tr>
                        )}
                        {singleProduct.brand && (
                          <tr>
                            <th className="table__th">Brand </th>
                            <td className="table__td">{singleProduct.brand}</td>
                          </tr>
                        )}
                        {singleProduct.upc && (
                          <tr>
                            <th className="table__th">Upc </th>
                            <td className="table__td">{singleProduct.upc}</td>
                          </tr>
                        )}
                        {singleProduct.servings.number !== 0.0 && (
                          <tr>
                            <th className="table__th">Servings </th>
                            <td className="table__td">
                              {singleProduct.servings.number.toFixed(0)}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <span>No Additional Information</span>
                  )}
                </div>
              ) : (
                <div className="rev">
                  {/********** reading comment part **********/}
                  {data.productsComments.length > 0 &&
                  productsCommentsData.length > 0 ? (
                    <TrackVisibility>
                      {({ isVisible }) => (
                        <Swiper
                          spaceBetween={0}
                          grabCursor={true}
                          autoplay={{
                            delay: isVisible ? 5000 : 1200000,
                            disableOnInteraction: false,
                          }}
                          keyboard={{
                            enabled: true,
                          }}
                          mousewheel={false}
                          loop={false}
                          slidesPerView={1}
                          modules={[Autoplay, Keyboard, Mousewheel]}
                          className="d-flex"
                        >
                          {productsCommentsData.map((item, index) => {
                            return (
                              <SwiperSlide className="d-flex" key={item.id}>
                                <Card className="rev__reading-card">
                                  <div className="rev__reading-card--left">
                                    <Card.Img
                                      className="rev__reading-card--img"
                                      src={chef}
                                      alt={item.username}
                                    />
                                  </div>
                                  <Card.Body className="rev__reading-card--body">
                                    <div className="d-sm-flex mt-2 justify-content-between align-items-center">
                                      <Card.Title className=" m-0 rev__reading-card--title">
                                        {item.username}
                                      </Card.Title>
                                      <div className="d-flex align-items-center">
                                        <StarRating
                                          labelText="Rating"
                                          defaultState={Number(item.rating)}
                                          readOnly={true}
                                          className="rev__reading-card--stars my-0 me-2"
                                        />
                                        <span
                                          style={{
                                            color: "var(--gray)",
                                            fontWeight: "300",
                                            fontSize: "var(--smallFontSize)",
                                          }}
                                        >
                                          {productsCommentsData.length > 0 &&
                                            `${index + 1}/${
                                              productsCommentsData.length
                                            }`}
                                        </span>
                                      </div>
                                    </div>
                                    <p className="rev__reading-card--text">
                                      {item.comment}
                                    </p>
                                    <p className="rev__reading-card--date">
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
                    <div className="flex-column rev__reading-card">
                      <h5 className="d-block">NO Comment</h5>
                      <p>Be the first to post your review</p>
                    </div>
                  )}

                  {/********** writting comment part **********/}
                  <h4 className="mt-3 rev__writting-title">Add a Review</h4>
                  <form
                    onSubmit={formFormik.handleSubmit}
                    method="POST"
                    className="rev__writting-form"
                  >
                    {/********** stars **********/}
                    <div className="rev__writting-form--stars">
                      <Col
                        size={12}
                        sm={12}
                        className={
                          formFormik.touched.rating && formFormik.errors.rating
                            ? "star-error px-1"
                            : "px-1"
                        }
                      >
                        <StarRating
                          className={
                            formFormik.touched.rating &&
                            formFormik.errors.rating
                              ? "d-none"
                              : "rev__writting-form--star"
                          }
                          labelText="Rating"
                          formFormik={formFormik}
                        />
                        {formFormik.touched.rating &&
                          formFormik.errors.rating && (
                            <Tippy
                              placement="bottom"
                              render={(attrs) => (
                                <div className="custom__tooltip" {...attrs}>
                                  <div data-popper-arrow />
                                  {formFormik.errors.rating}
                                </div>
                              )}
                            >
                              <StarRating
                                className="rev__writting-form--star"
                                labelText="Rating"
                                formFormik={formFormik}
                              />
                            </Tippy>
                          )}
                      </Col>
                    </div>

                    {/********** alert **********/}
                    <div className="rev__writting-form--alert">
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
                      className="rev__writting-form--inputs"
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
                          formFormik.touched.comment &&
                          formFormik.errors.comment
                            ? "input-error px-1"
                            : "px-1"
                        }
                      >
                        <textarea
                          type="text"
                          rows={5}
                          className={
                            formFormik.touched.comment &&
                            formFormik.errors.comment
                              ? "d-none"
                              : "rev__writting-form--input"
                          }
                          placeholder="Your Review"
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
                                rows={5}
                                placeholder="Your Review"
                                className="rev__writting-form--input"
                                {...formFormik.getFieldProps("comment")}
                              />
                            </Tippy>
                          )}
                      </Col>
                      <Col size={12} sm={12} className="px-1">
                        <CustomButton
                          classNameParent="mx-0 justify-content-center justify-content-lg-start"
                          className="rev__writting-form--btn"
                          textBtn={buttonText}
                          type="submit"
                          disabled={isAuthenticated ? false : true}
                        />
                      </Col>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </Col>
          <Col md={10} className="product__related">
            <h4 className="product__related--title">Related Products</h4>
            <div className="product__related--row">
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
                      relatedProducts && relatedProducts.length > 4
                        ? true
                        : false
                    }
                    breakpoints={breakpointsCarousel}
                    slidesPerView={4}
                    modules={[Autoplay, Keyboard, Mousewheel]}
                    className="mt-4 d-flex"
                  >
                    {relatedProducts &&
                      relatedProducts
                        .filter((item) => item.price !== 0.0)
                        .map((item) => {
                          return (
                            <SwiperSlide key={item.id}>
                              <Card className="products__card" key={item.id}>
                                <div className="products__card--top">
                                  <Link
                                    reloadDocument
                                    to={`/shop/${GetSlug(
                                      item.title.toLowerCase()
                                    )}`}
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
                                    to={`/shop/${GetSlug(
                                      item.title.toLowerCase()
                                    )}`}
                                  >
                                    <Card.Title className="products__card--title">
                                      <Tooltip
                                        html={
                                          <p className="tooltip-style">
                                            {item.title}
                                          </p>
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
                                        `${formatCurrency(
                                          item.price.toFixed(2)
                                        )}`
                                      )
                                    ) : item.price === 0.0 ? (
                                      "Unavailable"
                                    ) : (
                                      <>
                                        {`${formatCurrency(
                                          item.price.toFixed(2)
                                        )}`}
                                        <span className="off-price">{`${formatCurrency(
                                          (
                                            item.price /
                                            (1 - item.spoonacularScore / 100)
                                          ).toFixed(2)
                                        )}`}</span>
                                      </>
                                    )}
                                  </Card.Text>
                                  {isAuthenticated ? (
                                    handleGetItemQuantity(item.id) === 0 ? (
                                    <CustomButton
                                      classNameParent="justify-content-center m-0"
                                      className="products__card--btn"
                                      textBtn="+ Add to Cart"
                                      onClick={() =>
                                        handleIncreaseCartQuantity(item.id)
                                      }
                                    />
                                  ) : (
                                    <div className=" mt-3 d-flex flex-column align-items-center">
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
                                        onClick={() =>
                                          handleRemoveFromCart(item.id)
                                        }
                                      />
                                    </div>
                                  )
                                  ) : 
                                  <CustomButton
                                    classNameParent="justify-content-center m-0"
                                    className="products__card--btn"
                                    textBtn={buttonDCarts}
                                    onClick={() =>
                                      setButtonCarts("Must be logged in!")
                                    }
                                  />}
                                </Card.Body>
                              </Card>
                            </SwiperSlide>
                          );
                        })}
                  </Swiper>
                )}
              </TrackVisibility>
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ProductSinglePageMain;

const Wrapper = styled.section`
  .product-single-page__main {
    display: block;
    position: relative;
    z-index: 5;
    background-color: var(--white) !important;
    height: fit-content;
    padding: 5rem 2rem;
    .product__images {
      display: flex;
      flex-direction: column;
      height: fit-content;
      padding: 0;
      position: relative !important;
      .img-big {
        width: 28rem;
        height: 28rem;
        box-shadow: var(--shadow);
        margin: 1rem;
        border-radius: var(--borderRadius);
        background-color: transparent;
        img {
          border-radius: var(--borderRadius);
        }
        > div {
          overflow: hidden;
          border-radius: var(--borderRadius);
        }
      }
      .img-small {
        width: 6rem;
        height: 6rem;
        box-shadow: var(--shadow);
        border-radius: var(--borderRadius);
        border: 0.05rem solid var(--gray-opacity3);
        margin: 0 0.3rem;
      }
      .active {
        border: 0.1rem solid var(--orange);
      }
    }
    .product__info {
      .product__title {
        font-weight: 900;
        font-size: var(--headingFontSize) !important;
        margin-top: 1rem;
      }
      .product__price {
        color: var(--gray);
        font-size: calc(var(--bodyFontSize) + 0.2rem) !important;
        font-weight: 700;
        display: inline-flex;
        .off-price {
          text-decoration: var(--gray-opacity7) line-through 0.1rem;
          margin-left: 0.5rem;
          color: var(--gray-opacity7);
          font-weight: 400;
          display: flex;
          align-items: flex-end;
          font-size: var(--smallFontSize);
        }
        .unavailable {
          color: var(--gray-opacity7);
        }
      }
      .product__desc {
        margin-top: 2rem;
        font-weight: 300;
        line-height: 1.5;
      }
      .product__btns {
        margin: 1.5rem 0;
        .product__count-btn {
          background-color: var(--orange) !important;
          color: var(--light) !important;
          border: none !important;
          height: 2.3rem;
          width: 8rem;
          font-size: var(--extrasmallFontSize) !important;
          font-weight: 500;
          text-transform: uppercase;
          margin: 0.7rem;
          box-shadow: var(--shadow);
        }
        .product__count-btn:hover,
        .product__count-btn::before {
          color: var(--orange) !important;
          background-color: var(--white) !important;
        }
        .add-reduce-btn {
          font-size: var(--bodyFontSize) !important;
          width: 2rem !important;
          height: 2rem !important;
          padding: 0 !important;
        }
        .remove-btn {
          background-color: var(--red-dark) !important;
        }
        .remove-btn:hover {
          color: var(--red-dark) !important;
        }
      }
      .product__categories,
      .product__tags {
        color: var(--dark) !important;
        font-weight: 300;
        :hover {
          color: var(--orange) !important;
        }
      }
    }
    .product__extra-info {
      margin-top: 7rem;
      .product__extra-info--titles {
        display: grid;
        margin: 0 auto;
        width: 80%;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        .product__extra-info--title {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 1rem;
          color: var(--gray);
          font-size: calc(var(--headingFontSize) - 0.2rem) !important;
          cursor: pointer;
        }
        .active {
          color: var(--orange);
        }
      }
      .product__extra-info--text {
        border-top: 0.05rem solid var(--gray);
        padding-top: 2rem;
        .desc {
          font-weight: 300;
        }
        .add {
          .table__th {
            vertical-align: middle;
            padding-left: 1rem;
            width: 10rem;
            font-size: var(--smallFontSize) !important;
            text-align: center;
          }
          .table__td {
            padding-left: 1rem;
            font-weight: 300;
            font-size: var(--smallFontSize) !important;
          }
        }
        .rev {
          /********** reading comments part **********/
          .rev__reading-card {
            border: none;
            display: flex;
            flex-direction: row;
            justify-content: center;
            box-shadow: var(--shadow);
            margin: 1rem;
            padding: 1rem 1.5rem;
            border-radius: var(--borderRadius);
            width: 97%;
            .rev__reading-card--left {
              border-radius: 50%;
              border: 0.125rem solid var(--gray);
              height: 3rem;
              width: 3rem;
              overflow: hidden;
              padding: 0.3rem;
              .rev__reading-card--img {
                height: 100%;
                width: 100%;
              }
            }
            .rev__reading-card--body {
              width: 85%;
              padding: 0 1rem;
              .rev__reading-card--title {
                font-weight: 900;
              }
              .rev__reading-card--stars {
                font-size: var(--smallFontSize);
                color: var(--gray);
                font-weight: 700;
                .star-label {
                  display: none;
                }
              }
              .rev__reading-card--text {
                font-size: var(--smallFontSize);
                font-weight: 300;
                color: var(--gray);
                margin: 0.5rem 0;
              }
              .rev__reading-card--date {
                font-size: var(--extrasmallFontSize);
                font-weight: 300;
                margin: 0.5rem 0;
                color: var(--gray);
              }
            }
          }

          /********** writting comment part **********/
          .rev__writting-title {
            font-weight: 700;
            font-size: var(--headingFontSize) !important;
            letter-spacing: normal !important;
            padding-left: 1rem;
          }
          .rev__writting-form {
            margin: 0 1rem;
            .rev__writting-form--stars {
              .rev__writting-form--star {
                width: fit-content;
                padding: 0.2rem 0.5rem;
              }
              .star-error .rev__writting-form--star {
                border-radius: calc(var(--borderRadius) + 1.5rem);
                border: 0.125rem solid var(--red-dark);
                margin-bottom: 0.2rem !important;
              }
            }
            .rev__writting-form--alert {
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
            .rev__writting-form--inputs {
              .rev__writting-form--input {
                width: 100%;
                border-radius: var(--borderRadius);
                border: 0.05rem solid var(--gray-opacity7);
                color: var(--dark);
                margin-bottom: 1rem;
                padding: 0.8rem 1.5rem;
                font-weight: 500;
                transition: var(--transition-fast);
              }
              .rev__writting-form--input:focus {
                border: 0.125rem solid var(--orange);
              }
              .rev__writting-form--input::placeholder {
                font-weight: 400;
                color: var(--gray);
              }
              .rev__writting-form--input:focus::placeholder {
                opacity: 0.8;
              }
              .input-error .rev__writting-form--input {
                border-radius: var(--borderRadius);
                border: 0.125rem solid var(--red-dark);
              }
              .input-error .rev__writting-form--input:focus {
                border: 0.125rem solid var(--orange);
              }
              .input-error .rev__writting-form--input::placeholder {
                color: var(--red-dark);
                font-weight: 700;
              }
              .input-error .rev__writting-form--input:focus::placeholder {
                color: var(--orange);
              }
            }
            .rev__writting-form--btn {
              width: 20%;
              border: 0.125rem solid var(--orange) !important ;
              color: var(--white) !important;
              background-color: var(--orange);
              :hover {
                color: var(--orange) !important;
                background-color: var(--white);
              }
              ::before {
                background-color: var(--white);
                width: 100%;
              }
            }
          }
        }
      }
    }
    .product__related {
      margin-top: 5rem;
      .product__related--title {
        font-weight: 900;
      }
      .product__related--row {
        .products__card {
          border: none;
          margin: 0 0.2rem;
          background-color: var(--white);
          overflow: hidden;
          .products__card--top {
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
              margin: 0.5rem;
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
            }
            .remove__btn:hover {
              color: var(--red-dark) !important;
            }
          }
        }
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 1300px) {
      .product__images {
        .img-big {
          width: 90% !important;
          height: 90% !important;
        }
      }
    }
    @media only screen and (max-width: 1200px) {
      .product__images {
        .img-small {
          width: 5rem;
          height: 5rem;
        }
      }
      .product__extra-info {
        .product__extra-info--titles {
          width: 100%;
        }
      }
    }
    @media only screen and (max-width: 992px) {
      .product__images {
        justify-content: center;
        align-items: center;
        .img-big {
          width: 70% !important;
        }
      }
    }
    @media only screen and (max-width: 576px) {
      .product__images {
        .img-big {
          width: 95% !important;
        }
      }
      .product__extra-info {
        .product__extra-info--titles {
          grid-template-columns: 1fr;
          .product__extra-info--title {
            margin-bottom: 0.8rem;
          }
        }
        .product__extra-info--text {
          .rev {
            .rev__reading-card {
              margin: 0.5 !important;
              padding: 1rem !important;
            }
            .rev__writting-form {
              .rev__writting-form--btn {
                width: 7rem !important;
              }
            }
          }
          .add {
            .table__th {
              width: fit-content;
            }
          }
        }
      }
    }
    @media only screen and (max-width: 450px) {
      .product__info {
        .product__title {
          font-size: calc(var(--bodyFontSize) + 0.2rem) !important;
        }
      }
      .product__extra-info {
        .product__extra-info--text {
          .rev__reading-card {
            flex-direction: column !important;
            .rev__reading-card--left {
              margin-left: 1rem;
            }
          }
        }
      }
    }
  }
`;
