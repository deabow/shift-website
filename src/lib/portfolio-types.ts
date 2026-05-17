export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  category: string;
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
  description: string;
  imageUrl: string;
  videoUrl: string;
  published: boolean;
};
