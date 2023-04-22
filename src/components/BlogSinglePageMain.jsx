import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import { useCustomContext } from "../context/customContext";
import CustomButton from "../utilities/CustomButton";
import {
  FaShareAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { useState, useRef } from "react";
import Comments from "./Comments";
import History from "../components/History";
import { dataApi } from "../context/constants";


const BlogSinglePageMain = () => {
  let menuItems = document.querySelectorAll(".blog__box-SM--btn");
  const { singleBlog, blogsCommentsData, data } = useCustomContext();
  const shareBtnRef = useRef(null);
  const [menuActive, setMenuActive] = useState(false);

  const handleCornerMenu = () => {
    if (!menuActive) {
      menuItems[0].style.transform = "translate(-2.5rem, -1.8rem)";
      menuItems[1].style.transform = "translate(-4.5rem)";
      menuItems[2].style.transform = "translate(-2.5rem, 1.8rem)";
      setMenuActive(true);
    } else {
      menuItems.forEach((menuItem) => {
        menuItem.style.transform = "translate(0,0)";
      });
      setMenuActive(false);
    }
  };

  if (window.location.hash === "#reviews") {
    window.scrollTo({
      top: 1800,
      behavior: "smooth",
    });
    setTimeout(() => {
      History.push();
    }, 1000);
  } 

  return (
    <Wrapper>
      <Container fluid className="blog-single-page__main">
        <Row className="justify-content-center">
          <Col md={9} className="">
            <div className="blog__text">
              {`${singleBlog.paragraph4} ${singleBlog.paragraph3}`}
            </div>
            <div className="blog__text">
              <blockquote className="quote">{`${singleBlog.paragraph2}`}</blockquote>
            </div>
            <div className="blog__text">
              {`${singleBlog.paragraph5} ${singleBlog.paragraph1}`}
            </div>
            <div className="blog__images">
              {singleBlog.img.map((item) => {
                return (
                  <img
                    className="blog__img"
                    key={item.id}
                    src={item.src}
                    alt={item.alt}
                  />
                );
              })}
            </div>
            <div className="blog__text">
              {`${singleBlog.paragraph5} ${singleBlog.paragraph3}`}
            </div>
            <div className="blog__box-tag-share">
              <div className="d-flex">
                {singleBlog.tags.map((item, index) => {
                  return (
                    <a key={index} href={`/blogs/tags/${item.toLowerCase()}`}>
                      <CustomButton
                        textBtn={item}
                        className="blog__box-tag--btn"
                      />
                    </a>
                  );
                })}
              </div>
              <CustomButton
                icon={<FaFacebookF className="" />}
                className="blog__box-SM--btn SM__facebook"
              />
              <CustomButton
                icon={<FaInstagram className="" />}
                className="blog__box-SM--btn SM__instagram"
              />
              <CustomButton
                icon={<FaTwitter className="" />}
                className="blog__box-SM--btn SM__twitter"
              />
              <CustomButton
                textBtn={`Share this`}
                ref={shareBtnRef}
                onClick={handleCornerMenu}
                icon={<FaShareAlt className="ms-2" />}
                className="blog__box-share--btn"
              />
            </div>
            <Comments currentUserId='1' 
              commentsUrl={`${dataApi}/blogsComments`} 
              backendComments={blogsCommentsData} 
              singlePage={singleBlog} 
              witchComments={data.blogsComments} 
              id='reviews'
            />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default BlogSinglePageMain;

const Wrapper = styled.section`
  .blog-single-page__main {
    display: block;
    position: relative;
    z-index: 5;
    background-color: var(--white) !important;
    height: fit-content;
    padding: 5rem 2rem;
    .blog__text {
      font-weight: 300;
      margin-bottom: 2rem;
      position: relative;
      line-height: 1.7;
    }
    .quote {
      background-color: var(--light);
      padding: 2.5rem 3rem 2.5rem 6rem;
    }
    .quote::before {
      content: "\f10e";
      font-family: "FontAwesome";
      line-height: 1;
      font-size: 4rem;
      overflow: hidden;
      position: absolute;
      top: 2rem;
      left: 1.5rem;
      background: 0 0;
      opacity: 0.1;
    }
    .blog__images {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      width: 100%;
      margin-bottom: 2rem;
      .blog__img {
        width: 100%;
      }
    }
    .blog__box-tag-share {
      border-top: 0.125rem dotted var(--gray-opacity3);
      border-bottom: 0.125rem dotted var(--gray-opacity3);
      padding: 1.5rem 0;
      display: flex;
      justify-content: space-between;
      margin-bottom: 3rem;
      position: relative;
      .blog__box-tag--btn {
        border: 0.05rem solid var(--gray-opacity3) !important;
        color: var(--gray) !important;
        width: fit-content !important;
        height: fit-content !important;
        padding: 0.7rem 1.3rem;
        font-weight: 400;
        font-size: calc(var(--extrasmallFontSize) + 0.1rem);
      }
      .blog__box-tag--btn:hover {
        border-color: var(--orange) !important;
        color: var(--orange) !important;
      }
      .blog__box-share--btn {
        background-color: var(--orange);
        width: fit-content !important;
        height: fit-content !important;
        padding: 0.7rem 1.3rem !important;
        font-weight: 400 !important;
        font-size: calc(var(--extrasmallFontSize) + 0.1rem) !important;
      }
      .blog__box-SM--btn {
        width: 2.5rem !important;
        height: 2.5rem !important;
        padding: 0 !important;
        background-color: var(--gray) !important;
        color: var(--light) !important;
        position: absolute;
        right: 6.5rem;
        top: 2rem;
      }
      .blog__box-SM--btn:hover {
        color: var(--orange) !important;
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .blog__box-tag--btn {
        margin: 0 0.5rem !important;
      }
      .blog__box-SM--btn,
      .blog__box-share--btn {
        display: none !important;
      }
    }
    @media only screen and (max-width: 576px) {
      .quote {
        padding: 2rem 2rem 2rem 4rem !important;
      }
      .quote::before {
        font-size: 2.5rem !important;
      }
      .blog__images {
        grid-template-columns: 1fr !important;
      }
    }
    @media only screen and (max-width: 450px) {
      .blog__box-tag--btn {
        padding: 0.5rem 1rem !important;
        font-size: var(--extrasmallFontSize) !important;
      }
    }
  }
`;
