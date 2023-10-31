import React from "react";
import Hero from "./Hero";
import Values from "./Values";
import CustomDivider from "./CustomDivider";
import HowItWorks from "./HowItWorks";
import HelpSection from "./HelpSection";

function Home() {
  return (
    <>
      <Hero />
      <Values />
      <CustomDivider />
      <HowItWorks />
      <HelpSection />
    </>
  );
}

export default Home;
