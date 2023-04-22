import styled from "styled-components";
import SearchContainer from "../components/SearchContainer";
import NavBar from "../components/Navbar";
import navItems from "../assets/data/NavbarData";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import ForgetPasswordMain from "../components/ForgetPasswordMain";
import { useCustomContext } from "../context/customContext";

const ForgetPassword = () => {
  const { setTitlePage } = useCustomContext();
  setTitlePage("My Account - Chef's Recipes");

  return (
    <Wrapper>
      <Container fluid className="forget-password">
        <Row>
          <Col md={12}>
            <NavBar navItems={navItems} />
            <ForgetPasswordMain />
            <SearchContainer />
            <Footer />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ForgetPassword;

const Wrapper = styled.section`
  .forget-password > .row > * {
    padding: 0 !important;
    margin: 0 !important;
  }
  /********** Navbar **********/
  .forget-password {
    .navigation {
      background-color: var(--orange);
      height: 15vh;
      z-index: 6;
      .navigation__nav--logo {
        width: 30%;
      }
      .navigation__nav--brand {
        width: 95%;
      }
      .navigation__logo--icon {
        font-size: var(--headingFontSize) !important;
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
      .navigation__logo--icon-Colored {
        color: var(--dark);
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
        color: var(--orange);
      }
      .navigation__sub-list,
      .navigation__right-cart-item--container {
        margin: -1.5rem 0 !important;
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
        .navigation__logo--icon-Colored {
          color: var(--orange);
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
        .navigation__sub-list {
          margin: 0 !important;
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
        .navigation__logo--icon {
          font-size: calc(var(--headingFontSize) - 0.2rem) !important;
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

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .navigation {
        background-color: var(--orange);
        height: fit-content !important;
      }
    }
  }
`;
