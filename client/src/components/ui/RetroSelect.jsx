export default function RetroSelect({
  options = [],
  value,
  onChange,
  className = '',
  ...props
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`bevel-sunken bg-white px-2 py-1 text-sm font-[var(--font-retro)] outline-none cursor-pointer ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
