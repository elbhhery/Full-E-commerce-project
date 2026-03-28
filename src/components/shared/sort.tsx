import { motion, AnimatePresence } from "framer-motion";

interface SortMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleSort: (criteria: string) => void;
  currentSort: string;
}

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "title-asc", label: "Alphabetically, A-Z" },
  { id: "title-desc", label: "Alphabetically, Z-A" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
];

export default function SortMenu({
  isOpen,
  setIsOpen,
  handleSort,
  currentSort,
}: SortMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* الـ Overlay خلفية شفافة تقفل المنيو لما تدوس عليها */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 z-60 backdrop-blur-[2px]"
          />

          {/* القائمة نفسها */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", duration: 0.1 }}
            className="fixed bottom-0 left-0 right-0 bg-white z-70 rounded-t-[32px] shadow-2xl p-6 pb-10 md:max-w-md md:mx-auto md:bottom-10 md:rounded-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#162135]">Sort By</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    handleSort(option.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    currentSort === option.id
                      ? "bg-[#3a466a] text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  {currentSort === option.id && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
