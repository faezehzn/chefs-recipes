import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useCustomContext } from "./context/customContext";
import Loading from "./utilities/Loading";
import Home from "./pages/Home";
import FilteredRecipes from "./pages/FilteredRecipes";
import SearchedRecipes from "./pages/SearchedRecipes";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HowItWorks from "./pages/HowItWorks";
import AllRecipesAZ from "./pages/AllRecipesAZ";
import RecipeSinglePage from "./pages/RecipeSinglePage";
import ChefProfile from './pages/ChefProfile'
import BlogCategories from "./pages/BlogCategories";
import RecentBlogs from "./pages/RecentBlogs";
import BlogSinglePage from "./pages/BlogSinglePage";
import AllProducts from "./pages/AllProducts";
import Basket from "./pages/Basket";
import Checkout from "./pages/Checkout";
import MyAccount from "./pages/MyAccount";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import CreateRecipe from './pages/CreateRecipe';
import Videos from './pages/Videos';
import NotFound from "./pages/NotFound";
import ProductSinglePage from "./pages/ProductSinglePage";
import OrderReceived from "./pages/OrderRecived";


function App() {
  const { loading } = useCustomContext();
  
  if(loading) {
    return <Loading />
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate replace to="/" />} />

        <Route path="/recipes">
          <Route index element={<SearchedRecipes />} />
          <Route
            path=":recipe__type/:submenu__type"
            element={<FilteredRecipes />}
          />
          <Route path=":title" element={<RecipeSinglePage />} />
        </Route>
        <Route path="/authors/:name" element={<ChefProfile />} />

        <Route path="/about-us" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/all-recipes-A-Z" element={<AllRecipesAZ />} />

        <Route path="/blogs" >
          <Route index element={<RecentBlogs />} />
          <Route path='recent-blogs' element={<RecentBlogs />} />
          <Route path='tags/:tag' element={<RecentBlogs />} />
          <Route path='categories/:cat' element={<RecentBlogs />} />
          <Route path="blogs-with-categories" element={<BlogCategories />} />
          <Route path=":title" element={<BlogSinglePage />} />
        </Route>

        <Route path="/shop" >
          <Route index element={<AllProducts />} />
          <Route path='tags/:tag' element={<AllProducts />} />
          <Route path='categories/:cat' element={<AllProducts />} />
          <Route path=":title" element={<ProductSinglePage />} />
        </Route>
        <Route path="/cart" element={<Basket />} />
        <Route path="/checkout">
          <Route index element={<Checkout/> }/>
          <Route path="order-received/:id" element={<OrderReceived/> }/>
        </Route>

        <Route path="/my-account">
          <Route index element={<MyAccount />} />
          <Route path='forget-password' element={<ForgetPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='dashboard-acc' element={<MyAccount />} />
          <Route path='recipes-acc' element={<MyAccount />} />
          <Route path='favorites-acc' element={<MyAccount />} />
          <Route path='orders-acc' element={<MyAccount />} />
          <Route path='reviews-acc' element={<MyAccount />} />
          <Route path='settings-acc' element={<MyAccount />} />
          <Route path='view-order/:id' element={<MyAccount />} />
        </Route>

        <Route path="/recipe" element={<CreateRecipe />} />
        <Route path="/videos" element={<Videos />} />

        <Route path="*" element={<NotFound />} />
        {/* <Route path="*" element={<Navigate replace to='/not-found' />} /> */}
      </Routes>
    </>
  );
}

export default App;
