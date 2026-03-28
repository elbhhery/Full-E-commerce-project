import "./App.css";
import Collections from "./collections/collection";
import CollectionsProducts from "./collections/collectionProducts";
import HomePage from "./Home/Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:handle" element={<CollectionsProducts />} />
      </Routes>
    </>
  );
}

export default App;
