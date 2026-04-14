import { useState, useCallback } from 'react';
import { downloadFile } from '../services/conversionService';
import { getConversionType } from '../utils/conversionMap';

export function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [fileDeleted, setFileDeleted] = useState(false);
  const [error, setError] = useState(null);

  const download = useCallback(async (jobId, conversionType, originalFileName) => {
    try {
      setIsDownloading(true);
      setError(null);

      const blob = await downloadFile(jobId);
      const config = getConversionType(conversionType);
      const ext = config ? config.outputFormat : '.bin';
      const baseName = originalFileName
        ? originalFileName.replace(/\.[^.]+$/, '')
        : 'converted';
      const filename = `${baseName}Convertex${ext}`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setFileDeleted(true);
    } catch (err) {
      if (err.status === 410) {
        setError('File has already been deleted.');
        setFileDeleted(true);
      } else {
        setError(err.message || 'Download failed.');
      }
    } finally {
      setIsDownloading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsDownloading(false);
    setFileDeleted(false);
    setError(null);
  }, []);

  return { download, isDownloading, fileDeleted, error, reset };
}
