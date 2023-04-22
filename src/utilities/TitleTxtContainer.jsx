import styled from "styled-components";

const TitleTxtContainer = ({ title, text, className }) => {
  return (
    <Wrapper>
      <div className={className}>
        <h3 className="title__container">{title}</h3>
        <p className="text__container">{text}</p>
      </div>
    </Wrapper>
  );
};

export default TitleTxtContainer;

const Wrapper = styled.section`
  .title__container {
    font-family: var(--headingFontBlack);
    letter-spacing: normal;
    text-align: center;
  }
  .text__container {
    text-align: center;
    color: var(--gray);
    width: 70%;
    margin: 0 auto;
    font-weight: 300;
  }

  /************ Responsive Css ************/
  @media only screen and (max-width: 992px) {
    .text__container {
      width: 80%;
    }
  }
  @media only screen and (max-width: 768px) {
    .text__container {
      width: 95%;
    }
  }
`;
