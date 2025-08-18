export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
  createdAt: string;
  updatedAt: string;
  userId: number;
  userEmail: string;
}
