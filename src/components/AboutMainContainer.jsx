import { Col, Container, Row, Card } from "react-bootstrap";
import PlayVideo from "../utilities/PlayVideo";
import TitleTxtContainer from "../utilities/TitleTxtContainer";
import styled from "styled-components";
import videoAboutBg from "../assets/images/bg/videoAboutBg.jpeg";


const AboutMainContainer = () => {
  const video = {
    youTubeId: "YoxHEBef6s0",
    thumbnail: videoAboutBg,
    alt: "about us",
  };
  return (
    <Wrapper>
      <Container fluid className="about__main">
        <Row className="justify-content-center">
          <Col lg={10} className="mx-auto">
            <TitleTxtContainer
              title={"The Biggest Recipes Community"}
              text={
                "Explicabo vitae id repellendus, provident mollitia voluptate consequuntur ipsum pariatur iusto nobis."
              }
            />
            <div className="mt-5">
              <Card className="video-about__cart">
                <Card.Img
                  className="video-about__cart--img"
                  src={video.thumbnail}
                  alt={video.alt}
                />
                <PlayVideo youTubeId={video.youTubeId} />
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default AboutMainContainer;

const Wrapper = styled.section`
  .about__main {
    display: block;
    position: relative;
    z-index: 5;
    background-color: var(--white) !important;
    height: fit-content;
    padding: 5rem 2rem;
    .video-about__cart {
      border: none;
      align-items: center;
    }
    .video-about__cart--img {
      border-radius: var(--borderRadius);
      height: 70vh;
      width: 80%;
    }
    .video--icon {
      top: 40%;
      left: 45%;
      font-size: 7rem;
      background-color: var(--light);
      border-radius: 50%;
      transition: var(--transition-fast);
    }
    .video--icon:hover {
      transform: scale(1.1);
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 1200px) {
      .video-about__cart--img {
        height: 60vh;
        width: 90% !important;
      }
      .video--icon {
        top: 35%;
      }
    }
    @media only screen and (max-width: 768px) {
      .video-about__cart--img {
        height: 50vh;
      }
      .video--icon {
        top: 40%;
        font-size: 5rem;
      }
    }
    @media only screen and (max-width: 576px) {
      .video-about__cart--img {
        height: 40vh;
      }
      .video--icon {
        top: 45%;
        font-size: 3rem;
      }
    }
    @media only screen and (max-width: 450px) {
      .video-about__cart--img {
        height: 30vh;
      }
      .video--icon {
        top: 40%;
        font-size: 3rem;
      }
    }
  }
`;
