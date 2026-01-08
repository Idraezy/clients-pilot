export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'Lead' | 'Active' | 'Completed';
  notes: string;
  createdAt: string;
}

export type Page = 'dashboard' | 'clients' | 'settings';