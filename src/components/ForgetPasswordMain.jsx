import CustomButton from "../utilities/CustomButton";
import styled from "styled-components";
import { useRef, useState } from "react";
import { useCustomContext } from "../context/customContext";
import { Alert } from "react-bootstrap";
import History from "./History";
import axios from "axios";

const ForgetPasswordMain = () => {
  const { data, location, setSearchParams } = useCustomContext();
  const [username, setUsername] = useState();
  const [buttonTxt, setButtonTxt] = useState("Reset Password");
  const usernameOrEmailRef = useRef(null);
  const [status, setStatus] = useState({});
  const refAlert = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonTxt("Please Wait...");
    const usernameOrEmail = usernameOrEmailRef.current;
    const userData =
      data.users.find(
        (user) =>
          user.username === usernameOrEmail.value ||
          user.email === usernameOrEmail.value
      ) || "";

    const variableFetch = {
      service_id: process.env.REACT_APP_YOUR_SERVICE_ID,
      template_id: process.env.REACT_APP_YOUR_TEMPLATE_ID,
      user_id: process.env.REACT_APP_YOUR_PUBLIC_KEY,
      template_params: userData,
    };
    if (userData) {
      await axios
        .post(`https://api.emailjs.com/api/v1.0/email/send`, variableFetch)
        .then(
          (result) => {
            if (result.status === 200 || result.data === "OK") {
              setUsername("");
              setButtonTxt("Reset Password");
              setStatus({
                succes: true,
                message: "Password reset email has been sent",
              });
              setTimeout(() => {
                refAlert.current.className += " d-none";
                setSearchParams({ reset_password: true });
                History.push(
                  "/my-account/forget-password/?reset_password=true"
                );
                window.location.reload();
              }, 3000);
            }
          },
          (error) => {
            setStatus({
              succes: false,
              message: "Something went wrong, please try again later.",
            });
            setTimeout(() => {
              refAlert.current.className += " d-none";
            }, 3000);
            console.log(error.text);
          }
        );
    } else {
      setStatus({
        succes: false,
        message: "invalid username or email",
      });
      setTimeout(() => {
        refAlert.current.className += " d-none";
      }, 3000);
    }
  };

  if (location.search) {
    return (
      <Wrapper>
        <div className="forget-password__main">
          <h3 className="forget-password__main--title">
            Password reset email has been sent
          </h3>
          <p className="forget-password__main--txt">
            A password reset email has been sent to the email address on file
            for your account, but may take several minutes to show up in your
            inbox. Please wait at least 10 minutes before attempting another
            reset.
          </p>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="forget-password__main">
        <h3 className="forget-password__main--title">Lost your password?</h3>
        <p className="forget-password__main--txt">
          Please enter your username or email address. You will receive a link
          to create a new password via email.
        </p>
        <form className="forget-form">
          <div className="forget-form__alert">
            {status.message && (
              <Alert
                ref={refAlert}
                className={status.succes ? "alert-success" : "alert-danger"}
              >
                {status.message}
              </Alert>
            )}
          </div>
          <label className="forget-form__label" htmlFor="username">
            Username or email
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="forget-form__input"
            ref={usernameOrEmailRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <CustomButton
            classNameParent="justify-content-center"
            className="forget-form__btn mt-4"
            textBtn={buttonTxt}
            onClick={(e) => handleSubmit(e)}
          />
        </form>
      </div>
    </Wrapper>
  );
};

export default ForgetPasswordMain;

const Wrapper = styled.section`
  .forget-password__main {
    display: block;
    position: relative;
    z-index: 5;
    height: fit-content;
    padding: 5rem 2rem;
    text-align: center;
    .forget-password__main--title {
      font-weight: 900;
      font-size: calc(var(--headingFontSize) + 0.5rem) !important;
    }
    .forget-password__main--txt {
      color: var(--gray);
      margin: 2rem auto 1rem;
      font-size: calc(var(--bodyFontSize) + 0.2rem);
      font-weight: 300;
      width: 80%;
    }
    .forget-form {
      .forget-form__alert {
        position: fixed;
        top: 16.5%;
        width: 50%;
        left: 25%;
        z-index: 100;
        text-align: center;
        .alert {
          animation: moveDownToUp 1s ease-in;
          transition: var(--transition-fast);
        }
      }
      .forget-form__label {
        color: var(--gray);
        font-weight: 700;
        margin-bottom: 0.5rem;
        display: block;
      }
      .forget-form__input {
        width: 30%;
        background: var(--white);
        border-radius: calc(var(--borderRadius) + 1.5rem);
        border: none;
        box-shadow: var(--shadow);
        color: var(--dark);
        padding: 0.8rem 1.5rem;
        font-weight: 500;
        transition: var(--transition-fast);
        :focus {
          background: var(--white);
        }
      }
      .forget-form__btn {
        width: 15rem;
        border: none !important;
        font-size: var(--bodyFontSize);
        text-transform: uppercase;
        color: var(--light) !important;
        background-color: var(--orange);
        :hover {
          color: var(--orange) !important;
          background-color: transparent;
        }
        ::before {
          background-color: var(--light);
          width: 100%;
        }
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      padding: 10rem 2rem 5rem;
      .forget-form {
        .forget-form__input {
          width: 50%;
        }
        .forget-form__btn {
          opacity: 1 !important;
          :hover {
            background-color: var(--light) !important;
          }
        }
      }
    }
    @media only screen and (max-width: 768px) {
      .forget-form {
        .forget-form__input {
          width: 70%;
        }
      }
    }
    @media only screen and (max-width: 450px) {
      .forget-password__main--title {
        font-size: var(--headingFontSize) !important;
      }
      .forget-password__main--txt {
        font-size: var(--bodyFontSize) !important;
      }
      .forget-form {
        .forget-form__input {
          width: 90%;
        }
        .forget-form__btn {
          width: 13rem !important;
        }
      }
    }
  }
`;
