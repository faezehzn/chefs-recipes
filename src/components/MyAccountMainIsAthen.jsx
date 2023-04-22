import { useRef, useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import CustomButton from "../utilities/CustomButton";
import { GetSlug } from "../utilities/StringSlugConverter";
import { formatCurrency } from "../utilities/formatCurrency";
import { HiPhone, HiMail } from "react-icons/hi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { dataApi, LOCAL_URL } from "../context/constants";

const MyAccountMainIsAthen = () => {
  const {
    accountOptions,
    handleLogout,
    data,
    user,
    onChangeActiveLink,
    activeLink,
    setUser,
  } = useCustomContext();
  const [status, setStatus] = useState({});
  const [buttonText, setButtonText] = useState("Save Changes");
  const [firstName, setFirtsName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [newUsername, setNewUsername] = useState(user.username);
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const refAlert = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const newUsernameRef = useRef(null);
  const currPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);
  const [currPasswordType, setCurrPasswordType] = useState("password");
  const [currPasswordIcon, setCurrPasswordIcon] = useState(<FaEyeSlash />);
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [newPasswordIcon, setNewPasswordIcon] = useState(<FaEyeSlash />);
  const [confirmNewPasswordType, setConfirmNewPasswordType] =
    useState("password");
  const [confirmNewPasswordIcon, setConfirmNewPasswordIcon] = useState(
    <FaEyeSlash />
  );

  const handleShowPassword = (name) => {
    if (name === "currPassword") {
      if (currPasswordType === "password") {
        setCurrPasswordType("text");
        setCurrPasswordIcon(<FaEye />);
      } else {
        setCurrPasswordType("password");
        setCurrPasswordIcon(<FaEyeSlash />);
      }
    } else if (name === "newPassword") {
      if (newPasswordType === "password") {
        setNewPasswordType("text");
        setNewPasswordIcon(<FaEye />);
      } else {
        setNewPasswordType("password");
        setNewPasswordIcon(<FaEyeSlash />);
      }
    } else if (name === "confirmNewPassword") {
      if (confirmNewPasswordType === "password") {
        setConfirmNewPasswordType("text");
        setConfirmNewPasswordIcon(<FaEye />);
      } else {
        setConfirmNewPasswordType("password");
        setConfirmNewPasswordIcon(<FaEyeSlash />);
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

  const validateFirstLastName = (name) => {
    if (name.length < 2) {
      setStatus({
        succes: false,
        message: "First and last name must be at least 2 characters",
      });
      return false;
    }
    if (name.length > 32) {
      setStatus({
        succes: false,
        message: "First and last name must be at max 32 characters",
      });
      return false;
    }
    if (name.search(/[a-zA-Z]/) < 0) {
      setStatus({
        succes: false,
        message: "First and last name must contain at least one letter.",
      });
      return false;
    }
    return true;
  };

  const myOrders = data.checkout.filter((order) => order.email === user.email);
  const myCommentsRecipes = data.recipesComments.filter(
    (comment) => comment.email === user.email
  );
  const myCommentsBlogs = data.blogsComments.filter(
    (comment) => comment.email === user.email
  );
  const myCommentsProducts = data.productsComments.filter(
    (comment) => comment.email === user.email
  );
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    user.favoriteRecipes ? user.favoriteRecipes : []
  );

  const handleChangeProfile = async (e) => {
    e.preventDefault();
    setButtonText("Changing...");

    const userData = data.users.filter((u) => u.email === user.email);
    let changeProfile = userData[0];

    // validate first name
    if (firstNameRef.current.value !== "") {
      if (validateFirstLastName(firstNameRef.current.value)) {
        changeProfile = {
          ...changeProfile,
          firstName: firstNameRef.current.value,
        };
        setUser(() => {
          return { ...user, firstName: firstNameRef.current.value };
        });
      }
    }

    // validate last name
    if (lastNameRef.current.value !== "") {
      if (validateFirstLastName(lastNameRef.current.value)) {
        changeProfile = {
          ...changeProfile,
          lastName: lastNameRef.current.value,
        };
        setUser(() => {
          return { ...user, lastName: lastNameRef.current.value };
        });
      }
    }

    // validate username
    if (
      newUsernameRef.current.value !== userData[0].username &&
      validateUsername(newUsernameRef.current.value)
    ) {
      changeProfile = {
        ...changeProfile,
        username: newUsernameRef.current.value,
      };
      setUser(() => {
        return { ...user, username: newUsernameRef.current.value };
      });
    }

    // validate new password
    if (currPasswordRef.current.value !== "") {
      if (currPasswordRef.current.value === userData[0].password) {
        if (validatePassword(newPasswordRef.current.value)) {
          if (
            newPasswordRef.current.value === confirmNewPasswordRef.current.value
          ) {
            changeProfile = {
              ...changeProfile,
              password: newPasswordRef.current.value,
            };
            setStatus({
              succes: true,
              message: "Your changes done successfully",
            });
          } else {
            setStatus({
              succes: false,
              message: "Password confirmation doesn't match new password",
            });
          }
        }
      } else {
        setStatus({
          succes: false,
          message: "Current Password invalid",
        });
      }
    }

    await fetch(`${dataApi}/users/${userData[0].id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(changeProfile),
    });
    setButtonText("Save Changes");
  };

  const handleDeleteFavorites = async (id) => {
    const filteredfavoriteRecipes = favoriteRecipes.filter(
      (item) => item.id !== id
    );
    const userData = data.users.filter((u) => u.email === user.email);
    let changeProfile = userData[0];

    setFavoriteRecipes(filteredfavoriteRecipes);
    await setUser(() => {
      changeProfile = {
        ...userData[0],
        favoriteRecipes: [
          ...user.favoriteRecipes.filter((item) => item.id !== id),
        ],
      };
      return {
        ...user,
        favoriteRecipes: [
          ...user.favoriteRecipes.filter((item) => item.id !== id),
        ],
      };
    });

    await fetch(`${dataApi}/users/${userData[0].id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(changeProfile),
    });
  };

  return (
    <Wrapper>
      <Container fluid className="my-account__base p-0">
        <Row>
          <Col lg={4} xl={3} className="sidebar">
            {accountOptions.map((item) => {
              return (
                <li
                  key={item.id}
                  className={
                    activeLink === item.option
                      ? "sidebar-item active"
                      : "sidebar-item"
                  }
                  onClick={
                    item.option === "Logout"
                      ? () => onChangeActiveLink("My Dashboard")
                      : () => onChangeActiveLink(item.option)
                  }
                >
                  {item.option === "Logout" ? (
                    <NavLink className="sidebar-item-link" to={`/my-account`}>
                      <span className="me-2" style={{ fontSize: "1.5rem" }}>
                        {item.icon}
                      </span>
                      <span onClick={handleLogout}>{item.option}</span>
                    </NavLink>
                  ) : (
                    <NavLink
                      className="sidebar-item-link"
                      to={`/my-account/${item.link}`}
                    >
                      <span className="me-2" style={{ fontSize: "1.5rem" }}>
                        {item.icon}
                      </span>
                      <span>{item.option}</span>
                    </NavLink>
                  )}
                </li>
              );
            })}
          </Col>
          <Col lg={8} xl={9} className="main">
            {activeLink === "My Dashboard" ? (
              /* Dashboard */
              <div className="main__box">
                <div className="dashboard">
                  <h3 style={{ fontWeight: "900" }}>Dashboard</h3>
                  <div className="d-sm-flex justify-content-center dashboard__counts-comments">
                    <div className="m-2 p-3 d-flex flex-column justify-content-center align-items-center dashboard__counts">
                      <span
                        className="my-1 dashboard__count fs-1"
                        style={{ fontWeight: "800" }}
                      >
                        {myCommentsRecipes.length > 0
                          ? myCommentsRecipes.length
                          : 0}
                      </span>
                      <span className="my-1 dashboard__count">
                        Recipes' Comments
                      </span>
                    </div>
                    <div
                      className="m-2 p-3 d-flex flex-column justify-content-center align-items-center dashboard__counts"
                      style={{ backgroundColor: "var(--orange)" }}
                    >
                      <span
                        className="my-1 dashboard__count fs-1"
                        style={{ fontWeight: "800" }}
                      >
                        {myCommentsBlogs.length > 0
                          ? myCommentsBlogs.length
                          : 0}
                      </span>
                      <span className="my-1 dashboard__count">
                        Blogs' Comments
                      </span>
                    </div>
                    <div
                      className="m-2 p-3 d-flex flex-column justify-content-center align-items-center dashboard__counts"
                      style={{ backgroundColor: "var(--green-dark)" }}
                    >
                      <span
                        className="my-1 dashboard__count fs-1"
                        style={{ fontWeight: "800" }}
                      >
                        {myCommentsProducts.length > 0
                          ? myCommentsProducts.length
                          : 0}
                      </span>
                      <span className="my-1 dashboard__count">
                        Products' Comments
                      </span>
                    </div>
                  </div>

                  {/* recipes' comments */}
                  <h4 className="mt-5" style={{ fontWeight: "900" }}>
                    My Recipes' Comments{" "}
                    {myCommentsRecipes.length > 0 &&
                      `(${myCommentsRecipes.length})`}
                  </h4>
                  {myCommentsRecipes.length > 0 ? (
                    <div className="main__cards">
                      {myCommentsRecipes.map((item) => {
                        return (
                          <Card key={item.id} className="main__card">
                            <Link
                              reloadDocument
                              to={`/recipes/${GetSlug(
                                item.recipeTitle.toLowerCase()
                              )}`}
                            >
                              <div className="main__card--left">
                                <Card.Img
                                  className="main__card--img"
                                  src={item.recipeImage}
                                  alt={item.recipeTitle}
                                />
                              </div>
                            </Link>
                            <Card.Body className="main__card--body">
                              <Link
                                reloadDocument
                                to={`/recipes/${GetSlug(
                                  item.recipeTitle.toLowerCase()
                                )}`}
                              >
                                <Card.Title className="main__card--title">
                                  {item.recipeTitle.length > 25
                                    ? item.recipeTitle.slice(0, 25) + "..."
                                    : item.recipeTitle}
                                </Card.Title>
                              </Link>
                              <Link
                                reloadDocument
                                to={`/recipes/${GetSlug(
                                  item.recipeTitle.toLowerCase()
                                )}#reviews`}
                              >
                                <CustomButton
                                  textBtn="View Comment"
                                  className="main__card--badge"
                                  classNameParent="m-0 justify-content-start"
                                />
                              </Link>
                            </Card.Body>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex-column main__no-item">
                      <h5
                        style={{ fontWeight: "900", textTransform: "none" }}
                        className="d-block"
                      >
                        There are no submitted comment for recipes!
                      </h5>
                    </div>
                  )}

                  {/* blogs' comments */}
                  <h4 className="mt-5" style={{ fontWeight: "900" }}>
                    My Blogs' Comments{" "}
                    {myCommentsBlogs.length > 0 &&
                      `(${myCommentsBlogs.length})`}
                  </h4>
                  {myCommentsBlogs.length > 0 ? (
                    <div className="main__cards">
                      {myCommentsBlogs.map((item) => {
                        return (
                          <Card key={item.id} className="main__card">
                            <Link
                              reloadDocument
                              to={`/blogs/${GetSlug(
                                item.blogTitle.toLowerCase()
                              )}`}
                            >
                              <div className="main__card--left">
                                <Card.Img
                                  className="main__card--img"
                                  src={item.blogImage}
                                  alt={item.blogTitle}
                                />
                              </div>
                            </Link>
                            <Card.Body className="main__card--body">
                              <Link
                                reloadDocument
                                to={`/blogs/${GetSlug(
                                  item.blogTitle.toLowerCase()
                                )}`}
                              >
                                <Card.Title className="main__card--title">
                                  {item.blogTitle.length > 25
                                    ? item.blogTitle.slice(0, 25) + "..."
                                    : item.blogTitle}
                                </Card.Title>
                              </Link>
                              <Link
                                reloadDocument
                                to={`/blogs/${GetSlug(
                                  item.blogTitle.toLowerCase()
                                )}#reviews`}
                              >
                                <CustomButton
                                  textBtn="View Comment"
                                  className="main__card--badge"
                                  classNameParent="m-0 justify-content-start"
                                />
                              </Link>
                            </Card.Body>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex-column main__no-item">
                      <h5
                        style={{ fontWeight: "900", textTransform: "none" }}
                        className="d-block"
                      >
                        There are no submitted comment for blogs!
                      </h5>
                    </div>
                  )}

                  {/* products' comments */}
                  <h4 className="mt-5" style={{ fontWeight: "900" }}>
                    My Products' Comments{" "}
                    {myCommentsProducts.length > 0 &&
                      `(${myCommentsProducts.length})`}
                  </h4>
                  {myCommentsProducts.length > 0 ? (
                    <div className="main__cards">
                      {myCommentsProducts.map((item) => {
                        return (
                          <Card key={item.id} className="main__card">
                            <Link
                              reloadDocument
                              to={`/shop/${GetSlug(
                                item.productTitle.toLowerCase()
                              )}`}
                            >
                              <div className="main__card--left">
                                <Card.Img
                                  className="main__card--img"
                                  src={item.productImage}
                                  alt={item.productTitle}
                                />
                              </div>
                            </Link>
                            <Card.Body className="main__card--body">
                              <Link
                                reloadDocument
                                to={`/shop/${GetSlug(
                                  item.productTitle.toLowerCase()
                                )}`}
                              >
                                <Card.Title className="main__card--title">
                                  {item.productTitle.length > 25
                                    ? item.productTitle.slice(0, 25) + "..."
                                    : item.productTitle}
                                </Card.Title>
                              </Link>
                              <Link
                                reloadDocument
                                to={`/shop/${GetSlug(
                                  item.productTitle.toLowerCase()
                                )}#reviews`}
                              >
                                <CustomButton
                                  textBtn="View Comment"
                                  className="main__card--badge"
                                  classNameParent="m-0 justify-content-start"
                                />
                              </Link>
                            </Card.Body>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex-column main__no-item">
                      <h5
                        style={{ fontWeight: "900", textTransform: "none" }}
                        className="d-block"
                      >
                        There are no submitted comment for products!
                      </h5>
                    </div>
                  )}
                </div>
              </div>
            ) : activeLink === "My Recipes" ? (
              /* Recipes noooooooooooooooooo */
              <div className="main__box">
                <div className="recipes">
                  <h3 style={{ fontWeight: "900" }}>{activeLink}</h3>
                  <Card className="recipe__card">
                    <Link
                      reloadDocument
                      to={`/recipes/{GetSlug(item.title.toLowerCase())}`}
                    >
                      <div className="recipe__card--left">
                        <Card.Img
                          className="recipe__card--img"
                          src={"item.image"}
                          alt={"item.title"}
                        />
                      </div>
                    </Link>
                    <Card.Body className="recipe__card--body">
                      <Link
                        reloadDocument
                        to={`/recipes/{GetSlug(item.title.toLowerCase())}`}
                      >
                        <Card.Title className="recipe__card--title">
                          {/* {item.title.length > 25
                              ? item.title.slice(0, 25) + "..."
                              : item.title} */}
                          kkkk
                        </Card.Title>
                      </Link>
                      <Link
                        reloadDocument
                        to={`/recipes/{GetSlug(item.title.toLowerCase())}`}
                      >
                        <Card.Text className="recipe__card--badge">
                          {/* {item.title.length > 25
                                ? item.title.slice(0, 25) + "..."
                                : item.title} */}
                          jjjj
                        </Card.Text>
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ) : activeLink === "My Favorites" ? (
              /* Favorites */
              <div className="main__box">
                <div>
                  <h3 style={{ fontWeight: "900" }}>
                    My Favorite Recipes{" "}
                    {favoriteRecipes.length > 0 &&
                      `(${favoriteRecipes.length})`}
                  </h3>
                  {favoriteRecipes.length > 0 ? (
                    <div className="main__cards">
                      {favoriteRecipes.map((item) => {
                        return (
                          <Card key={item.id} className="main__card">
                            <Link
                              reloadDocument
                              to={`/recipes/${GetSlug(
                                item.title.toLowerCase()
                              )}`}
                            >
                              <div className="main__card--left">
                                <Card.Img
                                  className="main__card--img"
                                  src={item.image}
                                  alt={item.title}
                                />
                              </div>
                            </Link>
                            <Card.Body className="main__card--body">
                              <Link
                                reloadDocument
                                to={`/recipes/${GetSlug(
                                  item.title.toLowerCase()
                                )}`}
                              >
                                <Card.Title className="main__card--title">
                                  {item.title.length > 25
                                    ? item.title.slice(0, 25) + "..."
                                    : item.title}
                                </Card.Title>
                              </Link>
                              <CustomButton
                                textBtn="Remove"
                                className="main__card--badge main__card--remove-btn"
                                classNameParent="m-0 justify-content-start"
                                onClick={() => handleDeleteFavorites(item.id)}
                              />
                            </Card.Body>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex-column main__no-item">
                      <h5
                        style={{ fontWeight: "900", textTransform: "none" }}
                        className="d-block"
                      >
                        There are no favorite recipe!
                      </h5>
                    </div>
                  )}
                </div>
              </div>
            ) : activeLink === "My Reviews" ? (
              /* Reviews noooooooooooooooooo*/
              <div className="main__box">
                <div className="reviews">
                  <h3 style={{ fontWeight: "900" }}>{activeLink}</h3>
                  <Card className="review__card">
                    <Link
                      reloadDocument
                      to={`/recipes/{GetSlug(item.title.toLowerCase())}`}
                    >
                      <div className="review__card--left">
                        <Card.Img
                          className="review__card--img"
                          src={"item.image"}
                          alt={"item.title"}
                        />
                      </div>
                    </Link>
                    <Card.Body className="review__card--body">
                      <Link
                        reloadDocument
                        to={`/recipes/{GetSlug(item.title.toLowerCase())}`}
                      >
                        <Card.Title className="review__card--title">
                          {/* {item.title.length > 25
                              ? item.title.slice(0, 25) + "..."
                              : item.title} */}
                          kkkk
                        </Card.Title>
                      </Link>
                      <Link
                        reloadDocument
                        to={`/recipes/{GetSlug(item.title.toLowerCase())}`}
                      >
                        <Card.Text className="review__card--badge">
                          {/* {item.title.length > 25
                                ? item.title.slice(0, 25) + "..."
                                : item.title} */}
                          jjjj
                        </Card.Text>
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ) : activeLink === "My Orders" ? (
              window.location.pathname.slice(12, 22) === "view-order" ? (
                /* view order */
                <div className="main__box">
                  <div className="orders">
                    {myOrders
                      .filter(
                        (item) =>
                          Number(item.id) ===
                          Number(window.location.pathname.slice(23))
                      )
                      .map((order) => {
                        return (
                          <div key={order.id}>
                            <p style={{ color: "var(--gray)" }}>
                              Order{" "}
                              <span
                                style={{
                                  textDecoration: "underline",
                                  color: "var(--orange)",
                                }}
                              >
                                #{order.id}
                              </span>{" "}
                              was placed on{" "}
                              <span
                                style={{
                                  textDecoration: "underline",
                                  color: "var(--orange)",
                                }}
                              >
                                {new Date(order.date).toDateString()}
                              </span>
                              .
                            </p>
                            <h4 className="mt-5" style={{ fontWeight: "900" }}>
                              Order Details
                            </h4>
                            <table
                              className="table table-striped table-bordered"
                              style={{ textAlign: "center" }}
                            >
                              <thead>
                                <tr>
                                  <th>Product</th>
                                  <th>Subtotal</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.orders.map((item) => {
                                  return (
                                    <tr key={item.id}>
                                      <td>
                                        <Link
                                          className="order-title"
                                          reloadDocument
                                          to={`/shop/${GetSlug(
                                            item.title.toLowerCase()
                                          )}`}
                                        >
                                          {item.title.length > 20
                                            ? `${item.title.slice(0, 20)}...`
                                            : item.title}
                                        </Link>
                                        <span
                                          style={{
                                            color: "var(--dark)",
                                            fontWeight: "700",
                                            fontSize:
                                              "var(--extrasmallFontSize)",
                                          }}
                                          className="ms-2"
                                        >
                                          &times;{item.quantity}
                                        </span>
                                      </td>
                                      <td style={{ color: "var(--gray)" }}>
                                        {formatCurrency(
                                          item.price.toFixed(2) * item.quantity
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <th>Shipping</th>
                                  <td style={{ color: "var(--gray)" }}>
                                    {formatCurrency(order.shipping)}
                                  </td>
                                </tr>
                                <tr>
                                  <th>Payment Method</th>
                                  <td>Cach on delivery</td>
                                </tr>
                                <tr>
                                  <th>Total Price</th>
                                  <td style={{ color: "var(--gray)" }}>
                                    {formatCurrency(order.totalPrice)}
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                            <h4 className="mt-5" style={{ fontWeight: "900" }}>
                              Biling Address
                            </h4>
                            <div className="biling">
                              <span className="d-block mb-1">
                                Name: {order.firstName} {order.lastName}
                              </span>
                              {order.streetOptional && (
                                <span className="d-block mb-1">
                                  Apartment / Suite: {order.streetOptional}
                                </span>
                              )}
                              <span className="d-block mb-1">
                                Street: {order.street}
                              </span>
                              <span className="d-block mb-1">
                                Town / City: {order.city}
                              </span>
                              <span className="d-block mb-1">
                                State / Region: {order.state}
                              </span>
                              <span className="d-block mb-1">
                                Postcode / ZIP: {order.postcode}
                              </span>
                              <span className="d-block mb-1">
                                Country: {order.country}
                              </span>
                              <span
                                className="d-block mb-1"
                                style={{ color: "var(--gray)" }}
                              >
                                <HiPhone className="me-2" />
                                {order.phone}
                              </span>
                              <span
                                className="d-block mb-1"
                                style={{ color: "var(--gray)" }}
                              >
                                <HiMail className="me-2" />
                                {order.email}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : (
                /* orders */
                <div className="main__box">
                  <div className="orders">
                    <h3 style={{ fontWeight: "900" }}>
                      My Old Orders{" "}
                      {myOrders.length > 0 && `(${myOrders.length})`}
                    </h3>
                    <table
                      className="table table-striped table-bordered mt-3"
                      style={{ textAlign: "center", color: "var(--dark)" }}
                    >
                      <thead>
                        <tr>
                          <th style={{ verticalAlign: "middle" }}>Order</th>
                          <th style={{ verticalAlign: "middle" }}>Date</th>
                          <th style={{ verticalAlign: "middle" }}>Status</th>
                          <th style={{ verticalAlign: "middle" }}>Total</th>
                          <th style={{ verticalAlign: "middle" }}>Details</th>
                        </tr>
                      </thead>
                      <tbody style={{ fontSize: "var(--smallFontSize)" }}>
                        {myOrders.map((order) => {
                          return (
                            <tr key={order.id}>
                              <td
                                style={{
                                  color: "var(--orange)",
                                  verticalAlign: "middle",
                                }}
                              >
                                <span
                                  className="table-header"
                                  style={{ color: "var(--dark)" }}
                                >
                                  Order:
                                </span>
                                <span>
                                  #
                                  <Link
                                    reloadDocument
                                    style={{ color: "var(--orange)" }}
                                    to={`/my-account/view-order/${order.id}`}
                                  >
                                    {order.id}
                                  </Link>
                                </span>
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                <span
                                  className="table-header"
                                  style={{ color: "var(--dark)" }}
                                >
                                  Date:
                                </span>
                                <span>
                                  {new Date(order.date).toDateString()}
                                </span>
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                <span
                                  className="table-header"
                                  style={{ color: "var(--dark)" }}
                                >
                                  Status:
                                </span>
                                <span>Processing</span>
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                <span
                                  className="table-header"
                                  style={{ color: "var(--dark)" }}
                                >
                                  Total:
                                </span>
                                <span>
                                  <span style={{ fontWeight: "700" }}>
                                    {formatCurrency(
                                      order.totalPrice.toFixed(2)
                                    )}
                                  </span>{" "}
                                  for{" "}
                                  {order.orders
                                    .map((ord) => ord.quantity)
                                    .reduce((acc, curr) => {
                                      return acc + curr;
                                    }, 0)}{" "}
                                  {order.orders
                                    .map((ord) => ord.quantity)
                                    .reduce((acc, curr) => {
                                      return acc + curr;
                                    }, 0) > 1
                                    ? "items"
                                    : "item"}
                                </span>
                              </td>
                              <td>
                                <span
                                  className="table-header"
                                  style={{ color: "var(--dark)" }}
                                >
                                  Details:
                                </span>
                                <span>
                                  <Link
                                    reloadDocument
                                    to={`/my-account/view-order/${order.id}`}
                                  >
                                    <CustomButton
                                      textBtn="View"
                                      className="order__view-btn"
                                      classNameParent="justify-content-center align-items-center"
                                    />
                                  </Link>
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            ) : (
              /* settings */
              <div className="main__box">
                <div className="settings">
                  <form onSubmit={handleChangeProfile} className="form">
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
                    <Col
                      md={10}
                      className="d-sm-flex justify-content-center mt-3 mx-auto"
                    >
                      <Col className="px-1 ">
                        <label className="form__label" htmlFor="firstName">
                          First Name{" "}
                          <span style={{ color: "var(--orange)" }}>*</span>
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          className="form__input"
                          ref={firstNameRef}
                          value={firstName}
                          onChange={(e) => setFirtsName(e.target.value)}
                        />
                      </Col>
                      <Col className="px-1">
                        <label className="form__label" htmlFor="lastName">
                          Last Name{" "}
                          <span style={{ color: "var(--orange)" }}>*</span>
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          className="form__input"
                          ref={lastNameRef}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Col>
                    </Col>
                    <Col size={12} md={10} className="px-1 mt-3 mx-auto">
                      <label className="form__label" htmlFor="email">
                        Email Address{" "}
                        <span style={{ color: "var(--orange)" }}>*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form__input"
                        value={user.email}
                        disabled={true}
                        required
                        style={{ color: "var(--gray)" }}
                      />
                    </Col>
                    <Col size={12} md={10} className="px-1 mt-3 mx-auto">
                      <label className="form__label" htmlFor="username">
                        Display name{" "}
                        <span style={{ color: "var(--orange)" }}>*</span>
                      </label>
                      <input
                        id="username"
                        type="text"
                        ref={newUsernameRef}
                        className="form__input mb-0"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                      />
                      <div
                        style={{
                          marginBottom: "2rem",
                          fontWeight: "300",
                          color: "var(--gray)",
                        }}
                      >
                        <i>
                          This will be how your name will be displayed in the
                          account section and in reviews
                        </i>
                      </div>
                    </Col>
                    <fieldset>
                      <legend className="mx-0 mx-sm-5 px-0 px-sm-2 fs-5 fw-bolder position-absolute w-75">
                        Password change
                      </legend>
                      <Col
                        size={12}
                        md={10}
                        className="px-1 mx-auto"
                        style={{ marginTop: "2rem" }}
                      >
                        <label className="form__label" htmlFor="currPassword">
                          Current Password{" "}
                          <span style={{ color: "var(--orange)" }}>
                            (leave blank to leave unChanged)
                          </span>
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            id="currPassword"
                            type={currPasswordType}
                            ref={currPasswordRef}
                            className="form__input"
                            value={currPassword}
                            onChange={(e) => setCurrPassword(e.target.value)}
                          />
                          <span
                            onClick={() => handleShowPassword("currPassword")}
                            className="form__eyes"
                          >
                            {currPasswordIcon}
                          </span>
                        </div>
                      </Col>
                      <Col size={12} md={10} className="px-1 mt-3 mx-auto">
                        <label className="form__label" htmlFor="newPassword">
                          New password{" "}
                          <span style={{ color: "var(--orange)" }}>
                            (leave blank to leave unChanged)
                          </span>
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            id="newPassword"
                            type={newPasswordType}
                            ref={newPasswordRef}
                            className="form__input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <span
                            onClick={() => handleShowPassword("newPassword")}
                            className="form__eyes"
                          >
                            {newPasswordIcon}
                          </span>
                        </div>
                      </Col>
                      <Col size={12} md={10} className="px-1 mt-3 mx-auto" style={{ marginBottom: "1.5rem" }}>
                        <label
                          className="form__label"
                          htmlFor="confirmNewPassword"
                        >
                          Confirn New password
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            id="confirmNewPassword"
                            type={confirmNewPasswordType}
                            ref={confirmNewPasswordRef}
                            className="form__input"
                            value={confirmNewPassword}
                            onChange={(e) =>
                              setConfirmNewPassword(e.target.value)
                            }
                          />
                          <span
                            onClick={() =>
                              handleShowPassword("confirmNewPassword")
                            }
                            className="form__eyes"
                          >
                            {confirmNewPasswordIcon}
                          </span>
                        </div>
                      </Col>
                    </fieldset>
                    <Col md={10} className="px-1 mt-3 mx-auto">
                      <CustomButton
                        classNameParent="mx-0 justify-content-start"
                        className="form__btn"
                        textBtn={buttonText}
                      />
                    </Col>
                  </form>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default MyAccountMainIsAthen;

const Wrapper = styled.section`
  .my-account__base {
    display: block;
    position: relative;
    z-index: 5;
    height: fit-content !important;
    margin-bottom: 5rem;
    background-color: var(--white);

    .sidebar {
      padding: 2.5rem 2rem;
      .sidebar-item {
        list-style-type: none;
        padding: 0.5rem 1rem 0.7rem;
        margin: 0.5rem;
        border-radius: calc(var(--borderRadius) + 1.5rem);
        transition: var(--transition-fast);
        .sidebar-item-link {
          color: var(--dark);
          font-weight: 600;
          font-size: calc(var(--bodyFontSize) + 0.1rem);
          background-color: transparent;
        }
        :hover {
          background-color: var(--orange);
          .sidebar-item-link {
            color: var(--light);
          }
        }
      }
      .active {
        background-color: var(--orange);
        .sidebar-item-link {
          color: var(--light);
        }
      }
    }
    .main {
      background-color: var(--light);
      .main__box {
        padding: 2.5rem 2rem;
        .main__no-item {
          margin: 1rem;
          padding: 1.5rem;
          color: var(--red-dark);
          background-color: var(--white);
          border-radius: var(--borderRadius);
          box-shadow: var(--shadow);
        }
        .main__cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          .main__card {
            border: none;
            overflow: hidden;
            background-color: var(--light);
            flex-direction: row;
            margin: 1rem 0;
            .main__card--left {
              overflow: hidden;
              border-radius: var(--borderRadius);
              height: 15vh;
              width: 10vw;
              .main__card--img {
                border-radius: var(--borderRadius);
                overflow: hidden;
                height: 100%;
                width: 100%;
                transition: var(--transition-fast);
                ::after {
                  content: "";
                  overflow: hidden;
                  width: 100%;
                }
                :hover {
                  transform: scale(1.1);
                  opacity: 0.9;
                }
              }
            }
            .main__card--body {
              padding: 0 1rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              .main__card--title {
                width: 100%;
                text-align: start;
                font-weight: 800;
                font-size: calc(var(--bodyFontSize) + 0.2rem);
                transition: var(--transition-fast);
                color: var(--dark);
                :hover {
                  color: var(--orange);
                }
              }
              .main__card--badge {
                background-color: var(--orange) !important;
                border-radius: calc(var(--borderRadius) + 0.5rem) !important;
                padding: 0.5rem 0.7rem !important;
                color: var(--light);
                font-size: var(--smallFontSize) !important;
                height: 2.5rem;
                font-weight: 400;
                width: 10rem;
                :hover {
                  color: var(--orange);
                  font-weight: 700;
                }
              }
              .main__card--remove-btn {
                background-color: var(--red-dark) !important;
                width: 7rem;
                :hover {
                  background-color: var(--light) !important;
                  color: var(--red-dark) !important;
                }
              }
            }
          }
        }
      }
      .dashboard {
        .dashboard__counts-comments {
          margin: 1rem;
          .dashboard__counts {
            width: 30%;
            height: 25vh;
            background-color: var(--red-dark);
            border-radius: var(--borderRadius);
            color: var(--light);
            .dashboard__count {
              font-size: calc(var(--bodyFontSize) + 0.2rem);
              text-align: center;
            }
          }
        }
      }
      /* .recipes {
      }
      .reviews {
      } */
      .orders {
        .order__view-btn {
          background-color: var(--orange) !important;
          border: none !important;
          width: 6rem !important;
          height: 2.5rem !important;
        }
        tr {
          td {
            .table-header {
              display: none;
              font-weight: 800;
            }
          }
        }
        .order-title {
          color: var(--dark);
          :hover {
            color: var(--orange);
          }
        }
        .biling {
          padding: 1.5rem 2rem;
          box-shadow: var(--shadow);
          border-radius: var(--borderRadius);
        }
      }
      .settings {
        .form {
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
            font-weight: 700;
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
            right: 1.5rem;
            color: var(--gray);
            top: 0.8rem;
          }
          .form__btn {
            width: 30%;
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
          fieldset {
            position: relative;
            width: 80%;
            border: 0.05rem solid var(--gray-opacity3);
            margin: 2.5rem auto;
            legend {
              top: -1rem;
              background-color: var(--light);
              color: var(--gray);
            }
          }
        }
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .sidebar {
        padding: 8rem 2rem 3rem;
      }
      .main {
        .main__box {
          .main__cards {
            .main__card {
              .main__card--left {
                width: 12vw;
              }
              .main__card--body {
                .main__card--badge {
                  :hover {
                    opacity: 1 !important;
                    background-color: var(--light) !important;
                    box-shadow: var(--shadow) !important;
                  }
                }
              }
            }
          }
        }
        .orders {
          .order__view-btn {
            :hover {
              opacity: 1 !important;
              color: var(--orange) !important;
              background-color: var(--light) !important;
              box-shadow: var(--shadow) !important;
            }
          }
        }
        .settings {
          .form {
            .form__btn {
              :hover {
                opacity: 1 !important;
                background-color: var(--orange) !important;
                color: var(--light) !important;
                box-shadow: var(--shadow) !important;
              }
            }
          }
        }
      }
    }
    @media only screen and (max-width: 768px) {
      .main {
        .main__box {
          .main__cards {
            grid-template-columns: 1fr;
            margin-left: 1.5rem;
            .main__card {
              .main__card--left {
                width: 20vw;
              }
            }
          }
        }
        .settings {
          .form {
            fieldset {
              width: 100%;
              padding: 0 1rem;
            }
          }
        }
      }
    }
    @media only screen and (max-width: 576px) {
      .main {
        .main__box {
          .main__cards {
            margin-left: 0;
            .main__card {
              .main__card--left {
                height: 12vh;
              }
            }
          }
        }
        .dashboard {
          .dashboard__counts-comments {
            .dashboard__counts {
              width: 100%;
              height: 20vh;
            }
          }
        }
        .orders {
          thead {
            display: none;
          }
          tr {
            display: flex;
            flex-direction: column;
            td {
              border: 0.05rem solid var(--gray-opacity3);
              display: flex;
              justify-content: space-between;
              align-items: center;
              :not(:last-child) {
                border-bottom: none;
              }
              .table-header {
                display: block;
              }
            }
          }
        }
        .settings {
          .form {
            .form__btn {
              width: 40%;
            }
          }
        }
      }
    }
    @media only screen and (max-width: 450px) {
      .main {
        .main__box {
          .main__cards {
            .main__card {
              flex-direction: column;
              .main__card--left {
                height: 22vh;
                width: 100%;
              }
              .main__card--body {
                margin: 1rem 0;
              }
            }
          }
        }
        .settings {
          .form {
            .form__label {
              text-align: center;
            }
            .form__btn {
              width: 65%;
            }
          }
        }
      }
    }
  }
`;
