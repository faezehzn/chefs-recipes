import styled from "styled-components";
import SearchContainer from "../components/SearchContainer";
import NavBar from "../components/Navbar";
import navItems from "../assets/data/NavbarData";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import { useCustomContext } from "../context/customContext";
import WinkerUpBtn from "../utilities/WinkerUpBtn";
import History from "../components/History";
import headerBg from "../assets/images/bg/hamburger.jpg";
import BaseHeader from "../components/BaseHeader";
import ProductSinglePageMain from "../components/ProductSinglePageMain";

const ProductSinglePage = () => {
  const { singleProduct, location } = useCustomContext();

  if (!singleProduct) {
    const badURL = location.pathname.split("/");
    History.push(`/${badURL[2]}`);
    window.location.reload();
    return;
  }

  return (
    <Wrapper>
      <Container fluid className="product-single-page">
        <Row>
          <Col md={12}>
            <NavBar navItems={navItems} />
            <BaseHeader customHeaderName={singleProduct.title.length > 50 ? `${singleProduct.title.slice(0, 50)}...` : singleProduct.title} />
            <ProductSinglePageMain />
            <SearchContainer />
            <Footer />
            <WinkerUpBtn />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ProductSinglePage;

const Wrapper = styled.section`
  .product-single-page > .row > * {
    padding: 0 !important;
    margin: 0 !important;
  }

  /********** Navbar **********/
  .product-single-page {
    .navigation {
      /* backdrop-filter: blur(2rem); */
    }
    .navigation__list-link,
    .search--icon,
    .person--icon,
    .cart--icon,
    .navigation__logo--icon,
    .dark-to-light__btn {
      color: var(--black) !important;
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
      color: var(--orange) !important;
    }
    .header__txt--page {
      font-weight: 500;
      opacity: 0.8;
      color: var(--light);
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
        color: var(--light) !important;
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
        color: var(--light) !important;
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

  /********** header **********/
  .product-single-page {
    .header__img {
      background-image: url(${headerBg}) !important;
      background-position: center;
    }
    .header__box {
      width: 70%;
      left: 15%;
      backdrop-filter: blur(2rem);
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 768px) {
      .header__box {
        top: 20vh;
      }
    }
    
  }

  /********** search container **********/
  .product-single-page {
    .hk--custom--select .dropdown-menu {
      top: -12rem;
    }
  }
`;
