import { useState } from 'react';

export default function RetroTooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          className="absolute z-50 left-1/2 bottom-full mb-1 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs"
          style={{
            backgroundColor: '#FFFFE1',
            border: '1px solid #000000',
            color: '#000000',
            fontFamily: 'var(--font-retro)',
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}
