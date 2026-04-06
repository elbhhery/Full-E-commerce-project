import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, Trash2 } from "lucide-react";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeItem, isLoading } = useCart();

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  const cartLines = cart?.lines?.nodes || [];
  const isEmpty = cartLines.length === 0;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Sidebar */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-xl font-bold">Your Cart</h2>
                {cart && (
                  <span className="bg-[#354062] text-white text-xs px-2 py-1 rounded-full">
                    {cart.totalQuantity}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-[#354062] text-white px-6 py-3 rounded-full font-medium hover:bg-[#2a3350] transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartLines.map((line) => (
                    <div
                      key={line.id}
                      className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                    >
                      {/* Product Image */}
                      <Link
                        to={`/product/${line.merchandise.product.handle}`}
                        onClick={() => setIsCartOpen(false)}
                        className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0"
                      >
                        <img
                          src={line.merchandise.product.featuredImage?.url}
                          alt={line.merchandise.product.title}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${line.merchandise.product.handle}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-medium text-sm line-clamp-2 hover:text-[#354062] transition"
                        >
                          {line.merchandise.product.title}
                        </Link>
                        {line.merchandise.title !== "Default Title" && (
                          <p className="text-xs text-gray-500 mt-1">
                            {line.merchandise.title}
                          </p>
                        )}
                        <p className="font-bold text-sm mt-1">
                          {formatPrice(
                            line.merchandise.price.amount,
                            line.merchandise.price.currencyCode
                          )}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-white rounded-full border">
                            <button
                              onClick={() => updateQuantity(line.id, line.quantity - 1)}
                              disabled={isLoading}
                              className="p-1.5 hover:bg-gray-100 rounded-full transition disabled:opacity-50"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(line.id, line.quantity + 1)}
                              disabled={isLoading}
                              className="p-1.5 hover:bg-gray-100 rounded-full transition disabled:opacity-50"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(line.id)}
                            disabled={isLoading}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {!isEmpty && cart && (
              <div className="border-t p-5 space-y-4 bg-white">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-lg">
                    {formatPrice(
                      cart.cost.subtotalAmount.amount,
                      cart.cost.subtotalAmount.currencyCode
                    )}
                  </span>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Checkout Button */}
                <a
                  href={cart.checkoutUrl}
                  className="block w-full bg-[#354062] text-white text-center py-4 rounded-full font-semibold hover:bg-[#2a3350] transition"
                >
                  Proceed to Checkout
                </a>

                {/* Continue Shopping */}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full text-center py-3 text-gray-600 hover:text-black transition"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
