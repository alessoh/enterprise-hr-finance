/** 90 daily uptime readings as thin rects. Inline SVG, no client JS. */
export function UptimeBars({ days, label }: { days: number[]; label: string }) {
  const gap = 1;
  const width = 3;
  const height = 22;
  const total = days.length * (width + gap) - gap;

  return (
    <svg
      viewBox={`0 0 ${total} ${height}`}
      className="h-[22px] w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label={`${label}: 90-day uptime history`}
    >
      {days.map((value, index) => {
        // Healthy days are neutral so the eye lands on the exceptions. Ninety saturated
        // green bars per row would make "fine" the loudest thing on the page.
        const healthy = value >= 99.9;
        const tone = healthy ? "fill-border-strong" : value >= 99 ? "fill-warning" : "fill-danger";
        return (
          <rect
            key={index}
            x={index * (width + gap)}
            y={0}
            width={width}
            height={height}
            rx={1}
            className={tone}
            opacity={healthy ? 0.7 : 1}
          />
        );
      })}
    </svg>
  );
}
