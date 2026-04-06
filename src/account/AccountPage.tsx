import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCustomerDetails, CustomerDetails, updateCustomer } from "../lib/customerOperations";
import MainHeader from "../Home/headerComponents/mainHeader";
import Footer from "../components/shared/Footer";
import { User, Package, MapPin, LogOut, Edit, Check, X, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AccountPage() {
  const { customer, isAuthenticated, isLoading: authLoading, logout, accessToken } = useAuth();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/account" } } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    async function fetchDetails() {
      if (accessToken) {
        setLoading(true);
        const details = await getCustomerDetails(accessToken);
        setCustomerDetails(details);
        if (details) {
          setEditForm({
            firstName: details.firstName || "",
            lastName: details.lastName || "",
            email: details.email || "",
            phone: details.phone || ""
          });
        }
        setLoading(false);
      }
    }
    
    if (isAuthenticated && accessToken) {
      fetchDetails();
    }
  }, [isAuthenticated, accessToken]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSave = async () => {
    if (!accessToken) return;
    
    setSaving(true);
    const result = await updateCustomer(
      accessToken,
      editForm.firstName,
      editForm.lastName,
      editForm.email,
      editForm.phone
    );
    setSaving(false);

    if (result.success) {
      // Refresh customer details
      const details = await getCustomerDetails(accessToken);
      setCustomerDetails(details);
      setEditing(false);
    }
  };

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

  if (!isAuthenticated || !customer) {
    return null;
  }

  const recentOrders = customerDetails?.orders?.nodes?.slice(0, 3) || [];
  const defaultAddress = customerDetails?.defaultAddress;

  return (
    <>
      <MainHeader />
      
      <main className="container mx-auto px-4 py-8 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-gray-500 mt-1">Welcome back, {customer.firstName}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-2xl border p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#354062] text-white rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold">Profile Information</h2>
              </div>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 text-[#354062] hover:underline"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#354062] text-white rounded-lg hover:bg-[#2a3350] transition disabled:opacity-50"
                  >
                    {saving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="flex items-center gap-1 px-3 py-1.5 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {editing ? (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(e) => setEditForm(f => ({ ...f, firstName: e.target.value }))}
                    className="w-full py-2 px-4 rounded-lg border focus:border-[#354062] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(e) => setEditForm(f => ({ ...f, lastName: e.target.value }))}
                    className="w-full py-2 px-4 rounded-lg border focus:border-[#354062] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full py-2 px-4 rounded-lg border focus:border-[#354062] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full py-2 px-4 rounded-lg border focus:border-[#354062] outline-none"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{customerDetails?.firstName} {customerDetails?.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{customerDetails?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{customerDetails?.phone || "Not provided"}</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/account/orders"
              className="flex items-center justify-between p-4 bg-white rounded-xl border hover:border-[#354062] transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Order History</p>
                  <p className="text-sm text-gray-500">{customerDetails?.orders?.nodes?.length || 0} orders</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link
              to="/account/addresses"
              className="flex items-center justify-between p-4 bg-white rounded-xl border hover:border-[#354062] transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Addresses</p>
                  <p className="text-sm text-gray-500">{customerDetails?.addresses?.nodes?.length || 0} saved</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          className="mt-8 bg-white rounded-2xl border p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            {recentOrders.length > 0 && (
              <Link to="/account/orders" className="text-[#354062] hover:underline">
                View All
              </Link>
            )}
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No orders yet</p>
              <Link
                to="/collections"
                className="inline-block bg-[#354062] text-white px-6 py-2 rounded-full hover:bg-[#2a3350] transition"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-lg overflow-hidden">
                    {order.lineItems.nodes[0]?.variant?.image?.url ? (
                      <img
                        src={order.lineItems.nodes[0].variant.image.url}
                        alt={order.lineItems.nodes[0].title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Package className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">Order #{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">{formatDate(order.processedAt)}</p>
                    <p className="text-sm">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        order.fulfillmentStatus === "FULFILLED" 
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {order.fulfillmentStatus || "Processing"}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}</p>
                    <p className="text-sm text-gray-500">{order.lineItems.nodes.length} item(s)</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Default Address */}
        {defaultAddress && (
          <motion.div
            className="mt-8 bg-white rounded-2xl border p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Default Address</h2>
              <Link to="/account/addresses" className="text-[#354062] hover:underline">
                Manage
              </Link>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">{defaultAddress.firstName} {defaultAddress.lastName}</p>
                <p className="text-gray-600">{defaultAddress.address1}</p>
                {defaultAddress.address2 && <p className="text-gray-600">{defaultAddress.address2}</p>}
                <p className="text-gray-600">{defaultAddress.city}, {defaultAddress.province} {defaultAddress.zip}</p>
                <p className="text-gray-600">{defaultAddress.country}</p>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </>
  );
}
