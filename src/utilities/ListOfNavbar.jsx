import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import DottedLine from "./DottedLine";
import MenuItemRecipes from "../components/MenuItemsRecipe";
import { RiArrowDownSLine } from "react-icons/ri";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";

const ListOfNavbar = ({ navItems, className }) => {
  const [activeLink, setActiveLink] = useState("home");
  const [accordion, setAccordion] = useState({ open: false, id: "1-home" });

  const onChangeActiveAccordion = (id) => {
    if (accordion.open && accordion.id === id) {
      setAccordion({ open: false, id: id });
    } else {
      setAccordion({ open: true, id: id });
    }
  };

  const onChangeActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Wrapper>
      <ul className={className + " navigation__list"} role="navigation">
        {navItems.map((navItem) => {
          return (
              <div
                className="navigation__list-item--container"
                key={navItem.id}
              >
                <li className="navigation__list-item">
                  {navItem.title !== 'Pages' ? 
                  <NavLink
                    to={`/${navItem.link}`}
                    reloadDocument
                    className={
                      activeLink === navItem.title
                        ? "active navigation__list-link"
                        : "navigation__list-link"
                    }
                    onClick={() => onChangeActiveLink(navItem.title)}
                    id={navItem.title}
                  >
                    {navItem.title}
                    <DottedLine />
                  </NavLink> :
                  <Link
                    className={"navigation__list-link"}
                    onClick={(e)=> e.target.className = 'navigation__list-link'}
                    id={navItem.title}
                  >
                    {navItem.title}
                    <DottedLine/>
                  </Link>}
                  {navItem.subnavItems.length > 0 && (
                    <Navbar.Toggle
                      onClick={() => onChangeActiveAccordion(navItem.id)}
                      aria-expanded={
                        accordion.id === navItem.id && accordion.open
                      }
                      aria-controls={navItem.id}
                      className="toggler__btn--accordion"
                    >
                      <RiArrowDownSLine
                        size={20}
                        className="navigation__list--arrow-icon"
                      />
                    </Navbar.Toggle>
                  )}
                </li>
                {navItem.subnavItems.length > 0 &&
                navItem.title !== "Recipes" ? (
                  <Navbar.Collapse
                    in={accordion.id === navItem.id ? accordion.open : null}
                    id={navItem.id}
                  >
                    <ul
                      className="navigation__sub-list"
                      in={accordion.id === navItem.id ? accordion.open : null}
                      id={navItem.id}
                    >
                      {navItem.subnavItems.map((subnavItem) => {
                        return (
                          <li
                            className="navigation__sub-list-item"
                            key={subnavItem.id}
                          >
                            <NavLink
                              to={`/${subnavItem.link}`}
                              className="navigation__sub-list-link"
                              reloadDocument
                            >
                              {subnavItem.title}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </Navbar.Collapse>
                ) : navItem.subnavItems.length > 0 &&
                  navItem.title === "Recipes" ? (
                  <Navbar.Collapse
                    in={accordion.id === navItem.id ? accordion.open : null}
                    id={navItem.id}
                  >
                    <MenuItemRecipes navItem={navItem} accordion={accordion} />
                  </Navbar.Collapse>
                ) : null}
              </div>
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default ListOfNavbar;

const Wrapper = styled.section`
  .navigation__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding-top: 0.5rem;
  }
  .navigation__list-item--container {
    display: flex;
    align-items: center;
    font-size: var(--bodyFontSize);
    transition: var(--transition-slow);
    justify-content: center;
  }
  .navigation__list-item--container:hover .dotted-line__animation,
  .navigation__list-item .active .dotted-line__animation {
    opacity: 1;
  }
  .navigation__list-item--container:hover .dotted-line__animation::after,
  .navigation__list-item .active .dotted-line__animation::after {
    left: 0.4rem;
  }
  .navigation__list-item--container:hover .dotted-line__animation::before,
  .navigation__list-item .active .dotted-line__animation::before {
    left: -0.4rem;
  }
  .navigation__list-item--container:hover .navigation__sub-list {
    display: block !important;
    opacity: 1;
    text-align: start;
    position: absolute;
    top: 95%;
    visibility: visible;
    animation: moveDownToUp 0.2s ease-in;
    transition: var(--transition-fast);
  }
  .navigation__list-item--container:hover #navigation__sub-list--recipes {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    opacity: 1;
    gap: 3rem;
    visibility: visible;
  }
  .navigation__list-item {
    display: flex;
    padding: 0.5rem 1rem;
    justify-content: space-between;
    align-items: center;
  }
  .navigation__list-link {
    color: var(--light);
  }
  .navigation__list-link:hover,
  .navigation__list-item .active {
    color: var(--light);
    transform: scale(1.1);
  }
  .navigation__sub-list {
    display: inline;
    visibility: hidden;
    border-radius: calc(var(--borderRadius) - 0.5rem);
    opacity: 0;
    width: max-content;
    background-color: var(--light);
    text-align: start;
    margin: -1rem 0;
    position: absolute;
    top: 100%;
    padding: 1rem;
    transform: translateX(-6rem) !important;
    transition: var(--transition-fast);
  }
  .navigation__sub-list-item {
    font-size: var(--smallFontSize);
    font-weight: 600;
    margin-right: 1rem;
  }
  .navigation__sub-list-item:hover {
    transform: scale(1.1);
  }
  .navigation__sub-list-item:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  .navigation__sub-list-link {
    transition: var(--transition-fast);
    color: var(--dark);
  }
  .navigation__sub-list-link:hover {
    color: var(--orange) !important;
    font-weight: 800;
  }
  .navigation__list--arrow-icon {
    display: none;
  }

  /********** Bootstrap Default Toggler **********/
  .navbar-toggler:focus {
    text-decoration: none;
    outline: 0;
    border: none;
    box-shadow: none !important;
  }

  /************ Responsive Css ************/
  @media only screen and (max-width: 992px) {
    .navigation__list {
      position: absolute;
      top: 15vh;
      left: 30%;
      padding: 0;
    }
    .navigation__sub-list {
      margin: -0.5rem 0;
    }
  }
  @media only screen and (max-width: 768px) {
    .navigation__list {
      display: block;
      margin: 2rem 0 0 0;
      padding-top: 1rem;
      width: 100%;
      left: 0;
      top: 6.5rem;
      border-top: 0.01rem solid var(--gray-opacity3);
    }
    .navigation__list-item--container {
      background-color: var(--orange);
      border-bottom: 0.01rem solid var(--gray-opacity3);
      transition: none;
      display: block;
      font-size: var(--smallFontSize);
    }
    .navigation__list-item--container:hover {
      background-color: var(--orange);
      cursor: pointer;
    }
    .navigation__list-item--container:hover .navigation__list-link,
    .navigation__list-item--container:hover .navigation__list-item .active {
      color: var(--light);
    }
    .navigation__list-item--container:hover .navigation__sub-list {
      display: block;
      visibility: visible;
      border-radius: none;
      opacity: 1;
      width: 100vw;
      background-color: var(--orange);
      text-align: start;
      margin: 0;
      position: relative;
      transform: translateX(0) !important;
      padding: 0;
      transition: none;
      animation: none;
    }
    .navigation__list-item--container:hover #navigation__sub-list--recipes {
      gap: 1rem;
      padding: 1rem;
    }
    .navigation__list-link:hover,
    .navigation__list-item .active {
      font-weight: 800;
      color: var(--dark);
      transform: none;
    }
    .navigation__list-item {
      padding: 0;
    }
    .navigation__list-item:hover {
      background-color: var(--light);
    }
    .navigation__list-item:hover .navigation__list-link {
      color: var(--orange) !important;
    }
    .navigation__list-link {
      padding: 0.5rem 1rem;
      width: 100%;
    }
    .toggler__btn--accordion,
    .toggler__btn--accordion:hover,
    .toggler__btn--accordion:focus,
    .toggler__btn--accordion:active {
      border: none;
      box-shadow: none;
    }
    .toggler__btn--accordion[aria-expanded="true"]
      .navigation__list--arrow-icon {
      transform: rotate(180deg) !important;
      color: var(--dark);
    }
    .navigation__list--arrow-icon {
      display: flex;
      color: var(--light);
      border: 0.05rem solid var(--gray-opacity7);
      border-radius: calc(var(--borderRadius) - 0.5rem);
      margin: 0 2rem;
      font-size: var(--bodyFontSize);
    }
    .navigation__list-item:hover .navigation__list--arrow-icon {
      color: var(--orange);
      border: 0.05rem solid var(--orange);
    }
    .navigation__list-item--container:hover .navigation__sub-list-item {
      color: var(--orange);
    }
    .navigation__sub-list,
    .navigation__sub-list:hover {
      display: block;
      visibility: visible;
      border-radius: 0;
      opacity: 1;
      width: 100vw;
      background-color: var(--orange);
      text-align: start;
      margin: 0;
      position: relative;
      top: none;
      transform: translateX(0) !important;
      padding: 0;
      transition: none;
    }
    .navigation__sub-list-item {
      width: 100%;
      padding: 0.3rem 2rem;
      margin: 0 !important;
    }
    .navigation__sub-list-item:hover {
      background-color: var(--light);
      transform: none;
    }
    .navigation__sub-list-link {
      color: var(--light);
      display: block;
    }
    .navigation__sub-list-link:hover {
      font-weight: 800;
      color: var(--orange) !important;
    }
    .navigation__sub-list-item:hover .navigation__sub-list-link {
      color: var(--orange);
    }
  }

  @media only screen and (max-width: 576px) {
    .navigation__list-item--container:hover #navigation__sub-list--recipes {
      padding: 0 1rem;
      display: block !important;
    }
  }
`;
