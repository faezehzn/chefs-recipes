import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/logo.png";

const NavbarLogo = () => {
  return (
    <Wrapper>
      <Link reloadDocument to="/" className="navigation__nav--brand">
        <img
          className="navigation__nav--logo"
          src={logo}
          alt="Faezeh Recipes"
        />
        <h5 className="navigation__logo--icon">
          Chef <span className="navigation__logo--icon-Colored">Recipes</span>
        </h5>
      </Link>
    </Wrapper>
  );
};

export default NavbarLogo;

const Wrapper = styled.section`
  .navigation__nav--brand {
    width: 85%;
    display: flex;
    align-items: center;
    margin: 0.5rem;
  }
  .navigation__nav--logo {
    width: 20%;
    transform: scale(1.4) translateY(-0.2rem);
  }
  .navigation__logo--icon {
    color: var(--light);
    letter-spacing: 0;
  }
  .navigation__logo--icon-Colored {
    color: var(--orange);
  }

  /************ Responsive Css ************/
  @media only screen and (max-width: 992px) {
    .navigation__nav--brand {
      position: absolute;
      top: 10vh;
      left: 2%;
      width: 50%;
    }
    .navigation__logo--icon {
      position: absolute;
      left: 20%;
      top: 5vh;
    }
  }
  @media only screen and (max-width: 768px) {
    .navigation__nav--brand {
      position: absolute;
      top: 8vh;
      left: 2%;
      width: 50%;
    }
    .navigation__logo--icon {
      position: absolute;
      left: 20%;
      top: 3vh;
    }
  }
  @media only screen and (max-width: 576px) {
    .navigation__nav--brand {
      position: absolute;
      top: 8vh;
      left: 2%;
      width: 20rem;
    }
    .navigation__logo--icon {
      position: absolute;
      left: 20%;
      top: 3vh;
    }
  }
`;
