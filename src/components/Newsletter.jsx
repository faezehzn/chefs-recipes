import { useState, useEffect, useRef } from "react";
import { Col, Alert } from "react-bootstrap";
import CustomButton from "../utilities/CustomButton";
import styled from "styled-components";
import newsletterBg from "../assets/images/bg/orange.jpg";

const Newsletter = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState("");
  const refAlert = useRef(null);

  useEffect(() => {
    if (status === "success" || status === "error") {
      clearFields();
      setTimeout(() => {
        refAlert.current.className += " d-none";
      }, 3000);
    }
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();

    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      });
  };

  const clearFields = () => {
    setEmail("");
  };

  return (
    <Wrapper>
      <div className="newletter__home">
        <div className="newletter__alert">
          <Col className="d-block">
            {status === "sending" && (
              <Alert className="mx-auto" id="alert-news-1">
                Submitting...
              </Alert>
            )}
            {status === "error" && (
              <Alert ref={refAlert} className="mx-auto alert-danger">
                {message}
              </Alert>
            )}
            {status === "success" && (
              <Alert ref={refAlert} className="mx-auto alert-success">
                {message}
              </Alert>
            )}
          </Col>
        </div>
        <div className="newsletter__box">
          <Col md={6} xl={5} className="newsletter__box--header">
            <h3 className="newsletter__box--title">
              Subscribe to our Newsletter
            </h3>
            <p className="newsletter__box--text">Never miss latest updates</p>
          </Col>
          <Col md={6} xl={5}>
            <form
              className="newsletter__box--form"
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                className="newsletter__box--form-input"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
              <CustomButton
                type="submit"
                classNameParent="m-1 justify-content-end newsletter__box--form-btn-parent"
                className="newsletter__box--form-btn me-3"
                textBtn={"Submit"}
              />
            </form>
          </Col>
        </div>
      </div>
    </Wrapper>
  );
};

export default Newsletter;

const Wrapper = styled.section`
  .newletter__home {
    position: relative;
    /********** Newsletter Alert **********/
    .newletter__alert {
      position: absolute;
      top: 45%;
      width: 50%;
      left: 25%;
      z-index: 10;
      text-align: center;
      .alert-success {
        opacity: 0.8;
      }
      .alert-danger {
        opacity: 0.8;
      }
    }
    /********** Newsletter Box **********/
    .newsletter__box {
      background-image: url(${newsletterBg});
      background-position: bottom;
      background-size: cover;
      color: var(--light);
      display: flex;
      justify-content: space-evenly;
      align-items: flex-end;
      position: relative;
      z-index: 5;
      height: 80vh;
      padding: 5rem 2rem;
    }
    .newsletter__box--title {
      font-family: var(--headingFontExtraBold);
      letter-spacing: var(--letterSpacing);
    }
    .newsletter__box--text {
      font-size: var(--headingFontSize);
    }
    .newsletter__box--form {
      border: 0.125rem solid var(--light);
      padding: 0.2rem;
      margin: 0 3rem;
      border-radius: 1.8rem;
      position: relative;
      display: flex;
      align-items: center;
    }
    .newsletter__box--form-input {
      width: 100%;
      background: transparent;
      border: 0;
      padding: 0 1rem;
      color: var(--light);
    }
    .newsletter__box--form-input::placeholder {
      color: var(--light);
    }
    .newsletter__box--form-btn {
      border: 0.125rem solid var(--orange) !important;
    }
    .newsletter__box--form-btn::before {
      content: "";
      background-color: var(--orange) !important;
    }
    .newsletter__box--form-btn:hover {
      color: var(--light) !important;
      background-color: var(--orange) !important;
    }

    /*********** Responsive Css ************/
    @media (max-width: 1200px) {
      .newsletter__box--form {
        margin: 0 1rem;
      }
    }
    @media (max-width: 992px) {
      .newletter__alert {
        top: 5%;
        width: 60%;
        left: 20%;
      }
      .alert-danger,
      .alert-success {
        opacity: 0.9;
      }
      .newsletter__box {
        align-items: center;
        padding-top: 20rem;
        padding-bottom: 3rem;
      }
      .newsletter__box--form {
        display: block;
        border: none;
      }
      .newsletter__box--form-input {
        border: 0.125rem solid var(--light);
        display: block;
        margin: 0 auto 0.5rem auto;
        border-radius: 1.8rem;
        width: 90%;
        padding: 1rem 2rem;
      }
      .newsletter__box--form-btn-parent {
        justify-content: center;
        padding: 1rem 2rem;
        margin: 0 auto 0.5rem auto !important;
      }
      .newsletter__box--form-btn {
        padding: 1rem 2rem;
        width: 70%;
        margin: 0 auto;
      }
    }
    @media (max-width: 768px) {
      .newletter__alert {
        top: 5%;
        width: 80%;
        left: 10%;
      }
      .newsletter__box {
        padding-top: 18rem;
        display: block;
        text-align: center;
      }
      .newsletter__box--header {
        padding: 0.5rem;
        position: absolute;
        top: 20%;
        width: 100%;
        left: 0;
      }
      .newsletter__box--title {
        font-size: var(--headingFontSize) !important;
      }
      .newsletter__box--text {
        font-size: var(--bodyFontSize);
      }
      .newsletter__box--form {
        margin-top: 5rem;
      }
      .newsletter__box--form-input {
        width: 70%;
      }
    }
    @media (max-width: 576px) {
      .newletter__alert {
        font-size: var(--extrasmallFontSize);
        font-weight: 800;
        width: 90%;
        left: 5%;
      }
      .newsletter__box {
        padding: 16rem 0 3rem;
      }
      .newsletter__box--form {
        width: 100%;
        margin-left: 0;
      }
      .newsletter__box--form-input {
        width: 90%;
      }
    }
  }
`;
