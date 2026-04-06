import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  type Cart,
  createCart,
  getCart,
  addToCart as addToCartApi,
  updateCartLine,
  removeFromCart as removeFromCartApi
} from "../lib/cartOperations";

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = "shopify_cart_id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize cart on mount
  useEffect(() => {
    async function initializeCart() {
      setIsLoading(true);
      try {
        const savedCartId = localStorage.getItem(CART_ID_KEY);

        if (savedCartId) {
          const existingCart = await getCart(savedCartId);
          if (existingCart) {
            setCart(existingCart);
            setIsLoading(false);
            return;
          }
        }

        // Create new cart if none exists
        const newCart = await createCart();
        localStorage.setItem(CART_ID_KEY, newCart.id);
        setCart(newCart);
      } catch (error) {
        console.error("Failed to initialize cart:", error);
      } finally {
        setIsLoading(false);
      }
    }

    initializeCart();
  }, []);

  const addToCart = useCallback(async (variantId: string, quantity: number = 1) => {
    if (!cart) return;

    try {
      setIsLoading(true);
      const updatedCart = await addToCartApi(cart.id, variantId, quantity);
      setCart(updatedCart);
      setIsCartOpen(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return;

    try {
      setIsLoading(true);
      if (quantity <= 0) {
        const updatedCart = await removeFromCartApi(cart.id, [lineId]);
        setCart(updatedCart);
      } else {
        const updatedCart = await updateCartLine(cart.id, lineId, quantity);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return;

    try {
      setIsLoading(true);
      const updatedCart = await removeFromCartApi(cart.id, [lineId]);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const totalItems = cart?.totalQuantity || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeItem,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
