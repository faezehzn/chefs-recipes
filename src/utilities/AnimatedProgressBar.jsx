import styled from "styled-components";

const AnimatedProgressBar = ({ percent, label, color1, color2, className }) => {
  
  const styles = {
    progressSetting : {
      backgroundImage: `-webkit-linear-gradient(
        135deg,
        transparent 25%,
        rgba(0, 0, 0, 0.15) 25%,
        rgba(0, 0, 0, 0.15) 30%,
        transparent 30%,
        rgba(0, 0, 0, 0.15) 35%,
        rgba(0, 0, 0, 0.15) 70%,
        transparent 70%
      ),
      -webkit-linear-gradient(top, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.2)),
      -webkit-linear-gradient(left, ${color1} 15%, ${color2} 90%)`,
      width: `${percent}%`
    }
  }

  return (
    <Wrapper>
      <p
        style={{ width: `${percent}` < 55 ? '60%':`${percent}%` }}
        className={className + " progress-label"}
        data-value={`${percent}`}
      >
        {label}
      </p>
      <div className="mb-4 line stripesLoader">
        <div
          className="stripesLoader__value"
          style={styles.progressSetting}
        ></div>
      </div>
    </Wrapper>
  );
};

export default AnimatedProgressBar;

const Wrapper = styled.section`
  .progress-label[data-value] {
    position: relative;
  }
  .progress-label[data-value]:after {
    content: attr(data-value) "%";
    position: absolute;
    right: 0;
    width: 2.2rem;
  }
  .line {
    width: 100%;
  }
  .stripesLoader {
    height: 0.5rem;
    position: relative;
    background-color: var(--light);
    border-radius: var(--borderRadius);
    box-shadow: inset var(--shadow);
    background-size: 200% !important;
    transition: var(--transition-fast);
  }
  .stripesLoader__value {
    position: absolute;
    /* width: 50%; */
    appearance: none;
    border: none;
    height: 100%;
    border-radius: var(--borderRadius);
    animation: shift 2s linear infinite;
    -webkit-animation: shift 2s linear infinite;
    box-shadow: var(--shadow) inset, var(--shadow) inset;
    /* background-image: -webkit-linear-gradient(
        135deg,
        transparent 23%,
        rgba(0, 0, 0, 0.15) 23%,
        rgba(0, 0, 0, 0.15) 30%,
        transparent 30%,
        rgba(0, 0, 0, 0.15) 35%,
        rgba(0, 0, 0, 0.15) 70%,
        transparent 70%
      ),
      -webkit-linear-gradient(top, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.2)),
      -webkit-linear-gradient(left, #09c 15%, #f44 90%) !important; */
    background-size: 2rem 1rem, 100% 100%, 100% 100%;
    transition: var(--transition-fast);
  }

  @keyframes shift {
    to {
      background-position: 2rem 0rem, 100% 0%, 100% 0%;
    }
  }
`;
