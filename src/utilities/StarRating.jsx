import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";


const StarRating = ({
  className,
  labelText,
  defaultState,
  emptyColor,
  fillColor,
  height,
  maxValue,
  onChangeHover,
  onChangeValue,
  readOnly,
  width,
  formFormik,
  classNameStars
}) => {
  const [rating, setRating] = useState(defaultState);
  const [hover, setHover] = useState(0);
  
  const setRatingFn = (e) => {
    if (readOnly) return;
    const value = e.target.parentElement.parentElement.dataset.star;
    setRating(value);
    formFormik.setFieldValue(`${labelText.toLowerCase()}`, value)
    onChangeValue(value);
  };

  const setHoverFn = (e) => {
    if (readOnly) return;
    const value = e.type === "mouseleave" ? null : e.currentTarget.dataset.star;
    setHover(value);
    onChangeHover(value);
  };

  return (
    <Wrapper className={className + " d-flex justify-content-start align-items-center"}>
      <div className="me-2 star-label">{labelText}</div>
      <div className="star-rating">
        {[...Array(maxValue)].map((star, index) => {
          const value = index + 1;
          return (
            <div
              className={classNameStars + " star"}
              data-star={value}
              key={index}
              onClick={setRatingFn}
              onMouseEnter={setHoverFn}
              onMouseLeave={setHoverFn}
            >
              <svg
                fill={value <= (hover || rating) ? fillColor : emptyColor}
                height={height}
                viewBox="0 0 25 25"
                width={width}
              >
                <polygon
                  strokeWidth="0"
                  points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                />
              </svg>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default StarRating;

const Wrapper = styled.section`
  .star-label {
    font-size: var(--smallFontSize) !important;
    color: var(--gray);
    font-weight: 700;
  }
  .star-rating {
    display: flex;
    .star {
      font-size: var(--bodyFontSize);
    }
  }
`;


// star rating defaults
StarRating.propTypes = {
  defaultState: PropTypes.number,
  emptyColor: PropTypes.string,
  fillColor: PropTypes.string,
  height: PropTypes.number,
  labelText: PropTypes.string,
  maxValue: PropTypes.number,
  onChangeHover: PropTypes.func,
  onChangeValue: PropTypes.func,
  readOnly: PropTypes.bool,
  width: PropTypes.number,
};

StarRating.defaultProps = {
  defaultState: 0,
  emptyColor: "var(--gray-opacity7)",
  fillColor: "var(--orange)",
  height: 25,
  labelText: "Rating",
  maxValue: 5,
  onChangeHover: () => {},
  onChangeValue: () => {},
  readOnly: false,
  width: 20,
};