import React from "react";

import ErrorBoundary from "@/components/common/error-boundary";
import { GallarySection } from "@/base/data/gallary";

import AboutSection from "./(sections)/about";
import CoreTeam from "./(sections)/about/core-team";
import ChampionSection from "./(sections)/champions";
import CommunitySection from "./(sections)/community";
import EventsSection from "./(sections)/event";
import FaqSection from "./(sections)/faq";
import HeroSection from "./(sections)/hero";
import Gallery from "./(sections)/img-gallary";
import TimelineSection from "./(sections)/timeline";

const WithErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>{children}</ErrorBoundary>
);

const LandingPage = async () => {
  return (
    <>
      <WithErrorBoundary>
        <HeroSection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <AboutSection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <TimelineSection />
      </WithErrorBoundary>
      {/* <WithErrorBoundary>
        <SponsorsSection />
      </WithErrorBoundary> */}
      <WithErrorBoundary>
        <EventsSection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <CommunitySection />
      </WithErrorBoundary>
      {/* <WithErrorBoundary>
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
      </WithErrorBoundary> */}
      <WithErrorBoundary>
        <CoreTeam />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <ChampionSection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <Gallery sections={GallarySection} />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <FaqSection />
      </WithErrorBoundary>
    </>
  );
};

export default LandingPage;
