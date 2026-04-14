export default function RetroBadge({ children, color = '#C0C0C0', textColor = '#000000' }) {
  return (
    <span
      className="bevel-raised inline-block px-2 py-0.5 text-xs font-bold"
      style={{ backgroundColor: color, color: textColor }}
    >
      {children}
    </span>
  );
}
