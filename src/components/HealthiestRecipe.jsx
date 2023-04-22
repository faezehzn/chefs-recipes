import { Col, Container, Row, Card, Badge } from "react-bootstrap";
import healthiestRecipeDatas from "../assets/data/HealthiestRecipeData";
import { Link } from "react-router-dom";
import TitleTxtContainer from "../utilities/TitleTxtContainer";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Keyboard, Mousewheel } from "swiper";
import TrackVisibility from "react-on-screen";
import { GiCook } from "react-icons/gi";
import { GetSlug } from "../utilities/StringSlugConverter";
import Loading from "../utilities/Loading";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";

//   const url = `https://api.spoonacular.com/recipes/complexSearch?sort=healthiness&addRecipeInformation=true&number=6&apiKey=${process.env.REACT_APP_API_KEY}&sortDirection=descending`;

const HealthiestRecipe = () => {
  const [healthiestRecipeData, setHealthiestRecipeData] = useState([]);
  const { loading } = useCustomContext();

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

  useEffect(() => {
    // async function fetchData() {
    //   setLoading(true);

    //   await fetch(url)
    //     .then((res) => {
    //       if (res.status === 200) {
    //         console.log(res);
    //         return res.json();
    //       }
    //     })
    //     .then((data) => {
    //       console.log(data);
    //       setHealthiestRecipeData(data.results);
    //       setLoading(false);
    //     })
    //     .catch((e) => {
    //       setLoading(false);
    //       console.log(e);
    //     });
    // }
    // fetchData();

    setHealthiestRecipeData(healthiestRecipeDatas);
    // setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Container fluid className="recipes__home">
        <Row>
          <Col lg={10} className="mx-auto ">
            <TitleTxtContainer
              title={"The Healthiest Recipes"}
              text={
                "The more of your daily requirements of vitamins and minerals are covered and lower amounts of things you should limit (sugar, salt etc.) the higher the score."
              }
            />
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
                  loop={true}
                  breakpoints={breakpointsCarousel}
                  slidesPerView={4}
                  modules={[Autoplay, Keyboard, Mousewheel]}
                  className="recipes__carousel mt-4 d-flex"
                >
                  {healthiestRecipeData.map((item) => {
                    return (
                      <SwiperSlide className="d-flex" key={item.id}>
                        <Card className="recipes__cart">
                          <div className="recipes__cart--top">
                            <Badge pill className="recipe__cart--badge">
                              100%
                            </Badge>
                            <Link
                              reloadDocument
                              to={`/recipes/${GetSlug(
                                item.title.toLowerCase()
                              )}`}
                            >
                              <Card.Img
                                variant="top"
                                className="recipes__cart--img"
                                src={item.image}
                                alt={item.title}
                              />
                            </Link>
                          </div>
                          <Card.Body className="recipes__cart--body">
                            <Link
                              reloadDocument
                              to={`/recipes/${GetSlug(
                                item.title.toLowerCase()
                              )}`}
                            >
                              <Card.Title className="recipes__cart--title">
                                {item.title.length > 35
                                  ? item.title.slice(0, 35) + "..."
                                  : item.title}
                              </Card.Title>
                            </Link>
                            <Link
                              reloadDocument
                              to={`/authors/${item.sourceName
                                .replace(" ", "_")
                                .toLowerCase()}`}
                            >
                              <GiCook color="var(--orange)" />
                              <Card.Text className="recipes__cart--text">
                                {item.sourceName}
                              </Card.Text>
                            </Link>
                          </Card.Body>
                        </Card>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default HealthiestRecipe;

const Wrapper = styled.section`
  .recipes__home {
    display: block;
    position: relative;
    z-index: 5;
    background-color: var(--white) !important;
    height: 90vh;
    padding: 5rem 2rem;
    .recipes__carousel {
      .recipes__cart {
        border: none;
        margin: 0 1rem;
        background-color: var(--white);
        overflow: hidden;
        .recipes__cart--top {
          overflow: hidden;
          border-radius: var(--borderRadius);
          .recipe__cart--badge {
            position: absolute;
            top: 5%;
            z-index: 20;
            right: 5%;
            padding: 0.4rem 0.8rem;
            font-size: var(--smallFontSize);
            background-color: var(--orange) !important;
          }
          .recipes__cart--img {
            border-radius: var(--borderRadius);
            overflow: hidden;
            height: 35vh;
            z-index: 7;
            transition: var(--transition-fast);
          }
          .recipes__cart--img::after {
            content: "";
            overflow: hidden;
            width: 100%;
            z-index: 15;
          }
          .recipes__cart--img:hover {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
        .recipes__cart--body {
          padding: 0.5rem 0;
          .recipes__cart--title {
            width: 100%;
            text-align: start;
            font-family: var(--bodyFont);
            font-weight: 800;
            font-size: calc(var(--bodyFontSize) + 0.1rem);
            color: var(--dark);
            transition: var(--transition-fast);
          }
          .recipes__cart--title:hover {
            color: var(--orange);
          }
          .recipes__cart--text {
            font-size: var(--smallFontSize);
            color: var(--gray);
            display: inline-flex;
            margin-left: 0.5rem;
          }
        }
      }
    }

    /********** Slider default classes **********/
    .swiper-wrapper {
      display: flex;
    }
    .swiper-slide {
      margin: 0 !important;
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 1200px) {
      .recipes__cart--title {
        font-size: calc(var(--bodyFontSize) + 0.2rem);
      }
    }
    @media only screen and (max-width: 768px) {
      .swiper-slide {
        justify-content: center;
      }
      .recipes__cart--body {
        padding: 0.5rem;
      }
      .recipes__cart--img {
        height: 35vh;
      }
    }
    @media only screen and (max-width: 576px) {
      .recipes__cart {
        width: 75%;
        margin: 0 auto 2rem auto;
      }
      .recipes__cart--body {
        padding: 1rem;
      }
    }
    @media only screen and (max-width: 450px) {
      .recipes__home {
        height: 95vh;
      }
      .recipes__txt {
        width: 100%;
      }
      .recipes__cart {
        width: 90%;
        margin: 0 auto 2rem auto;
      }
      .recipes__cart--body {
        padding: 1rem;
      }
      .recipes__cart--img {
        height: 30vh;
      }
    }
  }
`;
