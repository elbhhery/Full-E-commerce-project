import "./App.css";
import Collections from "./collections/collection";
import CollectionsProducts from "./collections/collectionProducts";
import HomePage from "./Home/Home";
import ProductPage from "./product/ProductPage";
import SearchPage from "./search/SearchPage";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import AccountPage from "./account/AccountPage";
import OrdersPage from "./account/OrdersPage";
import AddressesPage from "./account/AddressesPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:handle" element={<CollectionsProducts />} />
        <Route path="/product/:handle" element={<ProductPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/orders" element={<OrdersPage />} />
        <Route path="/account/addresses" element={<AddressesPage />} />
      </Routes>
    </>
  );
}

export default App;
