'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiGetDashboard, clearSession, getSession } from '@/lib/api';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AskHero from './AskHero';
import QuickActions from './QuickActions';
import Stats from './Stats';
import AthleteList from './AthleteList';
import BarChart from './BarChart';
import CommentsList from './CommentsList';
import RacesList from './RacesList';

export type AthleteView = 'atencao' | 'comentarios' | 'sem-treino' | 'provas';

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [view, setView] = useState<AthleteView>('atencao');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (!session) { router.replace('/login'); return; }
    apiGetDashboard()
      .then(setData)
      .catch(() => router.replace('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  function handleQuery(v: AthleteView) {
    setView(v);
    if (data?.responseTexts?.[v]) setResponse(data.responseTexts[v]);
    document.querySelector('.grid-2')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleLogout() {
    clearSession();
    router.push('/login');
  }

  if (loading || !data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--ink-3)' }}>
        Carregando…
      </div>
    );
  }

  const profile = data.profile;

  return (
    <div className="screen-dashboard" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="app">
        <Sidebar
          profile={profile}
          folders={data.folders}
          recents={data.recents}
          stats={data.stats}
        />
        <main className="main">
          <Topbar profile={profile} onSwitchProfile={() => router.push('/profiles')} onLogout={handleLogout} />

          <div className="content">
            <AskHero profile={profile} onQuery={handleQuery} />

            {response && (
              <div className="response-strip visible">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="txt" dangerouslySetInnerHTML={{ __html: response }} />
                <button className="dismiss" onClick={() => setResponse('')}>Fechar</button>
              </div>
            )}

            <QuickActions quickSub={data.quickSub} onQuery={handleQuery} />

            <Stats stats={data.stats} />

            <section className="grid-2">
              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h2>Precisam de atenção</h2>
                    <div className="sub">Atletas com sinais de alerta · critério automático</div>
                  </div>
                  <a className="link" href="#">Ver todos →</a>
                </div>
                <AthleteList athletes={data.athletes[view] || []} />
              </div>

              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h2>{data.chart.title}</h2>
                    <div className="sub">{data.chart.sub}</div>
                  </div>
                  <a className="link" href="#">Detalhar →</a>
                </div>
                <BarChart bars={data.chart.bars} total={data.chart.total} />
              </div>
            </section>

            <section className="grid-2-alt">
              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h2>Comentários recentes</h2>
                    <div className="sub">Últimas 24h · {data.comments.length} comentários</div>
                  </div>
                  <a className="link" href="#">Ver todos →</a>
                </div>
                <CommentsList comments={data.comments} />
              </div>

              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h2>Próximas provas</h2>
                    <div className="sub">{data.races.length} eventos</div>
                  </div>
                  <a className="link" href="#">Calendário →</a>
                </div>
                <RacesList races={data.races} />
              </div>
            </section>

            <div className="api-line">
              <span className="dot"></span>
              Dados sincronizados com <code>TrainingPeaks API</code> · atualizado há 2min
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
