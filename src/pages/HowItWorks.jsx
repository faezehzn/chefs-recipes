import styled from "styled-components";
import BaseHeader from "../components/BaseHeader";
import SearchContainer from "../components/SearchContainer";
import NavBar from "../components/Navbar";
import navItems from "../assets/data/NavbarData";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import WinkerUpBtn from "../utilities/WinkerUpBtn";
import HowItWorksMain from "../components/HowItWorksMain";
import img_1 from "../assets/images/bg/how-it-works-1.png";
import img_2 from "../assets/images/bg/how-it-works-2.png";
import img_3 from "../assets/images/bg/how-it-works-3.png";
import img_4 from "../assets/images/bg/how-it-works-4.png";
import { useEffect } from "react";

const HowItWorks = () => {
  useEffect(() => {
    document.title = 'How it works';
  }, [])
  
  return (
    <Wrapper>
      <Container fluid className="How-it-works">
        <Row>
          <Col md={12}>
            <NavBar navItems={navItems} />
              <BaseHeader />
              <HowItWorksMain
                title={"Create Account / Login"}
                text1={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi rem tempora sint amet cum sed?"
                }
                text2={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nobis neque accusamus, enim ipsa nemo nulla eius minus iste recusandae harum cumque laborum qui totam dolor, a repellendus ipsum ducimus quae perferendis, optio dolores quidem quod corrupti. Cum facere qui nulla similique autem!"
                }
                text3={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur reprehenderit amet quaerat porro. Eius commodi odit ut, illo quaerat numquam?"
                }
                textBtn={"My Account"}
                order1={1}
                order2={2}
                colorBg={"var(--white)"}
                img={img_1}
                textAlign={"end"}
              />
              <HowItWorksMain
                title={"Choose Package"}
                text1={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, a repellendus ipsum ducimus quae perferendis, optio dolores quidem quod corrupti. Cum facere qui nulla similique autem!"
                }
                text2={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nobis neque accusamus, enim ipsa nemo nulla eius minus iste recusandae harum cumque laborum qui totam dolor."
                }
                text3={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur reprehenderit amet quaerat porro."
                }
                textBtn={"View Packages"}
                order1={2}
                order2={1}
                colorBg={"var(--light)"}
                img={img_2}
                textAlign={"start"}
              />
              <HowItWorksMain
                title={"Submit Recipe"}
                text1={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi rem tempora sint amet cum sed?"
                }
                text2={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nobis neque accusamus, enim ipsa nemo nulla eius minus iste recusandae harum cumque laborum qui totam dolor, a repellendus ipsum ducimus quae perferendis, optio dolores quidem quod corrupti. Cum facere qui nulla similique autem!"
                }
                text3={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur reprehenderit amet quaerat porro. Eius commodi odit ut, illo quaerat numquam?"
                }
                textBtn={"Submit Form"}
                order1={1}
                order2={2}
                colorBg={"var(--white)"}
                img={img_3}
                textAlign={"end"}
              />
              <HowItWorksMain
                title={"Wait for Admin Approval"}
                text1={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, a repellendus ipsum ducimus quae perferendis, optio dolores quidem quod corrupti. Cum facere qui nulla similique autem!"
                }
                text2={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nobis neque accusamus, enim ipsa nemo nulla eius minus iste recusandae harum cumque laborum qui totam dolor."
                }
                text3={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur reprehenderit amet quaerat porro."
                }
                textBtn={"Recipe is live"}
                order1={2}
                order2={1}
                colorBg={"var(--light)"}
                img={img_4}
                textAlign={"start"}
              />
              <SearchContainer />
            <Footer />
            <WinkerUpBtn />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default HowItWorks;

const Wrapper = styled.section`
  .How-it-works > .row > * {
    padding: 0 !important;
    margin: 0 !important;
  }

  /********** Navbar **********/
  .How-it-works {
    .navigation {
      backdrop-filter: blur(2rem);
    }
    .navigation__list-link,
    .search--icon,
    .person--icon,
    .cart--icon,
    .navigation__logo--icon,
    .dark-to-light__btn {
      color: var(--black);
      font-weight: 800;
    }
    .dotted-line__animation,
    .dotted-line__animation::before,
    .dotted-line__animation::after {
      background-color: var(--black);
    }
    .dark-to-light__btn {
      border-color: var(--black);
    }
    .dark-to-light__btn:hover {
      color: var(--orange);
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .navigation__nav--brand {
        position: absolute;
        top: 6vh;
        left: 0;
        width: 100%;
        height: 6rem;
        margin: 0;
        padding: 0.5rem;
        background-color: var(--dark);
      }
      .navigation__nav--logo {
        width: 8%;
      }
      .navigation__logo--icon {
        left: 10%;
      }
      .navigation__list {
        top: 10vh;
      }
      .navigation__list-link,
      .search--icon,
      .person--icon,
      .cart--icon,
      .navigation__logo--icon,
      .dark-to-light__btn {
        color: var(--light);
        font-weight: 800;
      }
      .dotted-line__animation,
      .dotted-line__animation::before,
      .dotted-line__animation::after {
        background-color: var(--light);
      }
      .dark-to-light__btn {
        border-color: var(--light);
      }
      .dark-to-light__btn:hover {
        color: var(--light);
        opacity: 0.8;
      }
    }
    @media only screen and (max-width: 768px) {
      .navigation__nav--brand {
        height: 5rem;
      }
      .navigation__logo--icon {
        top: 4vh;
      }
      .navigation__toggler--icon {
        top: 4.8rem !important;
        right: 2.5rem;
        z-index: 1;
      }
    }
    @media only screen and (max-width: 450px) {
      .navigation__nav--logo {
        width: 12%;
      }
      .navigation__logo--icon {
        left: 15%;
        top: 4vh;
      }
      .navigation__list {
        margin: 2rem 0 0 0;
      }
    }
  }
`;
