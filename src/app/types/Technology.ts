// app/types/Technology.ts
export interface Technology {
  id: number;
  name: string;
  description?: string | null;
  website?: string | null;
  category: 'frontend' | 'backend' | 'devops' | 'data' | 'mobile' | 'testing' | 'other';
  created_at: string;
  updated_at: string;
}