import React from 'react';

const Loading = ({ size = 40, color = 'text-black', strokeWidth = 4 }) => {
  const circleRadius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * circleRadius;

  return (
    <div className={`flex justify-center items-center`}>
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className={`opacity-100 ${color}`}
          cx={size / 2}
          cy={size / 2}
          r={circleRadius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.25}
        />
      </svg>
    </div>
  );
};

export default Loading;
