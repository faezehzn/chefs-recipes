import styled from "styled-components";
import { Col, Container, Row, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import chef from "../assets/images/chefs/chef.png";
import { useCustomContext } from "../context/customContext";
import CustomButton from "../utilities/CustomButton";
import { FaPhoneAlt, FaInstagram, FaStar } from "react-icons/fa";
import { GrFacebookOption, GrMail } from "react-icons/gr";
import {
  GetCapitalize,
  GetSlug,
  GetString,
} from "../utilities/StringSlugConverter";
import { useEffect, useState } from "react";
import Pagination from "../utilities/Pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Keyboard } from "swiper";
import TrackVisibility from "react-on-screen";
import moment from "moment/moment";

const ChefProfileMain = () => {
  const { location, allRecipesData, data, setTitlePage } = useCustomContext();
  let totalRating;
  const handleCustomTitle = (titleRecipe)=> {
    const singleCommentData = data.recipesCommentsfilter((item) => item.recipeTitle === titleRecipe)
    if(singleCommentData.length > 1) {
      totalRating = Math.ceil(singleCommentData.map((i) =>
      Math.ceil(
        (Number(i.cost) +
          Number(i.difficulty) +
          Number(i.time) +
          Number(i.healthy)) /
          4
        )
      ).reduce((sum, curr) => sum + Number(curr), 0) / singleCommentData.length)
    } else if (singleCommentData.length === 1) {
      totalRating = singleCommentData.map((i) =>
      Math.ceil(
        (Number(i.cost) +
          Number(i.difficulty) +
          Number(i.time) +
          Number(i.healthy)) /
          4
        )
      )
    } else {
      totalRating = 0
    }
    return totalRating
  }
  
  const relatedRecipes = allRecipesData.filter(
    (item) =>
      item.sourceName.toLowerCase() === GetString(location.pathname.slice(9))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  // recipe data
  // const recipesHaveComment = relatedRecipes.filter((item) => data.recipesCommentsfind((i)=> i.recipeTitle === item.title));

  // comments data
  const commentsOfRelatedRecipes = data.recipesComments.filter((item) =>
    relatedRecipes.find((i) => i.title === item.recipeTitle)
  );
  console.log(commentsOfRelatedRecipes)
  const totalAuthorRating = Math.ceil(
    commentsOfRelatedRecipes
      .map((i) =>
        Math.ceil(
          (Number(i.cost) +
            Number(i.difficulty) +
            Number(i.time) +
            Number(i.healthy)) /
            4
        )
      )
      .reduce((sum, curr) => sum + Number(curr), 0) / commentsOfRelatedRecipes.length
  );

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

  useEffect(() => {
    setTitlePage(
      GetCapitalize(GetString(location.pathname.slice(9))) + " - Chef's Recipes"
    );
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

  return (
    <Wrapper>
      <Container fluid className="chef-profile__main">
        <Row className="justify-content-center">

          {/********** left part **********/}
          <Col xl={3} lg={4} className="chef-profile__main--left">
            <Card className="left__card">
              <div className="left__card--left">
                <Card.Img
                  className="left__card--img"
                  src={chef}
                  alt={GetCapitalize(location.pathname)}
                />
              </div>
              <Card.Body className="left__card--body">
                <Card.Title className="left__card--title">
                  {location.pathname.slice(9).length > 20
                    ? GetCapitalize(
                        GetString(location.pathname.slice(9))
                      ).slice(0, 20) + "..."
                    : GetCapitalize(GetString(location.pathname.slice(9)))}
                </Card.Title>
                {commentsOfRelatedRecipes.length > 0 ? (
                  <Card.Text className="left__card--rating">
                    <span className="d-flex align-items-center left__card--badge">
                      {`${totalAuthorRating}.0`}{" "}
                      <FaStar className="ms-2" color="var(--light)" />
                    </span>
                    <span className="left__card--txt">
                      {commentsOfRelatedRecipes.length > 1
                        ? `${commentsOfRelatedRecipes.length} Reviews`
                        : "1 Review"}
                    </span>
                  </Card.Text>
                ) : (
                  <span className="left__card--txt">No Review</span>
                )}
              </Card.Body>
            </Card>
            <Card className="left__card card__contact">
              <Card.Body className="left__card--body">
                <Card.Title className="left__card--title">Contact</Card.Title>
                <div className="left__card--social">
                  <a href="tel:+98-912-345-6789">
                    <CustomButton
                      className="left__card--social-item"
                      classNameParent="m-0"
                      textBtn={<FaPhoneAlt size={15} />}
                    />
                  </a>
                  <a href="mailto:example@gmail.com">
                    <CustomButton
                      className="left__card--social-item"
                      classNameParent="m-0"
                      textBtn={<GrMail size={15} />}
                    />
                  </a>
                  <a href="https://www.facebook.com">
                    <CustomButton
                      className="left__card--social-item"
                      classNameParent="m-0"
                      textBtn={<GrFacebookOption size={15} />}
                    />
                  </a>
                  <a href="https://www.instagram.com">
                    <CustomButton
                      className="left__card--social-item"
                      classNameParent="m-0"
                      textBtn={<FaInstagram size={15} />}
                    />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/********** right part **********/}
          <Col xl={7} lg={8} className="chef-profile__main--right">
            <h3 className="right__title mb-4">{`${GetString(
              location.pathname.slice(9)
            )}'s Recipes`}</h3>
            <div className="right__relateds">
              {relatedRecipes
                .slice(firstItemIndex, lastItemIndex)
                .map((item, index) => {
                  return (
                    <Card key={index} className="right__relateds--card">
                      <Link
                        reloadDocument
                        to={`/recipes/${GetSlug(item.title.toLowerCase())}`}
                      >
                        <div className="right__relateds--card--left">
                          <Card.Img
                            className="right__relateds--card--img"
                            src={item.image}
                            alt={item.title}
                          />
                        </div>
                      </Link>
                      <Card.Body className="right__relateds--card--body">
                        <Link
                          reloadDocument
                          to={`/recipes/${GetSlug(item.title.toLowerCase())}`}
                        >
                          <Card.Title className="right__relateds--card--title">
                            {item.title.length > 25
                              ? item.title.slice(0, 25) + "..."
                              : item.title}
                          </Card.Title>
                        </Link>
                        <Card.Text className="right__relateds--card--badges">
                          <Badge className="me-2 d-flex align-items-center right__relateds--card--badge">
                            {item.readyInMinutes} min
                          </Badge>
                          {data.recipesCommentslength > 0 && handleCustomTitle(item.title) !== 0 ?
                          <Badge className="d-flex align-items-center right__relateds--card--badge">{handleCustomTitle(item.title)}
                          <FaStar className="ms-2" color="var(--light)" /></Badge> : null}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  );
                })}
            </div>
            {relatedRecipes.length > itemsPerPage && <Pagination
              className="mt-5"
              totalItems={relatedRecipes.length}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />}
            <h4 className="right__title mb-1" style={{ marginTop: "5rem" }}>
              Reviews{" "}
              {data.recipesCommentslength > 0 &&
                commentsOfRelatedRecipes.length > 0 &&
                (commentsOfRelatedRecipes.length > 1
                  ? ` - ${commentsOfRelatedRecipes.length} comments`
                  : ` - ${commentsOfRelatedRecipes.length} comment`)}
            </h4>
            <div className="right__reviews">
            {data.recipesComments.length > 0 && commentsOfRelatedRecipes.length > 0 ? (
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
                    loop={true}
                    slidesPerView={1}
                    modules={[Autoplay, Keyboard]}
                    className="d-flex"
                  >
                    {commentsOfRelatedRecipes.map((item, i) => {
                      return (
                        <SwiperSlide className="d-flex" key={item.id}>
                          <Card className="right__reviews--card">
                            <Card.Body className="right__reviews--card--body">
                              <div className="d-flex justify-content-start align-items-start align-items-sm-center flex-column flex-sm-row">
                                <Card.Title className="my-1 me-4 right__reviews--card--title">
                                  {item.name}
                                </Card.Title>
                                <Card.Title className="my-1 right__reviews--card--text" style={{fontWeight: "500"}}>{item.recipeTitle.length > 20 ? `${item.recipeTitle.slice(0, 20)}...` : item.recipeTitle}</Card.Title>
                              </div>
                              <p className="right__reviews--card--text">
                                {item.comment}
                              </p>
                              <p className="right__reviews--card--date">
                                {moment(`${item.createdOn}`).fromNow() || item.createdOn}
                              </p>
                            </Card.Body>
                            <div className="right__reviews--card--right">
                              <Card.Text className="right__reviews--card--badges">
                                <Badge className="me-2 d-flex align-items-center right__reviews--card--badge">{Math.ceil(
                                  (Number(item.cost) +
                                    Number(item.difficulty) +
                                    Number(item.time) +
                                    Number(item.healthy)) /
                                    4)}
                                <FaStar className="ms-2" color="var(--light)" /></Badge>
                                <Badge className="d-flex align-items-center right__reviews--card--badge right__reviews--card--btn">
                                  <Link className="right__reviews--card--btn" reloadDocument to={`/recipes/${GetSlug(item.recipeTitle.toLowerCase())}#reviews`}>View Review</Link>
                                </Badge>
                              </Card.Text>
                            </div>
                            <p className="d-flex justify-content-center" style={{color: "var(--gray)", fontSize: "var(--extrasmallFontSize)", margin: "0.5rem 0"}}>{`${i+1}/${commentsOfRelatedRecipes.length}`}</p>
                          </Card>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
              </TrackVisibility>
              ) : (
                <Card
                  className="flex-column right__reviews--card no-comment"
                >
                  <h5 className="d-block">NO Comment</h5>
                  <p>Be the first to post your review</p>
                </Card>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ChefProfileMain;

const Wrapper = styled.section`
  .chef-profile__main {
    display: block;
    position: relative;
    z-index: 5;
    background-color: var(--light) !important;
    height: fit-content;
    padding: 7rem 2rem;

    /* left */
    .chef-profile__main--left {
      margin-right: 1.5rem;
      .left__card {
        border: none;
        flex-direction: row;
        border-radius: var(--borderRadius);
        background-color: var(--light);
        .left__card--left {
          width: 5.5rem;
          min-width: 5.5rem;
          height: 5.5rem;
          min-height: 5.5rem;
          border-radius: 50%;
          padding: 0.3rem;
          border: 0.3rem solid var(--white);
          box-shadow: var(--shadow);
          overflow: auto;
          position: relative;
          .left__card--img {
            border-radius: 50%;
            height: 100%;
            min-height: 100%;
          }
        }
        .left__card--body {
          padding: 0 0 0 1.5rem;
          .left__card--title {
            color: var(--dark);
            font-weight: 900 !important;
            margin-bottom: 1.2rem !important;
          }
          .left__card--social {
            display: flex;
            .left__card--social-item {
              width: fit-content !important;
              padding: 0.5rem !important;
              margin-right: 0.5rem !important;
              color: var(--orange) !important;
              border: 0.05rem solid var(--orange) !important;
              height: fit-content !important;
            }
            .left__card--social-item::before {
              background-color: var(--orange) !important;
            }
            .left__card--social-item:hover {
              color: var(--light) !important;
              background-color: var(--orange) !important;
            }
          }
          .left__card--rating {
            display: flex;
            margin-bottom: 0.5rem;
            height: 1.8rem !important;
            .left__card--badge {
              background-color: var(--orange) !important;
              border-radius: calc(var(--borderRadius) + 0.5rem) !important;
              margin-right: 0.5rem;
              padding: 0 0.8rem !important;
              color: var(--light);
              font-size: calc(var(--extrasmallFontSize) + 0.1rem);
              height: 1.6rem;
            }
          }
          .left__card--txt {
            color: var(--gray) !important;
          }
        }
      }
      .card__contact {
        box-shadow: var(--shadow);
        background-color: var(--white);
        padding: 2rem 1rem;
        margin-top: 3rem;
      }
    }

    /* right */
    .chef-profile__main--right {
      .right__title {
        font-weight: 900;
        margin-bottom: 2rem;
      }
      .right__relateds {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin-left: 1rem;
        gap: 1.5rem;
        .right__relateds--card {
          border: none;
          overflow: hidden;
          background-color: var(--light);
          flex-direction: row;
          .right__relateds--card--left {
            overflow: hidden;
            border-radius: var(--borderRadius);
            height: 15vh;
            width: 10vw;
            .right__relateds--card--img {
              border-radius: var(--borderRadius);
              overflow: hidden;
              height: 100%;
              width: 100%;
              transition: var(--transition-fast);
            }
            .right__relateds--card--img::after {
              content: "";
              overflow: hidden;
              width: 100%;
              z-index: 15;
            }
            .right__relateds--card--img:hover {
              transform: scale(1.1);
              opacity: 0.9;
            }
          }
          .right__relateds--card--body {
            padding: 0 1.5rem;
            .right__relateds--card--title {
              width: 100%;
              text-align: start;
              font-weight: 800;
              font-size: calc(var(--bodyFontSize) + 0.2rem);
              transition: var(--transition-fast);
              color: var(--dark);
            }
            .right__relateds--card--title:hover {
              color: var(--orange);
            }
            .right__relateds--card--badges {
              display: flex;
              .right__relateds--card--badge {
                background-color: var(--orange) !important;
                border-radius: calc(var(--borderRadius) + 0.5rem) !important;
                padding: 0 0.7rem !important;
                color: var(--light);
                font-size: calc(var(--extrasmallFontSize) + 0.1rem) !important;
                height: 1.6rem;
                font-weight: 400;
              }
            }
          }
        }
      }
      .right__reviews {
        .right__reviews--card {
          border: none;
          display: flex;
          flex-direction: row;
          justify-content: center;
          box-shadow: var(--shadow);
          padding: 1.5rem;
          border-radius: var(--borderRadius);
          width: 58vw;
          margin: 1rem;
          .right__reviews--card--right {
            display: flex;
            align-items: center;
            .right__reviews--card--badges {
              display: flex;
              .right__reviews--card--badge {
                background-color: var(--orange) !important;
                border-radius: calc(var(--borderRadius) + 0.5rem) !important;
                padding: 0 0.7rem !important;
                color: var(--light);
                font-size: calc(var(--extrasmallFontSize) + 0.1rem) !important;
                height: 1.6rem;
                font-weight: 400;
              }
              .right__reviews--card--btn {
                background-color: var(--light) !important;
                color: var(--gray) !important;
              }
              .right__reviews--card--btn:hover {
                opacity: 0.8;
              }
            }
          }
          .right__reviews--card--body {
            width: 85%;
            padding: 0 1rem;
            .right__reviews--card--title {
              font-weight: 900;
            }
            .right__reviews--card--stars {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              font-size: var(--smallFontSize);
              color: var(--gray);
              margin-top: 1.5rem;
              font-weight: 700;
            }
            .right__reviews--card--text {
              font-size: var(--smallFontSize);
              font-weight: 300;
              color: var(--gray);
              margin-top: 1.5rem;
            }
            .right__reviews--card--date {
              font-size: var(--extrasmallFontSize);
              font-weight: 500;
              margin-top: 1.5rem;
              color: var(--dark) !important;
            }
          }
        }
      }
      .no-comment {
        width: 100% !important;
        margin-top: 2rem;
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 1200px) {
      .chef-profile__main--left {
        margin: 0 !important;
      }
    }
    @media only screen and (max-width: 992px) {
      padding: 10rem 2rem;
      .chef-profile__main--left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3rem !important;
        .card__contact {
          margin-top: 0rem;
        }
      }
      .chef-profile__main--right {
        .right__reviews--card {
          width: 85vw !important;
        }
        .no-comment {
          width: 90% !important;
        }
      }
    }
    @media only screen and (max-width: 768px) {
      .chef-profile__main--right {
        .right__relateds--card {
          flex-direction: column !important;
          .right__relateds--card--left {
            width: 100% !important;
            height: 25vh !important;
          }
          .right__relateds--card--body {
            padding: 0 !important;
            margin-top: 1rem;
          }
        }
        .right__reviews--card {
          .right__reviews--card--badges {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .right__reviews--card--badge {
              margin-bottom: 0.5rem;
            }
          }
        }
      }
    }
    @media only screen and (max-width: 576px) {
      padding: 7rem 2rem;
      .chef-profile__main--left {
        flex-direction: column;
        align-items: flex-start !important;
        .card__contact {
          margin-top: 2rem;
          width: inherit;
        }
      }
      .chef-profile__main--right {
        .right__relateds {
          grid-template-columns: 1fr !important;
          .right__relateds--card--left {
            width: 95% !important;
            height: 32vh !important;
          }
          .right__relateds--card--title {
            width: 95% !important;
          }
        }
        .right__reviews {
          .right__reviews--card {
            flex-direction: column;
            .right__reviews--card--badges {
              flex-direction: row !important;
              margin-left: 1rem;
            }
          }
        }
      }
    }
    @media only screen and (max-width: 450px) {
      .chef-profile__main--left {
        .left__card {
          .left__card--body {
            .left__card--rating {
              flex-direction: column;
              .left__card--badge {
                padding: 0.2rem 0.8rem !important;
                justify-content: center;
              }
              .left__card--txt {
                margin-top: 0.5rem;
              }
            }
          }
        }
      }
      .chef-profile__main--right {
        .right__reviews {
          .right__reviews--card {
            .right__reviews--card--body {
              width: 100% !important;
            }
            .right__reviews--card--right {
              .right__reviews--card--badges {
                flex-direction: column !important;
              }
            }
          }
        }
      }
    }
  }
`;
