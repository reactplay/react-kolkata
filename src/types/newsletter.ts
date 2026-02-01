export interface NewsletterSubscription {
  email: string;
  subscribedAt?: Date;
  interests?: string[];
}

export interface NewsletterFormData {
  email: string;
  interests: string[];
}

export const NEWSLETTER_INTERESTS = {
  EVENTS: "events",
  TECH_TALKS: "tech_talks",
  WORKSHOPS: "workshops",
  COMMUNITY_NEWS: "community_news",
} as const;

export type NewsletterInterest =
  (typeof NEWSLETTER_INTERESTS)[keyof typeof NEWSLETTER_INTERESTS];
