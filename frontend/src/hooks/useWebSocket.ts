import { useEffect, useRef } from 'react';

export const useWebSocket = (url: string) => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    ws.current?.send(message);
  };

  return { sendMessage };
};