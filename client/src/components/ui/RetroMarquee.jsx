export default function RetroMarquee({ children, speed = 15 }) {
  return (
    <div className="overflow-hidden bevel-sunken bg-white py-1">
      <div
        className="whitespace-nowrap inline-block"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        <span className="text-sm font-bold text-retro-navy px-4">
          {children}
        </span>
      </div>
    </div>
  );
}
