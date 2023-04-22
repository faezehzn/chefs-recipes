import { Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartItemNavbar from "../components/CartItemNavbar";
import { useCustomContext } from "../context/customContext";
import CustomButton from "./CustomButton";
import { formatCurrency } from "./formatCurrency";

const NavbarCartIcon = () => {
  const { cartQuantity, cartItems, dataAvailable, isAuthenticated } = useCustomContext();

  return (
    <Wrapper>
      <ul className="navigation__right-cart">
        <div style={{ position: "relative" }}>
          <FaShoppingCart size={15} className="cart--icon" />
          {isAuthenticated && cartQuantity > 0 && (
            <Badge className="cart--badge">{cartQuantity}</Badge>
          )}
        </div>
        <div className="navigation__right-cart-item--container">
          {isAuthenticated ? (
            cartQuantity > 0 ? (
            <>
              <div className="mb-3 ms-3 fs-5" style={{ fontWeight: "800" }}>
                Cart
              </div>
              {cartItems.map((item) => (
                <CartItemNavbar key={item.id} {...item} />
              ))}
              <div className="cart-total-price">
                Total Whitout Shipping{": "}
                <span className="ms-2">
                  {formatCurrency(
                    cartItems.reduce((total, cartItem) => {
                      const item = dataAvailable.find(
                        (i) => i.id === cartItem.id
                      );
                      return (
                        total +
                        (item?.price || 0).toFixed(2) * cartItem.quantity
                      );
                    }, 0)
                  )}
                </span>
              </div>
              <Link reloadDocument to={`/cart`}>
                <CustomButton
                  classNameParent="justify-content-center"
                  className="cart-navbar__btn"
                  textBtn="View Cart"
                />
              </Link>
              <Link reloadDocument to={`/checkout`}>
                <CustomButton
                  classNameParent="justify-content-center"
                  className="cart-navbar__btn"
                  textBtn="Checkout"
                />
              </Link>
            </>
          ) : (
            <li className="navigation__right-cart-item">
              <p style={{ width: "15rem"}} className="m-1">No products in the cart.</p>
            </li>
          )
          ) : <li className="navigation__right-cart-item">
              <p style={{ width: "15rem"}} className="m-1">Must be logged in!</p>
            </li>}
        </div>
      </ul>
    </Wrapper>
  );
};

export default NavbarCartIcon;

const Wrapper = styled.section`
  display: flex;
  .navigation__right-cart {
    padding: 0 0.5rem;
    display: block !important;
    margin: 0;
    :hover {
      .navigation__right-cart-item--container {
        opacity: 1;
        top: 100%;
        visibility: visible;
        animation: moveDownToUp 0.2s ease-in;
      }
    }
    .cart--icon {
      margin: 2rem 2rem 2rem 0;
      color: var(--light);
    }
    .cart--badge {
      color: var(--light);
      width: 1rem;
      height: 1rem;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(-125%, -125%);
      padding: 0;
      margin: 0;
      text-align: center;
      background-color: var(--orange) !important;
      font-size: var(--extrasmallFontSize);
      border-radius: var(--borderRadius);
      line-height: 1.4;
    }
    .navigation__right-cart-item--container {
      display: block;
      visibility: hidden;
      border-radius: calc(var(--borderRadius) - 0.5rem);
      opacity: 0;
      background-color: var(--light);
      text-align: start;
      margin: -1rem 0;
      position: absolute;
      right: 15%;
      max-height: 31rem;
      overflow-y: auto;
      top: 95%;
      transform: translateX(-2rem) !important;
      padding: 1rem;
      transition: var(--transition-fast);

      .navigation__right-cart-item {
        display: inline;
        font-size: var(--smallFontSize) !important;
      }
      .cart-total-price {
        font-weight: 700;
        border-top: 0.05rem solid var(--gray-opacity3);
        padding: 0.5rem;
        display: flex;
        justify-content: center;
      }
      .cart-navbar__btn {
        border: none !important;
        background-color: var(--orange) !important;
        color: var(--light) !important;
        width: 20rem;
        :hover {
          color: var(--orange) !important;
        }
        ::before {
          width: 20rem !important;
        }
      }
      :hover {
        .navigation__right-cart-item-link {
          color: var(--dark);
        }
      }
    }


    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .navigation__right-cart-item--container {
        width: 20rem;
        left: 20%;
        .cart-navbar__btn {
          margin: 0.3rem;
          transition: var(--transition-fast);
          :hover {
            opacity: 1 !important;
            background-color: var(--light) !important;
            box-shadow: var(--shadow) !important;
            border-right: 0.05rem solid var(--orange) !important;
            border-left: 0.05rem solid var(--orange) !important;
          }
        }
      }
    }
    @media only screen and (max-width: 450px) {
      .navigation__right-cart-item--container {
        width: 17rem;
        .cart-navbar__btn {
          width: 10rem !important;
        }
      }
    }
  }

`;
