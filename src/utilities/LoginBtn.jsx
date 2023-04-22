import { SiIfood } from "react-icons/si";
import { useState } from "react";
import { Button, Modal, Container, Alert } from "react-bootstrap";
import {
  FaCentercode,
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaGithub,
  FaGooglePlus,
  FaUserAlt,
} from "react-icons/fa";
import CustomButton from "./CustomButton";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCustomContext } from "../context/customContext";
import History from "../components/History";
import { useRef } from "react";

const LoginBtn = () => {
  const {
    data,
    rememberMe,
    handleCheckedRememberMe,
    setIsAuthenticated, handleLogout,
    isAuthenticated, accountOptions, setUser, onChangeActiveLink, activeLink
  } = useCustomContext();
  const [loginShow, setLoginShow] = useState(false);
  const [icon, setIcon] = useState(<FaEyeSlash />);
  const [type, setType] = useState("password");
  const [username, setUsername] = useState(
    rememberMe.length > 0 ? rememberMe[0].username : ""
  );
  const [password, setPassword] = useState(
    rememberMe.length > 0 ? rememberMe[0].password : ""
  );
  const [status, setStatus] = useState({});
  const refAlert = useRef(null);
  const usernameRef = useRef(null);
  const passRef = useRef(null);

  const handleShowPassword = () => {
    if (type === "password") {
      setType("text");
      setIcon(<FaEye />);
    } else {
      setType("password");
      setIcon(<FaEyeSlash />);
    }
  };

  const handleSubmit = async (e) => {
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
        setIsAuthenticated(() => {
          return true;
        });
        setUser(() => {
          return {...userData, id: null, password: null};
        });
        setStatus({ succes: true, message: `You are successfully logged in` });
        setTimeout(()=> {
          refAlert.current.className += " d-none";
        }, 1000)
        if(!window.location.pathname.slice(1).includes("my-account")) {
          History.push(`/my-account/dashboard-acc`);
          window.location.reload()
        }
      }
    } else {
      setStatus({
        succes: false,
        message: "invalid username",
      });
    }
  };

  if (isAuthenticated) {
    return (
      <Wrapper>
        <ul className="navigation__right-acc">
          <div style={{ position: "relative" }}>
            <FaUserAlt
              className="person--icon"
              size={15}
              style={{
                color: "var(--light)",
                fontWeight: "800",
                margin: "2rem 0",
              }}
            />
          </div>
          <div className="navigation__right-acc-item--container">
            {accountOptions.map((option) => {
              return (
                <li key={option.id} className={
                    activeLink === option.option
                      ? "navigation__right-acc-item active"
                      : "navigation__right-acc-item"
                  } onClick={option.option === "Logout" ? () => onChangeActiveLink("My Dashboard") : () => onChangeActiveLink(option.option)}>
                  {option.option === "Logout" ? (
                    <Link
                      className="navigation__right-acc-item-link"
                      to={`/my-account`}
                    >
                      <span className="me-1">{option.icon}</span>
                      <span onClick={handleLogout}>{option.option}</span>
                    </Link>
                  ) : (
                    <Link
                      className="navigation__right-acc-item-link"
                      reloadDocument
                      to={`/my-account/${option.link}`}
                    >
                      <span className="me-1">{option.icon}</span>
                      <span>{option.option}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </div>
        </ul>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Button
        className="navigation__right--icon"
        onClick={() => setLoginShow(true)}
      >
        <SiIfood size={15} className="person--icon" />
      </Button>
      <Modal
        className="modal__login"
        fullscreen={true}
        show={loginShow}
        onHide={() => setLoginShow(false)}
        animation={true}
      >
        <Modal.Header
          className="modal-login__header"
          closeButton
        ></Modal.Header>
        <Modal.Body className="modal__login--body">
          <Container className="container-login">
            <div className="wrap-login">
              <form className="form-login">
                {/* alert */}
                <div className="form-login__alert">
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

                {/* logo & title */}
                <FaCentercode size={50} className="form-login--logo" />
                <span className="form-login--title">Log in</span>

                {/* username */}
                <div className="input-login">
                  <input
                    className="input-login__fields"
                    type="text"
                    name="username"
                    required
                    ref={usernameRef}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <span
                    className="input-login__fields--focus"
                    data-placeholder="&#xf007;"
                  ></span>
                </div>

                {/* password */}
                <div className="input-login mb-3">
                  <input
                    className="input-login__fields"
                    type={type}
                    name="pass"
                    required
                    ref={passRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="input-login__fields--focus"
                    data-placeholder="&#xf023;"
                  ></span>
                  <span
                    onClick={handleShowPassword}
                    className="input-login__fields--eyes"
                  >
                    {icon}
                  </span>
                </div>

                {/* checkbox */}
                <div className="checkbox-login">
                  <input
                    className="checkbox-login__input"
                    id="ckb1"
                    type="checkbox"
                    name="remember-me"
                    onChange={(e) => handleCheckedRememberMe(e, usernameRef, passRef)}
                    checked={rememberMe.length > 0 ? true : false}
                  />
                  <label className="checkbox-login__label" htmlFor="ckb1">
                    Remember me
                  </label>
                </div>

                {/* login btn */}
                <CustomButton
                  textBtn={"Login"}
                  onClick={(e) => handleSubmit(e)}
                  className='login-btn'
                />

                {/* forget password */}
                <div className="text-center">
                  <Link
                    reloadDocument
                    className="txt-login"
                    to="/my-account/forget-password"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* sign up by SM */}
                <div className="txt-signup text-center mt-5">
                  <span>__ Or Sign Up Using __</span>
                </div>
                <div className="text-center mt-2">
                  <Link reloadDocument to="/" className="social-login__item">
                    <FaFacebook size={30} color="blue" />
                  </Link>
                  <Link reloadDocument to="/" className="social-login__item">
                    <FaGithub size={30} color="var(--gray)" />
                  </Link>
                  <Link reloadDocument to="/" className="social-login__item">
                    <FaGooglePlus size={30} color="var(--red-dark)" />
                  </Link>
                </div>

                {/* sign up by create account */}
                <div className="mt-4 text-center">
                  <span className="txt-signup">Or Sign Up Using</span>
                  <Link reloadDocument to={`/my-account`} className="p-3 txt-login">
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </Wrapper>
  );
};

export default LoginBtn;

const Wrapper = styled.section`
  display: flex;
  .navigation__right--icon,
  .navigation__right--icon:hover {
    background-color: transparent !important;
    border: none !important;
    padding: 0.2rem 0.5rem !important;
    box-shadow: none;
  }
  .person--icon {
    color: var(--light);
  }
  .navigation__right-acc {
    padding: 0 0.5rem;
    display: block !important;
    margin: 0;
    .navigation__right-acc-item--container {
      display: block;
      visibility: hidden;
      border-radius: calc(var(--borderRadius) - 0.5rem);
      opacity: 0;
      background-color: var(--light);
      text-align: start;
      margin: -1rem 0;
      position: absolute;
      right: 17%;
      top: 95%;
      transform: translateX(-2rem) !important;
      padding: 1.5rem;
      transition: var(--transition-fast);
      width: 12rem;
      z-index: 50;
      .navigation__right-acc-item {
        display: block;
        font-size: var(--smallFontSize) !important;
        :not(:last-child) {
          margin-bottom: 0.5rem;
        }
        :last-child {
          border-top: 0.05rem solid var(--gray-opacity3);
        }
        :hover:not(:last-child) {
          transform: scale(1.1);
        }
        .navigation__right-acc-item-link {
          color: var(--gray);
          font-weight: 500;
          :hover {
            color: var(--orange);
            font-weight: 800;
          }
        }
      }
    }
    :hover {
      .navigation__right-acc-item--container {
        opacity: 1;
        top: 100%;
        visibility: visible;
        animation: moveDownToUp 0.2s ease-in;
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .navigation__right-acc-item--container {
        left: 25%;
        transform: translateY(-0.5rem) !important;
      }
    }
  }
`;
