import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => (
  <input
    className={`border border-gray-300 p-2 rounded ${className}`}
    {...props}
  />
);
