import { Col } from "react-bootstrap";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import { GetCapitalize } from "../utilities/StringSlugConverter";
import { FaCalendarAlt, FaBook } from "react-icons/fa";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const BlogSinglePageHeader = () => {
  const {
    singleBlog,
    setTitlePage,
  } = useCustomContext();

  useEffect(() => {
    setTitlePage(GetCapitalize(singleBlog.title) + " - Chef's Recipes");
  });

  return (
    <Wrapper>
      <header className="blog-single-page__header">
        <div
          className="header__img"
          style={{ backgroundImage: `url(${singleBlog.bgImg})` }}
        ></div>
        <div className="header__cover"></div>
        <div className="header__box">
          <Col className="mx-auto">
            <h1 className="header__title">{singleBlog.title}</h1>
            <div className="d-flex flex-column align-items-center flex-sm-row justify-content-center">
              <span className="header__txt me-sm-5 mb-2 mb-sm-0">
                <FaCalendarAlt className="me-1" style={{ transform: "translateY(-0.1rem)"}}/>
                {singleBlog.date}
              </span>
              <span className="header__txt">
                <FaBook className="me-1" style={{ transform: "translateY(-0.1rem)"}}/>
                {singleBlog.categories.map((item, index)=> 
                <span key={index}><a style={{ color: "var(--light)"}} href={`/blogs/categories/${item.toLowerCase()}`}>{item}</a>{index !== singleBlog.categories.length - 1 ? ', ' : null}</span>)}
              </span>
            </div>
          </Col>
        </div>
      </header>
    </Wrapper>
  );
};

export default BlogSinglePageHeader;

const Wrapper = styled.section`
  .blog-single-page__header {
    height: 70vh;
    width: 100%;
    position: relative !important;
    .header__img,
    .header__cover {
      height: 100%;
      width: 100%;
      position: fixed;
      top: 0;
      z-index: -1;
    }
    .header__img {
      background-position: bottom;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .header__cover {
      background-color: var(--black);
      opacity: 0.8;
    }
    .header__box {
      width: 70%;
      text-align: center;
      position: absolute;
      top: 15vh;
      left: 15%;
      .header__title {
        font-weight: 800;
        width: 90%;
        color: var(--light);
        margin: 1rem auto 2rem;
      }
      .header__txt {
        color: var(--light);
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .header__box {
        top: 25vh;
      }
      .header__title {
        font-size: calc(var(--headingFontSize) + 0.8rem) !important;
      }
    }
    @media only screen and (max-width: 768px) {
      .header__title {
        font-size: calc(var(--headingFontSize) + 0.5rem) !important;
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
      .header__title {
        font-size: var(--headingFontSize) !important;
      }
    }
    @media only screen and (max-width: 450px) {
      .header__title {
        font-size: calc(var(--bodyFontSize) + 0.2rem) !important;
      }
    }
  }
`;
