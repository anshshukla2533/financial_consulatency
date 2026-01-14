import { useState } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState<string[]>([]);

  const addToast = (message: string) => {
    setToasts(prev => [...prev, message]);
    setTimeout(() => {
      setToasts(prev => prev.slice(1));
    }, 3000);
  };

  return { toasts, addToast };
};