import { useEffect } from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import searchBg from "../assets/images/bg/searchBg.jpg";
import { useCustomContext } from "../context/customContext";
import { GetString, GetCapitalize, GetTitleRecipe } from "../utilities/StringSlugConverter";

const BaseHeader = ({ customHeaderName }) => {
  const { searchTxt, setTitlePage, location } = useCustomContext();
  const otherPathname = GetTitleRecipe(GetString(location.pathname.slice(1)));

  useEffect(() => {
    setTitlePage(
      searchTxt && searchTxt !== "all recipes"
        ? "Search Result For: " + GetCapitalize(searchTxt) + " - Chef's Recipes"
        : otherPathname === 'shop' 
        ? "Products - Chef's Recipes"
        : location.search.includes("?search=")
        ? `Search Result For: ${location.search.slice(7)}`
        : GetCapitalize(customHeaderName || otherPathname) + " - Chef's Recipes"
    );
  });

  return (
    <Wrapper>
      <header className="header">
        <div className="header__img"></div>
        <div className="header__box">
          <Col className="mx-auto">
            <h3 className="header__title">
              {(location.pathname.match(new RegExp("/recipes/?")) || location.pathname === '/')
                ? `Search Result For: ${searchTxt}`
                : (customHeaderName && (customHeaderName.length > 50 ? ` ${customHeaderName.slice(0, 50)}...` : ` ${customHeaderName}`)) || otherPathname}
            </h3>
            <p className="header__txt">
              Home /{" "}
              {location.pathname.match(new RegExp("/recipes/?"))
                ? "Recipes"
                : location.pathname.match(new RegExp("/shop/"))
                ? "Shop / " +
                  (location.pathname.slice(6, 10) === "tags"
                    ? `Tags / ${GetString(location.pathname.slice(11))}`
                    : location.pathname.slice(6, 16) === "categories"
                    ? `Categories / ${GetString(location.pathname.slice(17))}`
                    : (customHeaderName.length > 20 ? ` ${customHeaderName.slice(0, 20)}...` : ` ${customHeaderName}`))
                : location.pathname.match(new RegExp("/blogs/"))
                ? "Blogs / " +
                  (location.pathname.slice(7, 11) === "tags"
                    ? `Tags / ${GetString(location.pathname.slice(12))}`
                    : location.pathname.slice(7, 17) === "categories"
                    ? `Categories / ${GetString(location.pathname.slice(18))}`
                    : `${customHeaderName}`)
                : (customHeaderName && customHeaderName) || otherPathname}{" "}
              {searchTxt !== "all recipes" && (otherPathname ? `/ ${searchTxt}` : searchTxt)}
            </p>
          </Col>
        </div>
      </header>
    </Wrapper>
  );
};

export default BaseHeader;

// location.pathname.match(new RegExp("/tags/") ? `Blogs / Tags / ${location.pathname.slice(11)}` :

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
    background-image: url(${searchBg});
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .header__box {
    width: 50%;
    text-align: center;
    position: absolute;
    top: 25vh;
    left: 25%;
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
    padding: 0 0.5rem 1rem 0.5rem;
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
    .header {
      height: 60vh;
    }
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
