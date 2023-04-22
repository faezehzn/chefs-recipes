import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = ({ scrollUnder150 = -5 }) => {
  const footerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 150) {
        footerRef.current.style.bottom = "0";
      } else {
        footerRef.current.style.bottom = scrollUnder150 + "rem";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Wrapper>
      <footer className="footer" ref={footerRef}>
        <p className="footer__text">
          Operated by{" "}
          <Link reloadDocument to={`/`} className="footer__text--colored">
            Faezeh.zn
          </Link>
        </p>
        <p className="footer__text">All Rights Reserved</p>
      </footer>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.section`
  .footer {
    background-color: var(--orange);
    padding: 2rem;
    height: 5rem;
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transition: var(--transition-fast);

    .footer__text {
      color: var(--light);
      font-family: var(--bodyFont);
      text-transform: uppercase;
      margin: 0;
      padding: 0 8rem;
    }
    .footer__text--colored {
      color: var(--dark);
      text-decoration: underline !important;
    }
    .footer__text--colored:hover {
      color: var(--black);
      text-decoration: underline !important;
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .footer__text {
        padding: 0 4rem;
      }
    }
    @media only screen and (max-width: 768px) {
      .footer__text {
        padding: 0 1rem;
      }
    }
    @media only screen and (max-width: 576px) {
      .footer__text {
        padding: 0;
        font-size: var(--smallFontSize);
      }
    }
    @media only screen and (max-width: 450px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .footer__text {
        margin: 0.2rem 0;
      }
    }
  }
`;
