import { useState, useEffect } from 'react';
import { get } from '../../services/api';

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchStats() {
      try {
        const stats = await get('/stats');
        if (!cancelled) {
          setCount(stats.totalConversions || 0);
        }
      } catch {
        if (!cancelled) {
          setCount(1337);
        }
      }
    }
    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  const digits = count !== null ? String(count).padStart(7, '0') : '-------';

  return (
    <div className="inline-block">
      <div className="text-[9px] text-center text-retro-gray mb-0.5">
        You are visitor #
      </div>
      <div
        className="bevel-sunken px-2 py-1 font-bold tracking-widest text-sm inline-block"
        style={{
          backgroundColor: '#000000',
          color: '#00FF00',
          fontFamily: '"Courier New", monospace',
          textShadow: '0 0 4px #00FF00',
        }}
      >
        {digits.split('').map((d, i) => (
          <span
            key={i}
            className="inline-block w-3 text-center"
            style={{ borderRight: i < digits.length - 1 ? '1px solid #003300' : 'none' }}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="text-[9px] text-center text-retro-gray mt-0.5">
        Files Converted
      </div>
    </div>
  );
}
