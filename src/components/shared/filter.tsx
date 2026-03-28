import { AnimatePresence, motion } from "framer-motion";
import Accordion, { accordionClasses } from "@mui/material/Accordion";
import { type AccordionSlots } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { useState } from "react";

interface FilterSide {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export default function FilterSlider({ isOpen, setIsOpen }: FilterSide) {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <>
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

            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white z-70 rounded-t-[32px] shadow-2xl p-6 pb-10 md:max-w-md md:mx-auto md:bottom-10 md:rounded-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", duration: 0.1 }}
            >
              {/* head */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#162135]">Filters</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="  hover:bg-gray-100 rounded-full"
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
              {/* avaibilty */}
              {/* <Accordion
                expanded={expanded}
                onChange={handleExpansion}
                slots={{ transition: Fade as AccordionSlots["transition"] }}
                slotProps={{ transition: { timeout: 400 } }}
                sx={[
                  expanded
                    ? {
                        [`& .${accordionClasses.region}`]: {
                          height: "auto",
                        },
                        [`& .${accordionDetailsClasses.root}`]: {
                          display: "block",
                        },
                      }
                    : {
                        [`& .${accordionClasses.region}`]: {
                          height: 0,
                        },
                        [`& .${accordionDetailsClasses.root}`]: {
                          display: "none",
                        },
                      },
                ]}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">Availability</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography></Typography>
                </AccordionDetails>
              </Accordion> */}
              {/* EXTRA */}
              <div className="mt-8 space-y-3">
                <button className="w-full rounded-full bg-black text-white py-3 font-medium cursor-pointer hover:bg-neutral-800 transition">
                  Shop Now
                </button>
                {/* <div>{product.title}</div> */}
                <button className="w-full rounded-full border py-3 font-medium cursor-pointer hover:bg-gray-50 transition">
                  Contact Us
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
