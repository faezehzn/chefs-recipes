import styled from "styled-components";
import SearchContainer from "../components/SearchContainer";
import NavBar from "../components/Navbar";
import navItems from "../assets/data/NavbarData";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import { useCustomContext } from "../context/customContext";
import WinkerUpBtn from "../utilities/WinkerUpBtn";
import BlogSinglePageHeader from "../components/BlogSinglePageHeader";
import History from "../components/History";
import BlogSinglePageMain from "../components/BlogSinglePageMain";


const BlogSinglePage = () => {
  const { singleBlog, location } = useCustomContext();


  if (!singleBlog) {
    const badURL = location.pathname.split("/");
    History.push(`/${badURL[2]}`);
    window.location.reload();
    return;
  }
  return (
    <Wrapper>
      <Container fluid className="blog-single-page">
        <Row>
          <Col md={12}>
            <NavBar navItems={navItems} />
            <BlogSinglePageHeader />
            <BlogSinglePageMain />
            <SearchContainer />
            <Footer />
            <WinkerUpBtn />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default BlogSinglePage;

const Wrapper = styled.section`
  .blog-single-page > .row > * {
    padding: 0 !important;
    margin: 0 !important;

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
        color: var(--light);
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
        color: var(--light);
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
`;
