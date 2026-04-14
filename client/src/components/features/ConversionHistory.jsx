import { useLocalHistory } from '../../hooks';

export default function ConversionHistory() {
  const { history, clearHistory } = useLocalHistory();

  if (history.length === 0) return null;

  return (
    <div className="bevel-raised bg-retro-silver p-3 mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Recent Conversions</h3>
        <button className="retro-btn text-xs" onClick={clearHistory}>
          Clear
        </button>
      </div>

      <div className="bevel-sunken bg-white p-2 max-h-40 overflow-y-auto">
        {history.slice(0, 10).map((entry, i) => (
          <div
            key={i}
            className="flex justify-between items-center text-xs py-1"
            style={{ borderBottom: i < history.length - 1 ? '1px dotted #C0C0C0' : 'none' }}
          >
            <span className="font-bold">{entry.type}</span>
            <span className="text-retro-gray">{entry.date}</span>
            <span style={{ color: entry.status === 'completed' ? '#008000' : '#FF0000' }}>
              {entry.status === 'completed' ? 'OK' : 'FAIL'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
