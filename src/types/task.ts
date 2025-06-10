export interface Task {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

export type FilterType = 'all' | 'active' | 'completed';