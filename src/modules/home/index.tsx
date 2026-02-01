import React from "react";
import { getInitialBlogs } from "@/utils/blog";

import AboutSection from "./(sections)/about";
import BlogSection from "./(sections)/blogs";
import CommunitySection from "./(sections)/community";
import EventsSection from "./(sections)/event";
import HeroSection from "./(sections)/hero";
import NewsletterSection from "./(sections)/newsletter";
import SponsorsSection from "./(sections)/sponsors";

const LandingPage = async () => {
  const { posts: initialBlogs, endCursor: initialEndCursor, error } = await getInitialBlogs();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SponsorsSection />
      <EventsSection />
      <CommunitySection />
      <BlogSection initialBlogs={initialBlogs} initialEndCursor={initialEndCursor} error={error} />
      <NewsletterSection />
    </>
  );
};

export default LandingPage;
