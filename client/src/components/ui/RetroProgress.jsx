export default function RetroProgress({ progress = 0 }) {
  const blockCount = 20;
  const filledBlocks = Math.round((progress / 100) * blockCount);

  return (
    <div className="w-full">
      <div className="bevel-sunken bg-white p-1 flex gap-0.5" style={{ height: '24px' }}>
        {Array.from({ length: blockCount }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-full"
            style={{
              backgroundColor: i < filledBlocks ? '#000080' : 'transparent',
            }}
          />
        ))}
      </div>
      <div className="text-center text-xs mt-1 font-[var(--font-retro)]">
        {progress}%
      </div>
    </div>
  );
}
