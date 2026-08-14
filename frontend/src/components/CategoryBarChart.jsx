export default function CategoryBarChart({ data }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const chartHeight = 150;

  return (
    <div className="flex h-full items-end justify-between gap-3 px-2">
      {data.map((item) => {
        const barHeight = Math.max((item.value / maxValue) * chartHeight, 6);
        return (
          <div
            key={item.label}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <span className="font-inter text-xs font-semibold text-slate-600">
              {item.value}
            </span>
            <div
              className="w-full max-w-10 rounded-t-md transition-all"
              style={{
                height: `${barHeight}px`,
                backgroundColor: item.color,
              }}
              title={`${item.fullLabel}: ${item.value}`}
            />
            <span className="font-inter text-xs font-medium text-slate-500">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
