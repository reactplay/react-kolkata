import React from "react";

import ErrorBoundary from "@/components/common/error-boundary";

import EventsSection from "./(sections)/event";
import CommunityPartners from "./(sections)/event/community-partners";
import FaqSection from "./(sections)/faq";
import HeroSection from "./(sections)/hero";
import ReviewsSection from "./(sections)/reviews";
import SponsorsSection from "./(sections)/sponsors";

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
        <EventsSection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <SponsorsSection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <CommunityPartners />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <ReviewsSection />
      </WithErrorBoundary>
      <WithErrorBoundary>
        <FaqSection />
      </WithErrorBoundary>
    </>
  );
};

export default LandingPage;
