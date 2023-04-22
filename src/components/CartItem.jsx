import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import CustomButton from "../utilities/CustomButton";
import { formatCurrency } from "../utilities/formatCurrency";
import { GetSlug } from "../utilities/StringSlugConverter";
import { GoArrowSmallUp, GoArrowSmallDown } from 'react-icons/go';


const CartItem = ({ id, quantity, index }) => {
  const { handleRemoveFromCart, handleIncreaseCartQuantity, handleDecreaseCartQuantity, dataAvailable } = useCustomContext();
  const item = dataAvailable.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Wrapper style={{ textAlign: "center", verticalAlign: "middle"}}>
        <th scope="row" className="d-table-cell d-sm-none d-md-table-cell">{index + 1}</th>
        <td>
          <Link className="cart-item__title" reloadDocument to={`/shop/${GetSlug(item.title.toLowerCase())}`}>
            {item.title.length > 15
              ? `${item.title.slice(0, 15)}...`
              : item.title}
          </Link>
        </td>
        <td>
          {formatCurrency(item.price.toFixed(2))}
        </td>
        <td className="d-table-cell d-sm-none d-md-table-cell">
          <Link reloadDocument to={`/shop/${GetSlug(item.title.toLowerCase())}`}>
            <img style={{ width: "3rem", height: "3rem"}} src={item.image} alt={item.title} />
          </Link>
        </td>
        <td className="cat-item__quantity">
          <span className="d-flex justify-content-center align-items-center">
            <span className="me-1">{quantity}</span>
            <span className="d-flex flex-column ms-1"><GoArrowSmallUp style={{ cursor: "pointer"}} size={20} onClick={(id)=> handleIncreaseCartQuantity(item.id)} /><GoArrowSmallDown style={{ cursor: "pointer"}} size={20} onClick={(id)=> handleDecreaseCartQuantity(item.id)} /></span>
          </span>
        </td>
        <td>{formatCurrency(item.price.toFixed(2) * quantity)}</td>
        <td>
          <CustomButton
            textBtn="&times;"
            className="cart-item__close-btn"
            classNameParent="justify-content-center m-0"
            onClick={() => handleRemoveFromCart(item.id)}
          />
        </td>
    </Wrapper> 
  );
};

export default CartItem;

const Wrapper = styled.tr`
    .cart-item__title {
      font-weight: 600;
      color: var(--dark);
      :hover {
        color: var(--orange);
      }
    }
    .cart-item__close-btn {
      width: 1.5rem !important;
      height: 1.5rem !important;
      padding: 0 !important;
      font-size: var(--headingFontSize) !important;
      border: none !important;
    }
`;
