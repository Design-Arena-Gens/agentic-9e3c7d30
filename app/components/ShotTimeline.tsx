"use client";

import type { ShotSegment } from "../data/shots";

interface ShotTimelineProps {
  segments: ShotSegment[];
  activeId: string;
  onSelect: (id: string) => void;
}

const colorByTemperature: Record<ShotSegment["colorTemperature"], string> = {
  icy: "var(--gradient-icy)",
  transition: "var(--gradient-transition)",
  golden: "var(--gradient-golden)"
};

export function ShotTimeline({ segments, activeId, onSelect }: ShotTimelineProps) {
  const totalDuration = segments.reduce(
    (accumulator, segment) => accumulator + segment.durationSeconds,
    0
  );

  return (
    <div className="timeline" role="list" aria-label="Shot sequence timeline">
      {segments.map((segment) => {
        const widthPercent = (segment.durationSeconds / totalDuration) * 100;
        const isActive = segment.id === activeId;

        return (
          <button
            key={segment.id}
            type="button"
            className={`timeline__segment${isActive ? " timeline__segment--active" : ""}`}
            style={{
              width: `${widthPercent}%`,
              background: colorByTemperature[segment.colorTemperature]
            }}
            onClick={() => onSelect(segment.id)}
            aria-pressed={isActive}
            aria-current={isActive}
          >
            <span className="timeline__label">{segment.title}</span>
            <span className="timeline__timecode">{segment.timecode}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ShotTimeline;
