import { MainButton } from "@/components/ui/buttons";
import { motion, type Variants } from "framer-motion";
export default function CTA() {
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
  return (
    <>
      <div className="container mb-20!">
        <div className="cta-wrapper py-25 rounded-2xl px-[3.8rem]">
          <div className="overlay"></div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="w-full flex flex-col h-full justify-center relative z-10"
          >
            <span className="mb-3">Newsletter</span>
            <h3 className="text-4xl tracking-[-1px] font-bold mb-5">
              Stay in the Loop
            </h3>
            <div className="flex justify-between w-full items-end">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    name=""
                    id=""
                    className="border-none bg-white px-4 py-1 rounded block text-gray-600"
                    placeholder="Your Email..."
                  />
                  <MainButton text="Subscribe"></MainButton>
                </div>
                <span className="block">Thanks For Subscribing!</span>
              </div>
              <div>
                <p className="max-w-76">
                  Sign up for quick updates, early deals, and simple tech
                  insights.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
