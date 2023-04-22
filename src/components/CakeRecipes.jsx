import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import cakeRecipesDatas from "../assets/data/CakeRecipesData";
import TitleTxtContainer from "../utilities/TitleTxtContainer";
import {
  GrInstagram,
  GrFacebookOption,
  GrYoutube,
  GrTwitter,
} from "react-icons/gr";
import { ImClock, ImCheckmark } from "react-icons/im";
import SocialMediaBtn from "../utilities/SocialMediaBtn";
import { GetSlug } from "../utilities/StringSlugConverter";
import Loading from "../utilities/Loading";
import styled from "styled-components";

// const url = `https://api.spoonacular.com/recipes/complexSearch?query=cake&addRecipeInformation=true&number=8&apiKey=${process.env.REACT_APP_API_KEY}`;

const CakeRecipes = () => {
  const [cakeRecipesData, setCakeRecipesData] = useState([]);
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
    //       setCakeRecipesData(data.results);
    //       setLoading(false);
    //     })
    //     .catch((e) => {
    //       setLoading(false);
    //       console.log(e);
    //     });
    // }
    // fetchData();

    setCakeRecipesData(cakeRecipesDatas);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Container fluid className="cake-recipes__home">
        <Row className="justify-content-center">
          <TitleTxtContainer
            title={"Cake Recipes"}
            text={
              "Provident mollitia voluptate consequuntur ipsum pariatur iusto nobis."
            }
          />
          <Row className="justify-content-center mt-5">
            {/* main */}
            <Col lg={7} className="cake-recipes__main">
              {cakeRecipesData.map((item) => {
                return (
                  <Card key={item.id} className="cake-recipes__card">
                    <Link
                      reloadDocument
                      to={`/recipes/${GetSlug(item.title.toLowerCase())}`}
                    >
                      <div className="cake-recipes__card--left">
                        <Card.Img
                          className="cake-recipes__card--img"
                          src={item.image}
                          alt={item.title}
                        />
                      </div>
                    </Link>
                    <Card.Body className="cake-recipes__card--body">
                      <Link
                        reloadDocument
                        to={`/recipes/${GetSlug(item.title.toLowerCase())}`}
                      >
                        <Card.Title className="cake-recipes__card--title">
                          {item.title}
                        </Card.Title>
                      </Link>
                      <Card.Text className="cake-recipes__card--text">
                        <span className="d-flex align-items-center">
                          <ImClock className="cake-recipes__card--icon" />
                          {item.readyInMinutes} min
                        </span>
                        <span className="d-flex align-items-center">
                          <ImCheckmark className="cake-recipes__card--icon" />
                          {item.analyzedInstructions[0].steps.length} steps
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>

            {/* follow box */}
            <Col lg={3} className="follow-box">
              <div className="follow-box__title">Follow The Kitchen</div>
              <div className="follow-box__social-media">
                <SocialMediaBtn
                  className="instagram"
                  textBtn={"Follow on Instagram"}
                  icon={<GrInstagram />}
                />
                <SocialMediaBtn
                  className="facebook"
                  textBtn={"Like on Facebook"}
                  icon={<GrFacebookOption />}
                />
                <SocialMediaBtn
                  className="youtube"
                  textBtn={"Subscribe on Youtube"}
                  icon={<GrYoutube />}
                />
                <SocialMediaBtn
                  className="twitter"
                  textBtn={"Follow on Twitter"}
                  icon={<GrTwitter />}
                />
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default CakeRecipes;

const Wrapper = styled.section`
  .cake-recipes__home {
    background-color: var(--white);
    position: relative;
    z-index: 5;
    padding: 5rem 2rem;

    /* cake recipes main */
    .cake-recipes__main {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      margin-right: 1.5rem;
      gap: 1.5rem;
      .cake-recipes__card {
        border: none;
        overflow: hidden;
        background-color: var(--white);
        flex-direction: row;
        .cake-recipes__card--left {
          overflow: hidden;
          border-radius: var(--borderRadius);
          .cake-recipes__card--img {
            border-radius: var(--borderRadius);
            overflow: hidden;
            height: 15vh;
            width: 10vw;
            z-index: 7;
            transition: var(--transition-fast);
          }
          .cake-recipes__card--img::after {
            content: "";
            overflow: hidden;
            width: 100%;
            z-index: 15;
          }
          .cake-recipes__card--img:hover {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
        .cake-recipes__card--body {
          padding: 1rem 2rem;
          .cake-recipes__card--title {
            width: 100%;
            text-align: start;
            font-family: var(--bodyFont);
            font-weight: 800;
            font-size: calc(var(--bodyFontSize) + 0.2rem);
            transition: var(--transition-fast);
            color: var(--dark);
          }
          .cake-recipes__card--title:hover {
            color: var(--orange);
          }
          .cake-recipes__card--text {
            width: 100%;
            margin-top: 0.5rem;
            text-align: start;
            font-family: var(--bodyFont);
            font-size: var(--smallFontSize);
            color: var(--gray);
            display: flex;
            justify-content: space-between;
          }
          .cake-recipes__card--icon {
            color: var(--orange);
            margin-right: 0.3rem;
          }
        }
      }
    }

    /* follow-box */
    .follow-box {
      position: relative;
      background-color: var(--gray);
      height: 100%;
      padding: 3rem;
      border-radius: var(--borderRadius);
      .follow-box__title {
        color: var(--light);
        font-size: var(--headingFontSize);
        margin-bottom: 2rem;
        letter-spacing: var(--letterSpacing);
        font-weight: 800;
      }
      .follow-box__social-media {
        position: relative;
      }
      .instagram {
        color: var(--orange);
      }
      .instagram:hover {
        background-color: var(--orange);
      }
      .instagram::before {
        background-color: var(--orange);
      }
      .facebook {
        color: blue;
      }
      .facebook:hover {
        border: none;
        background-color: blue;
      }
      .facebook::before {
        background-color: blue;
      }
      .youtube {
        color: red;
      }
      .youtube:hover {
        border: none;
        background-color: red;
      }
      .youtube::before {
        background-color: red;
      }
      .twitter {
        color: teal;
      }
      .twitter:hover {
        border: none;
        background-color: teal;
      }
      .twitter::before {
        background-color: teal;
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 1300px) {
      .follow-box {
        height: fit-content !important;
        width: 30% !important;
      }
      .cake-recipes__card {
        flex-direction: column !important;
      }
      .cake-recipes__card--img {
        height: 30vh !important;
        width: 100% !important;
      }
      .cake-recipes__card--body {
        padding: 1rem !important;
      }
      .cake-recipes__card--text {
        width: 60% !important;
        margin-top: 0.5rem !important;
      }
    }
    @media only screen and (max-width: 1200px) {
      .follow-box__title {
        font-size: calc(var(--bodyFontSize) + 0.3rem) !important;
        letter-spacing: normal !important;
      }
      .follow-box {
        padding: 2rem !important;
      }
      .cake-recipes__card--text {
        width: 75% !important;
      }
    }
    @media only screen and (max-width: 992px) {
      .follow-box {
        background-color: var(--gray);
        height: fit-content;
        width: 100% !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .follow-box__title {
        margin-bottom: 0rem !important;
      }
      .follow-box__social-media {
        position: relative;
        display: flex;
        justify-content: space-between;
      }
      .instagram {
        border: 0.125rem solid var(--orange) !important;
      }
      .facebook {
        border: 0.125rem solid blue !important;
      }
      .youtube {
        border: 0.125rem solid red !important;
      }
      .twitter {
        border: 0.125rem solid teal !important;
      }
      .cake-recipes__main {
        margin-bottom: 2rem;
      }
      .cake-recipes__card {
        flex-direction: row !important;
      }
      .cake-recipes__card--body {
        padding: 0 1rem !important;
      }
      .cake-recipes__card--img {
        height: 15vh !important;
        width: 18vw !important;
      }
      .cake-recipes__card--text {
        width: 100% !important;
      }
    }
    @media only screen and (max-width: 768px) {
      .follow-box {
        padding: 1rem !important;
      }
      .cake-recipes__card {
        flex-direction: column !important;
      }
      .cake-recipes__card--img {
        height: 30vh !important;
        width: 100% !important;
      }
      .cake-recipes__card--body {
        padding: 1rem !important;
      }
      .cake-recipes__card--text {
        width: 80% !important;
      }
    }
    @media only screen and (max-width: 576px) {
      .follow-box {
        justify-content: center !important;
        padding: 1rem !important;
        border-radius: var(--borderRadius) !important;
        display: block !important;
      }
      .follow-box__social-media {
        justify-content: center !important;
      }
      .follow-box__title {
        text-align: center !important;
        margin-bottom: 1rem !important;
      }
      .cake-recipes__main {
        display: block !important;
        margin: 0 auto !important;
        width: 90% !important;
      }
      .cake-recipes__card {
        margin: 0 auto 2rem auto !important;
      }
      .cake-recipes__card--img {
        height: 35vh !important;
        width: 100% !important;
      }
      .cake-recipes__card--text {
        width: 60% !important;
      }
    }
    @media only screen and (max-width: 450px) {
      .cake-recipes__main {
        width: 100% !important;
      }
      .cake-recipes__card {
        margin: 0 auto 1rem auto !important;
      }
      .cake-recipes__card--img {
        height: 25vh !important;
        width: 100% !important;
      }
      .cake-recipes__card--text {
        width: 90% !important;
      }
    }
  }
`;
