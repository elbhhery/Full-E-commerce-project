import smartPhone from "../assets/images/promo01smartPhones.webp";
import headPhone from "../assets/images/promo03headPhone.webp";
import smartwatch from "../assets/images/promo02smartwatch.webp";
import { MainButton } from "@/components/ui/buttons";
import { useState } from "react";

export default function CTAcollections() {
  const collections = [
    {
      promo: "Just In",
      title: "Discover the New Zyra Mobile Collection",
      description:
        "Bold design, faster performence, and smarter controls -- all packed into one sleekdevice that fits right in your pocket",
      handle: "Smartphones",
      image: smartPhone,
      id: 1,
    },
    {
      promo: "Bestsellers",
      title: "Lightweight Smartwatches with Soft Bands",
      description:
        "Lightweight design, flexible bands, and practical tracking features make our smartwatches easy to wear from morning to night.",
      handle: "Smartwatches",
      image: smartwatch,
      id: 2,
    },
    {
      promo: "Fresh Drops",
      title: "Noise Control, Wireless Audio & Battery Life",
      description:
        "Modern headphones with advanced sound tuning, stable Bluetooth connection, and extended battery performance.",
      handle: "Headphones",
      image: headPhone,
      id: 3,
    },
  ];

  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % collections.length);
  };

  return (
    <div className="container w-full mx-auto px-4">
      <div className="relative w-full overflow-hidden">
        {/* slider wrapper */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {collections.map((collection) => (
            <div key={collection.id} className="min-w-full my-12 px-2 md:px-4">
              <div className="rounded-2xl bg-[#f2f7fe] flex flex-col-reverse md:flex-row justify-between">
                <div className="p-3 md:p-6 lg:p-8 pb-30 w-full md:w-1/2 flex flex-col justify-center items-start">
                  <span className="p-0.5 rounded-xl bg-linear-to-r from-indigo-400 via-purple-300 to-pink-200 inline-block">
                    <span className="bg-white rounded-xl block">
                      <span className="p-2 font-medium text-sm">
                        {collection.promo}
                      </span>
                    </span>
                  </span>

                  <h3 className="my-4 text-2xl md:text-4xl lg:text-5xl font-bold text-[#162135] leading-tight">
                    {collection.title}
                  </h3>

                  <p className="max-w-md mb-6 opacity-60 text-sm md:text-base">
                    {collection.description}
                  </p>

                  <MainButton text="View Collection" />
                </div>
                <div className="md:w-[50%] w-full">
                  <img
                    src={collection.image}
                    alt=""
                    className="w-full h-full rounded-2xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:block">
          <button
            onClick={handlePrev}
            className="w-9.5 h-9.5 flex justify-center items-center bg-white shadow rounded-[50%] top-[50%] -translate-y-1/2 absolute  z-30"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path
                d="M6.20005 10.3999L1.80005 5.9999L6.20005 1.5999"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="w-9.5 h-9.5 flex justify-center items-center bg-white shadow rounded-[50%] top-[50%] -translate-y-1/2 absolute right-0 rotate-180 z-30"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path
                d="M6.20005 10.3999L1.80005 5.9999L6.20005 1.5999"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="absolute z-30 bottom-20 md:bottom-20 left-1/2 -translate-x-1/2 w-[90%] md:w-fit max-w-100 md:max-w-none">
          <div className="flex gap-2 bg-white/65 p-2 rounded-[3rem] border border-gray-200 shadow-xl overflow-x-auto no-scrollbar scroll-smooth">
            {collections.map((collection, index) => (
              <button
                key={collection.id}
                onClick={() => setCurrent(index)}
                className={`px-6 py-2 rounded-[3rem] text-xs md:text-sm font-bold transition-all duration-300 shrink-0 min-w-[45%] md:min-w-fit ${
                  index === current
                    ? "bg-[#f2f7fe] text-indigo-600 shadow-sm scale-105"
                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {collection.handle}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
