import { Col } from "react-bootstrap";
import styled from "styled-components";
import navbarData from "../assets/data/NavbarData";
import { useEffect, useRef } from "react";
import filterBg from "../assets/images/bg/filterBg.jpg";
import { GetString, GetCapitalize } from "../utilities/StringSlugConverter";
import { useCustomContext } from '../context/customContext'

const FilterdRecipesHeader = ({ recipe__type, submenu__type }) => {
  const recipeType = GetString(recipe__type);
  const submenuType = GetString(submenu__type);
  const bgRef = useRef(null);
  const { setTitlePage } = useCustomContext()

  useEffect(()=> {
    setTitlePage((GetCapitalize(submenuType)) + " - Chef's Recipes");
  }, [setTitlePage, submenuType])
  
  useEffect(() => {
    const recipeTypeNavbar = navbarData[1].subnavItems.find((item) => {
      return item.title.toLowerCase() === recipeType;
    });
    if (!recipeTypeNavbar) {
      bgRef.current.style.backgroundImage = `url(${filterBg})`;
    } else {
      const submenuTypeNavbar = recipeTypeNavbar.subsubnavItems.find((item) => {
        return item.title.toLowerCase() === submenuType;
      });
      if (
        submenuTypeNavbar &&
        submenuType === submenuTypeNavbar.title.toLowerCase()
      ) {
        bgRef.current.style.backgroundImage = `url(${submenuTypeNavbar.bgImage})`;
      } else {
        bgRef.current.style.backgroundImage = `url(${filterBg})`;
      }
    }
  });

  return (
    <Wrapper>
      <header className="header">
        <div className="header__img" ref={bgRef}></div>
        <div className="header__box">
          <Col className="mx-auto">
            <h3 className="header__title">
              {recipeType}: {submenuType}
            </h3>
            <p className="header__txt">
              Home / Recipes / {recipeType} / {submenuType}
            </p>
          </Col>
        </div>
      </header>
    </Wrapper>
  );
};

export default FilterdRecipesHeader;

const Wrapper = styled.section`
  .header {
    height: 70vh;
    width: 100%;
    display: inline-block;
    position: relative !important;
  }
  .header__img {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: -1;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .header__box {
    width: 50%;
    text-align: center;
    position: absolute;
    top: 25vh;
    left: 25%;
    backdrop-filter: blur(3rem);
  }
  .header__title {
    font-weight: 800;
    width: 90%;
    color: var(--black);
    margin: 1rem auto;
  }
  .header__txt {
    font-weight: 800;
    color: var(--dark);
    font-size: var(--bodyFontSize);
    padding: 0 0.5rem;
    text-transform: capitalize;
  }

  /************ Responsive Css ************/
  @media only screen and (max-width: 992px) {
    .header__box {
      width: 70%;
      top: 25vh;
      left: 15%;
    }
  }
  @media only screen and (max-width: 768px) {
    .header__title {
      font-size: var(--headingFontSize) !important;
    }
    .header__txt {
      font-size: var(--smallFontSize);
    }
  }
  @media only screen and (max-width: 576px) {
    .header__box {
      width: 90%;
      left: 5%;
    }
  }
  @media only screen and (max-width: 450px) {
    .header__title {
      font-size: calc(var(--bodyFontSize) + 0.2rem) !important;
    }
  }
`;
