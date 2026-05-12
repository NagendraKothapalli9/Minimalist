import { Route, Routes } from "react-router";
import MuiNavbar1 from "./Components/Navbar1";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";

function App() {
  return (
    <div className="App">
      <MuiNavbar1/>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/product/:Id' element={<ProductDetails/>}/>
        </Routes>
    </div>
  );
}

export default App;
