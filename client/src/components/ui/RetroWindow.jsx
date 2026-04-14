export default function RetroWindow({ title, children, className = '' }) {
  return (
    <div className={`bevel-window bg-retro-silver ${className}`}>
      <div className="title-bar">
        <span>{title}</span>
        <div className="title-bar-controls flex">
          <button aria-label="Minimize">_</button>
          <button aria-label="Maximize">[]</button>
          <button aria-label="Close">X</button>
        </div>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
}
