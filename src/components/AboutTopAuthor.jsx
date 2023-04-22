import styled from "styled-components";
import { Col, Container, Row, Card } from "react-bootstrap";
import TitleTxtContainer from "../utilities/TitleTxtContainer";
import { FaFacebook, FaGithub, FaGooglePlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import TrackVisibility from "react-on-screen";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel } from "swiper";
import { DynamicSort, GetSlug } from "../utilities/StringSlugConverter";
import { useCustomContext } from "../context/customContext";
import chef from "../assets/images/chefs/chef.png";


const AboutTopAuthor = () => {
  const { allRecipesData } = useCustomContext()
  const popularAuthor = allRecipesData.map((item)=> item.sourceName).reduce((acc,rec) => {
    return ({ ...acc, [rec]: (acc[rec] || 0) + 1 })
  },{})
  let sortablePopularAuthor = []

  for (var author in popularAuthor) {
    sortablePopularAuthor.push({author: author, count: popularAuthor[author]});
  }
  sortablePopularAuthor.sort(DynamicSort("count"));

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

  return (
    <Wrapper>
      <Container fluid className="about__author">
        <Row className="justify-content-center">
          <Col lg={10} className="mx-auto">
            <TitleTxtContainer
              title={"Top Recipe Authors"}
              text={
                "Explicabo vitae id repellendus, provident mollitia voluptate consequuntur ipsum pariatur iusto nobis."
              }
            />
            <div className="mt-5" style={{width: "70%", margin: "0 auto"}}>
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
                    className="my-4 d-flex"
                  >
                    {sortablePopularAuthor.slice(0, 6).map((item, index) => {
                      return (
                        <SwiperSlide
                          className="d-flex custom-swiper"
                          key={index}
                        >
                          <Card className="author__card">
                            <Link reloadDocument to={`/authors/${GetSlug(item.author.toLowerCase())}`}>
                              <Card.Header className="author__card--header">
                                <Card.Img
                                  className="author__card--img"
                                  src={chef}
                                  alt={item.author}
                                />
                              </Card.Header>
                              <Card.Title className="author__card--title">
                                {item.author}
                              </Card.Title>
                            </Link>
                            <Card.Footer className="author__card--social-media">
                              <Link className="social__item">
                                <FaFacebook size={30} color="blue" />
                              </Link>
                              <Link className="social__item">
                                <FaGithub size={30} color="var(--gray)" />
                              </Link>
                              <Link className="social__item">
                                <FaGooglePlus
                                  size={30}
                                  color="var(--red-dark)"
                                />
                              </Link>
                            </Card.Footer>
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

export default AboutTopAuthor;

const Wrapper = styled.section`
  .about__author {
    background-color: var(--white);
    position: relative;
    z-index: 5;
    display: block;
    height: fit-content;
    padding: 5rem 2rem;
    .custom-swiper {
      justify-content: center;
    }
    .author__card {
      border: none;
      justify-content: center;
      align-items: center;
      .author__card--header {
        border-radius: 50%;
        border-bottom: none;
        overflow: hidden;
        padding: 0;
        width: 7rem;
        height: 7rem;
        margin: auto;
        .author__card--img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transition: var(--transition-fast);
          padding: 0.3rem;
        }
        .author__card--img:hover {
          opacity: 0.8;
          transform: scale(1.1);
        }
      }
      .author__card--title {
        padding-top: 1.5rem;
        text-align: center;
        color: var(--dark);
        transition: var(--transition-fast);
      }
      .author__card--title:hover {
        color: var(--orange);
      }
      .author__card--social-media {
        border-top: none;
        display: flex;
        justify-content: center;
        background-color: transparent;
        .social__item {
          margin: 0 0.2rem;
        }
      }
    }
  }
`;
