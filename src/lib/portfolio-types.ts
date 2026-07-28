export type PortfolioCategory = 
  | "web-dev" 
  | "digital-marketing" 
  | "media-production";

export const PORTFOLIO_CATEGORIES = [
  { id: "all", labelEn: "All Projects", labelAr: "كل الأعمال" },
  { id: "web-dev", labelEn: "Web & Software Development", labelAr: "تطوير الويب والبرمجيات" },
  { id: "digital-marketing", labelEn: "Digital Marketing", labelAr: "التسويق الرقمي" },
  { id: "media-production", labelEn: "Media Production & Branding", labelAr: "الإنتاج الإعلامي وبناء الهوية" },
] as const;

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  /** Human-readable client sector / product type */
  clientType: string;
  category: PortfolioCategory | string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  challenge: string;
  solution: string;
  results: string;
  keyFeatures: string[];
  bentoSpan: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreatePortfolioInput = {
  title: string;
  category?: PortfolioCategory | string;
  clientType?: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  challenge?: string;
  solution?: string;
  results?: string;
  keyFeatures?: string[];
  published: boolean;
};
