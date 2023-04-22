import { Col, Container, Row, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import videoRecipesDatas from "../assets/data/VideoRecipesData";
import TitleTxtContainer from "../utilities/TitleTxtContainer";
import { ImStarFull, ImEye } from "react-icons/im";
import PlayVideo from "../utilities/PlayVideo";
import { GetSlug } from "../utilities/StringSlugConverter";
import Loading from "../utilities/Loading";
import styled from "styled-components";
import Time from "../utilities/time";

// const url = `https://api.spoonacular.com/food/videos/search?type=mainCourse&number=6&apiKey=${process.env.REACT_APP_API_KEY}`;

const VideoRecipes = () => {
  const [videoRecipesData, setVideoRecipesData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    //       setVideoRecipesData(data.videos);
    //       setLoading(false);
    //     })
    //     .catch((e) => {
    //       setLoading(false);
    //       console.log(e);
    //     });
    //   }
    // fetchData();

    setVideoRecipesData(videoRecipesDatas);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Container fluid className="video-recipes__home">
        <Row className="justify-content-center">
          <TitleTxtContainer
            title={"Video Recipes"}
            text={
              "Explicabo vitae id repellendus, provident mollitia voluptate consequuntur ipsum pariatur iusto nobis."
            }
          />
          <Row className="justify-content-center mt-5">
            <Col lg={6} className="video-recipes__left">
              {videoRecipesData.slice(0, 1).map((video, index) => {
                return (
                  <Card key={index} className="video-recipes__left-card">
                    <div className="video-recipes__left-card--top">
                      <Link
                        reloadDocument
                        to={`/videos/${GetSlug(
                          video.shortTitle.toLowerCase()
                        )}`}
                      >
                        <Card.Img
                          className="video-recipes__left-card--img"
                          src={video.thumbnail}
                          alt={video.shortTitle}
                        />
                      </Link>
                      <PlayVideo youTubeId={video.youTubeId} />
                    </div>
                    <Card.Body className="video-recipes__left-card--body">
                      <Link
                        reloadDocument
                        to={`/videos/${GetSlug(
                          video.shortTitle.toLowerCase()
                        )}`}
                      >
                        <Card.Title className="video-recipes__left-card--title">
                          {video.shortTitle}
                        </Card.Title>
                      </Link>
                      <Card.Text className="video-recipes__left-card--text">
                        <Badge className="d-flex align-items-center video-recipes__left-card--badge">
                          <ImStarFull className="video-recipes__left-card--icon" />
                          {Math.ceil(video.rating * 5)}.0
                        </Badge>
                        <Badge className="d-flex align-items-center video-recipes__left-card--badge">
                          <ImEye className="video-recipes__left-card--icon" />
                          {video.views}
                        </Badge>
                      </Card.Text>
                      <Card.Text className="video-recipes__left-card--text">
                        Time: {Time(video.length * 1000)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>
            <Col lg={4} className="video-recipes__right">
              {videoRecipesData.slice(1, 6).map((video, index) => {
                return (
                  <Card key={index} className="video-recipes__right-card">
                    <div className="video-recipes__right-card--top">
                      <Link
                        reloadDocument
                        to={`/videos/${GetSlug(
                          video.shortTitle.toLowerCase()
                        )}`}
                      >
                        <Card.Img
                          className="video-recipes__right-card--img"
                          src={video.thumbnail}
                          alt={video.shortTitle}
                        />
                      </Link>
                      <PlayVideo
                        size={30}
                        className="video-recipes__right-card--play-icon"
                        youTubeId={video.youTubeId}
                      />
                    </div>
                    <Card.Body className="video-recipes__right-card--body">
                      <Link
                        reloadDocument
                        to={`/videos/${GetSlug(
                          video.shortTitle.toLowerCase()
                        )}`}
                      >
                        <Card.Title className="video-recipes__right-card--title">
                          {video.shortTitle.length > 25
                            ? video.shortTitle.slice(0, 25) + "..."
                            : video.shortTitle}
                        </Card.Title>
                      </Link>
                      <Card.Text className="video-recipes__right-card--badges">
                        <Badge className="d-flex align-items-center video-recipes__right-card--badge">
                          <ImStarFull className="video-recipes__right-card--icon" />
                          {Math.round(video.rating * 5)}.0
                        </Badge>
                        <Badge className="d-flex align-items-center video-recipes__right-card--badge">
                          <ImEye className="video-recipes__right-card--icon" />
                          {video.views}
                        </Badge>
                      </Card.Text>
                      <Card.Text className="video-recipes__right-card--text">
                        Time: {Time(video.length * 1000)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>
          </Row>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default VideoRecipes;

const Wrapper = styled.section`
  .video-recipes__home {
    background-color: var(--light);
    position: relative;
    z-index: 5;
    padding: 5rem 2rem;

    /* video recipes left */
    .video-recipes__left {
      margin-right: 2.5rem;
      .video-recipes__left-card {
        border: none;
        overflow: hidden;
        background-color: var(--light);
        .video-recipes__left-card--top {
          overflow: hidden;
          border-radius: var(--borderRadius);
          position: relative;
          .video-recipes__left-card--img {
            border-radius: var(--borderRadius);
            overflow: hidden;
            height: 70vh;
            min-height: 70vh;
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
        .video-recipes__left-card--body {
          padding: 2rem 0;
          .video-recipes__left-card--title {
            width: 100%;
            text-align: start;
            font-family: var(--bodyFont);
            font-weight: 800;
            font-size: var(--headingFontSize);
            color: var(--dark);
            :hover {
              background: -webkit-linear-gradient(var(--gray), var(--orange));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
          .video-recipes__left-card--text {
            margin-top: 1rem;
            text-align: start;
            font-family: var(--bodyFont);
            font-size: var(--smallFontSize);
            color: var(--gray);
            font-weight: 700;
            display: flex;
            justify-content: flex-start;
          }
          .video-recipes__left-card--badge {
            background-color: var(--orange) !important;
            font-size: var(--bodyFontSize);
            border-radius: 1.8rem;
            padding: 0.5rem 1rem;
            margin-right: 1rem;
            .video-recipes__left-card--icon {
              color: var(--light);
              margin-right: 0.5rem;
            }
          }
        }
      }
    }

    /* video recipes right */
    .video-recipes__right {
      position: relative;
      height: fit-content;
      .video-recipes__right-card {
        border: none;
        flex-direction: row;
        margin-bottom: 2rem;
        border-radius: var(--borderRadius);
        background-color: var(--light);
        .video-recipes__right-card--top {
          width: 10vw;
          min-width: 10vw;
          border-radius: var(--borderRadius);
          overflow: auto;
          position: relative;
          .video-recipes__right-card--img {
            border-radius: var(--borderRadius);
            height: 15vh;
            min-height: 15vh;
          }
          .video-recipes__right-card--play-icon {
            top: 30% !important;
            left: 33% !important;
            font-size: 3rem !important;
          }
        }
        .video-recipes__right-card--body {
          padding: 0 0.5rem 0 1rem;
          .video-recipes__right-card--title {
            font-size: calc(var(--bodyFontSize) + 0.1rem);
            color: var(--dark);
            font-weight: 700;
            width: 70%;
            :hover {
              background: -webkit-linear-gradient(var(--gray), var(--orange));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
          .video-recipes__right-card--badges {
            display: flex;
            margin-bottom: 0.5rem;
            .video-recipes__right-card--badge {
              background-color: var(--orange) !important;
              border-radius: var(--borderRadius);
              margin-right: 0.5rem;
              .video-recipes__right-card--icon {
                margin-right: 0.5rem;
              }
            }
          }
          .video-recipes__right-card--text {
            font-size: var(--smallFontSize);
            color: var(--gray);
            font-weight: 700;
          }
        }
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 1300px) {
      .video-recipes__right {
        .video-recipes__right-card--top {
          width: 13vw;
          min-width: 13vw;
        }
        .video-recipes__right-card--title {
          font-size: var(--bodyFontSize);
          width: 100%;
        }
      }
    }
    @media only screen and (max-width: 1200px) {
      .video-recipes__left {
        width: 55% !important;
        margin-right: 0.5rem;
        .video-recipes__left-card--img {
          height: 55vh;
          min-height: 55vh;
        }
      }
      .video-recipes__right {
        width: 35% !important;
        .video-recipes__right-card--img {
          height: 12vh;
          min-height: 12vh;
        }
        .video-recipes__right-card--text {
          display: none;
        }
        .video-recipes__right-card--play-icon {
          top: 25% !important;
          left: 30% !important;
        }
      }
    }
    @media only screen and (max-width: 992px) {
      .video-recipes__left {
        width: 100% !important;
        margin-right: 0;
        .video-recipes__left-card--img {
          height: 70vh;
          min-height: 70vh;
        }
      }
      .video-recipes__right {
        width: 100% !important;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        .video-recipes__right-card {
          margin: 0;
          .video-recipes__right-card--img {
            height: 10vh;
            min-height: 10vh;
          }
          .video-recipes__right-card--play-icon {
            top: 15% !important;
            left: 30% !important;
          }
        }
      }
    }
    @media only screen and (max-width: 768px) {
      .video-recipes__left {
        width: 90% !important;
        .video-recipes__left-card--img {
          height: 55vh;
          min-height: 55vh;
        }
      }
      .video-recipes__right {
        width: 90% !important;
        display: block;
        .video-recipes__right-card {
          margin-bottom: 2rem;
          .video-recipes__right-card--top {
            width: 15vw;
            min-width: 15vw;
            .video-recipes__right-card--img {
              height: 10vh;
              min-height: 10vh;
            }
            .video-recipes__right-card--play-icon {
              top: 20% !important;
              left: 25% !important;
            }
          }
        }
      }
    }
    @media only screen and (max-width: 576px) {
      .video-recipes__left,
      .video-recipes__right {
        width: 95% !important;
        .video-recipes__left-card--img {
          height: 45vh;
          min-height: 45vh;
        }
        .video-recipes__right-card--top {
          width: 30%;
          .video-recipes__right-card--img {
            height: 12vh;
            min-height: 12vh;
          }
          .video-recipes__right-card--play-icon {
            top: 25% !important;
          }
        }
      }
    }
    @media only screen and (max-width: 450px) {
      .video-recipes__left,
      .video-recipes__right {
        .video-recipes__left-card--img,
        .video-recipes__right-card--img {
          height: 30vh;
          min-height: 30vh;
        }
        .video-recipes__left-card--body,
        .video-recipes__right-card--body {
          padding: 1rem 0 2rem 0;
          .video-recipes__left-card--title,
          .video-recipes__right-card--title {
            font-size: calc(var(--bodyFontSize) + 0.2rem);
          }
          .video-recipes__left-card--text,
          .video-recipes__right-card--text {
            margin: 0.5rem 0;
          }
          .video-recipes__left-card--badge,
          .video-recipes__right-card--badge {
            font-size: var(--smallFontSize);
            padding: 0.4rem 1rem;
          }
        }
        .video-recipes__right-card {
          flex-direction: column;
          margin-bottom: 0;
          .video-recipes__right-card--top {
            width: 100%;
            .video-recipes__right-card--play-icon {
              font-size: 3rem !important;
              top: 75% !important;
              left: 2% !important;
            }
          }
          .video-recipes__right-card--text {
            display: block;
          }
        }
      }
    }
  }
`;
