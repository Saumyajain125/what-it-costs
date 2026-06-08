"use client";

interface WaterDropProps {
  fillPercent: number;
  litres?: number;
  size?: number;
  showLabel?: boolean;
  className?: string;
}

function interpolateColor(percent: number): string {
  const low = { r: 13, g: 148, b: 136 };
  const high = { r: 251, g: 113, b: 133 };
  const t = Math.min(1, percent / 100);
  const r = Math.round(low.r + (high.r - low.r) * t);
  const g = Math.round(low.g + (high.g - low.g) * t);
  const b = Math.round(low.b + (high.b - low.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function WaterDrop({
  fillPercent,
  litres,
  size = 200,
  showLabel = true,
  className = "",
}: WaterDropProps) {
  const clampedFill = Math.min(100, Math.max(0, fillPercent));
  const fillColor = interpolateColor(clampedFill);
  const dropPath =
    "M100 10 C100 10 160 80 160 130 C160 175 135 195 100 195 C65 195 40 175 40 130 C40 80 100 10 100 10 Z";
  const fillHeight = (clampedFill / 100) * 185;
  const fillY = 195 - fillHeight;

  const ariaLabel = `Water drop showing ${clampedFill.toFixed(0)}% fill${
    litres !== undefined ? `, approximately ${litres} litres` : ""
  }`;

  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 200 220"
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <clipPath id="dropClip">
          <path d={dropPath} />
        </clipPath>
      </defs>

      <path
        d={dropPath}
        fill="none"
        stroke="#0d9488"
        strokeWidth="2.5"
        opacity="0.6"
      />

      <g clipPath="url(#dropClip)">
        <rect
          x="35"
          y={fillY}
          width="130"
          height={fillHeight + 5}
          fill={fillColor}
          style={{
            transition: "y 0.6s ease, height 0.6s ease, fill 0.6s ease",
          }}
        />
        <rect
          x="35"
          y={fillY - 8}
          width="130"
          height="12"
          fill={fillColor}
          opacity="0.5"
          style={{ transition: "y 0.6s ease" }}
        >
          <animate
            attributeName="y"
            values={`${fillY - 8};${fillY - 12};${fillY - 8}`}
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {showLabel && litres !== undefined && (
        <text
          x="100"
          y="125"
          textAnchor="middle"
          fill="#e2e8f0"
          fontSize="22"
          fontWeight="600"
          fontFamily="var(--font-body), sans-serif"
        >
          {litres < 1 ? `${(litres * 1000).toFixed(0)}ml` : `${litres}L`}
        </text>
      )}
    </svg>
  );
}
