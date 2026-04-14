import { useRef } from 'react';
import useFileUpload from './useFileUpload';
import FormatBadge from './FormatBadge';

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" shapeRendering="crispEdges" className="mx-auto mb-2">
    <rect x="7" y="10" width="10" height="10" fill="#808080" />
    <rect x="8" y="11" width="8" height="8" fill="#FFCC00" />
    <rect x="9" y="5" width="6" height="6" fill="none" stroke="#808080" strokeWidth="2" />
    <rect x="11" y="14" width="2" height="3" fill="#808080" />
  </svg>
);

export default function FileUploader({ acceptedFormats = [], maxSize, onFileSelect, conversionType }) {
  const inputRef = useRef(null);
  const { file, isDragging, handleDragOver, handleDragLeave, handleDrop, handleFileSelect, clearFile } = useFileUpload();

  const handleDragDrop = (e) => {
    handleDrop(e);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && onFileSelect) onFileSelect(droppedFile);
  };

  const handleSelect = (e) => {
    handleFileSelect(e);
    const selectedFile = e.target.files[0];
    if (selectedFile && onFileSelect) onFileSelect(selectedFile);
  };

  const acceptString = acceptedFormats.join(',');

  return (
    <div
      className={`bevel-sunken p-6 text-center cursor-pointer ${
        isDragging ? 'bg-retro-cyan' : 'bg-white'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={acceptString}
        onChange={handleSelect}
        className="hidden"
      />

      <LockIcon />

      {file ? (
        <div>
          <p className="font-bold text-retro-navy">{file.name}</p>
          <p className="text-xs text-retro-gray mt-1">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
          <button
            className="retro-btn mt-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              clearFile();
            }}
          >
            Clear
          </button>
        </div>
      ) : (
        <div>
          <p className="font-bold text-retro-navy mb-1">
            Drop your file here or click to browse
          </p>
          <p className="text-xs text-retro-gray mb-2">
            Your file is encrypted during transfer and deleted after conversion
          </p>
          <div className="flex gap-1 justify-center flex-wrap">
            {acceptedFormats.map((fmt) => (
              <FormatBadge key={fmt} format={fmt} />
            ))}
          </div>
          {maxSize && (
            <p className="text-xs text-retro-gray mt-1">
              Max size: {(maxSize / 1024 / 1024).toFixed(0)} MB
            </p>
          )}
        </div>
      )}
    </div>
  );
}
