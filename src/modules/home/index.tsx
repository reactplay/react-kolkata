import React from "react";
import { getInitialBlogs } from "@/utils/blog";

import ErrorBoundary from "@/components/common/error-boundary";

import AboutSection from "./(sections)/about";
import BlogSection from "./(sections)/blogs";
import CommunitySection from "./(sections)/community";
import EventsSection from "./(sections)/event";
import HeroSection from "./(sections)/hero";
import SponsorsSection from "./(sections)/sponsors";

const WithErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>{children}</ErrorBoundary>
);

const LandingPage = async () => {
  const { posts: initialBlogs, endCursor: initialEndCursor, error } = await getInitialBlogs();

  return (
    <>
      <WithErrorBoundary>
        <HeroSection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <AboutSection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <SponsorsSection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <EventsSection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <CommunitySection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <BlogSection initialBlogs={initialBlogs} initialEndCursor={initialEndCursor} error={error} />
      </WithErrorBoundary>
    </>
  );
};

export default LandingPage;
