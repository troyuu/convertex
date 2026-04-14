import { useParams, Link } from 'react-router';
import { useState, useCallback, useEffect, useRef } from 'react';
import PageContainer from '../components/layout/PageContainer';
import RetroWindow from '../components/ui/RetroWindow';
import RetroButton from '../components/ui/RetroButton';
import PrivacyBanner from '../components/ui/PrivacyBanner';
import FileUploader from '../components/features/FileUploader';
import FilePreview from '../components/features/FilePreview';
import ConversionStatus from '../components/features/ConversionStatus';
import FormatBadge from '../components/features/FormatBadge';
import { useConversion } from '../hooks/useConversion';
import { useDownload } from '../hooks/useDownload';
import { useFileValidation } from '../hooks/useFileValidation';
import { useLocalHistory } from '../hooks/useLocalHistory';
import { CONVERSION_TYPES } from '../utils/conversionMap';

export default function ConvertPage() {
  const { type } = useParams();
  const conversionConfig = CONVERSION_TYPES[type];
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadFile, status, progress, jobId, error: conversionError, reset: resetConversion } = useConversion(type);
  const { download, isDownloading, fileDeleted, error: downloadError, reset: resetDownload } = useDownload();
  const { validate, error: validationError } = useFileValidation();
  const { addEntry, updateEntry } = useLocalHistory();
  const historyIdRef = useRef(null);

  // Update history when status changes to completed or failed
  useEffect(() => {
    if (!historyIdRef.current) return;
    if (status === 'completed') {
      updateEntry(historyIdRef.current, { status: 'completed' });
    } else if (status === 'failed') {
      updateEntry(historyIdRef.current, { status: 'failed' });
    }
  }, [status, updateEntry]);

  const handleFileSelect = useCallback(
    (file) => {
      if (!conversionConfig) return;
      const isValid = validate(file, conversionConfig.inputFormats, conversionConfig.maxSize);
      if (isValid) {
        setSelectedFile(file);
        uploadFile(file);
        historyIdRef.current = addEntry({ type, status: 'processing' });
      }
    },
    [conversionConfig, validate, uploadFile, type, addEntry]
  );

  const handleDownload = useCallback(async () => {
    if (!jobId) return;
    await download(jobId, type, selectedFile?.name);
  }, [jobId, type, download, selectedFile]);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
    historyIdRef.current = null;
    resetConversion();
    resetDownload();
  }, [resetConversion, resetDownload]);

  if (!conversionConfig) {
    return (
      <PageContainer>
        <RetroWindow title="Error">
          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" shapeRendering="crispEdges">
                <circle cx="12" cy="12" r="10" fill="#FF0000" />
                <rect x="11" y="5" width="2" height="10" fill="#FFF" />
                <rect x="11" y="17" width="2" height="2" fill="#FFF" />
              </svg>
              <span className="font-bold" style={{ color: '#FF0000' }}>
                ERROR: Unknown conversion type!
              </span>
            </div>
            <p className="text-xs mt-2">
              The conversion type "{type}" does not exist.
            </p>
            <Link to="/tools" className="text-xs mt-2 inline-block">
              View all available tools
            </Link>
          </div>
        </RetroWindow>
      </PageContainer>
    );
  }

  const currentStatus = fileDeleted ? 'downloaded' : status;
  const currentError = validationError || conversionError || downloadError;

  return (
    <PageContainer>
      {/* Privacy banner */}
      <PrivacyBanner />

      {/* Format info */}
      <div className="flex items-center gap-2 my-3 flex-wrap">
        <span className="text-xs font-bold text-retro-gray">Input:</span>
        {conversionConfig.inputFormats.map((fmt) => (
          <FormatBadge key={fmt} format={fmt} />
        ))}
        <span className="font-bold text-lg mx-1">-{'>'}</span>
        <span className="text-xs font-bold text-retro-gray">Output:</span>
        <FormatBadge format={conversionConfig.outputFormat} />
      </div>

      {/* Main conversion window */}
      <RetroWindow title={`${conversionConfig.name} -- CONVERTEX`}>
        <div className="p-4">
          <h2 className="font-bold text-base mb-1">{conversionConfig.name}</h2>
          <p className="text-xs text-retro-gray mb-3">{conversionConfig.description}</p>

          {/* File uploader - only show when idle */}
          {currentStatus === 'idle' && (
            <FileUploader
              acceptedFormats={conversionConfig.inputFormats}
              maxSize={conversionConfig.maxSize}
              onFileSelect={handleFileSelect}
              conversionType={type}
            />
          )}

          {/* Validation error */}
          {validationError && currentStatus === 'idle' && (
            <div className="bevel-raised p-2 mt-2 text-xs" style={{ backgroundColor: '#FFFFFF' }}>
              <span style={{ color: '#FF0000' }}>ERROR: {validationError}</span>
            </div>
          )}

          {/* File preview */}
          {selectedFile && currentStatus !== 'idle' && (
            <FilePreview file={selectedFile} />
          )}

          {/* Conversion status */}
          {currentStatus !== 'idle' && (
            <ConversionStatus
              status={currentStatus}
              progress={progress}
              error={currentError}
            />
          )}

          {/* Download button */}
          {currentStatus === 'completed' && jobId && !fileDeleted && (
            <div className="text-center mt-3">
              <RetroButton
                onClick={handleDownload}
                disabled={isDownloading}
                className="text-base font-bold px-8 py-2"
              >
                {isDownloading ? 'Downloading...' : '[ DOWNLOAD ]'}
              </RetroButton>
              <p className="text-xs text-retro-gray mt-1">
                File will be deleted from server after download
              </p>
            </div>
          )}

          {/* File deleted confirmation */}
          {fileDeleted && (
            <div className="text-center mt-3">
              <div
                className="bevel-raised p-2 inline-block text-xs"
                style={{ backgroundColor: '#C0C0C0' }}
              >
                <span style={{ color: '#008000' }}>** File Downloaded & Deleted **</span>
                <br />
                <span className="text-retro-gray">
                  Your file has been permanently removed from our servers.
                </span>
              </div>
            </div>
          )}

          {/* Reset button */}
          {(currentStatus === 'downloaded' || currentStatus === 'failed') && (
            <div className="mt-3">
              <RetroButton onClick={handleReset} className="w-full text-sm">
                Convert Another File
              </RetroButton>
            </div>
          )}
        </div>
      </RetroWindow>
    </PageContainer>
  );
}
