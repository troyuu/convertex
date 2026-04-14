import { useState } from 'react';
import { downloadFile } from '../../services/conversionService';

export default function DownloadButton({ jobId, onDownloaded }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    if (isDownloading || downloaded) return;
    setIsDownloading(true);

    try {
      const blob = await downloadFile(jobId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted-file`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloaded(true);
      if (onDownloaded) onDownloaded();
    } catch {
      // Error handled by caller
    } finally {
      setIsDownloading(false);
    }
  };

  if (downloaded) {
    return (
      <div className="text-center mt-3">
        <div className="bevel-raised bg-retro-green p-3">
          <p className="font-bold text-retro-black text-sm">
            DOWNLOAD COMPLETE!
          </p>
          <p className="text-xs mt-1">
            Your files have been permanently deleted from our server.
          </p>
        </div>
      </div>
    );
  }

  return (
    <button
      className="retro-btn w-full mt-3 py-3 text-base font-bold bg-retro-teal text-white"
      style={{ borderColor: '#00FFFF #004040 #004040 #00FFFF' }}
      onClick={handleDownload}
      disabled={isDownloading}
    >
      {isDownloading ? 'Downloading...' : 'DOWNLOAD FILE'}
    </button>
  );
}
