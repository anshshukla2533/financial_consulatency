export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'ca';
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client extends User {
  role: 'client';
  itrHistory: ITR[];
}

export interface CA extends User {
  role: 'ca';
  specialization: string[];
  experience: number;
  rating: number;
  totalCases: number;
  earnings: number;
}