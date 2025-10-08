import React from "react";
import { getInitialBlogs } from "@/utils/blog";

import AboutSection from "./(sections)/about";
import BlogSection from "./(sections)/blogs";
import EventsSection from "./(sections)/event";
import HeroSection from "./(sections)/hero";

const LandingPage = async () => {
  const { posts: initialBlogs, endCursor: initialEndCursor } = await getInitialBlogs();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <BlogSection initialBlogs={initialBlogs} initialEndCursor={initialEndCursor} />
    </>
  );
};

export default LandingPage;
