import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { useState } from "react";
import styled from "styled-components";

const MenuItemRecipes = ({ navItem, accordion }) => {
  const [activeLink, setActiveLink] = useState("");

  const onChangeActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Wrapper>
      <Navbar.Collapse
        in={accordion.id === navItem.id && accordion.open}
        id={navItem.id}
      >
        <ul className="navigation__sub-list" id="navigation__sub-list--recipes">
          {navItem.subnavItems.map((subnavItem) => {
            return (
              <div className="" key={subnavItem.id}>
                <li id="navigation__sub-list-item--recipes">
                  {subnavItem.title}
                </li>
                {subnavItem.subsubnavItems.length > 0 ? (
                  <ul id="navigation-subsub__list">
                    {subnavItem.subsubnavItems.map((subsubnavItem) => {
                      return (
                        <div className="" key={subsubnavItem.id}>
                          <li id="navigation-subsub__list-item">
                            {subsubnavItem.icon}
                            <NavLink
                              className={
                                activeLink === subsubnavItem.title
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                onChangeActiveLink(subsubnavItem.title)
                              }
                              to={`/recipes/${subnavItem.link}/${subsubnavItem.link}`}
                              id="navigation-subsub__list-link"
                              reloadDocument
                            >
                              {subsubnavItem.title}
                            </NavLink>
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </ul>
      </Navbar.Collapse>
    </Wrapper>
  );
};

export default MenuItemRecipes;

const Wrapper = styled.section`
  #navigation__sub-list--recipes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    gap: 3rem;
    transform: translateX(-10rem) !important;
    padding: 1rem 2rem;
  }
  #navigation__sub-list-item--recipes {
    font-size: var(--smallFontSize);
    font-weight: 800;
    margin-bottom: 0.3rem;
    padding-left: 0.2rem;
  }
  #navigation-subsub__list {
    padding: 0.2rem;
  }
  #navigation-subsub__list-item {
    font-size: var(--smallFontSize);
    font-weight: 800;
    color: var(--gray) !important;
    margin: 0.25rem 0 !important;
  }
  #navigation-subsub__list-item:hover {
    color: var(--orange) !important;
    transform: scale(1.1) !important;
  }
  #navigation-subsub__list-item:hover #navigation-subsub__list-link {
    color: var(--orange) !important;
  }
  #navigation-subsub__list-item .active {
    font-weight: 800;
    color: var(--orange) !important;
  }
  #navigation-subsub__list-link {
    color: var(--gray) !important;
    padding-left: 0.4rem;
  }
  /* #navigation-subsub__list-link:hover {
    color: var(--orange) !important;
  } */

  /************ Responsive Css ************/
  @media only screen and (max-width: 768px) {
    #navigation__sub-list--recipes {
      padding: 1rem;
      transform: translateX(0) !important;
      gap: 1rem;
    }
    #navigation__sub-list-item--recipes {
      color: var(--light);
      border-bottom: 0.125rem solid var(--gray);
      text-align: center;
      padding-bottom: 0.3rem;
      margin: 0 1rem;
    }
    #navigation-subsub__list {
      padding: 0.5rem;
    }
    #navigation-subsub__list-item {
      font-weight: 500;
      color: var(--dark) !important;
    }
    #navigation-subsub__list-item:hover {
      background-color: var(--light);
      transform: scale(1) !important;
      color: var(--orange) !important;
    }
    #navigation-subsub__list-link {
      color: var(--light) !important;
      padding: 0.2rem 1.8rem 0.2rem 0.5rem;
    }
    #navigation-subsub__list-item:hover #navigation-subsub__list-link {
      color: var(--orange) !important;
    }
  }

  @media only screen and (max-width: 576px) {
    #navigation__sub-list--recipes {
      display: block;
      padding: 0 1rem;
    }
    #navigation__sub-list-item--recipes {
      padding-left: 1rem;
      margin-right: 2rem;
      border-bottom: 0.05rem solid var(--gray);
      text-align: start;
    }
    #navigation-subsub__list {
      padding: 0;
      margin-bottom: 1rem;
    }
    #navigation-subsub__list-item {
      padding: 0.3rem 1rem;
    }
    #navigation-subsub__list-link {
      padding: 0.2rem 6rem 0.2rem 0.5rem;
    }
  }
`;
