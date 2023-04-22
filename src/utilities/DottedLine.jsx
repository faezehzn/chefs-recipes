import styled from "styled-components";

const DottedLine = () => {
  return (
    <Wrapper>
      <div className="dotted-line mb-2">
        <div className="dotted-line__animation"></div>
      </div>
    </Wrapper>
  );
};

export default DottedLine;

const Wrapper = styled.section`
  /* height: 0.125rem; */
  display: flex;
  .dotted-line {
    width: 100%;
    display: flex;
    justify-content: center !important;
    height: 0.125rem;
  }
  .dotted-line__animation {
    width: 0.2rem;
    height: 0.2rem;
    opacity: 0;
    background-color: var(--light);
    text-align: center;
    position: absolute;
    border-radius: 50%;
    transition: var(--transition-fast);
  }
  .dotted-line__animation::after,
  .dotted-line__animation::before {
    content: "";
    width: 0.2rem;
    height: 0.2rem;
    left: 0;
    background-color: var(--light);
    text-align: center;
    position: absolute;
    transition: var(--transition-fast);
    border-radius: 50%;
  }

  /************ Responsive Css ************/
  @media only screen and (max-width: 768px) {
    .dotted-line {
      display: none;
    }
  }
`;
