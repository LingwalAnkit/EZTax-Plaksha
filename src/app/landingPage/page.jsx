import React from "react";
import { HeroSection } from "./components/heroSection";
import Steps from "./components/steps";
import { FeatureSection } from "./components/feature";
import Footer from "../../components/layout/footer";

export default function LandingPage() {
  return (
    <>
      <HeroSection></HeroSection>
      <FeatureSection></FeatureSection>
      <Steps></Steps>
      <Footer></Footer>
    </>
  );
}
