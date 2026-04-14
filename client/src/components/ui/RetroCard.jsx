export default function RetroCard({ children, className = '' }) {
  return (
    <div className={`bevel-raised bg-retro-silver p-3 ${className}`}>
      {children}
    </div>
  );
}
