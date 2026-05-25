interface RaceItem {
  day: string;
  month: string;
  name: string;
  sub: string;
  athletes: [string, string][];
  more?: string;
}

interface Props {
  races: RaceItem[];
}

export default function RacesList({ races }: Props) {
  return (
    <div>
      {races.map((r, i) => (
        <div key={i} className="race">
          <div className="race-date">
            <div className="d">{r.day}</div>
            <div className="m">{r.month}</div>
          </div>
          <div className="race-body">
            <div className="race-name">{r.name}</div>
            <div className="race-sub">{r.sub}</div>
          </div>
          <div className="race-stack">
            {r.athletes.map(([initials, avatarClass], j) => (
              <div key={j} className={`avatar${avatarClass ? ` ${avatarClass}` : ''}`}>
                {initials}
              </div>
            ))}
            {r.more && <span className="more">{r.more}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
