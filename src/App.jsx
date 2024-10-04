import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbarrestaurant from "./components/Navbar";
import Home from "./pages/HomePage/Home";
import Profil from "./pages/Profil";
import List from "./List";
import Footerrestaurant from "./components/Footer";
import Detail from "./pages/Detail/Detail";
import Error from "./pages/Error";
import "./assets/stylebaru.scss";
import Product from "./pages/ProductPage/Product";
import Country from "./pages/Country/Country";
import ThemeContext from "./context/ThemeContext";

function App() {
  const [count, setCount] = useState(0);
  const theme = useState("Light");

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <Navbarrestaurant />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profil" element={<Profil />} />
          <Route path="/Detail/:id" element={<Detail />} />
          <Route path="/list" element={<List />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Country" element={<Country />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </ThemeContext.Provider>
      <Footerrestaurant />
    </BrowserRouter>
  );
}

export default App;
