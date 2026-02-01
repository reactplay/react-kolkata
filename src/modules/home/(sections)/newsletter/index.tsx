"use client";

import AnimatedSection from "@/components/custom/animated-section";
import { NewsletterSubscription } from "@/components/common/newsletter";

export default function NewsletterSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <AnimatedSection>
        <NewsletterSubscription />
      </AnimatedSection>
    </section>
  );
}
