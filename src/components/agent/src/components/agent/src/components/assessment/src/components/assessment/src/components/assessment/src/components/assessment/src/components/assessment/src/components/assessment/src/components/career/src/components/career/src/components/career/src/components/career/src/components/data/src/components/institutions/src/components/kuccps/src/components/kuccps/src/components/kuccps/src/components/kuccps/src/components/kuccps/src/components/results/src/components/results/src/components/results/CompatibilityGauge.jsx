import React from 'react';

export default function CompatibilityGauge({ score, size = 72 }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;

  const color = score >= 80 ? '#10b981' : score >= 60 ? '#d4a853' : '#6b7280';
  const trackColor = score >= 80 ? '#064e3b' : score >= 60 ? '#451a03' : '#1f2937';

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={6}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeDasharray={`${filled} ${circumference - filled}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold" style={{ color }}>{score}%</span>
      </div>
    </div>
  );
}
