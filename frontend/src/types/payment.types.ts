export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  type: 'service' | 'subscription';
  description: string;
  transactionId?: string;
  createdAt: Date;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking';
  details: any; // Card details, UPI ID, etc.
}