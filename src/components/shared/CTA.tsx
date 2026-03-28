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
        <div className="cta-wrapper py-16 md:py-25 rounded-2xl px-6 md:px-[3.8rem] relative overflow-hidden">
          <div className="overlay"></div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="w-full flex flex-col h-full justify-center relative z-10 text-center md:text-left"
          >
            <span className="mb-3">Newsletter</span>
            <h3 className="text-3xl md:text-4xl tracking-[-1px] font-bold mb-5">
              Stay in the Loop
            </h3>
            <div className="flex flex-col md:flex-row justify-between w-full items-center md:items-end gap-8 md:gap-0">
              <div className="flex flex-col gap-2 w-full md:w-auto items-center md:items-start">
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <input
                    type="email"
                    name=""
                    id=""
                    className="border-none bg-white px-4 py-2 md:py-1 rounded block text-gray-600 w-full sm:w-64"
                    placeholder="Your Email..."
                  />
                  <div className="mx-auto w-fit">
                    <MainButton text="Subscribe"></MainButton>
                  </div>
                </div>
                <span className="block text-sm">Thanks For Subscribing!</span>
              </div>

              <div className="md:text-right">
                <p className="max-w-full md:max-w-76 opacity-90">
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
