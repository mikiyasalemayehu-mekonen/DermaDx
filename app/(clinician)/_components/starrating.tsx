"use client";

import { useState } from "react";

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  const LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}
            className="transition-transform hover:scale-110 active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7"
              fill={(hovered || value) >= star ? "#f59e0b" : "none"}
              stroke={(hovered || value) >= star ? "#f59e0b" : "#d1d5db"}
              strokeWidth={1.8}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>
      {value > 0 && <span className="text-xs text-gray-400">{LABELS[value]}</span>}
    </div>
  );
}

export default StarRating;