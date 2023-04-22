import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import CustomButton from "../utilities/CustomButton";
import { formatCurrency } from "../utilities/formatCurrency";
import CartItem from "./CartItem";
import { AiFillBulb } from "react-icons/ai";
import History from "../components/History";

const BasketMain = (props) => {
  const { cartQuantity, cartItems, shipping, cartTotal } = useCustomContext();

  return (
    <Wrapper>
      <Container fluid className="cart__main">
        <Row className="justify-content-center">
          <Col lg={10}>
            {cartQuantity > 0 ? (
              <>
                <table className="table table-striped">
                  <thead>
                    <tr
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <th
                        scope="col"
                        className="d-table-cell d-sm-none d-md-table-cell"
                      >
                        Number
                      </th>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th
                        scope="col"
                        className="d-table-cell d-sm-none d-md-table-cell"
                      >
                        Thumbnail
                      </th>
                      <th scope="col" style={{ width: "10%" }}>
                        Quantity
                      </th>
                      <th scope="col">Subtotal</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {cartItems.map((item, index) => {
                      return <CartItem key={item.id} {...item} index={index} />;
                    })}
                  </tbody>
                  <tfoot className="table-group-divider">
                    <tr
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <th>Shipping</th>
                      <td className="d-none d-sm-table-cell"></td>
                      <td className="d-none d-sm-table-cell"></td>
                      <td className="d-none d-md-table-cell"></td>
                      <td className="d-none d-md-table-cell"></td>
                      <td>{formatCurrency(shipping)}</td>
                      <td className="d-none d-sm-table-cell"></td>
                    </tr>
                    <tr
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <th>Cart Totals</th>
                      <td className="d-none d-sm-table-cell"></td>
                      <td className="d-none d-sm-table-cell"></td>
                      <td className="d-none d-md-table-cell"></td>
                      <td className="d-none d-md-table-cell"></td>
                      <td>{formatCurrency(cartTotal + shipping)}</td>
                      <td className="d-none d-sm-table-cell"></td>
                    </tr>
                  </tfoot>
                </table>
                <Link reloadDocument to={`/checkout`}>
                  <CustomButton
                    classNameParent="justify-content-center m-0"
                    className="cart__main--btn"
                    textBtn="Proceed to checkout"
                  />
                </Link>
              </>
            ) : (
              <div className="no-cart">
                {History.location.state === "/checkout" && (
                  <p className="no-cart-item">
                    <AiFillBulb
                      color="var(--orange)"
                      className="me-2"
                      style={{ transform: "translateY(-0.2rem)" }}
                    />
                    Checkout is not available whilst your cart is empty.
                  </p>
                )}
                <p className="no-cart-item">
                  <AiFillBulb
                    color="var(--orange)"
                    className="me-2"
                    style={{ transform: "translateY(-0.2rem)" }}
                  />
                  Your cart is currently empty.
                </p>
                <Link reloadDocument to={`/shop`}>
                  <CustomButton
                    textBtn="Return to shop"
                    classNameParent="justify-content-center mt-5"
                    className="return-btn"
                  />
                </Link>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default BasketMain;

const Wrapper = styled.section`
  .cart__main {
    background-color: var(--white);
    position: relative;
    z-index: 5;
    padding: 5rem 2rem;
    div .cart__main--btn {
      border: none !important;
      margin-top: 2rem;
      width: 15rem !important;
      background-color: var(--orange) !important;
      color: var(--light) !important;
      :hover {
        color: var(--orange) !important;
        background-color: var(--light) !important;
      }
      ::before {
        width: 100% !important;
      }
    }
    .no-cart {
      .no-cart-item {
        padding: 1.5rem;
        border-top: 0.2rem solid var(--orange);
        background-color: var(--light);
        margin-bottom: 2rem;
        font-weight: 300;
      }
      .return-btn {
        background-color: var(--orange) !important;
        color: var(--light) !important;
        text-transform: uppercase;
        width: 15rem !important;
        border: none !important;
        :hover {
          color: var(--orange) !important;
          background-color: var(--light) !important;
          border-left: 0.05rem solid var(--orange) !important;
          border-right: 0.05rem solid var(--orange) !important;
        }
        ::before {
          width: 100% !important;
        }
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .cart-item__close-btn {
        color: var(--dark) !important;
        :hover {
          color: var(--orange) !important;
        }
      }
      .cart__main--btn:hover {
        color: var(--orange) !important;
        border-left: 0.05rem solid var(--orange) !important;
        border-right: 0.05rem solid var(--orange) !important;
      }
      .return-btn {
        :hover {
          opacity: 1 !important;
          background-color: var(--light) !important;
          box-shadow: var(--shadow) !important;
        }
      }
    }
    @media only screen and (max-width: 576px) {
      .table {
        thead {
          display: none;
        }
        tbody,
        tfoot {
          tr {
            display: flex;
            flex-direction: column;
          }
        }
      }
      .no-cart {
        .no-cart-item {
          text-align: center;
        }
      }
    }
  }
`;
