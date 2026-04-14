export default function PrivacyBanner() {
  return (
    <div className="bevel-raised p-3 mb-4" style={{ backgroundColor: '#FFFFCC' }}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Pixel art lock icon */}
            <rect x="10" y="14" width="12" height="12" fill="#808080" stroke="#000" strokeWidth="1" />
            <rect x="11" y="15" width="10" height="10" fill="#C0C0C0" />
            <rect x="12" y="6" width="8" height="10" fill="none" stroke="#808080" strokeWidth="2" />
            <rect x="14" y="8" width="4" height="6" fill="none" stroke="#404040" strokeWidth="1" />
            <rect x="15" y="18" width="2" height="4" fill="#000" />
            <rect x="14" y="18" width="4" height="2" fill="#000" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-sm mb-1" style={{ color: '#000080' }}>
            Your files are safe!
          </h3>
          <ul className="text-xs space-y-0.5">
            <li>* Files are deleted IMMEDIATELY after conversion</li>
            <li>* We NEVER store your files on our servers</li>
            <li>* All transfers are encrypted</li>
            <li>* Zero tracking - no cookies, no analytics on your files</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
