import { useState, useRef } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styled from "styled-components";
import TitleTxtContainer from "../utilities/TitleTxtContainer";
import CustomButton from "../utilities/CustomButton";
import Fade from "react-reveal/Fade";
import { dataApi, LOCAL_URL } from "../context/constants";

const ContactForm = () => {
  const urlMap =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1774.1521589955557!2d56.340617!3d27.2095938!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef9d726c7967867%3A0x9b5e4dd1cd57c43!2sHormozgan%20Province%2C%20Bandarabbas%2C%20Damahi%2C%20Damahi%20St%2C%20685R%2BRM5!5e0!3m2!1sen!2s!4v1674768968669!5m2!1sen!2s";

  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({});
  const refAlert = useRef(null);

  yup.setLocale({
    string: {
      required: "Required",
      min: ({ min }) => ({ key: "Field Too Short", values: { min } }),
      max: ({ max }) => ({ key: "Field Too Big", values: { max } }),
    },
  });
  const RegExp =
    /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g;

  const schema = yup.object().shape({
    firstName: yup
      .string("Please Enter Correct First Name")
      .required("Required"),
    lastName: yup.string("Please Enter Correct Last Name").required("Required"),
    email: yup.string("Please Enter valid Email").email().required("Required"),
    phone: yup
      .string("Invalid Phone No.")
      .matches(RegExp, `Use the pattern: 0912 345 6789`),
    message: yup.string().max(500).required("Required"),
  });

  const formFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: schema,
  });

  const handleSubmit = async (values) => {
    setButtonText("Sending...");

    await fetch(`${dataApi}/contact`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, accept",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      formFormik.resetForm();
      if (res.ok === true) {
        setStatus({ succes: true, message: "Message sent successfully" });
        setTimeout(() => {
          refAlert.current.className += " d-none";
        }, 5000);
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
    setButtonText("Send");
  };

  return (
    <Wrapper>
      <Container fluid className="contact__form">
        <Row className="align-items-center justify-content-center">
          <Col
            xs={{ order: 2 }}
            md={{ span: 6, order: 1 }}
            lg={{ span: 5, order: 1 }}
            className="col-left"
          >
            <Fade left>
              <iframe
                src={urlMap}
                width="600"
                height="450"
                title="Our Location"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Fade>
          </Col>
          <Col
            xs={{ order: 1 }}
            md={{ span: 6, order: 1 }}
            lg={{ span: 5, order: 2 }}
            className="col-right"
          >
            <Fade right>
              <TitleTxtContainer
                title={"Get In Touch"}
                text={
                  "Eiusmod tempor incididunt ut labore et dolore magna aliqua."
                }
              />
              <form
                onSubmit={formFormik.handleSubmit}
                method="POST"
                className="mt-4"
              >
                <div className="contact__alert">
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
                <div>
                  <Col
                    size={12}
                    sm={12}
                    className={
                      formFormik.touched.firstName &&
                      formFormik.errors.firstName
                        ? "input-error px-1"
                        : "px-1"
                    }
                  >
                    <input
                      type="text"
                      className={
                        formFormik.touched.firstName &&
                        formFormik.errors.firstName
                          ? "d-none"
                          : "contact-form__input"
                      }
                      placeholder="First Name *"
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
                            type="text"
                            placeholder="First Name *"
                            className="contact-form__input"
                            {...formFormik.getFieldProps("firstName")}
                          />
                        </Tippy>
                      )}
                  </Col>
                  <Col
                    size={12}
                    sm={12}
                    className={
                      formFormik.touched.lastName && formFormik.errors.lastName
                        ? "input-error px-1"
                        : "px-1"
                    }
                  >
                    <input
                      type="text"
                      className={
                        formFormik.touched.lastName &&
                        formFormik.errors.lastName
                          ? "d-none"
                          : "contact-form__input"
                      }
                      placeholder="Last Name *"
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
                            type="text"
                            placeholder="Last Name *"
                            className="contact-form__input"
                            {...formFormik.getFieldProps("lastName")}
                          />
                        </Tippy>
                      )}
                  </Col>
                  <Col
                    size={12}
                    sm={12}
                    className={
                      formFormik.touched.email && formFormik.errors.email
                        ? "input-error px-1"
                        : "px-1"
                    }
                  >
                    <input
                      type="email"
                      className={
                        formFormik.touched.email && formFormik.errors.email
                          ? "d-none"
                          : "contact-form__input"
                      }
                      placeholder="Email Address *"
                      {...formFormik.getFieldProps("email")}
                    />
                    {formFormik.touched.email && formFormik.errors.email && (
                      <Tippy
                        placement="bottom"
                        render={(attrs) => (
                          <div className="custom__tooltip" {...attrs}>
                            <div data-popper-arrow />
                            {formFormik.errors.email}
                          </div>
                        )}
                      >
                        <input
                          type="email"
                          placeholder="Email Address *"
                          className="contact-form__input"
                          {...formFormik.getFieldProps("email")}
                        />
                      </Tippy>
                    )}
                  </Col>
                  <Col
                    size={12}
                    sm={12}
                    className={
                      formFormik.touched.phone && formFormik.errors.phone
                        ? "input-error px-1"
                        : "px-1"
                    }
                  >
                    <input
                      type="tel"
                      className={
                        formFormik.touched.phone && formFormik.errors.phone
                          ? "d-none"
                          : "contact-form__input"
                      }
                      placeholder="Phone No."
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
                          type="text"
                          placeholder="Phone"
                          className="contact-form__input"
                          {...formFormik.getFieldProps("phone")}
                        />
                      </Tippy>
                    )}
                  </Col>
                  <Col
                    size={12}
                    sm={12}
                    className={
                      formFormik.touched.message && formFormik.errors.message
                        ? "input-error px-1"
                        : "px-1"
                    }
                  >
                    <textarea
                      type="text"
                      rows="6"
                      className={
                        formFormik.touched.message && formFormik.errors.message
                          ? "d-none"
                          : "contact-form__input"
                      }
                      placeholder="Message *"
                      {...formFormik.getFieldProps("message")}
                    />
                    {formFormik.touched.message &&
                      formFormik.errors.message && (
                        <Tippy
                          placement="bottom"
                          render={(attrs) => (
                            <div className="custom__tooltip" {...attrs}>
                              <div data-popper-arrow />
                              {formFormik.errors.message}
                            </div>
                          )}
                        >
                          <textarea
                            type="text"
                            rows="6"
                            placeholder="Message *"
                            className="contact-form__input"
                            {...formFormik.getFieldProps("message")}
                          />
                        </Tippy>
                      )}
                  </Col>
                  <Col size={12} sm={12} className="px-1">
                    <CustomButton
                      classNameParent="mx-0 justify-content-end"
                      className="form__btn"
                      textBtn={buttonText}
                      type="submit"
                    />
                  </Col>
                </div>
              </form>
            </Fade>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ContactForm;

const Wrapper = styled.section`
  .contact__form {
    display: block;
    position: relative;
    z-index: 5;
    background-color: var(--white) !important;
    height: fit-content;
    padding: 5rem 2rem;
    iframe {
      width: 95%;
      height: 85vh;
      border-radius: var(--borderRadius);
    }
    .col-right {
      .contact__alert {
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
      .contact-form__input {
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
          color: var(--gray);
        }
        :focus::placeholder {
          opacity: 0.8;
        }
      }
      textarea {
        border-radius: var(--borderRadius) !important;
      }
      .input-error .contact-form__input {
        border-radius: calc(var(--borderRadius) + 1.5rem);
        border: 0.125rem solid var(--red-dark);
        background: var(--light-gray);
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
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .form__btn {
        width: 100%;
      }
    }
    @media only screen and (max-width: 768px) {
      .col-right {
        width: 80%;
      }
      .col-left {
        width: 80%;
        margin-top: 2rem;
        iframe {
          height: 50vh;
        }
      }
    }
    @media only screen and (max-width: 450px) {
      .col-right {
        width: 95%;
      }
      .col-left {
        width: 95%;
        iframe {
          height: 40vh;
        }
      }
    }
  }
`;
