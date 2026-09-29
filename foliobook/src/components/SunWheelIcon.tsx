import React from 'react';

interface SunWheelIconProps {
  className?: string;
  size?: number;
  glow?: boolean;
  animated?: boolean;
}

export const SunWheelIcon: React.FC<SunWheelIconProps> = ({
  className = '',
  size = 24,
  glow = false,
  animated = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? 'animate-spin-slow' : ''} ${
        glow ? 'drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]' : ''
      } ${className}`}
    >
      {/* Outer ancient ring */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Concentric inner glyph ring */}
      <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="5" fill="currentColor" />

      {/* 8 curved solar spokes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M50 22 C48 30 52 38 50 50"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Outer spoke tooth */}
          <polygon
            points="48,9 52,9 50,4"
            fill="currentColor"
          />
          {/* Intermediate cog notch */}
          <circle cx="50" cy="34" r="1.8" fill="currentColor" />
        </g>
      ))}

      {/* Ancient radial marks */}
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 5" />
    </svg>
  );
};
