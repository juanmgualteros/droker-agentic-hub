export type ProductType = 'VALUEFLOWS' | 'TEAM_OF_EXPERTS';

export type ProductCategory = 
  // ValueFlows categories
  | 'SALES'
  | 'ONBOARDING'
  | 'COLLECTIONS'
  // Team of Experts categories
  | 'OPERATIONS'
  | 'NEGOTIATION'
  | 'EXPERT_SALES';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  type: ProductType;
  category: ProductCategory;
  price: number;
  organizationId: string;
  organization: {
    id: string;
    name: string;
  };
  _count: {
    apiKeys: number;
  };
  createdAt: Date;
  updatedAt: Date;
} 