export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  published: boolean;
  heroImage: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string;
  keyFeatures: string[];
  bentoSpan: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "dental-clinic-system",
    name: "Dental Clinic System",
    category: "Healthcare Platform",
    published: true,
    heroImage:
      "https://images.unsplash.com/photo-1588776814546-ec7e38f6f9c7?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A full digital operations platform for a multi-branch clinic network, balancing speed, booking automation, and patient privacy.",
    challenge:
      "The clinic team struggled with fragmented scheduling and inconsistent patient data between branches, leading to delays and missed follow-ups.",
    solution:
      "SHIFT engineered a centralized Next.js platform with secure role-based access, real-time appointment orchestration, and automated reminders.",
    results:
      "Appointment completion rate improved by 34%, admin overhead dropped by 40%, and branch reporting became real-time for leadership.",
    keyFeatures: ["Responsive UX", "AI Chatbot Intake", "Secure DB Architecture"],
    bentoSpan: "md:col-span-2 md:row-span-2",
  },
  {
    slug: "legal-branding",
    name: "Legal Branding",
    category: "Identity & Conversion Website",
    published: true,
    heroImage:
      "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A refined digital presence for a law firm focused on trust, credibility, and lead conversion.",
    challenge:
      "The firm had outdated messaging and a low-converting website that did not reflect its premium legal positioning.",
    solution:
      "We delivered a bold brand system and conversion-focused website with structured service pages and rapid lead funnels.",
    results:
      "Qualified inquiry volume increased by 2.1x in the first quarter and bounce rate was cut by nearly half.",
    keyFeatures: [
      "High-Performance Frontend",
      "SEO Information Architecture",
      "Lead Qualification Flow",
    ],
    bentoSpan: "md:col-span-1 md:row-span-1",
  },
  {
    slug: "logistics-command-hub",
    name: "Logistics Command Hub",
    category: "Enterprise Dashboard",
    published: true,
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    summary:
      "An executive command dashboard unifying fleet, delivery, and warehouse operations.",
    challenge:
      "Decision makers lacked one source of truth for shipment delays, SLA status, and fleet utilization metrics.",
    solution:
      "SHIFT built a modular operations dashboard with live data pipelines, custom KPIs, and alert-driven workflow panels.",
    results:
      "Dispatch response times improved by 27%, while operations visibility became proactive rather than reactive.",
    keyFeatures: ["Role-based Dashboard", "Live KPI Streams", "Audit-ready Logs"],
    bentoSpan: "md:col-span-1 md:row-span-1",
  },
  {
    slug: "retail-mobile-suite",
    name: "Retail Mobile Suite",
    category: "Cross-platform App",
    published: false,
    heroImage:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A customer-facing mobile commerce experience designed for retention and rapid checkout.",
    challenge:
      "The brand needed one mobile codebase with rich UX and strong performance across Android and iOS.",
    solution:
      "We delivered a Flutter/React Native architecture with shared business logic, personalized offers, and resilient API integration.",
    results:
      "Mobile conversion climbed by 31% and repeat purchase behavior increased significantly in 60 days.",
    keyFeatures: [
      "Cross-platform Foundation",
      "Realtime Promotions",
      "Payment Security Layer",
    ],
    bentoSpan: "md:col-span-1 md:row-span-1",
  },
  {
    slug: "secure-fintech-portal",
    name: "Secure Fintech Portal",
    category: "Cybersecurity Engineering",
    published: true,
    heroImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A finance-grade platform with strict security controls and frictionless user onboarding.",
    challenge:
      "The client required enterprise security standards without harming user experience or onboarding speed.",
    solution:
      "SHIFT implemented secure-by-default architecture, hardened auth flows, encrypted storage patterns, and pentest remediation.",
    results:
      "Security posture passed external assessments and onboarding completion improved due to cleaner UX flow.",
    keyFeatures: ["Secure Auth Flows", "Encrypted Data Paths", "Pentest-Ready Stack"],
    bentoSpan: "md:col-span-2 md:row-span-1",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export const publishedCaseStudies = caseStudies.filter(
  (caseStudy) => caseStudy.published,
);
