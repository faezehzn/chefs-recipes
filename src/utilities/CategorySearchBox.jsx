import { Form } from "react-bootstrap";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import { useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import Loading from "../utilities/Loading";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";


// const url = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${process.env.REACT_APP_API_KEY}`;

const CategorySearchBox = () => {
  const { loading, txtInputRef, searchParams, handleSearchRecipesSubmit, MealType } =
    useCustomContext();
  const catInputRefCallback = useCallback((element) => {
    element.firstChild.children[1].children[0].children[0].setAttribute(
      "placeholder",
      ""
    );
    element.firstChild.children[1].children[0].classList.remove(
      "border-primary"
    );
  }, []);

  const options = MealType.map((value) => {
    if (value === "all meals") {
      return {
        labelKey: "optionItem1",
        value: value,
        className: "search-form--option",
        isSelected: true,
      };
    } else {
      return {
        labelKey: "optionItem1",
        value: value,
        className: "search-form--option",
      };
    }
  });

  if (loading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Form className="search-form">
        <input
          type="text"
          placeholder="What do you want to make ..."
          ref={txtInputRef}
          className="search-form--input"
        />
        <div
          className="search-form--category"
          ref={catInputRefCallback}
        >
          <BootstrapSelect
            className="search-form--select"
            options={options}
            showSearch={true}
            menuSize={4}
          />
        </div>
        <NavLink
          to={`/recipes/?${searchParams}`}
          type="submit"
          onClick={(e) => handleSearchRecipesSubmit(e)}
          reloadDocument
          className="search-form--btn"
        >
          <FaSearch />
        </NavLink>
      </Form>
    </Wrapper>
  );
};

export default CategorySearchBox;

const Wrapper = styled.section`
  .search-form {
    margin: 2rem auto;
    width: 95%;
    height: 4rem;
  }
  .search-form--category,
  .search-form--input,
  .search-form--btn {
    padding: 1rem;
    font-size: var(--bodyFontSize);
  }
  .search-form--input {
    border: 0.125rem solid var(--light);
    width: 20rem;
    color: var(--light);
    font-family: var(--bodyFont);
    background-color: transparent;
    border-top-left-radius: 1.8rem;
    border-bottom-left-radius: 1.8rem;
    border-right: 0;
  }
  .search-form--input::placeholder {
    color: var(--light);
    font-family: var(--bodyFont);
  }
  .search-form--category {
    width: 12rem;
    padding-left: 0.5rem;
    border: 0.125rem solid var(--light);
    border-right: 0;
    display: inline-block;
    z-index: 2;
    background-color: transparent;
  }
  .search-form--select {
    font-family: var(--bodyFont);
    border: 0;
    color: var(--light);
    border-radius: 0;
    background-color: transparent;
  }
  .search-form--option {
    font-family: var(--bodyFont);
  }
  .search-form--option .dropdown-item {
    text-transform: capitalize !important;
  }
  .search-form--btn {
    border: 0.125rem solid var(--light);
    background-color: var(--light);
    border-top-right-radius: 1.8rem;
    border-bottom-right-radius: 1.8rem;
    color: var(--orange);
    transition: var(--transition-fast);
  }
  .search-form--btn:hover {
    color: var(--light);
    background-color: transparent;
  }
  .search-form--category .btn {
    background-color: transparent;
    border: none;
    color: var(--light);
    font-family: var(--bodyFont);
    padding: 0;
    margin: 0;
    vertical-align: baseline;
  }
  .search-form--category .btn:hover,
  .search-form--category .btn:first-child:active {
    background-color: transparent;
    color: var(--light);
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
    color: var(--light) !important;
  }
  .hk--custom--select .dropdown-menu {
    top: 2.6rem;
    left: -0.6rem;
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
  .search-form--category .dropdown-menu {
    --bs-dropdown-zindex: 1000;
    --bs-dropdown-width: 12rem;
    --bs-dropdown-padding-x: 0;
    --bs-dropdown-padding-y: 0;
    --bs-dropdown-font-size: var(--smallFontSize);
    --bs-dropdown-color: var(--dark);
    --bs-dropdown-bg: var(--light);
    --bs-dropdown-link-color: var(--dark);
    --bs-dropdown-link-hover-color: var(--light);
    --bs-dropdown-link-hover-bg: var(--orange);
    --bs-dropdown-link-active-color: var(--light);
    --bs-dropdown-link-active-bg: var(--gray);
    --bs-dropdown-link-disabled-color: var(--dark);
    --bs-dropdown-item-padding-x: 0.5rem;
    --bs-dropdown-item-padding-y: 0.5rem;
    width: var(--bs-dropdown-width);
    border: none;
    border-radius: none !important;
  }
  .search-form--category .form-control {
    font-size: var(--smallFontSize);
    color: var(--dark);
    background-color: var(--light);
    border: 0.125rem solid var(--dark);
    border-radius: calc(var(--borderRadius) - 0.5rem);
  }
  .search-form--category .form-control:focus {
    border: 0.125rem solid var(--dark);
    box-shadow: none;
  }
  .bs-searchbox,
  .search-form--category .form-control {
    padding: 5px;
  }
  .filter-option-inner-inner {
    text-transform: capitalize;
  }
  /************ Responsive Css ************/
  @media only screen and (max-width: 992px) {
    .search-form--input,
    .search-form--category,
    .search-form--btn {
      border: 0.125rem solid var(--light);
      display: block;
      margin: 1rem auto;
      border-radius: 1.8rem;
      width: 70%;
    }
    .hk--custom--select .dropdown-toggle .filter-option {
      margin-left: 1rem !important;
    }
    .hk--custom--select .dropdown-menu {
      left: 0;
    }
  }
  @media only screen and (max-width: 576px) {
    .search-form--input,
    .search-form--category,
    .search-form--btn {
      width: 90%;
    }
  }
`;
