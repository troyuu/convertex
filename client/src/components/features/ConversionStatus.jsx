import RetroProgress from '../ui/RetroProgress';

const STATUS_DISPLAY = {
  idle: { text: 'Ready to convert', color: '#808080' },
  uploading: { text: 'Uploading file...', color: '#000080' },
  pending: { text: 'Waiting in queue...', color: '#000080' },
  processing: { text: 'Converting... Please wait!', color: '#008080' },
  completed: { text: 'Conversion complete! Ready to download.', color: '#008000' },
  downloaded: { text: 'Done! Your files have been permanently deleted from our server.', color: '#008000' },
  failed: { text: 'ERROR: Conversion failed! Please try again.', color: '#FF0000' },
};

export default function ConversionStatus({ status = 'idle', progress = 0, error }) {
  const display = STATUS_DISPLAY[status] || STATUS_DISPLAY.idle;

  return (
    <div className="bevel-sunken bg-white p-3 mt-3">
      {/* Status text */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="inline-block w-3 h-3 bevel-raised"
          style={{ backgroundColor: display.color }}
        />
        <span className="text-sm font-bold" style={{ color: display.color }}>
          {error || display.text}
        </span>
      </div>

      {/* Progress bar for processing state */}
      {(status === 'processing' || status === 'uploading') && (
        <RetroProgress progress={progress} />
      )}

      {/* File lifecycle indicator */}
      <div className="flex gap-2 mt-2 text-[10px] text-retro-gray">
        <span className={status === 'uploading' ? 'font-bold text-retro-navy' : ''}>
          [1] Upload
        </span>
        <span>→</span>
        <span className={status === 'processing' || status === 'pending' ? 'font-bold text-retro-navy' : ''}>
          [2] Convert
        </span>
        <span>→</span>
        <span className={status === 'completed' ? 'font-bold text-retro-navy' : ''}>
          [3] Download
        </span>
        <span>→</span>
        <span className={status === 'downloaded' ? 'font-bold text-retro-green' : ''}>
          [4] File Deleted
        </span>
      </div>
    </div>
  );
}
