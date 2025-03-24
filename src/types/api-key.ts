export type ApiKeyType = 'OPENAI' | 'SUPABASE' | 'OTHER';

export interface ApiKey {
  id: string;
  name: string;
  type: ApiKeyType;
  value: string;
  organizationId: string;
  organization: {
    id: string;
    name: string;
  };
  _count: {
    products: number;
  };
  createdAt: Date;
  updatedAt: Date;
} 