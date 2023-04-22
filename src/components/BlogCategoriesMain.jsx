import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import TitleTxtContainer from "../utilities/TitleTxtContainer";
import { GetSlug } from "../utilities/StringSlugConverter";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";

const BlogCategoriesMain = () => {
  const { blogsData, blogCategoriesData} = useCustomContext();

  return (
    <Wrapper>
      <Container fluid className="blog__home">
        <Row className="justify-content-center">
          <TitleTxtContainer
            title={"Most Popular Categories"}
            text={
              "Explicabo vitae id repellendus, provident mollitia voluptate consequuntur ipsum pariatur iusto nobis."
            }
          />
          <Row className="justify-content-center mt-5">
            <Col lg={3} className="sidebar">
              <div className="sidebar__title">Categories: </div>
              <div className="sidebar__categories">
                {blogCategoriesData.map((item) => {
                  return (
                    <div key={item.id} className="sidebar__row">
                      <span>{item.icon}</span>
                      <div className="sidebar__dash sidebar__dash--top"></div>
                      <a
                        
                        href={`/blogs/categories/${item.title.toLowerCase()}`}
                      >
                        <span className="sidebar__category--item sidebar__category--item-title">
                          {item.title}
                        </span>
                      </a>
                      <div className="sidebar__dash sidebar__dash--bottom"></div>
                      <span className="sidebar__category--item sidebar__category--item-number">
                        {item.number} {item.number > 1 ? "Posts" : "Post"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Col>
            <Col lg={7} className="blog__main">
              {blogsData.slice(-5, -1).map((blog) => {
                return (
                  <Card key={blog.id} className="blog__cart">
                    <Link
                      reloadDocument
                      to={`/blogs/${GetSlug(blog.title.toLowerCase())}`}
                    >
                      <div className="blog__cart--top">
                        <Card.Img
                          variant="top"
                          className="blog__cart--img"
                          src={blog.bgImg}
                          alt={blog.title}
                        />
                      </div>
                    </Link>
                    <Card.Body className="blog__cart--body">
                      {blog.tags.map((tag, index) => {
                        return (
                          <Link
                            key={index}
                            reloadDocument
                            to={`/blogs/tags/${tag.toLowerCase()}`}
                            className="blog__cart--tag"
                          >
                            {tag} {index !== blog.tags.length - 1 && ", "}
                          </Link>
                        );
                      })}
                      <Link
                        reloadDocument
                        to={`/blogs/${GetSlug(blog.title.toLowerCase())}`}
                      >
                        <Card.Title className="blog__cart--title">
                          {blog.title.length > 35
                            ? blog.title.slice(0, 35) + "..."
                            : blog.title}
                        </Card.Title>
                      </Link>
                      <Card.Text className="blog__cart--text">
                      {blog.summary.length > 70
                            ? blog.summary.slice(0, 70) + " [...]"
                            : blog.summary}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>
          </Row>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default BlogCategoriesMain;

const Wrapper = styled.section`
  .blog__home {
    background-color: var(--light);
    position: relative;
    z-index: 5;
    padding: 5rem 2rem;
  }

  /********** sidebar **********/
  .sidebar {
    position: relative;
    background-color: var(--orange);
    width: 22%;
    height: 100%;
    padding: 3rem;
    border-radius: var(--borderRadius);
  }
  .sidebar__title {
    color: var(--light);
    font-size: var(--headingFontSize);
    margin-bottom: 2rem;
    letter-spacing: var(--letterSpacing);
    font-weight: 800;
  }
  .sidebar__categories {
    padding: 0 0.5rem;
  }
  .sidebar__icon {
    color: var(--light);
    font-size: var(--headingFontSize);
  }
  .sidebar__row {
    margin-bottom: 3rem;
  }
  .sidebar__dash {
    width: 1rem;
    height: 0.1rem;
    background-color: var(--light);
    left: 8rem;
    position: absolute;
  }
  .sidebar__dash--top {
    transform: translateY(-2.2rem);
  }
  .sidebar__category--item {
    left: 10rem;
    position: absolute;
    color: var(--light);
  }
  .sidebar__category--item-title {
    transform: translateY(0.125rem);
    font-weight: 500;
  }
  .sidebar__category--item-title:default {
    color: var(--light);
  }
  .sidebar__category--item-title:hover {
    background: -webkit-linear-gradient(var(--light), var(--gray));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent !important;
  }
  .sidebar__dash--bottom {
    transform: translateY(-0.7rem);
  }
  .sidebar__category--item-number {
    transform: translateY(1.9rem);
    font-size: var(--extrasmallFontSize);
  }
  /********** blog main **********/
  .blog__main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-left: 1.5rem;
    gap: 1.5rem;
    .blog__cart {
      border: none;
      overflow: hidden;
      background-color: var(--light);
      .blog__cart--top {
        overflow: hidden;
        border-radius: var(--borderRadius);
        .blog__cart--img {
          border-radius: var(--borderRadius);
          overflow: hidden;
          height: 35vh;
          z-index: 7;
          transition: var(--transition-fast);
        }
        .blog__cart--img::after {
          content: "";
          overflow: hidden;
          width: 100%;
          z-index: 15;
        }
        .blog__cart--img:hover {
          transform: scale(1.1);
          opacity: 0.9;
        }
      }
      .blog__cart--body {
        padding: 1rem 0;
        .blog__cart--tag {
          color: var(--gray);
          font-size: var(--smallFontSize);
        }
        .blog__cart--tag:hover {
          color: var(--gray);
        }
        .blog__cart--title {
          width: 100%;
          text-align: start;
          font-family: var(--bodyFont);
          font-weight: 800;
          font-size: calc(var(--bodyFontSize) + 0.1rem);
          transition: var(--transition-fast);
          color: var(--dark);
        }
        .blog__cart--title:hover {
          color: var(--orange);
        }
        .blog__cart--text {
          width: 100%;
          margin-top: 0.5rem;
          text-align: start;
          font-family: var(--bodyFont);
          font-size: var(--smallFontSize);
          color: var(--gray);
        }
      }
    }
  }

  /************ Responsive Css ************/
  @media only screen and (max-width: 1300px) {
    .sidebar {
      width: 25%;
    }
    .blog__cart--img {
      height: 30vh;
    }
  }
  @media only screen and (max-width: 1200px) {
    .sidebar__icon,
    .sidebar__dash {
      visibility: hidden;
    }
    .sidebar__category--item {
      left: 4rem;
    }
  }
  @media only screen and (max-width: 992px) {
    .sidebar {
      padding: 3rem 1.5rem;
    }
    .sidebar__title {
      margin-bottom: 3rem;
      letter-spacing: normal;
      font-size: calc(var(--bodyFontSize) + 0.2rem);
    }
    .sidebar__row {
      margin-bottom: 2rem;
    }
    .sidebar__category--item {
      left: 2.5rem;
    }
    .blog__main {
      width: 70%;
    }
    .blog__cart--img {
      height: 25vh;
    }
  }
  @media only screen and (max-width: 768px) {
    .sidebar {
      padding: 1.5rem;
      width: 100%;
      height: fit-content;
    }
    .sidebar__title {
      margin-bottom: 1rem;
    }
    .sidebar__row {
      margin-bottom: 0rem;
      display: flex;
      flex-direction: column;
      margin-right: 2rem;
      margin-bottom: 2rem;
    }
    .sidebar__icon,
    .sidebar__dash {
      display: none;
    }
    .sidebar__categories {
      display: flex;
      overflow-x: auto !important;
    }
    .sidebar__categories::-webkit-scrollbar {
      height: 0.5rem;
    }
    .sidebar__categories::-webkit-scrollbar-track {
      border-radius: var(--borderRadius);
      box-shadow: inset 0 0 6px var(--gray);
    }
    .sidebar__categories::-webkit-scrollbar-thumb {
      background-color: var(--gray-opacity7);
      border: 0.125rem solid var(--gray);
      border-radius: var(--borderRadius);
    }
    .sidebar__categories::-webkit-scrollbar-button:single-button {
      display: none !important;
    }
    .sidebar__category--item {
      position: relative;
    }
    .sidebar__category--item {
      left: 0rem;
    }
    .sidebar__category--item-number {
      transform: translateY(0.3rem);
    }
    .blog__main {
      width: 100%;
      margin: 2rem 0 0 0;
    }
    .blog__cart--img {
      height: 25vh;
    }
  }
  @media only screen and (max-width: 576px) {
    .blog__main {
      display: block;
    }
    .blog__cart {
      margin-bottom: 2rem;
    }
    .blog__cart--img {
      height: 40vh;
    }
  }
  @media only screen and (max-width: 450px) {
    .blog__cart {
      margin-bottom: 1.5rem;
    }
    .blog__cart--img {
      height: 30vh;
    }
  }
`;
