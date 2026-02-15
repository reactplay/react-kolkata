import React from "react";
import { getInitialBlogs } from "@/utils/blog";

import ErrorBoundary from "@/components/common/error-boundary";

import AboutSection from "./(sections)/about";
import CoreTeam from "./(sections)/about/core-team";
import BlogSection from "./(sections)/blogs";
import CommunitySection from "./(sections)/community";
import EventsSection from "./(sections)/event";
import HeroSection from "./(sections)/hero";
import SponsorsSection from "./(sections)/sponsors";
import VolunteerSection from "./(sections)/volunteers";

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
        <CoreTeam />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <VolunteerSection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <CommunitySection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        {error ? (
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <p className="text-red-400">Failed to load blogs. Please try again later.</p>
          </div>
        ) : (
          <BlogSection
            initialBlogs={initialBlogs}
            initialEndCursor={initialEndCursor}
            error={error}
          />
        )}
      </WithErrorBoundary>
    </>
  );
};

export default LandingPage;
