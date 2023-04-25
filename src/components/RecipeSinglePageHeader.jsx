import { Col, Modal, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCustomContext } from "../context/customContext";
import CustomButton from "../utilities/CustomButton";
import { GetSlug, GetCapitalize } from "../utilities/StringSlugConverter";
import { HiOutlineHeart, HiPrinter, HiCode, HiHeart } from "react-icons/hi";
import { useRef, useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import EmbedCard from "../utilities/EmbedCard";
import { dataApi } from "../context/constants";

const RecipeSinglePageHeader = () => {
  const { singleRecipe, titleRecipeString, handlePrintRecipe, setTitlePage, isAuthenticated, setUser, user, data } =
    useCustomContext();
  const [buttonTxt, setButtonTxt] = useState("Add to Favorite");
  const [embedShow, setEmbedShow] = useState(false);
  const [like, setLike] = useState(false);
  const [heartIcon, setHeartIcon] = useState(<HiOutlineHeart size={20} className="ms-2" />);
  const [copyBtn, setCopyBtn] = useState("Copy");
  const textareaRef = useRef();
  const likedRecipe = user.favoriteRecipes ? user.favoriteRecipes.filter((item)=> item.title === singleRecipe.title) : [];

  useEffect(()=> {
    setTitlePage((GetCapitalize(singleRecipe.title)) + " - Chef's Recipes");
  })

  const html = ReactDOMServer.renderToStaticMarkup(
    <EmbedCard singleRecipe={singleRecipe} />
  );

  const handleCopyBtn = async (e) => {
    try {
      await navigator.clipboard.writeText(html.toString());
      textareaRef.current.select();
      setCopyBtn("Copied !");
      setTimeout(() => {
        setCopyBtn("Copy");
      }, 3000);
    } catch (err) {
      setTimeout(() => {
        setCopyBtn("Copy");
      }, 3000);
    }
  };

  const handleAddFavorite = async()=> {
    setLike(!like)
    const userData = data.users.filter((u)=> u.email === user.email);
    let changeduserData= {};

    if(isAuthenticated) {
      setHeartIcon(!like ? <HiHeart size={20} className="ms-2" /> : <HiOutlineHeart size={20} className="ms-2" />)
      setButtonTxt(!like ? "Added!" : "Add to Favorite")
      await setUser((user)=> {
        if(user.favoriteRecipes) {
          if(likedRecipe.length === 0) {
            changeduserData = {...userData[0], favoriteRecipes: [...user.favoriteRecipes, singleRecipe]};
            return {...user, favoriteRecipes: [...user.favoriteRecipes, singleRecipe]}
          } else {
            changeduserData = {...userData[0], favoriteRecipes: [...user.favoriteRecipes.filter((item)=> item.title !== singleRecipe.title)]};
            return {...user, favoriteRecipes: [...user.favoriteRecipes.filter((item)=> item.title !== singleRecipe.title)]}
          }
        } else {
          changeduserData = {...userData[0], favoriteRecipes: [singleRecipe]}
          return {...user, favoriteRecipes: [singleRecipe]}
        }
      })

      console.log(changeduserData)
      await fetch(`${dataApi}/users/${userData[0].id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(changeduserData),
      }).then((res) => {
        if (res.ok === true) {
          console.log(changeduserData)
        }
      });

    } else {
      setHeartIcon("")
      setButtonTxt("Must be logged in!")
    }
  }
  
  useEffect(()=> {
    if(isAuthenticated && likedRecipe.length !== 0) {
      setHeartIcon(<HiHeart size={20} className="ms-2" />)
      setButtonTxt("Added!")
    } else {
      setHeartIcon(<HiOutlineHeart size={20} className="ms-2" />)
      setButtonTxt("Add to Favorite")
    }
  }, [isAuthenticated])

  return (
    <Wrapper>
      <header className="recipe-single-page__header">
        <div
          className="header__img"
          style={{ backgroundImage: `url(${singleRecipe.image})` }}
        ></div>
        <div className="header__cover"></div>
        <div className="header__box">
          <Col className="mx-auto">
            <h1 className="header__title">{singleRecipe.title}</h1>
            <div className="d-flex flex-column align-items-center flex-sm-row justify-content-center">
              <CustomButton
                className="header__btns embed__btn"
                classNameParent="header__btns--parent"
                textBtn="Embed"
                icon={<HiCode size={20} className="ms-2" />}
                onClick={() => setEmbedShow(true)}
              />
              <CustomButton
                className="header__btns favorite__btn"
                classNameParent="header__btns--parent"
                textBtn={buttonTxt}
                onClick={handleAddFavorite}
                icon={heartIcon}
              />
              <CustomButton
                className="header__btns print__btn"
                classNameParent="header__btns--parent"
                textBtn={"print"}
                icon={<HiPrinter size={20} className="ms-2" />}
                onClick={() => handlePrintRecipe(GetSlug(titleRecipeString))}
              />
            </div>
          </Col>
        </div>
      </header>

      {/********** Embed Modal **********/}
      <Modal
        className="modal-embed"
        fullscreen={false}
        show={embedShow}
        onHide={() => setEmbedShow(false)}
        animation={true}
      >
        <Modal.Header
          className="modal-embed__header"
          closeButton
        ></Modal.Header>
        <Modal.Body className="modal-embed__body">
          <Card className="modal-embed__body--cart">
            <div className="modal-embed__body--cart--left">
              <Link
                reloadDocument
                to={`/recipes/${GetSlug(singleRecipe.title.toLowerCase())}`}
              >
                <Card.Img
                  className="modal-embed__body--cart--img"
                  src={singleRecipe.image}
                  alt={singleRecipe.title}
                />
              </Link>
            </div>
            <Card.Body className="modal-embed__body--cart--body">
              <Link
                reloadDocument
                to={`/recipes/${GetSlug(singleRecipe.title.toLowerCase())}`}
              >
                <Card.Title className="modal-embed__body--cart--title">
                  {singleRecipe.title.length > 25
                    ? singleRecipe.title.slice(0, 25) + "..."
                    : singleRecipe.title}
                </Card.Title>
              </Link>
              <Card.Text className="modal-embed__body--cart--badges">
                <span className="d-flex align-items-center modal-embed__body--cart--badge">
                  {singleRecipe.readyInMinutes} min
                </span>
                {singleRecipe.analyzedInstructions.length > 0 ? (
                  <span className="d-flex align-items-center modal-embed__body--cart--badge">
                    {singleRecipe.analyzedInstructions[0].steps.length} steps
                  </span>
                ) : null}
              </Card.Text>
              <Card.Text className="modal-embed__body--cart--text">
                Powered by:{" "}
                <Link
                  to={`/authors/${GetSlug(
                    singleRecipe.sourceName.toLowerCase()
                  )}`}
                  className="modal-embed__body--cart--text-inner"
                >
                  {singleRecipe.sourceName}
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
          <textarea
            ref={textareaRef}
            rows={6}
            className="modal-embed__body--textarea"
          >
            {html.toString()}
          </textarea>
          <CustomButton
            classNameParent="mx-0 my-2 justify-content-center"
            className="modal-embed__body--textarea--copy-btn"
            textBtn={copyBtn}
            onClick={handleCopyBtn}
          />
        </Modal.Body>
        <Modal.Footer className="modal-embed__footer">
          <CustomButton
            className="modal-embed__footer--btn"
            textBtn={"Close"}
            onClick={() => setEmbedShow(false)}
          />
        </Modal.Footer>
      </Modal>
    </Wrapper>
  );
};

export default RecipeSinglePageHeader;

const Wrapper = styled.section`
  .recipe-single-page__header {
    height: 70vh;
    width: 100%;
    position: relative !important;
    .header__img,
    .header__cover {
      height: 100%;
      width: 100%;
      position: fixed;
      top: 0;
      z-index: -1;
    }
    .header__img {
      background-position: bottom;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .header__cover {
      background-color: var(--black);
      opacity: 0.65;
    }
    .header__box {
      width: 70%;
      text-align: center;
      position: absolute;
      top: 15vh;
      left: 15%;
    }
    .header__title {
      font-weight: 800;
      width: 90%;
      color: var(--light);
      margin: 1rem auto 2rem;
    }
    .header__btns {
      height: 2.8rem !important;
      width: max-content;
      z-index: 1;
    }
    .header__btns::before {
      width: max-content;
    }
    .embed__btn,
    .print__btn {
      background-color: var(--light);
      color: var(--orange) !important;
    }
    .embed__btn:hover,
    .print__btn:hover {
      color: var(--light) !important;
      border-color: var(--orange) !important;
      background-color: var(--orange);
      opacity: 1 !important;
    }
    .favorite__btn {
      color: var(--light);
      background-color: var(--orange);
      border-color: var(--orange);
    }
    .favorite__btn:hover {
      color: var(--orange) !important;
      border-color: var(--light) !important;
      background-color: var(--light) !important;
      opacity: 1 !important;
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .header__box {
        top: 25vh;
      }
      .header__title {
        font-size: calc(var(--headingFontSize) + 0.8rem) !important;
      }
      .header__btns {
        margin: 0 1rem !important;
      }
    }
    @media only screen and (max-width: 768px) {
      .header__title {
        font-size: calc(var(--headingFontSize) + 0.5rem) !important;
      }
      .header__txt {
        font-size: var(--smallFontSize);
      }
    }
    @media only screen and (max-width: 576px) {
      .header__box {
        width: 90%;
        left: 5%;
      }
      .header__title {
        font-size: var(--headingFontSize) !important;
      }
      .header__btns--parent {
        margin: 0.5rem 0 !important;
      }
    }
    @media only screen and (max-width: 450px) {
      .header__title {
        font-size: calc(var(--bodyFontSize) + 0.2rem) !important;
      }
    }
  }
`;
