import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export default function MobileMenu({ isOpen, setIsOpen }: ModalProps) {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (section: any) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* SIDEBAR */}
          <motion.div
            className="fixed top-0 left-0 h-screen w-[85%] max-w-[320px] bg-white z-50 md:hidden shadow-2xl px-5 py-6 overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
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

            {/* LINKS */}
            <ul className="mt-6 flex flex-col">
              {/* ACCORDION */}
              <li className="border-b">
                <button
                  onClick={() => toggleAccordion("shop")}
                  className="w-full flex items-center justify-between py-4 text-left font-medium cursor-pointer"
                >
                  <span>Shop</span>
                  <span
                    className={`transition-transform duration-300 ${
                      openAccordion === "shop" ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <AnimatePresence>
                  {openAccordion === "shop" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <ul className="pb-4 pl-4 flex flex-col gap-3 text-gray-600">
                        <li className="cursor-pointer hover:text-black transition">
                          Casual
                        </li>
                        <li className="cursor-pointer hover:text-black transition">
                          Formal
                        </li>
                        <li className="cursor-pointer hover:text-black transition">
                          Gym
                        </li>
                        <li className="cursor-pointer hover:text-black transition">
                          Party
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li className="border-b py-4 font-medium cursor-pointer hover:text-gray-600 transition">
                On Sale
              </li>

              <li className="border-b py-4 font-medium cursor-pointer hover:text-gray-600 transition">
                New Arrivals
              </li>

              <li className="border-b py-4 font-medium cursor-pointer hover:text-gray-600 transition">
                Brand
              </li>
            </ul>

            {/* EXTRA */}
            <div className="mt-8 space-y-3">
              <button className="w-full rounded-full bg-black text-white py-3 font-medium cursor-pointer hover:bg-neutral-800 transition">
                Shop Now
              </button>

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
