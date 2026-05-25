interface AthleteCard {
  initials: string;
  tone: string;
  name: string;
  folder: string;
  meta: string[];
  badge: { tone: string; text: string; pulse?: boolean };
  statMini: { tone: string; v: string; l: string };
}

interface Props {
  athletes: AthleteCard[];
}

export default function AthleteList({ athletes }: Props) {
  if (!athletes.length) {
    return <div style={{ padding: '20px 0', color: 'var(--ink-3)', fontSize: 13 }}>Nenhum atleta nesta categoria.</div>;
  }

  return (
    <div>
      {athletes.map((a, i) => (
        <div key={i} className="athlete-row">
          <div className={`avatar ${a.tone}`}>{a.initials}</div>
          <div className="athlete-body">
            <div className="athlete-head">
              <span className="athlete-name">{a.name}</span>
              <span className="folder-tag">
                <span className="dot"></span>
                {a.folder}
              </span>
              <span className={`badge ${a.badge.tone}${a.badge.pulse ? ' pulse' : ''}`}>{a.badge.text}</span>
            </div>
            {a.meta.map((m, j) => (
              <div key={j} className="athlete-meta">{m}</div>
            ))}
          </div>
          <div className={`stat-mini ${a.statMini.tone}`}>
            <div className="v">{a.statMini.v}</div>
            <div className="l">{a.statMini.l}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
