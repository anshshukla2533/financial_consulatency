// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const api = {
  baseURL: API_BASE_URL,
  // Add common headers, interceptors, etc.
};