export interface CAProfile {
  id: string;
  userId: string;
  specialization: string[];
  experience: number;
  certifications: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  bio: string;
  hourlyRate: number;
  availability: boolean;
}

export interface CARequest {
  id: string;
  clientId: string;
  caId: string;
  itrId: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  createdAt: Date;
}