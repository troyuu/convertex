import { useState, useCallback } from 'react';

export default function useFileUpload() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    setError(null);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }, []);

  const clearFile = useCallback(() => {
    setFile(null);
    setError(null);
  }, []);

  return { file, isDragging, error, setError, handleDragOver, handleDragLeave, handleDrop, handleFileSelect, clearFile };
}
