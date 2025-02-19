import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Headerv2 } from "./components";
import {
  LandingPage,
  LoginPage,
  SectionPage,
  CategoryPage,
  ProductPage,
  SignUpPage,
  PersonalInfoPage,
  CartPage,
  CheckOutPage,
} from "./pages";

import "./App.css";
import { store } from "./redux/store";
import { Provider, useDispatch } from "react-redux";

function App() {
  const token = localStorage.getItem("token") || false;
  return (
    <Provider store={store}>
      <div className="font-display bg-offwhite">
        <BrowserRouter>
          <Headerv2 />
          <Routes>
            <Route>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/accountInfo" element={<PersonalInfoPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckOutPage />} />
              <Route path="/payment" element={<></>} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route
                path="/category/:category/:subcategory"
                element={<SectionPage />}
              />
              <Route path="/products/:id" element={<ProductPage />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
