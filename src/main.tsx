import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "swiper/css";
import "swiper/css/pagination";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
