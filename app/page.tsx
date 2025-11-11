import Navbar from "./components/Navbar";
import Hero from "./components/Hero"
import BackgroundShapes from "./components/BackgroundShapes";
import BenefitsSection from "./components/BenefitsSection";
import PricingTiers from "./components/PricingTiers";
import FAQSection from "./components/FAQ";

export default function Home() {
  return (
    <>
          <BackgroundShapes/>
          <Navbar/>
          <Hero/>
          <BenefitsSection/>
          <PricingTiers/>
          <FAQSection/>

    </>
  );
}