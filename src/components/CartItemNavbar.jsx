import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import CustomButton from "../utilities/CustomButton";
import { formatCurrency } from "../utilities/formatCurrency";
import { GetSlug } from "../utilities/StringSlugConverter";

const CartItemNavbar = ({ id, quantity }) => {
  const { handleRemoveFromCart, dataAvailable } = useCustomContext();
  const item = dataAvailable.find((i) => i.id === id);
  if (item == null) return null;


  return (
    <Wrapper>
      <div className="cart-item__row">
        <Link reloadDocument to={`/shop/${GetSlug(item.title)}`}>
          <img
            src={item.image}
            alt={item.title}
            className="cart-item__img me-2"
          />
        </Link>
        <div className="me-auto">
          <div>
            <Link className="cart-item__title" reloadDocument to={`/shop/${GetSlug(item.title)}`}>{item.title.length > 15 ? `${item.title.slice(0, 15)}...` : item.title}{" "}</Link>
            {quantity > 1 && (
              <span
                className="ms-2 cart-item__muted-txt"
              >
                x{quantity}
              </span>
            )}
          </div>
          <div className="cart-item__muted-txt">
            {formatCurrency((item.price).toFixed(2))}
          </div>
        </div>
        <div className="cart-item__price">
          {" "}
          {formatCurrency(((item.price).toFixed(2)) * quantity)}
        </div>
        <CustomButton
          textBtn="&times;"
          className="cart-item__close-btn"
          onClick={() => handleRemoveFromCart(item.id)}
        />
      </div>
    </Wrapper>
  );
};

export default CartItemNavbar;

const Wrapper = styled.section`
  .cart-item__row {
    display: flex;
    margin-bottom: 0.8rem;
    align-items: center;
    .cart-item__img {
      width: 3rem;
      height: 2.5rem;
    }
    .cart-item__title {
      font-weight: 600;
      color: var(--dark);
    }
    .cart-item__title:hover {
      color: var(--orange);
    }
    .cart-item__muted-txt {
      color: var(--gray);
      font-size: var(--extrasmallFontSize);
      font-weight: 500;
    }
    .cart-item__price {
    }
    .cart-item__close-btn {
      color: var(--orange) !important;
      background-color: transparent !important;
      width: 1.5rem !important;
      height: 1.5rem !important;
      padding: 0 !important;
      font-size: var(--headingFontSize) !important;
      border: none !important;
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 450px) {
      align-items: start;
      .cart-item__img {
        display: none;
      }
    }
  }
`;
