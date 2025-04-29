import React from 'react';
import { cn } from '../utils/cn';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  onClick?:(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  size = 'md',
  disabled = false,
  className,
  onClick
}) => {
  const sizes = {
    sm: {
      toggle: 'w-8 h-4',
      circle: 'w-3 h-3',
      translateX: 'translate-x-4',
    },
    md: {
      toggle: 'w-11 h-6',
      circle: 'w-5 h-5',
      translateX: 'translate-x-5',
    },
    lg: {
      toggle: 'w-14 h-7',
      circle: 'w-6 h-6',
      translateX: 'translate-x-7',
    },
  };

  return (
    <label
      className={cn(
        "flex items-center cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={() => !disabled && onChange(!checked)}
          onClick={onClick}
          disabled={disabled}
        />
        <div
          className={cn(
            `${sizes[size].toggle} rounded-full transition-colors`,
            checked ? "bg-blue-600" : "bg-gray-300"
          )}
        />
        <div
          className={cn(
            `absolute left-0.5 top-0.5 ${sizes[size].circle} bg-white rounded-full transition-transform transform`,
            checked ? sizes[size].translateX : "translate-x-0"
          )}
        />
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-700">{label}</span>
      )}
    </label>
  );
};

export default Toggle;