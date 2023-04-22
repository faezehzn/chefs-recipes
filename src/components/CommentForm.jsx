import styled from "styled-components";
import { useState } from "react";
import CustomButton from "../utilities/CustomButton";

const CommentForm = ({
  buttonText,
  handleSubmit,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
  isAuthenticated
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = isAuthenticated ? (text.length === 0 ? true : false) : true;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <Wrapper>
      <form className="comment-form" onSubmit={onSubmit}>
        <textarea
          className="comment-form-textarea"
          value={text}
          placeholder='Add a comment'
          onChange={(e) => setText(e.target.value)}
        />
        <div className="d-sm-flex justify-content-end me-sm-5">
          <CustomButton
            classNameParent="mx-0 mt-sm-4 justify-content-center justify-content-sm-end"
            className="comment-form-button"
            textBtn={buttonText}
            disabled={isTextareaDisabled}
          />
          {hasCancelButton && (
            <CustomButton
              classNameParent="mx-0 mt-sm-4 justify-content-center justify-content-sm-end"
              className="comment-form-button comment-form-cancel-button"
              textBtn="Cancel"
              type="button"
              onClick={handleCancel}
            />
          )}
        </div>
      </form>
    </Wrapper>
  );
};

export default CommentForm;

const Wrapper = styled.section`
  .comment-form {
    .comment-form-textarea {
      width: 95%;
      height: 7rem;
      border: 0.05rem solid var(--gray-opacity3) !important;
      color: var(--dark);
      padding: 0.8rem 1.5rem;
      margin: 0 1rem;
      font-weight: 500;
      border-radius: var(--borderRadius) !important;
    }
    .comment-form-textarea:focus {
      border: 0.125rem solid var(--orange) !important;
    }
    .comment-form-textarea::placeholder {
      font-weight: 300;
      color: var(--gray);
    }
    .comment-form-textarea:focus::placeholder {
      opacity: 0.8;
    }

    .comment-form-button {
      width: fit-content !important;
      border: 0.125rem solid var(--orange) !important ;
      color: var(--white) !important;
      background-color: var(--orange);
      opacity: 1 !important;
      height: 2.2rem !important;
    }
    .comment-form-button:hover {
      color: var(--orange) !important;
      background-color: var(--white);
      cursor: pointer;
    }
    .comment-form-button:disabled {
      opacity: 0.7 !important;
      cursor: default;
    }
    .comment-form-button:disabled:hover,
    .comment-form-button:disabled::before {
      background-color: var(--orange) !important;
      color: var(--white) !important;
    }
    .comment-form-button::before {
      background-color: var(--white);
      width: 100%;
    }
    .comment-form-cancel-button {
      margin-left: 0.8rem;
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .comment-form-button {
        margin-top: 1.5rem;
      }
    }
    @media only screen and (max-width: 576px) {
      .comment-form-button {
        font-size: var(--extrasmallFontSize) !important;
      }
    }
    @media only screen and (max-width: 450px) {
      .comment-form-textarea {
        margin: 0 !important;
      }
      .comment-form-button {
        margin-top: 1rem !important;
      }
      .comment-form-cancel-button {
        margin-left: 0 !important;
      }
    }
  }
`;
