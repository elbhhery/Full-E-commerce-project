import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCustomerDetails, createAddress, updateAddress, deleteAddress } from "../lib/customerOperations";
import { type Address } from "../lib/customerOperations";
import MainHeader from "../Home/headerComponents/mainHeader";
import Footer from "../components/shared/Footer";
import { MapPin, ChevronLeft, Plus, Edit, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddressForm {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
}

const emptyForm: AddressForm = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  province: "",
  country: "",
  zip: "",
  phone: ""
};

export default function AddressesPage() {
  const { isAuthenticated, isLoading: authLoading, accessToken } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [form, setForm] = useState<AddressForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/account/addresses" } } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const fetchAddresses = async () => {
    if (accessToken) {
      setLoading(true);
      const details = await getCustomerDetails(accessToken);
      setAddresses(details?.addresses?.nodes || []);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      fetchAddresses();
    }
  }, [isAuthenticated, accessToken]);

  const openAddModal = () => {
    setEditingAddress(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (address: Address) => {
    setEditingAddress(address);
    setForm({
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      address1: address.address1 || "",
      address2: address.address2 || "",
      city: address.city || "",
      province: address.province || "",
      country: address.country || "",
      zip: address.zip || "",
      phone: address.phone || ""
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!accessToken) return;

    setSaving(true);

    const addressData = {
      firstName: form.firstName,
      lastName: form.lastName,
      address1: form.address1,
      address2: form.address2 || null,
      city: form.city,
      province: form.province,
      country: form.country,
      zip: form.zip,
      phone: form.phone || null
    };

    let result;
    if (editingAddress) {
      result = await updateAddress(accessToken, editingAddress.id, addressData);
    } else {
      result = await createAddress(accessToken, addressData);
    }

    setSaving(false);

    if (result.success) {
      setShowModal(false);
      fetchAddresses();
    }
  };

  const handleDelete = async (addressId: string) => {
    if (!accessToken) return;

    setDeleting(addressId);
    const result = await deleteAddress(accessToken, addressId);
    setDeleting(null);

    if (result.success) {
      fetchAddresses();
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Saved Addresses</h1>
              <p className="text-gray-500 mt-1">{addresses.length} address(es) saved</p>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-[#354062] text-white px-4 py-2 rounded-full hover:bg-[#2a3350] transition"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Address</span>
            </button>
          </div>
        </div>

        {addresses.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-white rounded-2xl border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No addresses saved</h2>
            <p className="text-gray-500 mb-6">Add an address to make checkout faster</p>
            <button
              onClick={openAddModal}
              className="inline-block bg-[#354062] text-white px-6 py-3 rounded-full font-medium hover:bg-[#2a3350] transition"
            >
              Add Your First Address
            </button>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addresses.map((address, index) => (
              <motion.div
                key={address.id}
                className="bg-white rounded-2xl border p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(address)}
                      className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      disabled={deleting === address.id}
                      className="p-2 hover:bg-red-50 rounded-full transition disabled:opacity-50"
                    >
                      {deleting === address.id ? (
                        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 text-red-500" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="font-medium">{address.firstName} {address.lastName}</p>
                  <p className="text-gray-600 text-sm">{address.address1}</p>
                  {address.address2 && <p className="text-gray-600 text-sm">{address.address2}</p>}
                  <p className="text-gray-600 text-sm">
                    {address.city}, {address.province} {address.zip}
                  </p>
                  <p className="text-gray-600 text-sm">{address.country}</p>
                  {address.phone && <p className="text-gray-500 text-sm">{address.phone}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Address Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl z-50 p-6 max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => setForm(f => ({ ...f, firstName: e.target.value }))}
                      className="w-full py-2 px-4 rounded-lg border focus:border-[#354062] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => setForm(f => ({ ...f, lastName: e.target.value }))}
                      className="w-full py-2 px-4 rounded-lg border focus:border-[#354062] outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address Line 1</label>
                  <input
                    type="text"
                    value={form.address1}
                    onChange={(e) => setForm(f => ({ ...f, address1: e.target.value }))}
                    className="w-full py-2 px-4 rounded-lg border focus:border-[#354062] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    value={form.address2}
                    onChange={(e) => setForm(f => ({ ...f, address2: e.target.value }))}
                    className="w-full py-2 px-4 rounded-lg border focus:border-[#354062] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm(f => ({ ...f, city: e.target.value }))}
                      className="w-full py-2 px-4 rounded-lg border focus:border-[#354062] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State/Province</label>
                    <input
                      type="text"
                      value={form.province}
                      onChange={(e) => setForm(f => ({ ...f, province: e.target.value }))}
                      className="w-full py-2 px-4 rounded-lg border focus:border-[#354062] outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP/Postal Code</label>
                    <input
                      type="text"
                      value={form.zip}
                      onChange={(e) => setForm(f => ({ ...f, zip: e.target.value }))}
                      className="w-full py-2 px-4 rounded-lg border focus:border-[#354062] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) => setForm(f => ({ ...f, country: e.target.value }))}
                      className="w-full py-2 px-4 rounded-lg border focus:border-[#354062] outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full py-2 px-4 rounded-lg border focus:border-[#354062] outline-none"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 border rounded-xl font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-3 bg-[#354062] text-white rounded-xl font-medium hover:bg-[#2a3350] transition disabled:opacity-50 flex items-center justify-center"
                  >
                    {saving ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      editingAddress ? "Update Address" : "Add Address"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
