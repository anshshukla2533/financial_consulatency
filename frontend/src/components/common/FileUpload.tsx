import React from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, accept }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <input
      type="file"
      onChange={handleFileChange}
      accept={accept}
      className="file-upload"
    />
  );
};

export default FileUpload;