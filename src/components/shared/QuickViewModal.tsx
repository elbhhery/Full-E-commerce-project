import { AnimatePresence, motion } from "framer-motion";
// import { useState } from "react";
interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: any;
}
export default function QuickViewModal({
  isOpen,
  setIsOpen,
  product,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          {/* SIDEBAR */}
          <motion.div
            className="fixed top-[50%] right-5 rounded-4xl h-[90%] -translate-y-[50%] w-[85%] max-w-[320px] bg-white z-50 shadow-2xl px-5 py-6 overflow-y-auto"
            initial={{ x: "200%" }}
            animate={{ x: "0" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            {/* TOP */}
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-2xl font-black">SHOP.CO</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-3xl leading-none cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* SEARCH */}
            <div className="mt-5">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full rounded-full bg-gray-100 py-3 pl-11 pr-4 outline-none"
                />
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                >
                  <path
                    fill="currentColor"
                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                  />
                </svg>
              </div>
            </div>
            {/* EXTRA */}
            <div className="mt-8 space-y-3">
              <button className="w-full rounded-full bg-black text-white py-3 font-medium cursor-pointer hover:bg-neutral-800 transition">
                Shop Now
              </button>
              <div>{product.title}</div>
              <button className="w-full rounded-full border py-3 font-medium cursor-pointer hover:bg-gray-50 transition">
                Contact Us
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
