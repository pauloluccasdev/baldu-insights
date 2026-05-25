'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiLogin, saveSession } from '@/lib/api';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@baldu.com');
  const [password, setPassword] = useState('baldu123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { accessToken } = await apiLogin(email, password);
      saveSession(accessToken, 'none');
      router.push('/profiles');
    } catch {
      setError('E-mail ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="screen-login">
      <div className="login-wrap">
        {/* LEFT */}
        <div className="login-left">
          <div className="login-logo">
            <div className="brand-mark">B</div>
            <div className="brand-name">Baldú</div>
          </div>

          <h2>Entrar</h2>

          <form onSubmit={handleLogin}>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <div className="field-input">
                <svg className="field-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="field">
              <label htmlFor="password">Senha</label>
              <div className="field-input">
                <svg className="field-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>

            <label className="checkbox">
              <input type="checkbox" defaultChecked />
              Manter conectado
            </label>

            {error && <p className="error-msg">{error}</p>}

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>

          <div className="login-foot">
            <div>
              <span>Ainda não tem conta? <a href="#">Falar com a Baldú</a></span><br/>
              <a href="#">Esqueci a senha</a>
            </div>
          </div>

          <div className="sso-row">
            <button className="sso-icon" title="Continuar com Google" onClick={handleLogin}>
              <svg viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.9 3.4 14.7 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12s4.3 9.5 9.5 9.5c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"/>
              </svg>
            </button>
            <button className="sso-icon" title="Continuar com TrainingPeaks" onClick={handleLogin}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#A47148" strokeWidth="2.2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </button>
            <button className="sso-icon" title="Continuar com Apple" onClick={handleLogin}>
              <svg viewBox="0 0 24 24" fill="#1a1410"><path d="M17.05 20.28c-.98.95-2.05.86-3.08.43-1.09-.45-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.43C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <div className="hero-shine"></div>
          <div className="hero-diagonal one"></div>
          <div className="hero-diagonal two"></div>
          <div className="hero-emblem">B</div>

          <div className="hero-top">
            <div className="hero-label">
              <span className="dot"></span>
              Baldú Insights
            </div>
            <div className="hero-version">MVP v0.1</div>
          </div>

          <div className="hero-content">
            <h1>O copiloto operacional do <span className="accent">treinador moderno</span>.</h1>
            <p>Pergunte em linguagem natural sobre seus atletas. Comentários, treinos, thresholds e provas — tudo conectado ao TrainingPeaks.</p>

            <div className="hero-card">
              <h3>O que você ganha</h3>
              <div className="hero-feat">
                <span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span><strong>Consultas em linguagem natural</strong> — esqueça filtros e menus.</span>
              </div>
              <div className="hero-feat">
                <span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span><strong>Multi-treinador</strong> — cada professor com seu workspace.</span>
              </div>
              <div className="hero-feat">
                <span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span><strong>Visão de assessoria</strong> — agregue todas as pastas.</span>
              </div>

              <div className="hero-foot">
                <div className="stack-mini">
                  <div className="avatar">PR</div>
                  <div className="avatar bg-blue">GC</div>
                  <div className="avatar bg-rose">MS</div>
                </div>
                <span className="txt"><strong>3 treinadores</strong> ativos no seu workspace</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
