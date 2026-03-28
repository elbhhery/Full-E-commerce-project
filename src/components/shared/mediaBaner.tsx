import headPhone from "../../assets/images/headphones.avif";
import promo from "../../assets/images/promo-banner.webp";
import { MainButton } from "../ui/buttons";
import { motion, type Variants } from "framer-motion";
export default function MediaBaner() {
  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const scale: Variants = {
    scaled: {
      scale: 1.2,
    },
    normal: {
      scale: 1,
    },
  };
  return (
    <div className="container my-18 px-4 md:px-0">
      <div className="relative w-full min-h-100 flex items-center overflow-hidden rounded-3xl group">
        <motion.img
          variants={scale}
          initial="scaled"
          whileInView="normal"
          src={promo}
          alt="Promo Banner"
          className="absolute inset-0 w-full h-full object-cover object-right transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="relative z-10 p-8 md:p-16 max-w-2xl flex flex-col gap-4 text-white"
        >
          <span className="uppercase tracking-widest text-sm font-medium">
            Fresh Drops
          </span>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight flex flex-wrap items-center gap-3">
            <span>Noise Control</span>
            <img
              src={headPhone}
              alt=""
              className="w-12 h-12 object-contain inline-block animate-bounce"
            />
            <span className="block w-full">Wireless Audio</span>
          </h2>

          <p className="text-gray-200 text-lg md:text-xl max-w-md leading-relaxed">
            Modern headphones with advanced sound tuning, stable Bluetooth
            connection, and extended battery performance.
          </p>

          <div className="">
            <MainButton text="View More" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
