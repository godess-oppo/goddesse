tsx
// components/ui/FilterButton.tsx
'use client';

import React, { useState } from 'react';

interface FilterButtonProps {
  label: string;
  options: string[];
  activeValue: string;
  onChange: (value: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  label, 
  options, 
  activeValue, 
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-full border transition-all flex items-center gap-2 ${
          activeValue 
            ? 'border-gold text-gold bg-gold/10' 
            : 'border-white/20 text-white/60 hover:border-white/40'
        }`}
      >
        {label} {activeValue && `: ${activeValue}`}
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ↓
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-black border border-gold/30 rounded-lg py-2 z-10 min-w-[200px]">
          {options.map(option => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gold/10 transition-colors ${
                activeValue === option ? 'text-gold' : 'text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
