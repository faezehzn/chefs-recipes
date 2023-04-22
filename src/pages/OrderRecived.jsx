import styled from "styled-components";
import BaseHeader from "../components/BaseHeader";
import SearchContainer from "../components/SearchContainer";
import NavBar from "../components/Navbar";
import navItems from "../assets/data/NavbarData";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import WinkerUpBtn from "../utilities/WinkerUpBtn";
import OrderReceivedMain from "../components/OrderReceivedMain";
import { useParams } from "react-router-dom";
import { useCustomContext } from "../context/customContext";
import History from "../components/History";


const OrderReceived = () => {
  const idParams = useParams()
  const { orderData, location } = useCustomContext()
  const thisOrder = orderData.filter((order) => order.id === Number(idParams.id));
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(thisOrder[0].date) > fiveMinutes;

  if (timePassed) {
    const badURL = location.pathname.split("/");
    History.push(`/${badURL[2]}`);
    window.location.reload();
    return;
  }
  return (
    <Wrapper>
      <Container fluid className="order-received">
        <Row>
          <Col md={12}>
            <NavBar navItems={navItems} />
            <BaseHeader customHeaderName="Checkout" />
            <OrderReceivedMain id={idParams.id} />
            <SearchContainer />
            <Footer />
            <WinkerUpBtn />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default OrderReceived;

const Wrapper = styled.section`
  .order-received > .row > * {
    padding: 0 !important;
    margin: 0 !important;
  }

  /********** Navbar **********/
  .order-received {
    .navigation {
      backdrop-filter: blur(2rem);
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

  /********** search container **********/
  .order-received {
    .hk--custom--select .dropdown-menu {
      top: -12rem;
    }
  }
`;
