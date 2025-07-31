import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Dashboard/AdminPanel/Layouts/Home";
import AdminLogin from "./Dashboard/AdminPanel/Compo/Auth/AdminLogin";
import AdminRegister from "./Dashboard/AdminPanel/Compo/Auth/AdminRegister";
import AddCategory from "./Dashboard/AdminPanel/Compo/Category/AddCategory";
import AddSubCategory from "./Dashboard/AdminPanel/Compo/Category/AddSubCategory";
import WebHome from "./Website/Layout/Home";
import ViewCategory from "./Dashboard/AdminPanel/Compo/Category/ViewCategories/ViewCategory";
import ViewSubCategory from "./Dashboard/AdminPanel/Compo/Category/ViewSubCategory/ViewSubCategory";

import AddProducts from "./Dashboard/AdminPanel/Compo/Products/Add/AddProducts";
import ViewProducts from "./Dashboard/AdminPanel/Compo/Products/View/ViewProducts";
import FullInfo from "./Dashboard/AdminPanel/Compo/Products/View/FullInfo";
import FixCategories from "./Website/Layout/ExploreCrafts/FixCategories";
import ProductDetail from "./Website/Layout/ProductDetail/ProductDetail";
import Cart from "./Website/Layout/Cart/Cart";
import AdminHome from "./Dashboard/AdminPanel/Layout/AdminHome/AdminHome";





function App() {
  return (
    <BrowserRouter>

      <Routes>
        
          <Route path="/admin" element={<AdminHome />}>
            
            <Route path="add-category" element={<AddCategory />} />
            <Route path="add-sub-category" element={<AddSubCategory />} />
            <Route path="view-category" element={<ViewCategory />} />
            <Route path="view-sub-category" element={<ViewSubCategory />} />
            
            <Route path="add-product" element={<AddProducts/>} />
            <Route path="view-product" element={<ViewProducts/>} />
            <Route path="product-full-info/:productId" element={<FullInfo/>} />

          </Route>


        <Route path="/" element={<WebHome/>} /> 
        <Route path="/category/:title" element={<FixCategories />} />
        <Route path="/product-detail/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart/>} />

        <Route path="/login" element={<AdminLogin/>} />
        <Route path="/register" element={<AdminRegister/>} />

         <Route path="/ad" element={<AdminHome/>} />


            


      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
