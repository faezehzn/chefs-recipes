import { forwardRef } from "react";
import styled from "styled-components";

const CustomButton = forwardRef(
  (
    {
      textBtn,
      value,
      className,
      type,
      disabled,
      classNameParent,
      children,
      icon,
      onClick,
      classNameSection,
    },
    ref
  ) => {
    return (
      <Wrapper className={classNameSection}>
        <div className={classNameParent + " dark-to-light"}>
          {children}
          <button
            type={type}
            ref={ref}
            value={value}
            className={className + " dark-to-light__btn"}
            onClick={onClick}
            disabled={disabled}
          >
            {textBtn} {icon}
          </button>
        </div>
      </Wrapper>
    );
  }
);

export default CustomButton;

const Wrapper = styled.section`
  .dark-to-light {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0.5rem;

    .dark-to-light__btn {
      font-family: var(--bodyFont);
      font-size: var(--smallFontSize);
      text-transform: capitalize;
      border: 0.125rem solid var(--light);
      color: var(--light);
      line-height: 1.2;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 800;
      padding: 0 1rem;
      width: 10rem;
      height: 3rem;
      border-radius: 1.8rem;
      position: relative;
      transition: var(--transition-fast);
      z-index: 2;
      overflow: hidden;
      ::before {
        content: "";
        display: block;
        position: absolute;
        width: 11rem;
        height: 4rem;
        background-color: var(--light);
        top: 0;
        padding: 0;
        margin: 0;
        transform: translateY(-4rem);
        transition: var(--transition-fast);
        z-index: -1 !important;
      }
      :hover {
        color: var(--orange);
        background-color: var(--light);
      }
      :hover::before {
        transform: translateY(0rem);
      }
      :disabled {
        opacity: 0.8;
      }
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      margin: 0 !important;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      margin: 0.5rem;
      .dark-to-light__btn {
        border: none;
        ::before {
          content: "";
          display: none;
        }
        :hover {
          color: var(--light);
          opacity: 0.7;
          border: none;
          box-shadow: none;
          background-color: transparent;
        }
      }
    }
  }
`;
