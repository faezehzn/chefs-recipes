import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import { Link } from "react-router-dom";
import { GetSlug } from "../utilities/StringSlugConverter";

const RecipesAZMain = () => {
  const { allRecipesData } = useCustomContext();
  const recipesDataTitlesArray = [...allRecipesData.map((data) => data.title)];
  const alphabets = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const neededAlphabets = alphabets.filter((item) => {
    if (
      recipesDataTitlesArray.find((title) =>
        title.toLowerCase().startsWith(item)
      )
    ) {
      return item;
    }
  });

  return (
    <Wrapper>
      <Container fluid className="recipes-az__main">
        <Row className="align-items-center justify-content-center">
          <Col sm={10} md={6} xl={5} className="">
            {neededAlphabets.map((item, index) => {
              return (
                <div className="mb-5">
                  <h2 className="recipes-az__main--alphabet" key={index}>
                    {item.toUpperCase()}
                  </h2>
                  {allRecipesData
                    .filter((data) => {
                      return data.title.startsWith(item.toUpperCase());
                    })
                    .map((data, index) => {
                      return (
                        <Link reloadDocument to={`/recipes/${GetSlug(data.title.toLowerCase())}`} key={index}>
                          <p className="recipes-az__main--recipes-title">
                            {data.title}
                          </p>
                        </Link>
                      );
                    })}
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default RecipesAZMain;

const Wrapper = styled.section`
  .recipes-az__main {
    display: block;
    position: relative;
    z-index: 5;
    background-color: var(--white) !important;
    height: fit-content;
    padding: 5rem 2rem;
    .recipes-az__main--alphabet {
      font-weight: 800;
      color: var(--gray);
    }
    .recipes-az__main--recipes-title {
      background-color: var(--orange);
      padding: 0.8rem 1rem;
      border-radius: var(--borderRadius);
      color: var(--light);
      font-size: calc(var(--bodyFontSize) + 0.1rem);
    }
  }
`;
