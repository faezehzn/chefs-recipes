import { createContext, useContext } from "react";
import randomDatas from "../assets/data/RandomRecipesData";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import History from "../components/History";
import {
  DynamicSort,
  GetSlug,
  GetString,
  GetTitleRecipe,
} from "../utilities/StringSlugConverter";
import cakeRecipesData from "../assets/data/CakeRecipesData";
import healthiestRecipesData from "../assets/data/HealthiestRecipeData";
import datajson from "../assets/data/db.json";
import { Blogs, BlogCategory } from "../assets/data/BlogCategoryData";
import ProductsData from "../assets/data/ProductsData";
import useLocalStorage from "../utilities/useLocalStorage";
import { useMemo } from "react";
import axios from "axios";
import {
  MdOutlineSpaceDashboard,
  MdOutlineLogout,
  MdOutlineSettingsSuggest,
  MdOutlineEventNote,
  MdOutlineNoteAlt,
  MdOutlineFavoriteBorder,
  MdStarPurple500
} from "react-icons/md";
import videoRecipesDatas from "../assets/data/VideoRecipesData";
import { dataApi, LOCAL_URL } from "./constants";


export const customContext = createContext();

// const url = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${process.env.REACT_APP_API_KEY}`;

export function ContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage("authentication", false)
  const [user, setUser] = useLocalStorage("user", {})
  const data = datajson;
  const allRecipesData = [
    ...randomDatas,
    ...cakeRecipesData,
    ...healthiestRecipesData,
    ...data.newRecipe
  ];
  const videoRecipesData = videoRecipesDatas;
  const blogsData = Blogs;
  const blogCategoriesData = BlogCategory;
  const allProductsData = ProductsData;
  const allDatas = [
    ...[...blogsData.map((i)=> {return {...i, dataType: "blog"}})],
    ...[...allRecipesData.map((i)=> {return {...i, dataType: "recipe"}})],
    ...[...allProductsData.map((i)=> {return {...i, dataType: "product"}})]
  ]
  const [allData, setAllData] = useState(allDatas)
  const [randomData, setRandomData] = useState(allRecipesData);
  const [relatedData, setRelatedData] = useState(allRecipesData);
  const [titlePage, setTitlePage] = useState("Chef's Recipes");
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [printParams, setPrintParams] = useSearchParams({ print: "recipe" });
  const txtInputRef = useRef(null);
  const location = useLocation();
  const [searchTxt, setSearchTxt] = useState("all recipes");
  const [searchCat, setSearchCat] = useState("all meals");
  const [titleRecipeString, setTitleRecipeString] = useState(
    GetString(location.pathname.slice(9))
  );
  const [availableItems, setAvailableItems] = useState(
    allProductsData
      .sort(DynamicSort("-id"))
      .filter((item) => item.price !== 0.0)
  );
  const unAvailableItems = allProductsData
    .sort(DynamicSort("-id"))
    .filter((item) => item.price === 0.0);
  const [dataAvailable, setDataAvailable] = useState([
    ...availableItems,
    ...unAvailableItems,
  ]);
  const [valueSorting, setValueSorting] = useState(["Default sorting"]);
  const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);
  const [rememberMe, setRememberMe] = useLocalStorage("login-data", []);
  const [shipping, setShippnig] = useState(0.0);
  const cartItemsWithDetails = cartItems.map((cart)=> {return {...dataAvailable.find((i) => i.id === cart.id), quantity: cart.quantity}});
  const [activeLink, setActiveLink] = useLocalStorage(
    "active-account",
    "My Dashboard"
  );
  const [countryLocation, setCountryLocation] = useState({
    name: "Iran",
    isoCode: "IR",
  });
  const [stateLocation, setStateLocation] = useState({
    name: "Tehran",
    isoCode: "22",
    countryCode: "IR",
  });

  const arraySorting = useMemo(
    () => [
      "Default sorting",
      "Sort by price: low to high",
      "Sort by price: high to low",
      "Filter by discounts",
    ],
    []
  );

  const singleRecipe =
    allRecipesData.find(
      (item) =>
        decodeURI(GetString(item.title.toLowerCase())) ===
        decodeURI(GetTitleRecipe(titleRecipeString))
    ) || "";

  const singleBlog =
    blogsData.find(
      (item) =>
        decodeURI(GetString(item.title.toLowerCase())) ===
        decodeURI(GetTitleRecipe(GetString(location.pathname.slice(7))))
    ) || "";

  const singleProduct =
    dataAvailable.find(
      (item) =>
        encodeURIComponent(GetSlug(item.title.toLowerCase())) ===
        encodeURIComponent(GetTitleRecipe(location.pathname.slice(6)))
    ) || "";

  const accountOptions = [
    {
      id: 1,
      option: "My Dashboard",
      icon: <MdOutlineSpaceDashboard />,
      link: "dashboard-acc",
    },
    {
      id: 2,
      option: "My Recipes",
      icon: <MdOutlineNoteAlt />,
      link: "recipes-acc",
    },
    {
      id: 3,
      option: "My Reviews",
      icon: <MdStarPurple500 />,
      link: "reviews-acc",
    },
    {
      id: 4,
      option: "My Favorites",
      icon: <MdOutlineFavoriteBorder />,
      link: "favorites-acc",
    },
    {
      id: 5,
      option: "My Orders",
      icon: <MdOutlineEventNote />,
      link: "orders-acc",
    },
    {
      id: 6,
      option: "Account Settings",
      icon: <MdOutlineSettingsSuggest />,
      link: "settings-acc",
    },
    { id: 7, option: "Logout", icon: <MdOutlineLogout />, link: "" },
  ];

  const [blogsCommentsData, setblogsCommentsData] = useState(
    data.blogsComments.filter((item) => item.blogTitle === singleBlog.title)
  );
  const [productsCommentsData, setProductsCommentsData] = useState(
    data.productsComments.filter(
      (item) => item.productTitle === singleProduct.title
    )
  );
  const [recipesCommentsData, setRecipesCommentsData] = useState(
    data.recipesComments.filter(
      (item) => item.recipeTitle === singleRecipe.title
    )
  );
  const [orderData, setOrderData] = useState(data.checkout);

  let costPercentTotal = Math.ceil(
    recipesCommentsData
      .map((item) => (item.cost / 5) * 100)
      .reduce((sum, curr) => sum + Number(curr), 0) / recipesCommentsData.length
  );
  let difficultyPercentTotal = Math.ceil(
    recipesCommentsData
      .map((item) => (item.difficulty / 5) * 100)
      .reduce((sum, curr) => sum + Number(curr), 0) / recipesCommentsData.length
  );
  let timePercentTotal = Math.ceil(
    recipesCommentsData
      .map((item) => (item.time / 5) * 100)
      .reduce((sum, curr) => sum + Number(curr), 0) / recipesCommentsData.length
  );
  let healthyPercentTotal = Math.ceil(
    recipesCommentsData
      .map((item) => (item.healthy / 5) * 100)
      .reduce((sum, curr) => sum + Number(curr), 0) / recipesCommentsData.length
  );
  let totalRating = Math.ceil(
    ((costPercentTotal +
      difficultyPercentTotal +
      timePercentTotal +
      healthyPercentTotal) /
      4) *
      0.05
  );

  const MealType = [
    "all meals",
    ...new Set(
      randomData
        .map((item) => item.dishTypes.join(", "))
        .join(", ")
        .split(", ")
        .filter((x) => x !== "")
        .sort()
    ),
  ];
  const CuisineType = [
    "all cuisines",
    ...new Set(
      randomData
        .map((item) => item.cuisines.join(", "))
        .join(", ")
        .split(", ")
        .filter((x) => x !== "")
        .sort()
    ),
  ];
  const DietType = [
    "all diets",
    ...new Set(
      randomData
        .map((item) => item.diets.join(", "))
        .join(", ")
        .split(", ")
        .filter((x) => x !== "")
        .sort()
    ),
  ];
  const Ingredients = [
    "all ingredients",
    ...new Set(
      randomData
        .map((item) => item.extendedIngredients.map((i) => i.name).join(", "))
        .join(", ")
        .split(", ")
        .filter((x) => x !== "")
        .sort()
    ),
  ];

  const allCategories = [
    {
      id: 1,
      name: "Meal Types",
      items: MealType,
    },
    {
      id: 2,
      name: "Cuisine Types",
      items: CuisineType,
    },
    {
      id: 3,
      name: "Diet Types",
      items: DietType,
    },
    {
      id: 4,
      name: "Ingredients",
      items: Ingredients,
    },
  ];
  const allSubCategories = [
    ...MealType,
    ...CuisineType,
    ...DietType,
    ...Ingredients,
    "more",
  ];

  const [recipeId, setRecipeId] = useState(1)
  
  useEffect(()=> {
    axios.get(`${dataApi}/newRecipe`, {headers: {
      'Access-Control-Allow-Origin': "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": "true",
    }}).then((res) => {
      setRecipeId(res.data.length + 1)
    });
  })

  useEffect(() => {
    const changePriceProducts = availableItems.map((item) =>
      item.spoonacularScore !== 0 || item.spoonacularScore !== null
        ? { ...item, price: item.price * (1 - item.spoonacularScore / 100) }
        : { ...item }
    );
    if (valueSorting[0] === arraySorting[0]) {
      changePriceProducts.sort(DynamicSort("-id"));
      setDataAvailable([...changePriceProducts, ...unAvailableItems]);
    } else if (valueSorting[0] === arraySorting[1]) {
      changePriceProducts.sort(DynamicSort("-price"));
      setDataAvailable([...changePriceProducts, ...unAvailableItems]);
    } else if (valueSorting[0] === arraySorting[2]) {
      changePriceProducts.sort(DynamicSort("price"));
      setDataAvailable([...changePriceProducts, ...unAvailableItems]);
    } else if (valueSorting[0] === arraySorting[3]) {
      setAvailableItems(
        data.filter(
          (item) =>
            item.spoonacularScore !== 0.0 &&
            item.spoonacularScore !== null &&
            item.price !== 0.0
        )
      );
      changePriceProducts.sort(DynamicSort("spoonacularScore"));
      setDataAvailable([...changePriceProducts]);
    }
  }, [valueSorting, arraySorting]);

  useEffect(() => {
    if (
      GetString(location.pathname.slice(9)).endsWith("/") &&
      !location.search
    ) {
      setTitleRecipeString(
        GetString(location.pathname.slice(9)).replace("/", "")
      );
      History.push(`/recipes/${location.pathname.slice(9).replace("/", "")}`);
      // window.location.reload();
    } else {
      setTitleRecipeString(GetString(location.pathname.slice(9)));
    }
  }, [location]);

  useEffect(() => {
    document.title = titlePage;
  }, [titlePage]);

  useEffect(() => {
    setTimeout(()=> {
      setLoading(false);
    }, 1000)
  }, []);

  useEffect(() => {
    axios.get("https://api.ipify.org/?format=json").then((res)=> {
      let ip = res.data.ip
      return ip
    }).then((ip)=> {
      axios
      .get(
        `http://ip-api.com/json/${ip}`
      )
      .then((response) => {
        const countryLoc = response.data.country;
        const countryCodeLoc = response.data.countryCode;
        const stateLoc = response.data.regionName;
        const stateCodeLoc = Number(response.data.region);
        setCountryLocation({ name: countryLoc, isoCode: countryCodeLoc });
        setStateLocation({
          name: stateLoc,
          isoCode: String(stateCodeLoc - 1),
          countryCode: countryCodeLoc,
        })
      })
      .catch((error) => {
        console.log(error);
      });
    })
    
  }, []);

  const onChangeActiveLink = (value) => {
    setActiveLink(() => {
      return value;
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(() => {
      return false;
    });
    if (!window.location.pathname.slice(1).includes("my-account")) {
      History.push(`/my-account`);
      window.location.reload();
    }
    setUser(() => {
      return {};
    });
  };
  
  const handleGetItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const cartTotal = cartItems.reduce((total, cartItem) => {
    const item = dataAvailable.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0).toFixed(2) * cartItem.quantity;
  }, 0);

  useEffect(() => {
    if (cartTotal < 100.0) {
      setShippnig(cartTotal * 0.1);
    }
  }, [cartTotal]);

  const handleIncreaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const handleDecreaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  const handleClearCart = ()=> {
    setCartItems((currItems)=> {
      return currItems = []
    })
  }

  const handleSearchRecipe = (txt, cat) => {
    const newData = randomData
      .filter((item) => {
        const valueTitle = item.title.toLowerCase();
        const valueSummary = item.summary.toLowerCase();
        const valueInstructions = item.instructions.toLowerCase();
        const valueExtendedIngredients = item.extendedIngredients
          .map((i) => i.name.toLowerCase())
          .join(" ");
        const valueDiets = item.diets.map((i) => i.toLowerCase()).join(" ");
        const valueCuisines = item.cuisines
          .map((i) => i.toLowerCase())
          .join(" ");

        if (
          typeof (txt,
          valueTitle,
          valueSummary,
          valueInstructions,
          valueExtendedIngredients,
          valueDiets,
          valueCuisines) == "string" &&
          (txt === "" ||
            valueTitle.includes(txt) ||
            valueSummary.includes(txt) ||
            valueInstructions.includes(txt) ||
            valueExtendedIngredients.includes(txt) ||
            valueDiets.includes(txt) ||
            valueCuisines.includes(txt))
        ) {
          return item;
        }
        return null;
      })
      .filter((item) => {
        if (cat === "all meals") {
          return item.dishTypes.length > 0;
        }
        return item.dishTypes.find((i) => {
          return i.toLowerCase() === cat;
        });
      });
    setRandomData(newData);
  };

  const handleSearchTotal = (txt) => {
    txt = txt.replaceAll("_", " ").replaceAll("-", " ")
    const newData = allData
      .filter((item) => {
        const valueTitle = item.title.toLowerCase();
        const valueSummary = item.summary ? item.summary.toLowerCase(): "";

        const valueInstructions = item.instructions ? item.instructions.toLowerCase() : "";
        const valueExtendedIngredients = item.extendedIngredients ? item.extendedIngredients.map((i) => i.name.toLowerCase()).join(" ") : "";
        const valueDiets = item.diets ? item.diets.map((i) => i.toLowerCase()).join(" "): "";
        const valueCuisines = item.cuisines ? item.cuisines.map((i) => i.toLowerCase()).join(" ") : "";

        const valueIngredientList = item.ingredientList ? item.ingredientList.toLowerCase() : "";
        const valueDescription = item.description ? item.description.toLowerCase() : "";
        const valueTags = item.tags ? item.tags.map((i) => i.toLowerCase()).join(" "): "";
        const valueCategories = item.categories ? item.categories.map((i) => i.toLowerCase()).join(" "): "";
        const valueBadges = item.badges ? item.badges.map((i) => i.toLowerCase()).join(" "): "";
        const valueImportantBadges = item.importantBadges ? item.importantBadges.map((i) => i.toLowerCase()).join(" "): "";
        const valueBreadcrumbs = item.breadcrumbs ? item.breadcrumbs.map((i) => i.toLowerCase()).join(" "): "";
        const valueParagraph = item.dataType === "blog" ? (item.paragraph1 + item.paragraph2 + item.paragraph3 + item.paragraph4 + item.paragraph5) : ""
        
        if (
          typeof (txt,
          valueTitle,
          valueSummary,
          valueInstructions,
          valueExtendedIngredients,
          valueDiets,
          valueCuisines,
          valueTags,
          valueCategories,
          valueBadges,
          valueImportantBadges,
          valueBreadcrumbs,
          valueDescription,
          valueIngredientList
          ) == "string" &&
          (
            valueTitle.includes(txt.toLowerCase()) ||
            valueSummary.includes(txt.toLowerCase()) ||
            valueInstructions.includes(txt.toLowerCase()) ||
            valueExtendedIngredients.includes(txt.toLowerCase()) ||
            valueDiets.includes(txt.toLowerCase()) ||
            valueCuisines.includes(txt.toLowerCase()) ||
            valueParagraph.includes(txt.toLowerCase()) ||
            valueTags.includes(txt.toLowerCase()) ||
            valueCategories.includes(txt.toLowerCase()) ||
            valueBadges.includes(txt.toLowerCase()) ||
            valueImportantBadges.includes(txt.toLowerCase()) ||
            valueBreadcrumbs.includes(txt.toLowerCase()) ||
            valueDescription.includes(txt.toLowerCase()) ||
            valueIngredientList.includes(txt.toLowerCase())
            )
        ) {
          return item;
        }
        return null;
      })
    setAllData(newData);
  };

  const handlePrintRecipe = (titleRecipes) => {
    setPrintParams({ print: "recipe" });
    window.location.reload();
  };

  const handleRelatedRecipes = (txt) => {
    const relatedRecipe = allRecipesData.filter((item) => {
      const valueTitle = item.title.toLowerCase();
      const valueExtendedIngredients = item.extendedIngredients
        .map((i) => i.name.toLowerCase())
        .join(" ");

      if (
        typeof (txt, valueTitle, valueExtendedIngredients) == "string" &&
        (valueTitle.includes(txt) || valueExtendedIngredients.includes(txt))
      ) {
        return item;
      }
      return null;
    });

    return relatedRecipe;
    // setRelatedData(relatedRecipe);
  };

  const handleRelatedProducts = (txt) => {
    const relatedProducts = allProductsData.filter((item) => {
      const valueTitle = item.title.toLowerCase();
      const valueImportantBadges = item.importantBadges.map((i) => i).join(" ");
      const valueBadges = item.badges.map((i) => i).join(" ");

      if (
        typeof (txt, valueTitle, valueImportantBadges, valueBadges) ==
          "string" &&
        (valueTitle.includes(txt) ||
          valueImportantBadges.includes(txt) ||
          valueBadges.includes(txt))
      ) {
        return item;
      }
      return null;
    });

    return relatedProducts;
  };

  const handleSearchRecipesSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const search_txt = txtInputRef.current.value.toLowerCase();
    const search_cat =
      txtInputRef.current.nextSibling.firstChild.firstChild.firstChild.innerText.toLowerCase();

    if (search_txt) {
      setSearchParams({
        search_txt: GetSlug(search_txt),
        search_cat: GetSlug(search_cat),
      });
      txtInputRef.current.value = "";
    } else {
      setSearchParams({});
    }

    History.push(
      "/recipes/?search_txt=" +
        GetSlug(search_txt) +
        "&search_cat=" +
        GetSlug(search_cat)
    );
    window.location.reload();
    handleSearchRecipe(search_txt, search_cat);
  };

  const handleSearchTotalSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const search = txtInputRef.current.value.toLowerCase();

    if (search) {
      setSearchParams({
        search: GetSlug(search)
      });
      txtInputRef.current.value = "";
    } else {
      setSearchParams({});
    }

    History.push(
      "/?search=" +
        GetSlug(search)
    );
    window.location.reload();
    handleSearchTotal(search);
  };

  const handleCheckedRememberMe = (e, usernameRef, passRef) => {
    if (e.target.checked) {
      setRememberMe((users) => {
        if (
          users.find((item) => item.username === usernameRef.current.value) ==
          null
        ) {
          console.log(users)
          return [
            {
              username: usernameRef.current.value,
              password: passRef.current.value,
            },
          ];
        } else {
          return users.map((item) => {
            if (item.username === usernameRef.current.value) {
              console.log(item)
              return { ...item, password: passRef.current.value };
            } else {
              console.log(item)
              return item;
            }
          });
        }
      });
    } else {
      setRememberMe([]);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (
      location.search !== "" &&
      (params.get("search_txt") || params.get("search_cat"))
    ) {
      const search_txt = GetString(params.get("search_txt"));
      const search_cat = GetString(params.get("search_cat"));
      setSearchTxt(search_txt ? search_txt : "all recipes");
      setSearchCat(search_cat);
      handleSearchRecipe(search_txt, search_cat);
    } else if (
      location.search !== "" &&
      params.get("search")) {
        const search = GetString(params.get("search"));
        setSearchTxt(search);
        handleSearchTotal(search);
      }
    window.scrollTo(0, 0);
  }, [location.search]);

  return (
    <customContext.Provider
      value={{
        randomData,
        setRandomData,
        loading,
        setLoading,
        txtInputRef,
        searchParams,
        setSearchParams,
        handleSearchRecipesSubmit,
        location,
        searchTxt,
        searchCat,
        allRecipesData,
        titlePage,
        setTitlePage,
        singleRecipe,
        titleRecipeString,
        allCategories,
        MealType,
        CuisineType,
        DietType,
        Ingredients,
        allSubCategories,
        handlePrintRecipe,
        printParams,
        relatedData,
        setRelatedData,
        handleRelatedRecipes,
        recipesCommentsData,
        setRecipesCommentsData,
        costPercentTotal,
        difficultyPercentTotal,
        timePercentTotal,
        healthyPercentTotal,
        totalRating,
        data,
        blogsData,
        blogCategoriesData,
        singleBlog,
        blogsCommentsData,
        setblogsCommentsData,
        allProductsData,
        handleGetItemQuantity,
        handleIncreaseCartQuantity,
        handleDecreaseCartQuantity,
        handleRemoveFromCart,
        handleClearCart,
        cartItems,
        cartQuantity,
        availableItems,
        setAvailableItems,
        unAvailableItems,
        dataAvailable,
        setValueSorting,
        singleProduct,
        arraySorting,
        valueSorting,
        productsCommentsData,
        setProductsCommentsData,
        handleRelatedProducts,
        countryLocation,
        setCountryLocation,
        stateLocation,
        setStateLocation,
        shipping,
        cartTotal,
        orderData,
        setOrderData,
        cartItemsWithDetails,
        handleSearchTotalSubmit,
        allData,
        allDatas,
        rememberMe,
        setRememberMe,
        isAuthenticated,
        setIsAuthenticated,
        handleCheckedRememberMe,
        accountOptions,
        user,
        setUser,
        handleLogout,
        activeLink,
        onChangeActiveLink,
        videoRecipesData,
        recipeId
      }}
    >
      {children}
    </customContext.Provider>
  );
}

export function useCustomContext() {
  const {
    randomData,
    setRandomData,
    loading,
    setLoading,
    txtInputRef,
    searchParams,
    setSearchParams,
    handleSearchRecipesSubmit,
    location,
    searchTxt,
    searchCat,
    allRecipesData,
    titlePage,
    setTitlePage,
    singleRecipe,
    titleRecipeString,
    allCategories,
    MealType,
    CuisineType,
    DietType,
    Ingredients,
    allSubCategories,
    handlePrintRecipe,
    printParams,
    relatedData,
    setRelatedData,
    handleRelatedRecipes,
    recipesCommentsData,
    setRecipesCommentsData,
    costPercentTotal,
    difficultyPercentTotal,
    timePercentTotal,
    healthyPercentTotal,
    totalRating,
    data,
    blogsData,
    blogCategoriesData,
    singleBlog,
    blogsCommentsData,
    setblogsCommentsData,
    allProductsData,
    handleGetItemQuantity,
    handleIncreaseCartQuantity,
    handleDecreaseCartQuantity,
    handleRemoveFromCart,
    handleClearCart,
    cartItems,
    cartQuantity,
    availableItems,
    setAvailableItems,
    unAvailableItems,
    dataAvailable,
    setValueSorting,
    singleProduct,
    arraySorting,
    valueSorting,
    productsCommentsData,
    setProductsCommentsData,
    handleRelatedProducts,
    countryLocation,
    setCountryLocation,
    stateLocation,
    setStateLocation,
    shipping,
    cartTotal,
    orderData,
    setOrderData,
    cartItemsWithDetails,
    handleSearchTotalSubmit,
    allData,
    allDatas,
    rememberMe,
    setRememberMe,
    isAuthenticated,
    setIsAuthenticated,
    handleCheckedRememberMe,
    accountOptions,
    user,
    setUser,
    handleLogout,
    activeLink,
    onChangeActiveLink,
    videoRecipesData,
    recipeId
  } = useContext(customContext);
  return {
    randomData,
    setRandomData,
    loading,
    setLoading,
    txtInputRef,
    searchParams,
    setSearchParams,
    handleSearchRecipesSubmit,
    location,
    searchTxt,
    searchCat,
    allRecipesData,
    titlePage,
    setTitlePage,
    singleRecipe,
    titleRecipeString,
    allCategories,
    MealType,
    CuisineType,
    DietType,
    Ingredients,
    allSubCategories,
    handlePrintRecipe,
    printParams,
    relatedData,
    setRelatedData,
    handleRelatedRecipes,
    recipesCommentsData,
    setRecipesCommentsData,
    costPercentTotal,
    difficultyPercentTotal,
    timePercentTotal,
    healthyPercentTotal,
    totalRating,
    data,
    blogsData,
    blogCategoriesData,
    singleBlog,
    blogsCommentsData,
    setblogsCommentsData,
    allProductsData,
    handleGetItemQuantity,
    handleIncreaseCartQuantity,
    handleDecreaseCartQuantity,
    handleRemoveFromCart,
    handleClearCart,
    cartItems,
    cartQuantity,
    availableItems,
    setAvailableItems,
    unAvailableItems,
    dataAvailable,
    setValueSorting,
    singleProduct,
    arraySorting,
    valueSorting,
    productsCommentsData,
    setProductsCommentsData,
    handleRelatedProducts,
    countryLocation,
    setCountryLocation,
    stateLocation,
    setStateLocation,
    shipping,
    cartTotal,
    orderData,
    setOrderData,
    cartItemsWithDetails,
    handleSearchTotalSubmit,
    allData,
    allDatas,
    rememberMe,
    setRememberMe,
    isAuthenticated,
    setIsAuthenticated,
    handleCheckedRememberMe,
    accountOptions,
    user,
    setUser,
    handleLogout,
    activeLink,
    onChangeActiveLink,
    videoRecipesData,
    recipeId
  };
}
