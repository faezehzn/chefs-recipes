import { useEffect, useRef, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import CustomButton from "../utilities/CustomButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import History from "../components/History";
import MyAccountMainIsAthen from "./MyAccountMainIsAthen";
import { dataApi } from "../context/constants";


const MyAccountMain = () => {
  const {
    data,
    setIsAuthenticated,
    isAuthenticated,
    rememberMe,
    handleCheckedRememberMe, setUser
  } = useCustomContext();
  const [username, setUsername] = useState(
    rememberMe.length > 0 ? rememberMe[0].username : ""
  );
  const [password, setPassword] = useState(
    rememberMe.length > 0 ? rememberMe[0].password : ""
  );
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({});
  const refAlert = useRef(null);
  const [iconPassword, setIconPassword] = useState(<FaEyeSlash />);
  const [iconNewPassword, setIconNewPassword] = useState(<FaEyeSlash />);
  const [typePassword, setTypePassword] = useState("password");
  const [typeNewPassword, setTypeNewPassword] = useState("password");
  const usernameRef = useRef(null);
  const newUsernameRef = useRef(null);
  const passRef = useRef(null);
  const newPassRef = useRef(null);
  const emailRef = useRef(null);

  const handleShowPassword = (name) => {
    if (name === "password") {
      if (typePassword === "password") {
        setTypePassword("text");
        setIconPassword(<FaEye />);
      } else {
        setTypePassword("password");
        setIconPassword(<FaEyeSlash />);
      }
    } else if (name === "new-password") {
      if (typeNewPassword === "password") {
        setTypeNewPassword("text");
        setIconNewPassword(<FaEye />);
      } else {
        setTypeNewPassword("password");
        setIconNewPassword(<FaEyeSlash />);
      }
    }
  };

  const validatePassword = (pass) => {
    if (pass.length < 8) {
      setStatus({
        succes: false,
        message: "Password must be at least 8 characters",
      });
      return false;
    }
    if (pass.length > 32) {
      setStatus({
        succes: false,
        message: "Password must be at max 32 characters",
      });
      return false;
    }
    if (pass.search(/[a-z]/) < 0) {
      setStatus({
        succes: false,
        message: "Password must contain at least one lower case letter.",
      });
      return false;
    }
    if (pass.search(/[A-Z]/) < 0) {
      setStatus({
        succes: false,
        message: "Password must contain at least one upper case letter.",
      });
      return false;
    }
    if (pass.search(/(\s)/) > 0) {
      setStatus({
        succes: false,
        message: "Password must not contain any whitespace.",
      });
      return false;
    }

    if (pass.search(/[0-9]/) < 0) {
      setStatus({
        succes: false,
        message: "Password must contain at least one digit.",
      });
      return false;
    }
    if (pass.search(/[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]/) < 0) {
      setStatus({
        succes: false,
        message:
          "Password must contain at least special char from -[ ., @, #, $, *, etc]",
      });
      return false;
    }
    return true;
  };

  const validateUsername = (username) => {
    const newUser = newUsernameRef.current.value;
    const userData = data.users.find((user) => user.username === newUser);

    if (userData) {
      setStatus({
        succes: false,
        message: "This username is already in use.",
      });
      return false;
    }
    if (username.length < 2) {
      setStatus({
        succes: false,
        message: "Username must be at least 2 characters",
      });
      return false;
    }
    if (username.length > 32) {
      setStatus({
        succes: false,
        message: "Username must be at max 32 characters",
      });
      return false;
    }
    if (username.search(/[a-zA-Z]/) < 0) {
      setStatus({
        succes: false,
        message: "Username must contain at least one letter.",
      });
      return false;
    }
    if (username.search(/(\s)/) > 0) {
      setStatus({
        succes: false,
        message: "Username must not contain any whitespace.",
      });
      return false;
    }
    return true;
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const newPass = newPassRef.current.value;
    const newUser = newUsernameRef.current.value;
    const newEmail = emailRef.current.value;
    const userData = data.users.find((user) => user.email === newEmail) || "";

    if (userData) {
      setStatus({ succes: false, message: "This email is already registered" });
    } else if (userData === "") {
      if (validateUsername(newUser)) {
        if (validatePassword(newPass)) {
          const newAccount = {
            username: newUser,
            password: newPass,
            email: newEmail,
          };

          await fetch(`${dataApi}/users`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(newAccount),
          }).then((res) => {
            if (res.ok === true) {
              setStatus({
                succes: true,
                message: "Registration was successful. Please log in",
              });
            } else {
              setStatus({
                succes: false,
                message: "Something went wrong, please try again later.",
              });
            }
          });
        }
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current;
    const pass = passRef.current;
    const userData =
      data.users.find((user) => user.username === username.value) || "";

    if (userData) {
      if (userData.password !== pass.value) {
        setStatus({
          succes: false,
          message: "invalid password",
        });
      } else {
        if(window.location.pathname.slice(1).includes("my-account")) {
          History.push(`/my-account/dashboard-acc`);
          window.location.reload()
        }
        setIsAuthenticated(() => {
          return true;
        });
        setUser(() => {
          return {...userData, id: null, password: null};
        });
      }
    } else {
      setStatus({
        succes: false,
        message: "invalid username",
      });
    }
  };

  useEffect(()=> {
    if(!isAuthenticated) {
      const handleScrollIndicator = ()=> {
        const winScroll = document.getElementById("scrollId").scrollTop;
        const height = document.getElementById("scrollId").scrollHeight - document.getElementById("scrollId").clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
      }
      document.getElementById("scrollId").addEventListener("scroll", handleScrollIndicator)
    }
  })

  if (!isAuthenticated) {
    return (
      <Wrapper>
        <Container fluid className="my-account__main">
          <div className="scroll-indicator">
            <div className="progress-container">
              <div className="progress-bar" id="myBar"></div>
            </div>
          </div>
          <Row className="justify-content-center scroll-row m-0" >
            <Row id='scrollId' className='mt-5 justify-content-center' >
              <Col lg={5} className='px-0 px-sm-2'>
                <h3 style={{ fontWeight: "900" }}>Sign Up</h3>
                <form className="form my-0 mt-sm-4 mx-0 mx-sm-3 p-1 p-sm-3">
                  {/* alert */}
                  <div className="form__alert">
                    {status.message && (
                      <Alert
                        ref={refAlert}
                        className={
                          status.succes ? "alert-success" : "alert-danger"
                        }
                      >
                        {status.message}
                      </Alert>
                    )}
                  </div>
                  {/* username */}
                  <label className="form__label" htmlFor="user">
                    Username <span style={{ color: "var(--orange)" }}>*</span>
                  </label>
                  <input
                    id="user"
                    type="text"
                    name="user"
                    ref={newUsernameRef}
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                    className="form__input"
                  />
                  {/* email */}
                  <label className="form__label" htmlFor="email">
                    Email Address{" "}
                    <span style={{ color: "var(--orange)" }}>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    ref={emailRef}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form__input"
                  />
                  {/* password */}
                  <label className="form__label" htmlFor="pass">
                    Password <span style={{ color: "var(--orange)" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="pass"
                      type={typeNewPassword}
                      ref={newPassRef}
                      name="pass"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="form__input"
                    />
                    <span
                      onClick={() => handleShowPassword("new-password")}
                      className="form__eyes"
                    >
                      {iconNewPassword}
                    </span>
                  </div>
                  {/* btn */}
                  <CustomButton
                    textBtn={"Sign Up"}
                    classNameParent="justify-content-center mx-0"
                    onClick={(e) => handleSignUpSubmit(e)}
                    className="form__btn"
                  />
                </form>
              </Col>
              <Col lg={5} className='px-0 px-sm-2 mt-4 mt-lg-0'>
                <h3 style={{ fontWeight: "900" }}>Login</h3>
                <form className="form my-0 mt-sm-4 mx-0 mx-sm-3 p-1 p-sm-3">
                  {/* alert */}
                  <div className="form__alert">
                    {status.message && (
                      <Alert
                        ref={refAlert}
                        className={
                          status.succes ? "alert-success" : "alert-danger"
                        }
                      >
                        {status.message}
                      </Alert>
                    )}
                  </div>
                  {/* username */}
                  <label className="form__label" htmlFor="username">
                    Username <span style={{ color: "var(--orange)" }}>*</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    ref={usernameRef}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="form__input"
                  />
                  {/* password */}
                  <label className="form__label" htmlFor="password">
                    Password <span style={{ color: "var(--orange)" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="password"
                      type={typePassword}
                      ref={passRef}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form__input"
                    />
                    <span
                      onClick={() => handleShowPassword("password")}
                      className="form__eyes"
                    >
                      {iconPassword}
                    </span>
                  </div>
                  {/* checkbox */}
                  <div className="form__checkbox">
                    <input
                      className="form__checkbox-input"
                      id="ckb1"
                      type="checkbox"
                      name="remember-me"
                      onChange={(e) =>
                        handleCheckedRememberMe(e, usernameRef, passRef)
                      }
                      checked={rememberMe.length > 0 ? true : false}
                    />
                    <label className="form__checkbox-label" htmlFor="ckb1">
                      Remember me
                    </label>
                  </div>
                  {/* btn */}
                  <CustomButton
                    textBtn={"Login"}
                    classNameParent="justify-content-center mx-0"
                    onClick={(e) => handleLoginSubmit(e)}
                    className="form__btn"
                  />
                  {/* forget password */}
                  <div className="text-center">
                    <Link
                      reloadDocument
                      className="form__forget"
                      to="/my-account/forget-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </form>
              </Col>
            </Row>
          </Row>
        </Container>
      </Wrapper>
    );
  }

  return (
    <MyAccountMainIsAthen />
  );
};

export default MyAccountMain;

const Wrapper = styled.section`
  .my-account__main {
    display: block;
    position: relative;
    z-index: 5;
    height: 100vh !important;
    padding: 2.5rem 2rem 5rem;
    margin-bottom: 5rem;
    transition: var(--transition-fast);

    .scroll-indicator {
      display: none;
      position: sticky;
      top: 0;
      z-index: 5;
      width: 100%;
      .progress-container {
        width: 100%;
        height: 0.5rem;
        border-radius: var(--borderRadius);
        background: var(--light);
        .progress-bar {
          height: 0.5rem;
          background: var(--orange);
          border-radius: var(--borderRadius);
          width: 0%;
        }
      }
    } 
    .scroll-row {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      #scrollId {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 2rem;
        padding: 0;
        overflow-y: hidden;
      }
    }
    .form {
      box-shadow: var(--shadow);
      padding: 1.5rem;
      margin: 1rem;
      border-radius: var(--borderRadius);
      .form__alert {
        position: fixed;
        top: 17%;
        width: 60%;
        left: 20%;
        z-index: 5;
        text-align: center;
        .alert {
          animation: moveDownToUp 1s ease-in;
          transition: var(--transition-fast);
        }
      }
      .form__label {
        color: var(--gray);
        margin-bottom: 0.5rem;
      }
      .form__input {
        width: 100%;
        background: var(--white);
        border-radius: calc(var(--borderRadius) + 1.5rem);
        border: 0.05rem solid var(--gray-opacity7);
        color: var(--dark);
        margin-bottom: 1.5rem;
        padding: 0.8rem 1.5rem;
        font-weight: 500;
        transition: var(--transition-fast);
        box-shadow: var(--shadow);
        :focus {
          background: var(--white);
          border: 0.125rem solid var(--orange);
        }
      }
      .form__eyes {
        position: absolute;
        right: 1rem;
        color: var(--gray);
        top: 0.8rem;
      }
      .form__checkbox {
        padding: 1rem 0.5rem;
        .form__checkbox-input {
          display: none;
        }
        .form__checkbox-label {
          font-family: var(--bodyFont);
          font-size: var(--smallFontSize);
          color: var(--gray);
          display: block;
          position: relative;
          padding-left: 1.5rem;
          cursor: pointer;
          ::before {
            content: "\f00c";
            font-family: "FontAwesome";
            font-size: var(--bodyFontSize);
            color: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            width: 1rem;
            height: 1rem;
            border-radius: 0.3rem;
            background: var(--light);
            border: 0.05rem solid var(--gray);
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .form__checkbox-input:checked + .form__checkbox-label::before {
          color: var(--orange);
        }
      }
      .form__btn {
        width: 40%;
        border: 0.125rem solid var(--orange) !important ;
        color: var(--gray) !important;
        :hover {
          color: var(--light) !important;
          background-color: var(--orange);
        }
        ::before {
          background-color: var(--orange);
          width: 100%;
        }
      }
      .form__forget {
        color: var(--gray);
        font-weight: 600;
        margin-top: 1rem;
        :hover {
          color: var(--orange);
        }
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      padding: 7rem 2rem;
      .scroll-indicator {
        display: block;
      }
      .scroll-row {
        #scrollId {
          overflow-y: scroll;
        }
      }
      .form {
        .form__alert {
          top: 21%;
          width: 75%;
          left: 12.5%;
        }
        .form__btn {
          :hover {
            opacity: 1 !important;
          }
        }
      }
    }
    @media only screen and (max-width: 768px) {
      .form {
        .form__alert {
          width: 95%;
          left: 2.5%;
        }
      }
    }
    @media only screen and (max-width: 576px) {
      padding: 11rem 2rem;
      .form {
        box-shadow: none;
        .form__alert {
          top: 19%;
          .alert {
            border-radius: var(--borderRadius) !important;
          }
        }
      }
    }
  }
`;
