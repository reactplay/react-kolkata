import React from "react";

import AboutSection from "./(sections)/about";
import BlogSection from "./(sections)/blogs";
import ContactSection from "./(sections)/contact";
import EventsSection from "./(sections)/event";
import HeroSection from "./(sections)/hero";

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
