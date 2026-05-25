interface StatsData {
  atletas: number;
  coments: number;
  inativos: number;
  provas: number;
  provasSub: string;
}

interface Props {
  stats: StatsData;
}

export default function Stats({ stats }: Props) {
  return (
    <section className="stats">
      <div className="stat">
        <div className="stat-head tan">
          <span className="ico">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </span>
          Atletas ativos
        </div>
        <div className="stat-num">{stats.atletas}</div>
        <div className="stat-trend"><span className="up">↑ 3</span> vs semana passada</div>
      </div>
      <div className="stat">
        <div className="stat-head green">
          <span className="ico">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </span>
          Comentários hoje
        </div>
        <div className="stat-num">{stats.coments}</div>
        <div className="stat-trend"><span className="up">↑ 4</span> vs ontem</div>
      </div>
      <div className="stat">
        <div className="stat-head amber">
          <span className="ico">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </span>
          Sem treino 7d
        </div>
        <div className="stat-num">{stats.inativos}</div>
        <div className="stat-trend"><span className="down">↑ 2</span> vs semana passada</div>
      </div>
      <div className="stat">
        <div className="stat-head blue">
          <span className="ico">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          </span>
          Provas próx. 30d
        </div>
        <div className="stat-num">{stats.provas}</div>
        <div className="stat-trend"><span style={{ color: 'var(--ink-3)' }}>{stats.provasSub}</span></div>
      </div>
    </section>
  );
}
