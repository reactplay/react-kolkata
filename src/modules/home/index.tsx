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

  const sections = [
    { Component: HeroSection, props: {} },
    { Component: AboutSection, props: {} },
    { Component: SponsorsSection, props: {} },
    { Component: EventsSection, props: {} },
    { Component: CommunitySection, props: {} },
    { Component: BlogSection, props: { initialBlogs, initialEndCursor, error } },
  ];

  return (
    <>
      {sections.map(({ Component, props }, index) => (
        <ErrorBoundary key={index}>
          <Component {...props} />
        </ErrorBoundary>
      ))}
    </>
  );
};

export default LandingPage;
