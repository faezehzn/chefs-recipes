import CustomButton from "../utilities/CustomButton";
import styled from "styled-components";
import { useRef, useState } from "react";
import { useCustomContext } from "../context/customContext";
import { Alert } from "react-bootstrap";
import History from "./History";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { dataApi } from "../context/constants";

const ForgetPasswordMain = () => {
  const { data } = useCustomContext();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [buttonTxt, setButtonTxt] = useState("Reset");
  const [status, setStatus] = useState({});
  const refAlert = useRef(null);
  const passRef = useRef(null);
  const confirmPassRef = useRef(null);
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [iconPassword, setIconPassword] = useState(<FaEyeSlash />);
  const [iconConfirmPassword, setIconConfirmPassword] = useState(<FaEyeSlash />);


  const handleShowPassword = (name) => {
    if(name === "password") {
      if (typePassword === "password") {
        setTypePassword("text");
        setIconPassword(<FaEye />);
      } else {
        setTypePassword("password");
        setIconPassword(<FaEyeSlash />);
      }
    } else if(name === "confirm-password") {
      if (typeConfirmPassword === "password") {
        setTypeConfirmPassword("text");
        setIconConfirmPassword(<FaEye />);
      } else {
        setTypeConfirmPassword("password");
        setIconConfirmPassword(<FaEyeSlash />);
      }
    }
    
  };

  const validatePassword = (pass)=> {
    if (pass.length < 8) {
        setButtonTxt("Reset")
        setStatus({
              succes: false,
              message: "Your password must be at least 8 characters"
            })
        return false
    }
    if (pass.length > 32) {
        setButtonTxt("Reset")
        setStatus({
          succes: false,
          message: "Your password must be at max 32 characters"
        })
        return false
    }
    if (pass.search(/[a-z]/) < 0) {
        setButtonTxt("Reset")
        setStatus({
          succes: false,
          message: "Your password must contain at least one lower case letter."
        })
        return false
    }
    if (pass.search(/[A-Z]/) < 0) {
        setButtonTxt("Reset")
        setStatus({
          succes: false,
          message: "Your password must contain at least one upper case letter."
        })
        return false
    }
    if (pass.search(/(\s)/) > 0) {
        setButtonTxt("Reset")
        setStatus({
          succes: false,
          message: "Your password must not contain any whitespace."
        })
        return false
    }

    if (pass.search(/[0-9]/) < 0) {
        setButtonTxt("Reset")
        setStatus({
          succes: false,
          message: "Your password must contain at least one digit."
        })
        return false
    }
   if (pass.search(/[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]/) < 0) {
        setButtonTxt("Reset")
        setStatus({
          succes: false,
          message: "Your password must contain at least special char from -[ ., @, #, $, *, etc]"
        })
        return false
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonTxt("Please Wait...");
    const newPass = passRef.current.value;
    const confirmPass = confirmPassRef.current.value;
    const userData =
    data.users.find(
      (user) =>
        user.username === window.location.hash.slice(7)) || "";

    if (validatePassword(newPass)) {
      setButtonTxt("Reset");
      if (newPass === confirmPass) {
        userData.password = newPass
        axios.put(`${dataApi}/users/${userData.id}`, userData)
        setStatus({ succes: true, message: "Password reset" });
        setTimeout(() => {
          refAlert.current.className += " d-none";
        }, 3000);
        History.push("/my-account");
        window.location.reload();
      } else {
        setStatus({ succes: false, message: "Password confirmation doesn't match password" });
      }
    }
  };

  return (
    <Wrapper>
      <div className="forget-password__main">
        <h3 className="forget-password__main--title">Reset account password</h3>
        <p className="forget-password__main--txt">
          Please enter a new password for chef's recipes site
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
          <label className="forget-form__label" htmlFor="password">
            New Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={typePassword}
              id="password"
              name="password"
              required
              className="forget-form__input"
              ref={passRef}
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={()=> handleShowPassword("password")}
              className="forget-form__input--eyes"
            >
              {iconPassword}
            </span>
          </div>
          <label className="forget-form__label mt-4" htmlFor="confirm-password">
            Confirm Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={typeConfirmPassword}
              id="confirm-password"
              name="confirm-password"
              required
              className="forget-form__input"
              ref={confirmPassRef}
              value={confirmPassword || ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              onClick={()=> handleShowPassword("confirm-password")}
              className="forget-form__input--eyes"
            >
              {iconConfirmPassword}
            </span>
          </div>
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
          .password-errors {
            border-radius: var(--borderRadius) !important;
          }
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
      .forget-form__input--eyes {
        position: absolute;
        top: 25%;
        right: 27%;
        color: var(--gray);
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
    @media only screen and (max-width: 1200px) {
      .forget-form {
        .forget-form__alert {
          width: 70%;
          left: 15%;
        }
      }
    }
    @media only screen and (max-width: 992px) {
      padding: 10rem 2rem 5rem;
      .forget-form {
        .forget-form__alert {
          top: 21%;
          width: 80%;
          left: 10%;
        }
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
        .forget-form__alert {
          top: 18%;
          width: 95%;
          left: 2.5%;
          .alert {
            border-radius: var(--borderRadius) !important;
          }
        }
        .forget-form__input {
          width: 70%;
        }
      }
    }
    @media only screen and (max-width: 450px) {
      padding: 12rem 2rem 5rem;
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
