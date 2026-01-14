export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const ITR_FORMS = {
  ITR_1: 'ITR-1',
  ITR_2: 'ITR-2',
  ITR_3: 'ITR-3',
  ITR_4: 'ITR-4',
};

export const USER_ROLES = {
  CLIENT: 'client',
  CA: 'ca',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
};