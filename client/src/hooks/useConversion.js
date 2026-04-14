import { useState, useRef, useCallback, useEffect } from 'react';
import { startConversion, checkStatus } from '../services/conversionService';
import { POLL_INTERVAL, MAX_POLL_ATTEMPTS } from '../utils/constants';

export function useConversion(conversionType) {
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState(null);
  const [error, setError] = useState(null);
  const pollRef = useRef(null);
  const attemptsRef = useRef(0);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    attemptsRef.current = 0;
  }, []);

  const startPolling = useCallback(
    (id) => {
      stopPolling();
      attemptsRef.current = 0;

      pollRef.current = setInterval(async () => {
        try {
          attemptsRef.current += 1;
          if (attemptsRef.current > MAX_POLL_ATTEMPTS) {
            stopPolling();
            setStatus('failed');
            setError('Conversion timed out. Please try again.');
            return;
          }

          const result = await checkStatus(id);

          if (result.status === 'completed') {
            stopPolling();
            setStatus('completed');
            setProgress(100);
          } else if (result.status === 'failed') {
            stopPolling();
            setStatus('failed');
            setError('Conversion failed. Please try again.');
          } else if (result.status === 'processing') {
            setStatus('processing');
            setProgress((prev) => Math.min(prev + 5, 90));
          }
        } catch (err) {
          stopPolling();
          setStatus('failed');
          setError(err.message || 'Failed to check conversion status.');
        }
      }, POLL_INTERVAL);
    },
    [stopPolling]
  );

  const uploadFile = useCallback(
    async (file) => {
      try {
        setStatus('uploading');
        setProgress(0);
        setError(null);
        setJobId(null);

        const result = await startConversion(conversionType, file);
        setJobId(result.jobId);
        setStatus('processing');
        setProgress(10);
        startPolling(result.jobId);
      } catch (err) {
        setStatus('failed');
        setError(err.message || 'Upload failed. Please try again.');
      }
    },
    [conversionType, startPolling]
  );

  const reset = useCallback(() => {
    stopPolling();
    setStatus('idle');
    setProgress(0);
    setJobId(null);
    setError(null);
  }, [stopPolling]);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  return {
    uploadFile,
    status,
    progress,
    jobId,
    error,
    reset,
  };
}
