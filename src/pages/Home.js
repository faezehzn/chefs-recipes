import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../components/Navbar";
import navItems from "../assets/data/NavbarData";
import HomeHeader from "../components/HomeHeader";
import CatContainerHome from "../components/CatContainerHome";
import MailchimpSubscribe from "../components/MailchimpForm";
import HealthiestRecipe from "../components/HealthiestRecipe";
import BlogCategoriesMain from "../components/BlogCategoriesMain";
import CakeRecipes from "../components/CakeRecipes";
import VideoRecipes from "../components/VideoRecipes";
import Footer from "../components/Footer";
import WinkerUpBtn from "../utilities/WinkerUpBtn";
import { useCustomContext } from "../context/customContext";
import SearchedTotal from "./SearchedTotal";


const Home = () => {
  const { location } = useCustomContext()

  if (location.search) {
    return <SearchedTotal />
  }
  return (
    <Wrapper>
      <Container fluid className="p-0 parallax__home home__page">
        <Row>
          <Col md={12}>
            <NavBar navItems={navItems} />
            <HomeHeader />
            <CatContainerHome />
            <MailchimpSubscribe />
            <HealthiestRecipe />
            <BlogCategoriesMain />
            <CakeRecipes />
            <VideoRecipes />
            <Footer />
            <WinkerUpBtn />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.section`
  .home__page > .row {
    --bs-gutter-x: 0 !important;
  }
  .home__page > .row > * {
    margin: 0 !important;
  }
  .parallax__home {
    margin-bottom: 5rem;
  }
  .up-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    border: none;
    background-color: transparent;
    font-size: 2rem;
    z-index: 10;
    animation: winker 0.5s infinite alternate linear;
  }
  .up-btn:hover {
    box-shadow: none;
  }
  @keyframes winker {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }
`;
