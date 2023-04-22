import { Container, Row, Col } from "react-bootstrap";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Counter = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 500) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Wrapper>
      <Container fluid>
        <Row className="counter-box">
          <Col md={4}>
            {scrolled ? (
              <div className="single_counter text-center">
                <CountUp
                  className="counter__num"
                  separator=","
                  end={1200}
                  suffix=" +"
                />
                <p className="counter__txt">Unique Recipes on Chef's Recipes</p>
              </div>
            ) : (
              <div className="single_counter text-center">
                <span className="counter__num">1,200 +</span>
                <p className="counter__txt">Unique Recipes on Chef's Recipes</p>
              </div>
            )}
          </Col>
          <Col md={4}>
            {scrolled ? (
              <div className="single_counter text-center">
                <CountUp
                  onScroll={onscroll}
                  className="counter__num"
                  end={230}
                />
                <p className="counter__txt">Members in the Community</p>
              </div>
            ) : (
              <div className="single_counter text-center">
                <span className="counter__num">230</span>
                <p className="counter__txt">Members in the Community</p>
              </div>
            )}
          </Col>
          <Col md={4}>
            {scrolled ? (
              <div className="single_counter text-center">
                <CountUp
                  onScroll={onscroll}
                  className="counter__num"
                  end={95}
                  suffix=" %"
                />
                <p className="counter__txt">Happy Followers & Costumers</p>
              </div>
            ) : (
              <div className="single_counter text-center">
                <span className="counter__num">95 %</span>
                <p className="counter__txt">Happy Followers & Costumers</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Counter;

const Wrapper = styled.section`
  .counter-box {
    text-align: center;
    background: transparent;
    padding: 1rem 0;
  }
  .single-counter {
    font-size: var(--bodyFontSize);
    font-weight: 700;
    padding: 0.5rem;
  }
  .counter__num {
    color: var(--orange);
    font-size: calc(var(--headingFontSize) + 0.5rem);
    font-weight: 700;
  }
  .counter__txt {
    color: var(--light);
    font-weight: 300;
    font-size: var(--smallFontSize);
  }

  /************ Responsive Css ************/
  @media only screen and (max-width: 768px) {
    .counter-box {
      backdrop-filter: blur(2rem);
      width: 50%;
      margin: 0 auto;
      padding: 0;
    }
  }
  @media only screen and (max-width: 576px) {
    .counter-box {
      width: 70%;
    }
    .counter__num {
      font-size: calc(var(--headingFontSize));
    }
  }
  @media only screen and (max-width: 576px) {
    .counter-box {
      width: 80%;
    }
    .counter__txt {
      font-size: var(--extrasmallFontSize);
    }
  }
`;
