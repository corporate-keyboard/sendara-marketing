export interface Lead {
  type: 'demo' | 'waitlist';
  name?: string;
  email: string;
  agency_name?: string;
  phone?: string;
  agents_count?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}
