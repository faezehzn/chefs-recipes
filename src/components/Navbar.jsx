import { useState } from "react";
import { Col, Row, Navbar } from "react-bootstrap";
import SearchBtn from "../utilities/SearchBtn";
import LoginBtn from "../utilities/LoginBtn";
import ListOfNavbar from "../utilities/ListOfNavbar";
import CustomButton from "../utilities/CustomButton";
import NavbarCartIcon from "../utilities/NavbarCartIcon";
import NavbarLogo from "../utilities/NavbarLogo";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavBar = ({ navItems }) => {
  const [toggler, setToggler] = useState({ open: false });

  return (
    <Wrapper>
      <Navbar expand="md" className="navigation">
        <Col>
          <Row className="navigation__nav">
            <Navbar.Toggle
              onClick={() => setToggler({ open: !toggler.open })}
              aria-expanded={toggler.open}
              aria-controls="basic-navigation-nav"
              className="navigation__toggler"
            >
              <span className="navigation__toggler--icon"></span>
            </Navbar.Toggle>
            <Col md={3} className="p-0 navigation__left">
              <NavbarLogo />
            </Col>
            <Col md={5} className="p-0 navigation__middle">
              <Navbar.Collapse
                className="navigation__collapse"
                in={toggler.open}
                id="basic-navigation-nav"
              >
                <ListOfNavbar navItems={navItems} />
              </Navbar.Collapse>
            </Col>
            <Col md={4} className="pe-3 m-0 navigation__right">
              <div className="navigation__right--items">
                <SearchBtn />
                <LoginBtn />
                <NavbarCartIcon />
              </div>
              <Link reloadDocument to={`/recipe`}>
                <CustomButton
                  className="m-0 navigation__right--btn"
                  textBtn={"Submit Recipes"}
                />
              </Link>
            </Col>
          </Row>
        </Col>
      </Navbar>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.section`
  .navigation {
    background-color: transparent;
    padding: 0 !important;
    z-index: 2;
  }
  .navigation__nav {
    display: flex;
    font-family: var(--bodyFont);
    align-items: center;
    justify-content: space-evenly;
  }

  /********** Navigation Toggler **********/
  .navigation__toggler,
  .navigation__toggler:active,
  .navigation__toggler:focus {
    outline: none !important;
    box-shadow: none !important;
    text-decoration: none;
    border: none !important;
  }
  .navigation__toggler--icon {
    width: 1.5rem;
    height: 1.1rem;
    background-image: none;
    position: absolute;
    border-bottom: 0.125rem solid var(--light);
    transition: var(--transition-fast);
    top: 2rem;
    right: 1.5rem;
    z-index: 1;
  }
  .navigation__toggler--icon:after,
  .navigation__toggler--icon:before {
    width: 1.5rem;
    position: absolute;
    height: 0.125rem;
    background-color: var(--light);
    top: 0;
    left: 0;
    content: "";
    transition: var(--transition-fast);
  }
  .navigation__toggler--icon:after {
    top: 0.5rem;
  }
  .navigation__toggler[aria-expanded="true"] .navigation__toggler--icon:after {
    transform: rotate(45deg);
  }
  .navigation__toggler[aria-expanded="true"] .navigation__toggler--icon:before {
    transform: translateY(0.5rem) rotate(-45deg);
  }
  .navigation__toggler[aria-expanded="true"] .navigation__toggler--icon {
    border-color: transparent;
  }

  /********** Different parts of the Navigation **********/
  /********** Right **********/
  .navigation__right {
    display: flex;
    margin: auto 1rem;
    align-items: center;
    width: 20% !important;
  }
  .navigation__right--items {
    display: flex;
  }

  /********** Left **********/
  .navigation__left {
    width: 20% !important;
  }

  /********** Middle **********/
  .navigation__middle {
    width: 35% !important;
  }
  .navigation__collapse {
    justify-content: end;
  }

  /************ Responsive Css ************/
  @media only screen and (max-width: 1300px) {
    .navigation__nav {
      width: 100% !important;
      justify-content: center !important;
    }
  }
  @media only screen and (max-width: 1200px) {
    .navigation__nav {
      width: 100% !important;
    }
    .navigation__right {
      width: 25% !important;
    }
  }
  @media only screen and (max-width: 992px) {
    .navigation {
      background-color: var(--orange);
    }
    .navigation__nav {
      justify-content: space-between;
    }
    .navigation__right {
      width: 45% !important;
      justify-content: end;
    }
    .navigation__right--items {
      position: absolute;
      left: 0;
      margin: 1rem;
    }
  }
  @media only screen and (max-width: 768px) {
    .navigation__toggler,
    .navigation__toggler:active,
    .navigation__toggler:focus {
      padding: 0 !important;
      box-shadow: none !important;
      border: none !important;
    }
    .navigation__toggler--icon {
      top: 5.5rem !important;
      right: 2.5rem !important;
    }
  }
`;
