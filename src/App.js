import React, {
  useState,
} from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import MuiNavbar1 from "./Components/Navbar1";

import CartDrawer from "./Pages/Cart";

import Home from "./Pages/Home";

import ProductDetails from "./Pages/ProductDetails";
import SuccessPage from "./Components/SuccessPage";

const App = () => {
  const [cartOpen, setCartOpen] =
    useState(false);

  return (
    <>

      <MuiNavbar1
        openCart={() =>
          setCartOpen(true)
        }
      />


      <CartDrawer
        open={cartOpen}
        onClose={() =>
          setCartOpen(false)
        }
      />


      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/product/:Id"
          element={
            <ProductDetails />
          }
        />

        <Route path="/success"
         element={
         <SuccessPage />} 
         />
      </Routes>
    </>
  );
};

export default App;