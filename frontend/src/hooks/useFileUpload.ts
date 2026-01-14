import { useState } from 'react';

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      // Upload logic here
      console.log('Uploading file:', file.name);
    } catch (err) {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading, error };
};