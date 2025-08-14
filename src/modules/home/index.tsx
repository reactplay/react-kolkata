import React from "react";

import AboutSection from "./about-section";
import BlogSection from "./blogs-section";
import ContactSection from "./contact-section";
import EventsSection from "./event-section";
import HeroSection from "./hero-section";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
};

export default LandingPage;
