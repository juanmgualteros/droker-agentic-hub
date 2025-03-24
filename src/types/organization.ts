export interface Organization {
  id: string;
  name: string;
  state?: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED';
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    users: number;
    products: number;
    apiKeys?: number;
    subscription?: number;
  };
  subscription?: {
    type: 'NONE' | 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE';
    status: 'ACTIVE' | 'INACTIVE' | 'CANCELLED' | 'EXPIRED';
  } | null;
  apiKeys?: {
    id: string;
    name: string;
    type: 'OPENAI' | 'SUPABASE' | 'OTHER';
  }[];
} 