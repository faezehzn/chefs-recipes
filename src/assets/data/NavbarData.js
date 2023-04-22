import { MdOutlineSetMeal, MdBrunchDining, MdPending } from 'react-icons/md';
import { GiJungle, GiEarthAsiaOceania, GiConverseShoe, GiWheat, GiChickenOven } from 'react-icons/gi';
import { FaLeaf } from 'react-icons/fa';
import { TbSoup } from 'react-icons/tb';
import mainCourse from '../images/mainCourse.png';
import sideDish from '../images/sideDish.png';
import soup from '../images/soup.png'
import mainCourseBg from '../images/bg/mainCourseBg.jpg';
import sideDishBg from '../images/bg/sideDishBg.jpg';
import soupBg from '../images/bg/soupBg.jpg';
import moreMealTypeBg from '../images/bg/moreMealTypeBg.jpg';
import europeanFoodBg from '../images/bg/europeanFoodBg.jpg';
import italianFoodBg from '../images/bg/italianFoodBg.jpeg';
import mediterraneanFoodBg from '../images/bg/mediterraneanFoodBg.jpg';
import moreCuisineTypeBg from '../images/bg/moreCuisineTypeBg.jpg';
import veganBg from '../images/bg/veganBg.jpg';
import whole30 from '../images/bg/whole30.png';
import glutenfreeBg from '../images/bg/glutenfreeBg.jpg';
import moreDietBg from '../images/bg/moreDietBg.jpg';


// function linkFunc(title) {
//   let link = "/";
//   if (window.innerWidth < 470) {
//     link = `/${title}`;
//   }
//   return link;
// }

const navigationItems = [
  {
    title: "Home",
    link: "",
    id: "1-home",
    subnavItems: [],
  },
  {
    title: "Recipes",
    link: "recipes",
    id: "2-recipes",
    subnavItems: [
      {
        title: "Meal Types",
        link: "meal-types",
        id: "sub-1",
        subsubnavItems: [
          { title: "Main Course", link: "main-course", id: "sub-sub-1", icon: <GiChickenOven />, img: mainCourse, bgImage: mainCourseBg },
          { title: "Side Dish", link: "side-dish", id: "sub-sub-2", icon: <MdBrunchDining />, img: sideDish, bgImage: sideDishBg },
          {
            title: "Soup",
            link: "soup",
            id: "sub-sub-3",
            icon: <TbSoup />, img: soup, bgImage: soupBg
          },
          { title: "More", link: "more", id: "sub-sub-4", icon: <MdPending />, bgImage: moreMealTypeBg },
        ],
      },
      {
        title: "Cuisine Types",
        link: 'cuisine-types',
        id: "sub-2",
        subsubnavItems: [
          { title: "European", link: "european", id: "sub-sub-5", icon: <GiJungle />, bgImage: europeanFoodBg },
          { title: "Italian", link: "italian", id: "sub-sub-6", icon: <GiConverseShoe />, bgImage: italianFoodBg },
          {
            title: "Mediterranean",
            link: "mediterranean",
            id: "sub-sub-7",
            icon: <GiEarthAsiaOceania />, bgImage: mediterraneanFoodBg
          },
          { title: "More", link: "more", id: "sub-sub-8", icon: <MdPending />, bgImage: moreCuisineTypeBg },
        ],
      },
      { title: "Diet Types", link: "diet-types", id: "sub-3", img: "", subsubnavItems: [
        { title: "Vegan", link: "vegan", id: "sub-sub-9", icon: <FaLeaf />, bgImage: veganBg },
          { title: "Whole30", link: "whole30", id: "sub-sub-10", icon: <MdOutlineSetMeal />, bgImage: whole30 },
          {
            title: "Gluten Free",
            link: "gluten-free",
            id: "sub-sub-11",
            icon: <GiWheat />, bgImage: glutenfreeBg
          },
          { title: "More", link: "more", id: "sub-sub-12", icon: <MdPending />, bgImage: moreDietBg },
      ] },
    ],
  },
  {
    title: "Pages",
    link: "pages",
    id: "3-pages",
    subnavItems: [
      { title: "About Us", link: "about-us", id: "sub-4", subsubnavItems: [] },
      { title: "Contact", link: "contact", id: "sub-5", subsubnavItems: [] },
      { title: "How it works", link: "how-it-works", id: "sub-6", subsubnavItems: [] },
      { title: "Recipes A-Z", link: "all-recipes-A-Z", id: "sub-7", subsubnavItems: [] },
      { title: "All videos", link: "videos", id: "sub-8", subsubnavItems: [] },
    ],
  },
  { title: "Blogs", link: "blogs", id: "4-blogs", subnavItems: [
    { title: "Recent Blogs", link: "blogs/recent-blogs", id: "sub-9", subsubnavItems: [] },
    { title: "Blogs' Categories", link: "blogs/blogs-with-categories", id: "sub-10", subsubnavItems: [] },
  ] },
  { title: "Shop", link: "shop", id: "5-shop", subnavItems: [
    { title: "All Products", link: "shop", id: "sub-11", subsubnavItems: [] },
    { title: "Basket", link: "cart", id: "sub-12", subsubnavItems: [] },
    { title: "Checkout", link: "checkout", id: "sub-13", subsubnavItems: [] },
  ] },
];

export default navigationItems;


// const imgCategories = MealType.map((value) => {
//   return {"value": value, "image": ""}
// })