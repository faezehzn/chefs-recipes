import styled from "styled-components";

const Progressbar = ({label, percent}) => {
  return (
    <Wrapper>
      <p style={{ width: `${percent}%` }} className='progress-label' data-value={`${percent}`}>
        {label}
      </p>
      <progress  max="100" value={`${percent}`} className='progress-body' />
    </Wrapper>
  );
};

export default Progressbar;

const Wrapper = styled.section`
  .progress-label[data-value] {
    position: relative;
  }
  .progress-label[data-value]:after {
    content: attr(data-value) "%";
    position: absolute;
    width: 2rem;
    right: 0
  }
  .progress-body[value] {
    appearance: none;
    border: none;
    width: 100%;
    height: 1rem;
    background-color: var(--light);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow) inset;
    position: relative;
    background-size: 2rem 1rem, 100% 100%, 100% 100%;
    margin: 0 0 1rem;
  }
  .progress-body[value]::-webkit-progress-bar {
    background-color: var(--light);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow) inset;
  }
  .progress-body[value]::-webkit-progress-value {
    position: relative;
    background-size: 2rem 1rem, 100% 100%, 100% 100%;
    border-radius: var(--bordeRadius);
    background-image: -webkit-linear-gradient(
        135deg,
        transparent,
        transparent 33%,
        rgba(0, 0, 0, 0.1) 33%,
        rgba(0, 0, 0, 0.1) 66%,
        transparent 66%
      ),
      -webkit-linear-gradient(top, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.2)),
      -webkit-linear-gradient(left, #09c, #f44);
  }
`;
