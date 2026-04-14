import { useState, useCallback } from 'react';
import { getFileExtension } from '../utils/fileUtils';

export function useFileValidation() {
  const [error, setError] = useState(null);

  const validate = useCallback((file, acceptedFormats, maxSize) => {
    setError(null);

    if (!file) {
      setError('No file selected.');
      return false;
    }

    const ext = getFileExtension(file.name);
    if (!acceptedFormats.includes(ext)) {
      setError(
        `Invalid file type "${ext}". Accepted formats: ${acceptedFormats.join(', ')}`
      );
      return false;
    }

    if (file.size > maxSize) {
      const maxMB = (maxSize / (1024 * 1024)).toFixed(0);
      setError(`File too large. Maximum size is ${maxMB} MB.`);
      return false;
    }

    if (file.size === 0) {
      setError('File is empty.');
      return false;
    }

    return true;
  }, []);

  return { validate, error, setError };
}
