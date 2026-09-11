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
        // Healthy days read as healthy, but quietly: a near-white bar says "disabled",
        // and a saturated one makes "fine" the loudest thing on the page.
        const healthy = value >= 99.9;
        const tone = healthy ? "fill-success" : value >= 99 ? "fill-warning" : "fill-danger";
        return (
          <rect
            key={index}
            x={index * (width + gap)}
            y={0}
            width={width}
            height={height}
            rx={1}
            className={tone}
            // Healthy days are legible but muted, so ninety of them never outshout the
            // two or three that are not.
            opacity={healthy ? 0.32 : 1}
          />
        );
      })}
    </svg>
  );
}
