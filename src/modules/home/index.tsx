import React from "react";
import { getInitialBlogs } from "@/utils/blog";

import ErrorBoundary from "@/components/common/error-boundary";

import AboutSection from "./(sections)/about";
import BlogSection from "./(sections)/blogs";
import CommunitySection from "./(sections)/community";
import EventsSection from "./(sections)/event";
import HeroSection from "./(sections)/hero";
import SponsorsSection from "./(sections)/sponsors";

const LandingPage = async () => {
  const { posts: initialBlogs, endCursor: initialEndCursor, error } = await getInitialBlogs();

  return (
    <>
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <AboutSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <SponsorsSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <EventsSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <CommunitySection />
      </ErrorBoundary>
      <ErrorBoundary>
        <BlogSection initialBlogs={initialBlogs} initialEndCursor={initialEndCursor} error={error} />
      </ErrorBoundary>
    </>
  );
};

export default LandingPage;
