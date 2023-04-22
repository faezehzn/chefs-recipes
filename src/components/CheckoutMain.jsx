import { useCallback, useRef, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import CustomButton from "../utilities/CustomButton";
import styled from "styled-components";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import { Country, State } from "country-state-city";
import { useCustomContext } from "../context/customContext";
import { formatCurrency } from "../utilities/formatCurrency";
import History from "./History";
import { Link } from "react-router-dom";
import { GetSlug } from "../utilities/StringSlugConverter";
import { dataApi, LOCAL_URL } from "../context/constants";

const CheckoutMain = () => {
  const {countryLocation, stateLocation, cartItems, cartItemsWithDetails, shipping, cartTotal, orderData, user } = useCustomContext();
  const [buttonText, setButtonText] = useState("Order");
  const [status, setStatus] = useState({});
  const refAlert = useRef(null);
  
  const allCountries = Country.getAllCountries().map((country) => {
    return { name: country.name, isoCode: country.isoCode };
  });
  const allStates = State.getStatesOfCountry(countryLocation.isoCode).map(
    (state) => {
      return {
        name: state.name,
        isoCode: state.isoCode,
        countryCode: state.countryCode,
      };
    }
  )

  const catInputRefCallback = useCallback((element) => {
    element.firstChild.children[1].children[0].children[0].setAttribute(
      "placeholder",
      ""
    );
    element.firstChild.children[1].children[0].classList.remove(
      "border-primary"
    );
    element.firstChild.firstChild.setAttribute("id", "country");
  }, []);

  const allCountriesOptions = allCountries.map((value) => {
    if (
      typeof countryLocation.name == "string" &&
      countryLocation.name.includes(value.name)
    ) {
      return {
        labelKey: "optionItem1",
        value: value.name,
        className: "checkout-form__option",
        isSelected: true,
      };
    } else {
      return {
        labelKey: "optionItem1",
        value: value.name,
        className: "checkout-form__option",
      };
    }
  });

  const defaultStateOptions = allStates.map((value) => {
      if (Number(stateLocation.isoCode) === Number(value.isoCode)) {
        return {
          labelKey: "optionItem1",
          value: value.name,
          className: "checkout-form__option",
          isSelected: true,
        };
      } else {
        return {
          labelKey: "optionItem1",
          value: value.name,
          className: "checkout-form__option",
        };
      }
    })

  const [statesByCounrtryCodeOptions, setStatesByCounrtryCodeOptions] = useState(defaultStateOptions)

  const state = allStates.find((item)=> item.isoCode === stateLocation.isoCode)

  yup.setLocale({
    string: {
      required: "Required",
      min: ({ min }) => ({
        key: `Must be at least ${min} characters long`,
        values: { min },
      }),
      max: ({ max }) => ({
        key: `Must be maximum ${max} characters long`,
        values: { max },
      }),
    },
  });

  const RegExp =
    /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g;

  const schema = yup.object().shape({
    firstName: yup
      .string("Please Enter Correct First Name")
      .min(3)
      .max(20)
      .trim()
      .required("Required"),
    lastName: yup
      .string("Please Enter Correct Last Name")
      .min(2)
      .max(20)
      .trim()
      .required("Required"),
    email: yup.string("Please Enter valid Email").email().required("Required").default(user.email),
    phone: yup
      .string("Invalid Phone No.")
      .matches(RegExp, `Use the pattern: 0912 345 6789`)
      .required("Required"),
    country: yup.string().required("Required"),
    state: yup.string().required("Required"),
    city: yup.string().min(2).max(50).trim().required("Required"),
    street: yup.string().min(2).max(50).trim().required("Required"),
    streetOptional: yup.string().min(2).max(50).trim(),
    postcode: yup.string().min(2).max(50).trim().required("Required"),
    orderNotes: yup.string().max(500).trim(),
    companyName: yup.string().max(50).trim(),
    orders: yup.array(),
    shipping: yup.number(),
    totalPrice: yup.number(),
    date: yup.date(),
    usernameOriginal: yup.mixed().default(user.username)
  });

  const formFormik = useFormik({
    initialValues: {
      usernameOriginal: user.username,
      firstName: "",
      lastName: "",
      email: user.email,
      phone: "",
      country: countryLocation.name,
      state: (state ? state.name : allStates[0].name),
      city: "",
      street: "",
      streetOptional: "",
      postcode: "",
      orderNotes: "",
      companyName: "",
      orders: cartItemsWithDetails,
      date: new Date(),
      shipping: shipping,
      totalPrice: cartTotal + shipping
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: schema,
  });

  const handleSubmit = async (values) => {
    setButtonText("Sending...");

    await fetch(`${dataApi}/checkout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      formFormik.resetForm();
      if (res.ok === true) {
        setStatus({ succes: true, message: "Your order sent successfully" });
        setTimeout(() => {
          refAlert.current.className += " d-none";
        }, 5000);
        History.push(`/checkout/order-received/${orderData.length + 1}`)
      } else {
        setStatus({
          succes: false,
          message: "Something went wrong, please try again later.",
        });
        setTimeout(() => {
          refAlert.current.className += " d-none";
        }, 5000);
      }
    });
    setButtonText("Order");
  };

  const handleSelectedInput = (e) => {
    if (e.target.ariaExpanded === "false") {
      e.target.offsetParent.parentElement.style.borderBottomLeftRadius = "0";
      e.target.offsetParent.parentElement.style.borderBottomRightRadius = "0";
      e.target.offsetParent.parentElement.style.borderTopRightRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.offsetParent.parentElement.style.borderTopRightRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.offsetParent.parentElement.style.borderBottom = "none";
    } else if (e.target.ariaExpanded === "true") {
      e.target.offsetParent.parentElement.style.borderBottomLeftRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.offsetParent.parentElement.style.borderBottomRightRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.offsetParent.parentElement.style.borderBottom =
        "0.05rem solid var(--gray-opacity7)";
    } else if (e.target.offsetParent.ariaExpanded === "false") {
      e.target.offsetParent.offsetParent.parentElement.style.borderBottomLeftRadius =
        "0";
      e.target.offsetParent.offsetParent.parentElement.style.borderBottomRightRadius =
        "0";
      e.target.offsetParent.offsetParent.parentElement.style.borderTopRightRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.offsetParent.offsetParent.parentElement.style.borderTopRightRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.offsetParent.offsetParent.parentElement.style.borderBottom =
        "none";
    } else if (e.target.offsetParent.ariaExpanded === "true") {
      e.target.offsetParent.offsetParent.parentElement.style.borderBottomLeftRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.offsetParent.offsetParent.parentElement.style.borderBottomRightRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.offsetParent.offsetParent.parentElement.style.borderBottom =
        "0.05rem solid var(--gray-opacity7)";
    } else {
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.borderBottomLeftRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.borderBottomRightRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.borderBottom =
        "0.05rem solid var(--gray-opacity7)";
    }
  };

  const handleCloseSelectedInput = (e) => {
    e.el.parentElement.style.borderBottomLeftRadius =
      "calc(var(--borderRadius) + 1.5rem)";
    e.el.parentElement.style.borderBottomRightRadius =
      "calc(var(--borderRadius) + 1.5rem)";
    e.el.parentElement.style.borderBottom =
      "0.05rem solid var(--gray-opacity7)";
  };

  const handleChangeSelectedCountry = (e) => {
    if (!countryLocation.name.includes(e.selectedValue)) {
      const newCountry = allCountries.find((item)=> item.name === e.selectedValue[0])
      const changedStates = State.getStatesOfCountry(newCountry.isoCode).map(
        (state) => {
          return {
            name: state.name,
            isoCode: state.isoCode,
            countryCode: state.countryCode,
          };
        }
      );
      const changedStateOptions = changedStates.map((value, index) => {
          if (index === 0) {
            return {
              labelKey: "optionItem1",
              value: value.name,
              className: "checkout-form__option",
              isSelected: true,
            };
          } else {
            return {
              labelKey: "optionItem1",
              value: value.name,
              className: "checkout-form__option",
            };
          }
      })
      setStatesByCounrtryCodeOptions(changedStateOptions)
    } else {
      setStatesByCounrtryCodeOptions(defaultStateOptions)
    }
  };

  return (
    <Wrapper>
      <Container fluid className="checkout__main">
        <Row className="justify-content-center">
          <Col lg={10}>
            <form
              onSubmit={formFormik.handleSubmit}
              method="POST"
              className="mt-4 checkout__main--form"
            >
              <div className="checkout__alert">
                <Col className="d-block">
                  {Object.keys(formFormik.errors).length === 0 &&
                    status.message && (
                      <Alert
                        ref={refAlert}
                        className={
                          status.succes ? "alert-success" : "alert-danger"
                        }
                      >
                        {status.message}
                      </Alert>
                    )}
                </Col>
              </div>
              <div className="d-md-flex">
                <Col md={6}>
                  <h4 style={{ fontWeight: "900" }}>Billing details</h4>
                  <Col
                    md={10}
                    className="d-sm-flex justify-content-center mt-3 mx-auto"
                  >
                    <Col
                      className={
                        formFormik.touched.firstName &&
                        formFormik.errors.firstName
                          ? "input-error px-1 "
                          : "px-1 "
                      }
                    >
                      <label
                        className="checkout-form__label"
                        htmlFor="firstName"
                      >
                        First Name{" "}
                        <span style={{ color: "var(--orange)" }}>*</span>
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        className={
                          formFormik.touched.firstName &&
                          formFormik.errors.firstName
                            ? "d-none"
                            : "checkout-form__input"
                        }
                        {...formFormik.getFieldProps("firstName")}
                      />
                      {formFormik.touched.firstName &&
                        formFormik.errors.firstName && (
                          <Tippy
                            placement="bottom"
                            render={(attrs) => (
                              <div className="custom__tooltip" {...attrs}>
                                <div data-popper-arrow />
                                {formFormik.errors.firstName}
                              </div>
                            )}
                          >
                            <input
                              id="firstName"
                              type="text"
                              className="checkout-form__input"
                              {...formFormik.getFieldProps("firstName")}
                            />
                          </Tippy>
                        )}
                    </Col>
                    <Col
                      className={
                        formFormik.touched.lastName &&
                        formFormik.errors.lastName
                          ? "input-error px-1"
                          : "px-1"
                      }
                    >
                      <label
                        className="checkout-form__label"
                        htmlFor="lastName"
                      >
                        Last Name{" "}
                        <span style={{ color: "var(--orange)" }}>*</span>
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        className={
                          formFormik.touched.lastName &&
                          formFormik.errors.lastName
                            ? "d-none"
                            : "checkout-form__input"
                        }
                        {...formFormik.getFieldProps("lastName")}
                      />
                      {formFormik.touched.lastName &&
                        formFormik.errors.lastName && (
                          <Tippy
                            placement="bottom"
                            render={(attrs) => (
                              <div className="custom__tooltip" {...attrs}>
                                <div data-popper-arrow />
                                {formFormik.errors.lastName}
                              </div>
                            )}
                          >
                            <input
                              id="lastName"
                              type="text"
                              className="checkout-form__input"
                              {...formFormik.getFieldProps("lastName")}
                            />
                          </Tippy>
                        )}
                    </Col>
                  </Col>
                  <Col
                    size={12}
                    md={10}
                    className="px-1 mt-3 mx-auto"
                  >
                    <label className="checkout-form__label" htmlFor="email">
                      Email Address{" "}
                      <span style={{ color: "var(--orange)" }}>*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="checkout-form__input"
                      disabled={true}
                      style={{ color: "var(--gray)", fontWeight: "400"}}
                      {...formFormik.getFieldProps("email")}
                    />
                  </Col>
                  <Col
                    size={12}
                    md={10}
                    className={
                      formFormik.touched.phone && formFormik.errors.phone
                        ? "input-error px-1 mt-3 mx-auto"
                        : "px-1 mt-3 mx-auto"
                    }
                  >
                    <label className="checkout-form__label" htmlFor="phone">
                      Phone No <span style={{ color: "var(--orange)" }}>*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={
                        formFormik.touched.phone && formFormik.errors.phone
                          ? "d-none"
                          : "checkout-form__input"
                      }
                      {...formFormik.getFieldProps("phone")}
                    />
                    {formFormik.touched.phone && formFormik.errors.phone && (
                      <Tippy
                        placement="bottom"
                        render={(attrs) => (
                          <div className="custom__tooltip" {...attrs}>
                            <div data-popper-arrow />
                            {formFormik.errors.phone}
                          </div>
                        )}
                      >
                        <input
                          id="phone"
                          type="tel"
                          className="checkout-form__input"
                          {...formFormik.getFieldProps("phone")}
                        />
                      </Tippy>
                    )}
                  </Col>
                  <Col
                    size={12}
                    md={10}
                    className="px-1 mt-3 mx-auto"
                  >
                    <label className="checkout-form__label" htmlFor="country">
                      Country / Region{" "}
                      <span style={{ color: "var(--orange)" }}>*</span>
                    </label>
                    <div
                      className="checkout-form__category"
                      {...formFormik.getFieldProps("country")}
                      ref={catInputRefCallback}
                    >
                      <BootstrapSelect
                        className="search-form__select"
                        options={allCountriesOptions}
                        showSearch={true}
                        menuSize={4}
                        onClick={(e) => handleSelectedInput(e)}
                        onClose={(e) => handleCloseSelectedInput(e)}
                        onChange={(e) => handleChangeSelectedCountry(e)}
                      />
                    </div>
                  </Col>
                  <Col
                    size={12}
                    md={10}
                    className={statesByCounrtryCodeOptions.length > 0 ? 
                      "px-1 mt-3 mx-auto" : "d-none"
                    }
                  >
                    <label className="checkout-form__label" htmlFor="state">
                      State / County{" "}
                      <span style={{ color: "var(--orange)" }}>*</span>
                    </label>
                    <div
                      className="checkout-form__category"
                      {...formFormik.getFieldProps("state")}
                      ref={catInputRefCallback}
                    >
                      <BootstrapSelect
                        className="search-form__select"
                        options={statesByCounrtryCodeOptions}
                        showSearch={true}
                        menuSize={4}
                        onClick={(e) => handleSelectedInput(e)}
                        onClose={(e) => handleCloseSelectedInput(e)}
                      />
                    </div>
                  </Col>
                  <Col
                    size={12}
                    md={10}
                    className={
                      formFormik.touched.city && formFormik.errors.city
                        ? "input-error px-1 mt-3 mx-auto"
                        : "px-1 mt-3 mx-auto"
                    }
                  >
                    <label className="checkout-form__label" htmlFor="city">
                      Town / City <span style={{ color: "var(--orange)" }}>*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      className={
                        formFormik.touched.city && formFormik.errors.city
                          ? "d-none"
                          : "checkout-form__input"
                      }
                      {...formFormik.getFieldProps("city")}
                    />
                    {formFormik.touched.city && formFormik.errors.city && (
                      <Tippy
                        placement="bottom"
                        render={(attrs) => (
                          <div className="custom__tooltip" {...attrs}>
                            <div data-popper-arrow />
                            {formFormik.errors.city}
                          </div>
                        )}
                      >
                        <input
                          id="city"
                          type="text"
                          className="checkout-form__input"
                          {...formFormik.getFieldProps("city")}
                        />
                      </Tippy>
                    )}
                  </Col>
                  <Col
                    size={12}
                    md={10}
                    className={
                      formFormik.touched.street && formFormik.errors.street
                        ? "input-error px-1 mt-3 mx-auto"
                        : "px-1 mt-3 mx-auto"
                    }
                  >
                    <label className="checkout-form__label" htmlFor="street">
                      Street Address{" "}
                      <span style={{ color: "var(--orange)" }}>*</span>
                    </label>
                    <input
                      id="street"
                      type="text"
                      className={
                        formFormik.touched.street && formFormik.errors.street
                          ? "d-none"
                          : "checkout-form__input"
                      }
                      placeholder="House number and street name"
                      {...formFormik.getFieldProps("street")}
                    />
                    {formFormik.touched.street && formFormik.errors.street && (
                      <Tippy
                        placement="bottom"
                        render={(attrs) => (
                          <div className="custom__tooltip" {...attrs}>
                            <div data-popper-arrow />
                            {formFormik.errors.street}
                          </div>
                        )}
                      >
                        <input
                          id="street"
                          type="text"
                          placeholder="House number and street name"
                          className="checkout-form__input"
                          {...formFormik.getFieldProps("street")}
                        />
                      </Tippy>
                    )}
                  </Col>
                  <Col size={12} md={10} className="px-1 mx-auto">
                    <input
                      type="text"
                      className="checkout-form__input"
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      {...formFormik.getFieldProps("streetOptional")}
                    />
                  </Col>
                  <Col
                    size={12}
                    md={10}
                    className={
                      formFormik.touched.postcode && formFormik.errors.postcode
                        ? "input-error px-1 mt-3 mx-auto"
                        : "px-1 mt-3 mx-auto"
                    }
                  >
                    <label className="checkout-form__label" htmlFor="postcode">
                      Postcode / ZIP{" "}
                      <span style={{ color: "var(--orange)" }}>*</span>
                    </label>
                    <input
                      id="postcode"
                      type="text"
                      className={
                        formFormik.touched.postcode &&
                        formFormik.errors.postcode
                          ? "d-none"
                          : "checkout-form__input"
                      }
                      {...formFormik.getFieldProps("postcode")}
                    />
                    {formFormik.touched.postcode &&
                      formFormik.errors.postcode && (
                        <Tippy
                          placement="bottom"
                          render={(attrs) => (
                            <div className="custom__tooltip" {...attrs}>
                              <div data-popper-arrow />
                              {formFormik.errors.postcode}
                            </div>
                          )}
                        >
                          <input
                            id="postcode"
                            type="text"
                            className="checkout-form__input"
                            {...formFormik.getFieldProps("postcode")}
                          />
                        </Tippy>
                      )}
                  </Col>
                </Col>
                <Col md={6} className="additional">
                  <h4 style={{ fontWeight: "900" }}>Additional information</h4>
                  <Col size={12} md={10} className="px-1 mt-3 mx-auto">
                    <label
                      className="checkout-form__label"
                      htmlFor="orderNotes"
                    >
                      Order notes (optional)
                    </label>
                    <textarea
                      id="orderNotes"
                      rows={1}
                      type="text"
                      className="checkout-form__input"
                      placeholder="Notes about your order"
                      {...formFormik.getFieldProps("orderNotes")}
                    />
                  </Col>
                  <Col size={12} md={10} className="px-1 mt-3 mx-auto">
                    <label
                      className="checkout-form__label"
                      htmlFor="companyName"
                    >
                      Company name (optional)
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      className="checkout-form__input"
                      {...formFormik.getFieldProps("companyName")}
                    />
                  </Col>
                </Col>
              </div>
              <table
                className="table table-striped table-bordered mt-4"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length > 0 && cartItemsWithDetails.map((cart)=> {
                    return (
                      <tr>
                        <td><Link reloadDocument className="cart-title" to={`/shop/${GetSlug(cart.title.toLowerCase())}`}>{cart.title.length > 20 ? `${cart.title.slice(0, 20)}...` : cart.title}</Link><span style={{ color: "var(--dark)", fontWeight: "700", fontSize: "var(--extramdallFontSize)"}} className="ms-2">&times;{cart.quantity}</span></td>
                        <td style={{ color: "var(--gray)"}}>{formatCurrency((((cart.price).toFixed(2)) * (cart.quantity)))}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Sipping</th>
                    <td style={{ color: "var(--gray)"}}>{formatCurrency(shipping)}</td>
                  </tr>
                  <tr>
                    <th>Total Price</th>
                    <td style={{ color: "var(--gray)"}}>{formatCurrency(cartTotal + shipping)}</td>
                  </tr>
                </tfoot>
              </table>
              <div className="cach-box">
                <div className='cach-box__first-span'>Cash on delivery</div>
                <div className='cach-box__last-span'><div></div>
                  Pay with cash upon delivery.
                </div>
                <Col size={12} md={12} className="px-1 border-top border-dark-subtle">
                  <CustomButton
                    classNameParent="mx-0 justify-content-end"
                    className="form__btn"
                    textBtn={buttonText}
                    type="submit"
                  />
                </Col>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default CheckoutMain;

const Wrapper = styled.section`
  .checkout__main {
    background-color: var(--white);
    position: relative;
    z-index: 5;
    padding: 5rem 2rem;

    .checkout__main--form {
      .checkout__alert {
        position: fixed;
        top: 5%;
        width: 50%;
        left: 25%;
        z-index: 5;
        text-align: center;
        .alert {
          animation: moveDownToUp 1s ease-in;
          transition: var(--transition-fast);
        }
      }
      .checkout-form__label {
        color: var(--gray);
        font-weight: 700;
        margin-bottom: 0.5rem;
        margin-left: 1rem;
      }
      .checkout-form__input {
        width: 100%;
        background: var(--white);
        border-radius: calc(var(--borderRadius) + 1.5rem);
        border: 0.05rem solid var(--gray-opacity7);
        color: var(--dark);
        margin-bottom: 0.5rem;
        padding: 0.8rem 1.5rem;
        font-weight: 500;
        transition: var(--transition-fast);
        :focus {
          background: var(--white);
          border: 0.125rem solid var(--orange);
        }
        ::placeholder {
          font-weight: 400;
          color: var(--gray-opacity7);
        }
        :focus::placeholder {
          opacity: 0.7;
        }
      }
      .input-error .checkout-form__input {
        border-radius: calc(var(--borderRadius) + 1.5rem);
        border: 0.125rem solid var(--red-dark);
        :focus {
          border: 0.125rem solid var(--orange);
        }
        ::placeholder {
          color: var(--red-dark);
          font-weight: 700;
        }
        :focus::placeholder {
          color: var(--orange);
        }
      }
      .checkout-form__category {
        width: 100%;
        background: var(--white);
        border-radius: calc(var(--borderRadius) + 1.5rem);
        border: 0.05rem solid var(--gray-opacity7);
        color: var(--dark);
        margin-bottom: 0.5rem;
        padding: 0.8rem 1.5rem;
        font-weight: 500;
        transition: var(--transition-fast);
        .checkout-form__select {
          font-family: var(--bodyFont);
          border: 0;
          color: var(--gray-opacity7) !important;
          border-radius: 0;
          background-color: transparent;
          &::-ms-expand {
            display: none;
          }
          &:-moz-focusring {
            color: transparent;
            text-shadow: none;
          }

          &:focus {
            background-image: linear-gradient(
                45deg,
                $select-focus-color 50%,
                transparent 50%
              ),
              linear-gradient(135deg, transparent 50%, $select-focus-color 50%),
              linear-gradient(
                to right,
                $select-focus-color,
                $select-focus-color
              );
            background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
              calc(100% - 2.5em) 0.5em;
            background-size: 5px 5px, 5px 5px, 1px 1.5em;
            background-repeat: no-repeat;
            border-color: $select-focus-color;
            outline: 0;
          }
          .checkout-form__option {
            font-family: var(--bodyFont);
            .dropdown-item {
              text-transform: capitalize !important;
            }
          }
        }
        .btn {
          background-color: transparent;
          border: none;
          color: var(--gray);
          font-family: var(--bodyFont);
          padding: 0;
          box-shadow: none;
          margin: 0;
          vertical-align: baseline;
          :hover,
          :first-child:active {
            background-color: transparent;
            color: var(--gray);
          }
        }
        .btn[aria-expanded="true"]::after {
          content: "\f077";
        }
      }
      .table {
        .cart-title {
          color: var(--gray);
          :hover {
            color: var(--orange);
          }
        }
      }
      .cach-box {
        background-color: var(--light);
        .cach-box__first-span {
          padding: 1rem;
          font-weight: 700;
          color: var(--gray);
        }
        .cach-box__last-span {
          display: block;
          padding: 0.8rem;
          margin: 0 1rem 1.5rem;
          color: var(--white);
          font-weight: 300;
          background-color: var(--gray) !important;
          position: relative;
          div,
          div::before {
            position: absolute;
            width: 0.5rem;
            height: 0.5rem;
            top: -0.125rem;
            left: 1.5rem;
            background-color: var(--gray);
            z-index: 0;
          }
          div {
            visibility: hidden;
          }
          div::before {
            visibility: visible;
            content: "";
            transform: rotate(45deg);
          }
        }
      }
      .form__btn {
        width: 20%;
        border: 0.125rem solid var(--orange) !important ;
        color: var(--gray) !important;
        margin: 1rem 1.5rem;
        :hover {
          color: var(--light) !important;
          background-color: var(--orange);
        }
        ::before {
          background-color: var(--orange);
          width: 100%;
        }
      }
    }

    /********** Bootstrap Default Dropdown-select **********/
    .hk--custom--select:not([class*="col-"]):not([class*="form-control"]):not(
        .input-group-btn
      ) {
      width: 100% !important;
      text-transform: capitalize !important;
      vertical-align: baseline;
    }
    .hk--custom--select > .dropdown-toggle.bs-placeholder,
    .hk--custom--select > .dropdown-toggle.bs-placeholder:hover,
    .hk--custom--select > .dropdown-toggle.bs-placeholder:focus,
    .hk--custom--select > .dropdown-toggle.bs-placeholder:active {
      color: var(--dark) !important;
    }
    .hk--custom--select .dropdown-menu {
      top: 2.3rem !important;
      left: -1.55rem;
      right: -1.55rem;
    }
    .hk--custom--select .dropdown-menu.inner {
      width: 10rem;
    }
    .hk--custom--select input.form-control::placeholder {
      font-family: var(--bodyFont);
    }
    .dropdown-toggle::after,
    .dropup .dropdown-toggle::after {
      display: inline-block;
      margin-left: 0.255em;
      vertical-align: 0.255em;
      font-family: "FontAwesome";
      content: "\f078";
      border-top: none;
      border-right: none;
      border-bottom: none;
      border-left: none;
    }
    .checkout-form__category .dropdown-menu {
      --bs-dropdown-zindex: 1000;
      --bs-dropdown-padding-x: 0;
      --bs-dropdown-padding-y: 0;
      --bs-dropdown-border-radius: 0;
      --bs-dropdown-font-size: var(--mdallFontSize);
      --bs-dropdown-color: var(--dark);
      --bs-dropdown-bg: var(--white);
      --bs-dropdown-link-color: var(--dark);
      --bs-dropdown-link-hover-color: var(--light);
      --bs-dropdown-link-hover-bg: var(--orange);
      --bs-dropdown-link-active-color: var(--light);
      --bs-dropdown-link-active-bg: var(--gray);
      --bs-dropdown-link-disabled-color: var(--dark);
      --bs-dropdown-item-padding-x: 0.5rem;
      --bs-dropdown-item-padding-y: 0.5rem;
      width: -webkit-fill-available;
      border: 0.05rem solid var(--gray-opacity7);
      border-top: none;
      border-radius: var(--bs-dropdown-border-radius) !important;
    }
    .checkout-form__category .form-control {
      font-size: var(--mdallFontSize);
      color: var(--dark);
      background-color: var(--white);
      border: 0.05rem solid var(--gray-opacity7);
      border-radius: calc(var(--borderRadius) - 0.5rem);
      :focus {
        border: 0.125rem solid var(--dark);
        box-shadow: none;
      }
    }
    .bs-searchbox,
    .checkout-form__category .form-control {
      padding: 5px;
    }
    .filter-option-inner-inner {
      text-transform: capitalize;
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .form__btn {
        :hover {
          opacity: 1 !important;
        }
      }
    }
    @media only screen and (max-width: 768px) {
      .additional {
        margin-top: 2rem;
      }
    }
    @media only screen and (max-width: 576px) {
      .form__btn {
        width: 7rem !important;
      }
    }
  }
`;
