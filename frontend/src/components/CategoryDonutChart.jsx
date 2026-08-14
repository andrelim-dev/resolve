const RADIUS = 70;
const STROKE_WIDTH = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CategoryDonutChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let cumulativePercent = 0;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center">
      <svg viewBox="0 0 180 180" className="h-44 w-44 shrink-0 -rotate-90">
        {/* Track kosong di belakang, jaga-jaga kalau total 0 */}
        <circle
          cx="90"
          cy="90"
          r={RADIUS}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={STROKE_WIDTH}
        />

        {total > 0 &&
          data.map((item) => {
            const percent = item.value / total;
            const dashArray = `${percent * CIRCUMFERENCE} ${CIRCUMFERENCE}`;
            const dashOffset = -cumulativePercent * CIRCUMFERENCE;
            cumulativePercent += percent;

            return (
              <circle
                key={item.label}
                cx="90"
                cy="90"
                r={RADIUS}
                fill="none"
                stroke={item.color}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                strokeLinecap="butt"
              />
            );
          })}
      </svg>

      {/* Legend */}
      <ul className="w-full space-y-2.5 sm:w-auto">
        {data.map((item) => {
          const percent =
            total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <li
              key={item.label}
              className="flex items-center justify-between gap-6 font-inter text-sm"
            >
              <span className="flex items-center gap-2 text-slate-600">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </span>
              <span className="font-semibold text-slate-900">{percent}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
