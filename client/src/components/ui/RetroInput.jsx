import { forwardRef } from 'react';

const RetroInput = forwardRef(function RetroInput(
  { className = '', ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={`bevel-sunken bg-white px-2 py-1 text-sm font-[var(--font-retro)] w-full outline-none ${className}`}
      {...props}
    />
  );
});

export default RetroInput;
