import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import { useCustomContext } from "../context/customContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { HiPhone, HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { GetSlug } from "../utilities/StringSlugConverter";

const OrderReceivedMain = ({ id }) => {
  const { orderData, handleClearCart } = useCustomContext();
  const thisOrder = orderData.filter((order) => order.id === Number(id));

  useEffect(() => {
    handleClearCart();
  }, []);

  return (
    <Wrapper>
      <Container fluid className="order-received__main">
        <Row className="justify-content-center">
          <Col xl={10}>
            <p className="order-received__title">
              💕Thank you. Your order has been received.
            </p>
            <div className="d-md-flex little-info">
              <span className="d-flex flex-column little-info__span">
                <span
                  style={{
                    textTransform: "uppercase",
                    color: "var(--gray)",
                    fontWeight: "300",
                  }}
                >
                  Order Number
                </span>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "var(--bodyFontSize)",
                    color: "var(--dark)",
                  }}
                >
                  {id}
                </span>
              </span>
              <span className="d-flex flex-column little-info__span">
                <span
                  style={{
                    textTransform: "uppercase",
                    color: "var(--gray)",
                    fontWeight: "300",
                  }}
                >
                  Date
                </span>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "var(--bodyFontSize)",
                    color: "var(--dark)",
                  }}
                >
                  {thisOrder[0].date}
                </span>
              </span>
              <span className="d-flex flex-column little-info__span">
                <span
                  style={{
                    textTransform: "uppercase",
                    color: "var(--gray)",
                    fontWeight: "300",
                  }}
                >
                  Email
                </span>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "var(--bodyFontSize)",
                    color: "var(--dark)",
                  }}
                >
                  {thisOrder[0].email}
                </span>
              </span>
              <span className="d-flex flex-column little-info__span">
                <span
                  style={{
                    textTransform: "uppercase",
                    color: "var(--gray)",
                    fontWeight: "300",
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "var(--bodyFontSize)",
                    color: "var(--dark)",
                  }}
                >
                  {formatCurrency(thisOrder[0].totalPrice)}
                </span>
              </span>
              <span
                className="d-flex flex-column little-info__span"
                style={{ border: "none" }}
              >
                <span
                  style={{
                    textTransform: "uppercase",
                    color: "var(--gray)",
                    fontWeight: "300",
                  }}
                >
                  Payment Method
                </span>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "var(--bodyFontSize)",
                    color: "var(--dark)",
                  }}
                >
                  Cash on delivery
                </span>
              </span>
            </div>
            <p className="mt-5" style={{ color: "var(--gray)" }}>
              Pay with cash upon delivery.
            </p>
            <h4 className="mt-4" style={{ fontWeight: "900" }}>
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
                {thisOrder[0].orders.map((order) => {
                  return (
                    <tr key={order.id}>
                      <td>
                        <Link
                          className="order-title"
                          reloadDocument
                          to={`/shop/${GetSlug(order.title.toLowerCase())}`}
                        >
                          {order.title.length > 20
                            ? `${order.title.slice(0, 20)}...`
                            : order.title}
                        </Link>
                        <span
                          style={{
                            color: "var(--dark)",
                            fontWeight: "700",
                            fontSize: "var(--extrasmallFontSize)",
                          }}
                          className="ms-2"
                        >
                          &times;{order.quantity}
                        </span>
                      </td>
                      <td style={{ color: "var(--gray)" }}>
                        {formatCurrency(
                          order.price.toFixed(2) * order.quantity
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
                    {formatCurrency(thisOrder[0].shipping)}
                  </td>
                </tr>
                <tr>
                  <th>Payment Method</th>
                  <td>Cach on delivery</td>
                </tr>
                <tr>
                  <th>Total Price</th>
                  <td style={{ color: "var(--gray)" }}>
                    {formatCurrency(thisOrder[0].totalPrice)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <h4 className="mt-4" style={{ fontWeight: "900" }}>
              Biling Address
            </h4>
            <div className="biling">
              <span className="d-block mb-1">
                Name: {thisOrder[0].firstName} {thisOrder[0].lastName}
              </span>
              {thisOrder[0].streetOptional && (
                <span className="d-block mb-1">
                  Apartment / Suite: {thisOrder[0].streetOptional}
                </span>
              )}
              <span className="d-block mb-1">
                Street: {thisOrder[0].street}
              </span>
              <span className="d-block mb-1">
                Town / City: {thisOrder[0].city}
              </span>
              <span className="d-block mb-1">
                State / Region: {thisOrder[0].state}
              </span>
              <span className="d-block mb-1">
                Postcode / ZIP: {thisOrder[0].postcode}
              </span>
              <span className="d-block mb-1">
                Country: {thisOrder[0].country}
              </span>
              <span className="d-block mb-1" style={{ color: "var(--gray)" }}>
                <HiPhone className="me-2" />
                {thisOrder[0].phone}
              </span>
              <span className="d-block mb-1" style={{ color: "var(--gray)" }}>
                <HiMail className="me-2" />
                {thisOrder[0].email}
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default OrderReceivedMain;

const Wrapper = styled.section`
  .order-received__main {
    background-color: var(--white);
    position: relative;
    z-index: 5;
    padding: 5rem 2rem;
    .order-received__title {
      color: var(--gray);
    }
    .little-info {
      margin-left: 1.5rem;
      .little-info__span {
        border-right: 0.05rem dotted var(--gray-opacity7);
        font-size: calc(var(--smallFontSize) - 0.1rem);
        padding: 0 1rem;
      }
    }
    .table {
      .order-title {
        color: var(--gray);
        :hover {
          color: var(--orange);
        }
      }
    }
    .biling {
      border: 0.05rem solid var(--gray-opacity3);
      padding: 1rem 1.5rem;
      font-weight: 400;
      color: var(--black);
      font-size: var(--smallFontSize);
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .little-info {
        margin-left: 0.5rem;
        .little-info__span {
          font-size: var(--extrasmallFontSize);
          padding: 0 0.5rem;
        }
      }
    }
    @media only screen and (max-width: 768px) {
      .little-info {
        .little-info__span {
          border-right: none;
          border-bottom: 0.05rem dotted var(--gray-opacity7);
          padding: 0.5rem;
        }
      }
    }
    @media only screen and (max-width: 450px) {
      .order-received__title {
        text-align: center;
      }
    }
  }
`;
