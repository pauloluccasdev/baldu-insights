interface ChartBar {
  label: string;
  val: string;
  h: number;
  muted?: boolean;
}

interface Props {
  bars: ChartBar[];
  total: string;
}

export default function BarChart({ bars, total }: Props) {
  return (
    <div className="chart-wrap">
      <div className="chart">
        {bars.map((bar, i) => (
          <div key={i} className="bar-col">
            <div
              className={`bar${bar.muted ? ' muted' : ''}`}
              style={{ height: `${bar.h}%` }}
            >
              <span className="bar-val">{bar.val}</span>
            </div>
            <div
              className="bar-label"
              dangerouslySetInnerHTML={{ __html: bar.label }}
            />
          </div>
        ))}
      </div>
      <div className="chart-foot">
        <div className="label">
          <span className="swatch"></span>Volume alto&nbsp;&nbsp;
          <span className="swatch soft"></span>Volume médio/baixo
        </div>
        <div className="label" dangerouslySetInnerHTML={{ __html: total }} />
      </div>
    </div>
  );
}
