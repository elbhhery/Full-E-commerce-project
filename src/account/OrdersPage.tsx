import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCustomerDetails } from "../lib/customerOperations";
import { type Order } from "../lib/customerOperations";
import MainHeader from "../Home/headerComponents/mainHeader";
import Footer from "../components/shared/Footer";
import { Package, ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OrdersPage() {
  const { isAuthenticated, isLoading: authLoading, accessToken } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/account/orders" } } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    async function fetchOrders() {
      if (accessToken) {
        setLoading(true);
        const details = await getCustomerDetails(accessToken);
        setOrders(details?.orders?.nodes || []);
        setLoading(false);
      }
    }

    if (isAuthenticated && accessToken) {
      fetchOrders();
    }
  }, [isAuthenticated, accessToken]);

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "FULFILLED":
        return "bg-green-100 text-green-700";
      case "PARTIALLY_FULFILLED":
        return "bg-blue-100 text-blue-700";
      case "UNFULFILLED":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (authLoading || loading) {
    return (
      <>
        <MainHeader />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
          <div className="w-10 h-10 border-4 border-[#354062] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MainHeader />

      <main className="container mx-auto px-4 py-8 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/account"
            className="flex items-center gap-1 text-gray-500 hover:text-black transition mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Account
          </Link>
          <h1 className="text-3xl font-bold">Order History</h1>
          <p className="text-gray-500 mt-1">{orders.length} order(s) found</p>
        </div>

        {orders.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-white rounded-2xl border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <Link
              to="/collections"
              className="inline-block bg-[#354062] text-white px-6 py-3 rounded-full font-medium hover:bg-[#2a3350] transition"
            >
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                className="bg-white rounded-2xl border overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Order Header */}
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {order.lineItems.nodes[0]?.variant?.image?.url ? (
                        <img
                          src={order.lineItems.nodes[0].variant.image.url}
                          alt={order.lineItems.nodes[0].title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-bold">Order #{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">{formatDate(order.processedAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.fulfillmentStatus)}`}>
                        {order.fulfillmentStatus || "Processing"}
                      </span>
                      <p className="font-bold mt-1">
                        {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
                      </p>
                    </div>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Order Details */}
                <AnimatePresence>
                  {expandedOrder === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t">
                        {/* Status on mobile */}
                        <div className="sm:hidden py-4 flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.fulfillmentStatus)}`}>
                            {order.fulfillmentStatus || "Processing"}
                          </span>
                          <p className="font-bold">
                            {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
                          </p>
                        </div>

                        {/* Line Items */}
                        <div className="space-y-3 pt-4">
                          {order.lineItems.nodes.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {item.variant?.image?.url ? (
                                  <img
                                    src={item.variant.image.url}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package className="w-4 h-4 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{item.title}</p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              {item.variant?.price && (
                                <p className="font-medium text-sm">
                                  {formatPrice(item.variant.price.amount, item.variant.price.currencyCode)}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Order Summary */}
                        <div className="mt-4 pt-4 border-t flex items-center justify-between">
                          <span className="text-gray-500">Total</span>
                          <span className="font-bold text-lg">
                            {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
