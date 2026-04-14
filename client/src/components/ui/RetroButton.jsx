export default function RetroButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`retro-btn ${className}`}
    >
      {children}
    </button>
  );
}
