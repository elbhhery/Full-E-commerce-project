import MainHeader from "../Home/headerComponents/mainHeader";
import SignBaner from "../Home/headerComponents/signBaner";
import Hero from "../Home/HeroSection";
// import BrandsBaner from "../Hero/brandsBaner";
import NewArrivals from "../Home/newARRIVALS";
import BestSelling from "../Home/bestSelling";
import Browsing from "./collections";
import AboutUs from "../Home/aboutUs";
import { AnimatedTestimonialsDemo } from "../Home/reviews";
import CTA from "../components/shared/CTA";
import AccordionExpandDefault from "../components/shared/FAQ";
import CTAcollections from "../Home/CTAcollections";
import CallOut from "../components/ui/callOut";
import Footer3 from "@/components/shared/Footer";
export default function HomePage() {
  return (
    <>
      <SignBaner />
      <MainHeader />
      <Hero />
      {/* <BrandsBaner /> */}
      <NewArrivals />
      <Browsing />
      <AboutUs />
      <BestSelling />
      <CallOut />
      <CTAcollections />
      <AnimatedTestimonialsDemo />
      <CTA />
      <AccordionExpandDefault />
      <Footer3 />
    </>
  );
}
