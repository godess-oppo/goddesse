import React from 'react';

interface TemporalNavigatorProps {
  currentPeriod: string;
  onPeriodChange: (period: string) => void;
}

export default function TemporalNavigator({ currentPeriod, onPeriodChange }: TemporalNavigatorProps) {
  const periods = ['renaissance', 'baroque', 'victorian', 'modern', 'future'];
  
  return (
    <div className="temporal-navigator">
      <h3>Temporal Era</h3>
      <select 
        value={currentPeriod} 
        onChange={(e) => onPeriodChange(e.target.value)}
        className="temporal-select"
      >
        {periods.map(period => (
          <option key={period} value={period}>
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
