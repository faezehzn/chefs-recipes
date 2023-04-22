import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import allIngredients from "../assets/data/AllIngredients";
import CustomButton from "../utilities/CustomButton";
import axios from "axios";
import { GetCapitalize, GetSlug } from "../utilities/StringSlugConverter";
import { useCustomContext } from "../context/customContext";
import { Checkbox, Select } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import History from "./History";
import { dataApi, LOCAL_URL } from "../context/constants";


const CreateRecipeMain = () => {
  const { user, recipeId, handleRelatedRecipes, setRelatedData } =
    useCustomContext();
  const [highlight, setHighlight] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [disable, setDisable] = useState(false);
  const [amount, setAmount] = useState(1);
  const [status, setStatus] = useState({});
  const refAlert = useRef(null);
  const textAreaRef = useRef(null);
  const [availableUnits, setAvailableUnits] = useState(["g"]);
  const [unit, setUnit] = useState(availableUnits[0]);
  const [finalNewRecipe, setFinalNewRecipe] = useState({});
  const amountValueRef = useRef(null);
  const typesRecipe = [
    {
      type: "cuisines",
      options: [
        "African",
        "American",
        "British",
        "Cajun",
        "Caribbean",
        "Chinese",
        "Eastern European",
        "European",
        "French",
        "German",
        "Greek",
        "Indian",
        "Irish",
        "Italian",
        "Japanese",
        "Jewish",
        "Korean",
        "Latin American",
        "Mediterranean",
        "Mexican",
        "Middle Eastern",
        "Nordic",
        "Southern",
        "Spanish",
        "Thai",
        "Vietnamese",
      ],
    },
    {
      type: "dishTypes",
      options: [
        "main course",
        "side dish",
        "dessert",
        "appetizer",
        "salad",
        "bread",
        "breakfast",
        "soup",
        "beverage",
        "sauce",
        "marinade",
        "fingerfood",
        "snack",
        "drink",
      ],
    },
    {
      type: "diets",
      options: [
        "gluten free",
        "ketogenic",
        "vegetarian",
        "lacto-vegetarian",
        "ovo-vegetarian",
        "vegan",
        "pescetarian",
        "paleo",
        "primal",
        "low FODMAP",
        "whole30",
        "omnivore (average diet)",
        "clean eating",
        "mediterranean ",
        "weight watchers",
        "grain free",
        "GAPS",
        "fruitarian",
      ],
    },
  ];
  const [newRecipe, setNewRecipe] = useState({
    id: recipeId,
    title: "",
    ingredients: [],
    image: null,
    imageType: "",
    readyInMinutes: "15",
    servings: "1",
    sourceName: user.username,
    cuisines: [],
    instructions: "",
    sourceUrl: "",
    summary: "",
    dishTypes: [],
    diets: [],
    pricePerServing: 0,
    chefsRecipeSourceUrl: "",
  });

  const {
    title,
    ingredients,
    servings,
    image,
    imageType,
    readyInMinutes,
    instructions,
    sourceName,
    cuisines,
    id,
    dishTypes,
    diets,
    sourceUrl,
  } = newRecipe;

  const catInputRefCallback = useCallback((element) => {
    element.firstChild.children[1].children[0].children[0].setAttribute(
      "placeholder",
      ""
    );
    element.firstChild.children[1].children[0].classList.remove(
      "border-primary"
    );
    element.firstChild.firstChild.setAttribute("id", "recipe-ingredients");
  }, []);
  const allIngredientsOptions = allIngredients.map((value) => {
    if (value.name === allIngredients[0].name) {
      return {
        labelKey: "optionItem1",
        value: value.name,
        className: "recipe-form__option",
        isSelected: true,
      };
    } else {
      return {
        labelKey: "optionItem1",
        value: value.name,
        className: "recipe-form__option",
      };
    }
  });

  const availableUnitsOptions = availableUnits.map((value) => {
    if (value === availableUnits[0]) {
      return {
        labelKey: "optionItem1",
        value: value,
        className: "recipe-form__option",
        isSelected: true,
      };
    } else {
      return {
        labelKey: "optionItem1",
        value: value,
        className: "recipe-form__option",
      };
    }
  });
  const handleOnChangeValue = (e) => {
    if(e.target.name === "title") {
      setNewRecipe({ ...newRecipe, [e.target.name]: GetCapitalize(e.target.value) });
    } else {
      setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
    }
  };

  // handle one img for food
  const handleOnChangeImg = (e) => {
    const fileImg = e.target.files[0];
    handleFile(fileImg);
  };
  const handleFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      const imgObj = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result,
      };
      if (imgObj.type.includes("image")) {
        setNewRecipe({
          ...newRecipe,
          image: imgObj.src,
          imageType: imgObj.type,
        });
      } else {
        setStatus({
          succes: false,
          message: "Please enter the correct file",
        });
      }
    });
  };
  const handleDeleteImg = (e) => {
    setNewRecipe({ ...newRecipe, image: null });
  };
  const handleHighlight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  };
  const handleUnHighlight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };
  const handleDropFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = e.dataTransfer;
    const file = data.files[0];
    setHighlight(false);
    handleFile(file);
  };

  // handle selected option
  const handleSelectedInput = (e) => {
    if (e.target.ariaExpanded !== null) {
      if (e.target.ariaExpanded === "false") {
        e.target.offsetParent.parentElement.style.borderBottomLeftRadius = "0";
        e.target.offsetParent.parentElement.style.borderBottomRightRadius = "0";
        e.target.offsetParent.parentElement.style.borderTopRightRadius =
          "calc(var(--borderRadius) + 1.5rem)";
        e.target.offsetParent.parentElement.style.borderTopRightRadius =
          "calc(var(--borderRadius) + 1.5rem)";
        e.target.offsetParent.parentElement.style.borderBottom = "none";
      } else if (e.target.ariaExpanded === "true") {
        e.target.offsetParent.parentElement.style.borderBottomLeftRadius =
          "calc(var(--borderRadius) + 1.5rem)";
        e.target.offsetParent.parentElement.style.borderBottomRightRadius =
          "calc(var(--borderRadius) + 1.5rem)";
        e.target.offsetParent.parentElement.style.borderBottom =
          "0.05rem solid var(--gray-opacity7)";
      }
    } else if (e.target.offsetParent.ariaExpanded === "false") {
      e.target.offsetParent.offsetParent.parentElement.style.borderBottomLeftRadius =
        "0";
      e.target.offsetParent.offsetParent.parentElement.style.borderBottomRightRadius =
        "0";
      e.target.offsetParent.offsetParent.parentElement.style.borderTopRightRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.offsetParent.offsetParent.parentElement.style.borderTopRightRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.offsetParent.offsetParent.parentElement.style.borderBottom =
        "none";
    } else if (e.target.offsetParent.ariaExpanded === "true") {
      e.target.offsetParent.offsetParent.parentElement.style.borderBottomLeftRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.offsetParent.offsetParent.parentElement.style.borderBottomRightRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.offsetParent.offsetParent.parentElement.style.borderBottom =
        "0.05rem solid var(--gray-opacity7)";
    } else {
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.borderBottomLeftRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.borderBottomRightRadius =
        "calc(var(--borderRadius) + 1.5rem)";
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.borderBottom =
        "0.05rem solid var(--gray-opacity7)";
    }
  };
  const handleCloseSelectedInput = (e) => {
    e.el.parentElement.style.borderBottomLeftRadius =
      "calc(var(--borderRadius) + 1.5rem)";
    e.el.parentElement.style.borderBottomRightRadius =
      "calc(var(--borderRadius) + 1.5rem)";
    e.el.parentElement.style.borderBottom =
      "0.05rem solid var(--gray-opacity7)";
  };
  const handleChangeSelectedInput = async (e) => {
    let ingredientFechData;
    const ingredientFromData = await allIngredients.filter(
      (item) => item.name === String(e.selectedValue)
    );
    await axios
      .get(
        `https://api.spoonacular.com/food/ingredients/${
          ingredientFromData[0].id
        }/information?${amount ? `amount=${Number(amount)}&` : ""}${
          unit ? `unit=${unit}&` : ""
        }apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        ingredientFechData = res.data;
      });
    setAvailableUnits(await ingredientFechData.possibleUnits);
  };

  // handle ingredients
  const handleAddIngredient = async (e) => {
    e.preventDefault();
    const selectedValue = document.querySelector("#recipe-ingredients")
      .firstChild.firstChild.firstChild.innerHTML;

    if (amountValueRef.current.value !== "") {
      if (
        newRecipe.ingredients.filter((item) => item === selectedValue)
          .length === 0
      ) {
        setNewRecipe({
          ...newRecipe,
          ingredients: [...ingredients, `${amount} ${unit} ${selectedValue}`],
        });
      }
    } else {
      setStatus({
        succes: false,
        message: "Please enter an amount of the ingredient",
      });
    }
  };
  const handleDeleteIngredient = (e, ingredient) => {
    e.preventDefault();
    setNewRecipe({
      ...newRecipe,
      ingredients: [...ingredients.filter((item) => item !== ingredient)],
    });
  };

  // handle types of food
  const handleSelectedTypesFood = (e, val) => {
    if (val === "dishTypes") {
      setNewRecipe({
        ...newRecipe,
        dishTypes: e.value,
      });
    } else if (val === "diets") {
      setNewRecipe({
        ...newRecipe,
        diets: e.value,
      });
    }
  };
  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
      setNewRecipe({
        ...newRecipe,
        cuisines: [...cuisines, e.target.offsetParent.children[2].innerHTML],
      });
    } else {
      setNewRecipe({
        ...newRecipe,
        cuisines: [
          ...cuisines.filter(
            (item) => item !== e.target.offsetParent.children[2].innerHTML
          ),
        ],
      });
    }
  };
  const handleOpenDropDown = (e) => {
    e.inst._anchor.offsetParent.children[2].style.transform = "rotate(180deg)";
  };
  const handleCloseDropDown = (e, inst) => {
    e.inst._scroller._focusElm.offsetParent.children[2].style.transform =
      "rotate(0)";
  };

  const handleSimilarRecipes = (title, extendedIngredients) => {
    let relatedDatas = [];
    let words = [];
    const titleWords = title.toLowerCase().split(" ");
    const ingredientSWords = extendedIngredients.map((item) => {
      const name =
        item.name !== null
          ? item.name.includes(" ")
            ? item.name.split(" ")
            : [item.name]
          : [];
      const nameClean =
        item.nameClean !== null
          ? item.nameClean.includes(" ")
            ? item.nameClean.split(" ")
            : [item.nameClean]
          : [];

      words = [...words, ...name, ...nameClean];
      return words;
    });
    words = [
      ...new Set(ingredientSWords[ingredientSWords.length - 1], ...titleWords),
    ];

    for (let i = 0; i < words.length; i++) {
      const x = handleRelatedRecipes(words[i]);
      relatedDatas = [...relatedDatas, ...x];
    }
    relatedDatas = [...new Set(relatedDatas)].filter(
      (item) => item.title.toLowerCase() !== title.toLowerCase()
    );
    setRelatedData(relatedDatas);
    return relatedDatas;
  };
  const handleSummaries = (
    title,
    readyInMinutes,
    pricePerServing,
    servings,
    dishTypes,
    diets,
    cuisines,
    calory,
    protein,
    fat,
    ingredients,
    sourceName,
    healthScore,
    similarRecipes,
    vitamins
  ) => {
    const summaryType1 = `The recipe ${title} can be made in around around <b>${readyInMinutes} minutes</b>. ${
      dishTypes.length !== 0
        ? `For <b>$${pricePerServing} per serving</b>, you get a ${dishTypes[0]} that serves ${servings}`
        : `This recipe serves ${servings} and costs $${pricePerServing} per serving.`
    }. One serving contains <b>${calory} calories</b>, <b>${protein}g of protein</b>, and <b>${fat}g of fat</b>. ${
      diets.length !== 0 &&
      `It is a good option if you're following a${diets.map((item, i) => {
        if (i !== diets.length - 1) {
          return ` <b>${item}</b>`;
        } else {
          return ` and <b>${item}</b>`;
        }
      })}. `
    }A mixture of${
      ingredients.length > 3
        ? ingredients.slice(0, 3).map((item) =>  ` ${item.name}`)
        : ingredients.map((item) => ` ${item.name}`)
    } and a handful of other ingredients are all it takes to make this recipe so scrumptious. ${Math.floor(
      Math.random() * (10 - 2) + 2
    )} people were glad they tried this recipe. It is brought to you by ${sourceName}. With a health <b>score of ${healthScore}%</b>${
      healthScore < 40
        ? `, this dish is not so awesome`
        : healthScore > 70
        ? `, which is spectacular`
        : `. This score is good`
    }. ${similarRecipes.length !== 0 && `If you like this recipe, take a look at these similar recipes:${
      similarRecipes.length > 3
        ? similarRecipes.slice(0, 3).map((item, i) => {
            if (i !== similarRecipes.slice(0, 3).length - 1) {
              return ` <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            } else {
              return ` and <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            }
          })
        : similarRecipes.map((item, i) => {
            if (i !== similarRecipes.length - 1) {
              return ` <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            } else {
              return ` and <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            }
          })
    }.`}`;
    const summaryType2 = `${
      dishTypes.length !== 0
        ? `${title} might be just the ${dishTypes[0]} you are searching for`
        : `${title} takes roughly <b>${readyInMinutes} minutes</b> from beginning to end`
    }. Watching your figure? This ${
      diets.length !== 0 &&
      diets.map((item) => ` ${item}`)
    } recipe has <b>${calory} calories</b>, <b>${protein}g of protein</b>, and <b>${fat}g of fat</b> per serving. This recipe serves ${servings}. For <b>$${pricePerServing} per serving</b>, this recipe covers ${vitamins}% of your daily requirements of vitamins and minerals. It is brought to you by ${sourceName}. ${
      cuisines.length !== 0 &&
      `It is a pricey recipe for fans of ${cuisines[0]} food. `
    }${
      dishTypes.length !== 0 &&
      `From preparation to the plate, this recipe takes around <b>${readyInMinutes} minutes. </b>`
    }If you have ${
      ingredients.length > 3
        ? ingredients.slice(0, 3).map((item) => ` ${item.name}`)
        : ingredients.map((item) => ` ${item.name}`)
    } and a few other ingredients on hand, you can make it.All things considered, we decided this recipe <b>deserves a health score of ${healthScore}%</b>${
      healthScore < 40
        ? `, this dish is not so awesome`
        : healthScore > 70
        ? `, which is spectacular`
        : `. This score is good`
    }. ${similarRecipes.length !== 0 && `Users who liked this recipe also liked${
      similarRecipes.length > 3
        ? similarRecipes.slice(0, 3).map((item, i) => {
            if (i !== similarRecipes.slice(0, 3).length - 1) {
              return ` <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            } else {
              return ` and <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            }
          })
        : similarRecipes.map((item, i) => {
            if (i !== similarRecipes.length - 1) {
              return ` <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            } else {
              return ` and <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            }
          })
    }.`}`;
    const summaryType3 = `If you have around <b>around ${readyInMinutes} minutes</b> to spend in the kitchen, ${title} might be a spectacular${
      diets.length !== 0 &&
      diets.map((item) => ` <b>${item}</b>`)
    } recipe to try. One serving contains <b>${calory} calories</b>, <b>${protein}g of protein</b>, and <b>${fat}g of fat</b>. This recipe serves ${servings} and costs $${pricePerServing} per serving. If you have${
      ingredients.length > 3
        ? ingredients.slice(0, 3).map((item) =>  ` ${item.name}`)
        : ingredients.map((item) => ` ${item.name}`)
    } and a few other ingredients on hand, you can make it. ${Math.floor(
      Math.random() * (10 - 2) + 2
    )} people were impressed by this recipe. It is brought to you by ${sourceName}. ${
      dishTypes.length !== 0 && `It works well as a ${dishTypes[0]}. `
    }Taking all factors into account, this recipe <b>earns a health score of ${healthScore}%</b>${
      healthScore < 40
        ? `, this dish is not so awesome`
        : healthScore > 70
        ? `, which is spectacular`
        : `. This score is good`
    }.${similarRecipes.length !== 0 && `${
      similarRecipes.length > 3
        ? similarRecipes.slice(0, 3).map((item, i) => {
            if (i !== similarRecipes.slice(0, 3).length - 1) {
              return ` <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            } else {
              return ` and <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            }
          })
        : similarRecipes.map((item, i) => {
            if (i !== similarRecipes.length - 1) {
              return ` <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            } else {
              return ` and <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            }
          })
    } are very similar to this recipe.`}`;
    const summaryType4 = `${
      dishTypes.length !== 0
        ? `${title} might be just the ${dishTypes[0]} you are searching for`
        : `${title} takes roughly <b>${readyInMinutes} minutes</b> from beginning to end`
    }. One serving contains <b>${calory} calories</b>, <b>${protein}g of protein</b>, and <b>${fat}g of fat</b>. This pescatarian recipe serves ${servings} and costs $${pricePerServing} per serving. ${Math.floor(
      Math.random() * (10 - 2) + 2
    )} people have made this recipe and would make it again. From preparation to the plate, this recipe takes roughly <b>${readyInMinutes} minutes</b>. If you have${
      ingredients.length > 3
        ? ingredients.slice(0, 3).map((item) =>  ` ${item.name}`)
        : ingredients.map((item) => ` ${item.name}`)
    } and a few other ingredients on hand, you can make it. All things considered, we decided this recipe <b>deserves a health score of ${healthScore}%</b>${
      healthScore < 40
        ? `, this dish is not so awesome`
        : healthScore > 70
        ? `, which is spectacular`
        : `. This score is good`
    }. ${similarRecipes.length !== 0 && `If you like this recipe, take a look at these similar recipes:${
      similarRecipes.length > 3
        ? similarRecipes.slice(0, 3).map((item, i) => {
            if (i !== similarRecipes.slice(0, 3).length - 1) {
              return ` <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            } else {
              return ` and <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            }
          })
        : similarRecipes.map((item, i) => {
            if (i !== similarRecipes.length - 1) {
              return ` <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            } else {
              return ` and <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            }
          })
    } for similar recipes.`}`;
    const summaryType5 = `${title} takes roughly <b>${readyInMinutes} minutes</b> from beginning to end. This ${
      dishTypes.length !== 0 ? `${dishTypes[0]}` : `recipe`
    } has <b>${calory} calories</b>, <b>${protein}g of protein</b>, and <b>${fat}g of fat</b> per serving. This recipe serves ${servings} and costs <b>$${pricePerServing} per serving</b>. ${Math.floor(
      Math.random() * (10 - 2) + 2
    )} people were impressed by this recipe. This recipe from ${sourceName} requires${
      ingredients.length > 3
        ? ingredients.slice(0, 3).map((item) => ` ${item.name}`)
        : ingredients.map((item, i) => ` ${item.name}`)
    }. ${
      diets.length !== 0 &&
      `It is a good option if you're following a ${diets.map((item, i) => {
        if (i !== diets.length - 1) {
          return ` ${item}`;
        } else {
          return ` and ${item}`;
        }
      })} diet. `
    }${
      cuisines.length !== 0 &&
      `It is a pretty expensive recipe for fans of ${cuisines[0]} food. `
    }Taking all factors into account, this recipe <b>earns a health score of ${healthScore}%</b>${
      healthScore < 40
        ? `, this dish is not so awesome`
        : healthScore > 70
        ? `, which is spectacular`
        : `. This score is good`
    }.${similarRecipes.length !== 0 && `${
      similarRecipes.length > 3
        ? similarRecipes.slice(0, 3).map((item, i) => {
            if (i !== similarRecipes.slice(0, 3).length - 1) {
              return ` <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            } else {
              return ` and <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            }
          })
        : similarRecipes.map((item, i) => {
            if (i !== similarRecipes.length - 1) {
              return ` <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            } else {
              return ` and <a target="_blank" href=${`${LOCAL_URL}/recipes/${GetSlug(item.title.toLowerCase())}`}>${item.title}</a>`;
            }
          })
    } are very similar to this recipe.`}`;
    const summaryTypesArr = [
      summaryType1,
      summaryType2,
      summaryType3,
      summaryType4,
      summaryType5,
    ];
    const summaryRandom =
      summaryTypesArr[Math.floor(Math.random() * summaryTypesArr.length)];
    return summaryRandom;
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (title !== "") {
      if (ingredients.length !== 0) {
        if (instructions !== "" || sourceUrl !== "") {
          if (readyInMinutes !== "") {
            if (servings !== "") {
              if (image !== null) {
                const fetchParams = {
                  title,
                  instructions,
                  servings,
                  ingredients,
                };
                await axios
                  .post(
                    `https://api.spoonacular.com/recipes/analyze?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=true`,
                    fetchParams,
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((res) => {
                    if (res.status === 200) {
                      setDisable(!disable)
                      setStatus({
                        succes: true,
                        message: "The information is complete. Please save"
                      })
                      setFinalNewRecipe({
                        ...res.data,
                        dishTypes: [...new Set([...dishTypes, ...res.data.dishTypes])],
                        diets: [...new Set([...diets, ...res.data.diets])],
                        cuisines: [...new Set([...cuisines, ...res.data.cuisines])],
                        image,
                        id,
                        readyInMinutes,
                        sourceName,
                        creditsText: sourceName,
                        imageType: imageType.slice(6),
                        chefsRecipeSourceUrl: `${LOCAL_URL}/recipes/${GetSlug(
                          title.toLowerCase()
                        )}`,
                        sourceUrl: sourceUrl.toLowerCase(),
                        summary: handleSummaries(
                          title,
                          readyInMinutes,
                          res.data.pricePerServing,
                          servings,
                          [...new Set([...dishTypes, ...res.data.dishTypes])],
                          [...new Set([...diets, ...res.data.diets])],
                          [...new Set([...cuisines, ...res.data.cuisines])],
                          Math.floor(
                            res.data.nutrition.nutrients.filter((item) => item.name === "Calories"
                            )[0].amount
                          ),
                          Math.floor(
                            res.data.nutrition.nutrients.filter((item) => item.name === "Protein"
                            )[0].amount
                          ),
                          Math.floor(
                            res.data.nutrition.nutrients.filter((item) => item.name === "Fat"
                            )[0].amount
                          ),
                          res.data.extendedIngredients,
                          sourceName,
                          res.data.healthScore,
                          handleSimilarRecipes(
                            title,
                            res.data.extendedIngredients
                          ),
                          Math.floor((
                            res.data.nutrition.nutrients
                              .filter((item) => (
                                  item.name !== "Calories" &&
                                  item.name !== "Protein" &&
                                  item.name !== "Fat"
                                
                              )).map((item)=> item.percentOfDailyNeeds)
                              .reduce(function (acc, corr) {
                                return acc + corr;
                              }, 0) )/
                              (res.data.nutrition.nutrients.length - 3)
                          )
                        ),
                      })
                    } else {
                      setStatus({
                        succes: false,
                        message:
                          "Something went wrong, please try again later.",
                      });
                    }
                  })
              } else {
                setStatus({
                  succes: false,
                  message: "Please enter the image of food",
                });
              }
            } else {
              setStatus({
                succes: false,
                message: "Please enter the serving",
              });
            }
          } else {
            setStatus({
              succes: false,
              message: "Please enter the ready time",
            });
          }
        } else {
          setStatus({
            succes: false,
            message: "Please enter the instruction",
          });
        }
      } else {
        setStatus({
          succes: false,
          message: "Please enter at least one ingredient",
        });
      }
    } else {
      setStatus({
        succes: false,
        message: "Please enter the title",
      });
    }
  };
  const handleSubmit = async(e)=> {
    e.preventDefault()
    e.stopPropagation()

    await axios.post(`${dataApi}/newRecipe`, finalNewRecipe, {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": "true",
      },
    }).then((res)=> {
      console.log(res)
      if (res.status === 201) {
        setStatus({ succes: true, message: "Your recipe added successfully" });
        History.push(`/recipes/${GetSlug(title.toLowerCase())}`)
      } else {
        setStatus({
          succes: false,
          message: "Something went wrong, please try again later.",
        })
      }
    })

  }

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  });

  return (
    <Wrapper>
      <Container fluid className="create-recipe__main">
        <Row className="justify-content-center">
          <Col lg={6}>
            <form className="recipe-form" method="POST">
              <div className="recipe-form__alert">
                {status.message && (
                  <Alert
                    ref={refAlert}
                    className={status.succes ? "alert-success" : "alert-danger"}
                  >
                    {status.message}
                  </Alert>
                )}
              </div>

              {/* title */}
              <label className="recipe-form__label" htmlFor="recipe-title">
                recipe title <span style={{ color: "var(--orange)" }}>*</span>
              </label>
              <Col md={12}>
                <input
                  type="text"
                  placeholder="Your Recipe Title"
                  className="recipe-form__input"
                  id="recipe-title"
                  value={GetCapitalize(title)}
                  name="title"
                  onChange={handleOnChangeValue}
                  required
                />
              </Col>

              {/* ingredients */}
              <fieldset>
                <legend className="mx-0 mx-sm-5 px-1 px-sm-2 fs-5 fw-bolder position-absolute w-75">
                  Ingredients
                </legend>
                <Col md={12}>
                  <Col md={12} className="mt-4">
                    {newRecipe.ingredients.length > 0 &&
                      newRecipe.ingredients.map((ingredient, index) => {
                        return (
                          <div
                            key={index}
                            className="recipe-form__category d-flex justify-content-between"
                            style={{ backgroundColor: "var(--light)" }}
                          >
                            <span style={{ color: "var(--dark)" }}>
                              {ingredient}
                            </span>
                            <CustomButton
                              textBtn="&times;"
                              className="recipe-form__close-btn"
                              classNameParent="justify-content-center m-0"
                              onClick={(e) =>
                                handleDeleteIngredient(e, ingredient)
                              }
                            />
                          </div>
                        );
                      })}
                  </Col>
                  <Col md={12}>
                    <label
                      className="recipe-form__label mt-3"
                      htmlFor="recipe-ingredients"
                    >
                      Ingredients{" "}
                      <span style={{ color: "var(--orange)" }}>*</span>
                    </label>
                    <Col
                      className="recipe-form__category"
                      ref={catInputRefCallback}
                    >
                      <BootstrapSelect
                        className="recipe-form__select"
                        options={allIngredientsOptions}
                        showSearch={true}
                        menuSize={4}
                        onClick={(e) => handleSelectedInput(e)}
                        onClose={(e) => handleCloseSelectedInput(e)}
                        onChange={(e) => handleChangeSelectedInput(e)}
                      />
                    </Col>
                  </Col>
                  <Col md={12} className="d-flex flex-column flex-md-row justify-content-between">
                    <Col md={6}>
                      <label
                        className="recipe-form__label mt-1"
                        htmlFor="recipe-indredient-amount"
                      >
                        Amount <span style={{ color: "var(--orange)" }}>*</span>
                      </label>
                      <input
                        type="number"
                        min={1}
                        ref={amountValueRef}
                        placeholder="Just amount"
                        className="recipe-form__input"
                        id="recipe-indredient-amount"
                        value={amount}
                        name="amount"
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </Col>
                    <Col md={5}>
                      <label
                        className="recipe-form__label mt-1"
                        htmlFor="recipe-indredient-unit"
                      >
                        Unit <span style={{ color: "var(--orange)" }}>*</span>
                      </label>
                      <div
                        className="recipe-form__category"
                        ref={catInputRefCallback}
                      >
                        <BootstrapSelect
                          className="recipe-form__select"
                          options={availableUnitsOptions}
                          showSearch={true}
                          menuSize={4}
                          onClick={(e) => handleSelectedInput(e)}
                          onClose={(e) => handleCloseSelectedInput(e)}
                          onChange={(e) => setUnit(e.selectedValue[0])}
                        />
                      </div>
                    </Col>
                  </Col>
                  <CustomButton
                    textBtn="Add ingredient"
                    className="recipe-form__btn"
                    classNameParent="justify-content-center m-0"
                    onClick={handleAddIngredient}
                  />
                </Col>
              </fieldset>

              {/* instructions */}
              <label
                className="recipe-form__label mt-3 me-3"
                htmlFor="recipe-instruction-step"
              >
                Instructions <span style={{ color: "var(--orange)" }}>* </span>
              </label>
              <i
                style={{
                  color: "var(--gray)",
                  fontSize: "var(--extrasmallFontSize)",
                }}
                className="d-block d-md-inline mb-2"
              >
                (Each step in a paragraph or enter the{" "}
                <span
                  onClick={() => setShowInput(true)}
                  style={{
                    color: "var(--orange)",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  link
                </span>{" "}
                of your recipe)
              </i>
              <Col md={12}>
                <textarea
                  type="text"
                  placeholder="Instruction: (E.g: Bake in preheated oven for 30 mins.)"
                  className="recipe-form__input"
                  style={{
                    borderRadius: "var(--borderRadius)",
                    overflow: "hidden",
                  }}
                  id="recipe-instruction-step"
                  row={3}
                  value={instructions}
                  onChange={handleOnChangeValue}
                  ref={textAreaRef}
                  name="instructions"
                  required
                />
              </Col>
              {showInput && (
                <Col>
                  <label
                    className="recipe-form__label mt-3"
                    htmlFor="recipe-link"
                  >
                    recipe link
                  </label>
                  <Col md={12}>
                    <input
                      type="text"
                      placeholder="Your Recipe Link"
                      className="recipe-form__input"
                      id="recipe-link"
                      value={sourceUrl.toLowerCase()}
                      name="sourceUrl"
                      onChange={handleOnChangeValue}
                      style={{ textTransform: "lowercase" }}
                    />
                  </Col>
                </Col>
              )}

              {/* ready in min  & servings */}
              <Col className="d-flex justify-content-between flex-column flex-md-row">
                <Col md={5}>
                  <label
                    className="recipe-form__label mt-3"
                    htmlFor="recipe-ready-in-min"
                  >
                    Ready in min{" "}
                    <span style={{ color: "var(--orange)" }}>*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    className="recipe-form__input"
                    id="recipe-ready-in-min"
                    value={readyInMinutes}
                    name="readyInMinutes"
                    onChange={handleOnChangeValue}
                    required
                  />
                </Col>
                <Col md={5}>
                  <label
                    className="recipe-form__label mt-3"
                    htmlFor="recipe-ready-in-min"
                  >
                    Servings <span style={{ color: "var(--orange)" }}>*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    className="recipe-form__input"
                    id="recipe-ready-in-min"
                    value={servings}
                    name="servings"
                    onChange={handleOnChangeValue}
                    required
                  />
                </Col>
              </Col>

              {/* dishTypes */}
              <label
                className="recipe-form__label mt-3"
                htmlFor="recipe-ready-in-min"
              >
                Meal Types
              </label>
              <Col className="recipe-form__category">
                <Select
                  style={{ color: "red" }}
                  data={typesRecipe[1].options}
                  selectMultiple={true}
                  placeholder="Click to select..."
                  animation="pop"
                  themeVariant="light"
                  filter={true}
                  onChange={(e) => handleSelectedTypesFood(e, "dishTypes")}
                  onOpen={handleOpenDropDown}
                  onClose={handleCloseDropDown}
                />
              </Col>

              {/* diets */}
              <label
                className="recipe-form__label mt-3"
                htmlFor="recipe-ready-in-min"
              >
                Diet Types
              </label>
              <Col className="recipe-form__category">
                <Select
                  style={{ color: "red" }}
                  data={typesRecipe[2].options}
                  selectMultiple={true}
                  placeholder="Click to select..."
                  animation="pop"
                  themeVariant="light"
                  filter={true}
                  onChange={(e) => handleSelectedTypesFood(e, "diets")}
                  onOpen={handleOpenDropDown}
                  onClose={handleCloseDropDown}
                />
              </Col>

              {/* cuisines */}
              <label
                className="recipe-form__label mt-3"
                htmlFor="recipe-ready-in-min"
              >
                Cuisine Types
              </label>
              <Col className="recipe-form__checkboxes">
                {typesRecipe[0].options.map((option, index) => {
                  return (
                    <Checkbox
                      key={index}
                      onChange={handleChangeCheckbox}
                      label={option}
                    />
                  );
                })}
              </Col>

              {/* image */}
              <label
                className="recipe-form__label mt-3 me-3"
                htmlFor="recipe-img"
              >
                Image <span style={{ color: "var(--orange)" }}>*</span>
              </label>
              <Col className="recipe-form__img">
                <div
                  className={
                    highlight
                      ? "recipe-form__drop-area highlight"
                      : "recipe-form__drop-area"
                  }
                  onDragEnter={handleHighlight}
                  onDragOver={handleHighlight}
                  onDragLeave={handleUnHighlight}
                  onDrop={handleDropFile}
                >
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    placeholder="Your image of food"
                    id="recipe-img"
                    onChange={handleOnChangeImg}
                  />
                  <label htmlFor="recipe-img">Drag & Drop</label>
                  {image && (
                    <div className="recipe-form__file-preview">
                      <div className="prev-img">
                        <span onClick={handleDeleteImg}>&times;</span>
                        <img src={image} alt={title} />
                      </div>
                    </div>
                  )}
                </div>
              </Col>

              {/* analyze & submit btn */}
              <Col className="d-block d-sm-flex mt-3">
                <CustomButton
                  textBtn="Analyze"
                  disabled={disable}
                  classNameParent="justify-content-center justify-content-sm-start"
                  onClick={handleAnalyze}
                  className="recipe-form__btn"
                />
                <CustomButton
                  textBtn="Save"
                  disabled={!disable}
                  classNameParent="justify-content-center justify-content-sm-start"
                  onClick={handleSubmit}
                  className="ms-sm-3 recipe-form__btn"
                />
              </Col>
            </form>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default CreateRecipeMain;

const Wrapper = styled.section`
  .create-recipe__main {
    background-color: var(--white);
    position: relative;
    z-index: 5;
    padding: 5rem 2rem;
    .recipe-form {
      .recipe-form__alert {
        position: fixed;
        top: 5%;
        width: 50%;
        left: 25%;
        z-index: 5;
        text-align: center;
        .alert {
          animation: moveDownToUp 1s ease-in;
          transition: var(--transition-fast);
        }
      }
      .recipe-form__label {
        color: var(--gray);
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      .recipe-form__input {
        width: 100%;
        background: var(--white);
        border-radius: calc(var(--borderRadius) + 1.5rem);
        border: 0.05rem solid var(--gray-opacity7);
        color: var(--dark);
        margin-bottom: 0.5rem;
        padding: 0.8rem 1.5rem;
        font-weight: 500;
        transition: var(--transition-fast);
        :focus {
          background: var(--white);
          border: 0.125rem solid var(--orange);
          outline: none;
        }
        ::placeholder {
          font-weight: 400;
          color: var(--gray-opacity7);
        }
        :focus::placeholder {
          opacity: 0.8;
        }
      }
      .recipe-form__category {
        background: var(--white);
        border-radius: calc(var(--borderRadius) + 1.5rem);
        border: 0.05rem solid var(--gray-opacity7);
        color: var(--dark);
        margin-bottom: 0.5rem;
        padding: 0.8rem 1.5rem;
        font-weight: 500;
        transition: var(--transition-fast);
        label {
          margin: 0;
          span {
            span {
              border: 0;
              padding: 0;
              min-height: 1.5rem !important;
              span {
                font-weight: 500;
                color: var(--gray);
                font-family: var(--bodyFont);
              }
            }
            span:nth-child(3) {
              transform: translateY(-0.2rem);
            }
          }
        }
        .recipe-form__select {
          font-family: var(--bodyFont);
          border: 0;
          color: var(--gray-opacity7) !important;
          border-radius: 0;
          background-color: transparent;
          &::-ms-expand {
            display: none;
          }
          &:-moz-focusring {
            color: transparent;
            text-shadow: none;
          }
          .recipe-form__option {
            font-family: var(--bodyFont);
            .dropdown-item {
              text-transform: capitalize !important;
            }
          }
        }
        .recipe-form__close-btn {
          width: 1.5rem !important;
          height: 1.5rem !important;
          padding: 0 !important;
          font-size: var(--headingFontSize) !important;
          border: none !important;
          font-weight: 400;
        }
        .btn {
          background-color: transparent;
          border: none;
          color: var(--gray);
          font-family: var(--bodyFont);
          padding: 0;
          box-shadow: none;
          margin: 0;
          vertical-align: baseline;
          :hover,
          :first-child:active {
            background-color: transparent;
            color: var(--gray);
          }
        }
        .btn[aria-expanded="true"]::after {
          content: "\f077";
        }
      }
      .recipe-form__checkboxes {
        label {
          display: inline-block;
          padding: 0.5rem 1rem 0.5rem 2rem !important;
          font-family: var(--bodyFont);
          span:nth-child(2) {
            border: 0.125rem solid var(--gray-opacity3);
            left: 0.5rem;
            border-radius: 0.2rem;
            width: 1.2rem;
            height: 1.2rem;
          }
          span:nth-child(2).mbsc-checked {
            color: var(--orange) !important;
            border-color: transparent !important;
            :after {
              border-color: var(--white) !important;
            }
          }
        }
      }
      .recipe-form__img {
        .recipe-form__drop-area {
          display: flex;
          position: relative;
          align-items: center;
          justify-content: center;
          border-radius: var(--borderRadius);
          border: 0.05rem dashed var(--gray-opacity7);
          height: 10rem;
          cursor: grab;
          label {
            cursor: grab;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            font-size: var(--headingFontSize);
            color: var(--gray-opacity3);
            text-transform: uppercase;
            font-weight: 400;
          }
          input {
            display: none;
          }
        }
        .recipe-form__drop-area.highlight {
          border-color: var(--orange);
          label {
            color: var(--orange);
          }
        }
        .recipe-form__file-preview {
          display: block;
          position: absolute;
          height: 7rem;
          width: 13rem;
          background-color: var(--white);
          .prev-img {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            border-radius: var(--borderRadius);
            overflow: hidden;
            width: 100%;
            height: 100%;
            span {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 2;
              cursor: pointer;
              color: var(--gray);
              font-size: var(--smallFontSize) !important;
              width: 1.2rem;
              height: 1.2rem;
              background-color: var(--light);
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              display: none;
            }
            img {
              object-fit: cover;
              width: 100%;
              height: 100%;
            }
            :hover {
              span {
                display: flex;
              }
              ::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background-color: var(--gray-opacity3);
              }
            }
          }
        }
      }
      .recipe-form__btn {
        border: none !important;
        margin: 0.5rem 0;
        color: var(--light) !important;
        background-color: var(--orange) !important;
        ::before {
          background-color: transparent !important;
        }
        :hover {
          background-color: transparent !important;
          box-shadow: var(--shadow) !important;
          color: var(--orange) !important;
        }
        :disabled {
          opacity: 0.4;
          cursor: default;
          :hover {
            background-color: var(--orange) !important;
            color: var(--light) !important;
          }
        }
      }
      fieldset {
        position: relative;
        width: 100%;
        border: 0.05rem solid var(--gray-opacity3);
        border-radius: var(--borderRadius);
        margin: 2.5rem auto 1rem;
        padding: 0.5rem 1rem;
        legend {
          top: -1rem;
          background-color: var(--white);
          color: var(--gray);
        }
      }
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
      color: var(--dark) !important;
    }
    .hk--custom--select .dropdown-menu {
      top: 2.3rem !important;
      left: -1.55rem;
      right: -1.55rem;
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
    .recipe-form__category .dropdown-menu {
      --bs-dropdown-zindex: 1000;
      --bs-dropdown-padding-x: 0;
      --bs-dropdown-padding-y: 0;
      --bs-dropdown-border-radius: 0;
      --bs-dropdown-font-size: var(--mdallFontSize);
      --bs-dropdown-color: var(--dark);
      --bs-dropdown-bg: var(--white);
      --bs-dropdown-link-color: var(--dark);
      --bs-dropdown-link-hover-color: var(--light);
      --bs-dropdown-link-hover-bg: var(--orange);
      --bs-dropdown-link-active-color: var(--light);
      --bs-dropdown-link-active-bg: var(--gray);
      --bs-dropdown-link-disabled-color: var(--dark);
      --bs-dropdown-item-padding-x: 0.5rem;
      --bs-dropdown-item-padding-y: 0.5rem;
      width: -webkit-fill-available;
      border: 0.05rem solid var(--gray-opacity7);
      border-top: none;
      border-radius: var(--bs-dropdown-border-radius) !important;
    }
    .recipe-form__category .form-control {
      font-size: var(--mdallFontSize);
      color: var(--dark);
      background-color: var(--white);
      border: 0.05rem solid var(--gray-opacity7);
      border-radius: calc(var(--borderRadius) - 0.5rem);
      :focus {
        border: 0.125rem solid var(--dark);
        box-shadow: none;
      }
    }
    .bs-searchbox,
    .recipe-form__category .form-control {
      padding: 5px;
    }
    .filter-option-inner-inner {
      text-transform: capitalize;
    }

    /************ Responsive Css ************/
    @media only screen and (max-width: 992px) {
      .recipe-form {
        .recipe-form__category {
          .recipe-form__close-btn {
            color: var(--black) !important;
            :hover {
              box-shadow: var(--shadow);
              color: var(--orange) !important;
              opacity: 1 !important;
            }
          }
        }
        .recipe-form__btn {
          :hover {
            opacity: 1 !important;
          }
          :disabled {
            :hover {
              opacity: 0.4 !important;
            }
          }
        }
      }
    }
    @media only screen and (max-width: 576px) {
      .dropdown-menu.inner {
        width: fit-content !important;
        border: none;
      }
    }
  }
`;
