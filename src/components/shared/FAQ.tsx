import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
export default function AccordionExpandDefault() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const accordion = [
    {
      Q: "What payment methods do you accept?",
      A: " We accept all major credit and debit cards, PayPal, Apple Pay, and Google Pay. You can also use Shop Pay for quick checkout and split your payment into easy installments.",
      id: "1",
    },
    {
      Q: "How long does shipping take?",
      A: "Orders are usually processed within 1–2 business days. Standard shipping takes 3–7 days depending on your location, and you’ll receive a tracking link as soon as your order is on the way.",
      id: "2",
    },
    {
      Q: "Can I return or exchange my order?",
      A: " Yes, absolutely. If your item isn’t what you expected, you can return it within 30 days of delivery in its original packaging. Just contact our support team, and we’ll guide you through the quick return process.",
      id: "3",
    },
    {
      Q: "Does your products come with warranty?",
      A: "Yes, all of our electronics include a 1-year limited warranty covering manufacturing defects. If you ever experience an issue, just reach out — we’ll help sort it out quickly.",
      id: "4",
    },
    {
      Q: "Are your products compatible with all devices?",
      A: "Most of our products are designed to work seamlessly with both iOS and Android devices. You can check each product page for specific compatibility details before making your purchase.",
      id: "5",
    },
  ];
  return (
    <div className="container mx-auto mb-20! lg:px-50!">
      <h2 className="text-[#162135] w-full text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
        Frequently Asked Questions
      </h2>
      {accordion.map((accordion) => {
        return (
          <Accordion
            key={accordion.id}
            className="accordion"
            expanded={expanded === accordion.id}
            onMouseEnter={() => setExpanded(accordion.id)}
            onClick={() =>
              setExpanded(expanded === accordion.id ? null : accordion.id)
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" className="accordion-header">
                {accordion.Q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="accordion-paragraph">
                {accordion.A}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
