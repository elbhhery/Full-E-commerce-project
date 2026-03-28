import { motion, type Variants } from "framer-motion";
import about1 from "../assets/images/about1.avif";
import about2 from "../assets/images/about2.avif";
import about3 from "../assets/images/about3.avif";
import FlowButton from "@/components/ui/buttons";
const lineVariant: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};
const imageVariant: Variants = {
  hidden: {
    opacity: 0,
    scaleX: 0.5,
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};
const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
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
export default function AboutUs() {
  return (
    <>
      <motion.span
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="text-center block text-xl font-medium text-[#656b76] mt-12"
      >
        ABOUT US
      </motion.span>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.35 }}
        className="mx-auto my-12 flex flex-col items-center text-2xl md:text-5xl lg:text-[4rem] font-bold text-[#162135] leading-16 md:leading-22"
      >
        <motion.div
          variants={lineVariant}
          className="flex flex-wrap items-center justify-center"
        >
          <span>Bringing Smarter</span>

          <motion.span variants={imageVariant}>
            <img
              src={about1}
              alt=""
              className="mx-2 block w-25 md:w-35 lg:w-40 rounded-xl"
            />
          </motion.span>
        </motion.div>

        <motion.div
          variants={lineVariant}
          className="flex flex-wrap items-center justify-center"
        >
          <span>Solutions</span>

          <motion.span variants={imageVariant}>
            <img
              src={about2}
              alt=""
              className="mx-2 block w-25 md:w-35 lg:w-40 rounded-xl"
            />
          </motion.span>

          <span>&amp; experiences</span>
        </motion.div>

        <motion.div
          variants={lineVariant}
          className="flex flex-wrap items-center justify-center"
        >
          <span>to simplify your</span>

          <motion.span variants={imageVariant}>
            <img
              src={about3}
              alt=""
              className="mx-2 block w-25 md:w-35 lg:w-40 rounded-xl"
            />
          </motion.span>

          <span>life</span>
        </motion.div>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>
        <FlowButton text="Read Our Story"></FlowButton>
      </motion.div>
    </>
  );
}
