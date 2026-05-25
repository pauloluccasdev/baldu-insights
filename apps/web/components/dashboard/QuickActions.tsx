import type { AthleteView } from './Dashboard';

interface QuickSub {
  coments: string;
  inactive: string;
  races: string;
  attention: string;
}

interface Props {
  quickSub: QuickSub;
  onQuery: (view: AthleteView) => void;
}

export default function QuickActions({ quickSub, onQuery }: Props) {
  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          <h2>Atalhos rápidos</h2>
          <div className="sub">Perguntas mais usadas — um clique para consultar</div>
        </div>
      </div>
      <div className="quick-actions">
        <button className="qa tan" onClick={() => onQuery('comentarios')}>
          <span className="qa-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </span>
          <span className="qa-text">
            <span className="qa-title">Ver comentários de hoje</span>
            <span className="qa-sub">{quickSub.coments}</span>
          </span>
        </button>
        <button className="qa amber" onClick={() => onQuery('sem-treino')}>
          <span className="qa-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </span>
          <span className="qa-text">
            <span className="qa-title">Sem treino esta semana</span>
            <span className="qa-sub">{quickSub.inactive}</span>
          </span>
        </button>
        <button className="qa green" onClick={() => onQuery('provas')}>
          <span className="qa-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h16M6 22V4l5 3 5-3v18"/></svg>
          </span>
          <span className="qa-text">
            <span className="qa-title">Próximas provas</span>
            <span className="qa-sub">{quickSub.races}</span>
          </span>
        </button>
        <button className="qa rose" onClick={() => onQuery('atencao')}>
          <span className="qa-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </span>
          <span className="qa-text">
            <span className="qa-title">Precisam de atenção</span>
            <span className="qa-sub">{quickSub.attention}</span>
          </span>
        </button>
      </div>
    </section>
  );
}
