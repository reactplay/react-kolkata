"use client";

import AnimatedSection from "@/components/custom/animated-section";

import CommunityPartners from "../event/community-partners";

export default function CommunitySection() {
  return (
    <AnimatedSection className="relative">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
        <CommunityPartners />
      </div>
    </AnimatedSection>
  );
}
