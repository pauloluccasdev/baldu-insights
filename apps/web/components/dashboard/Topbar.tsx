'use client';
import { useState, useEffect, useRef } from 'react';

interface Props {
  profile: any;
  onSwitchProfile: () => void;
  onLogout: () => void;
}

export default function Topbar({ profile, onSwitchProfile, onLogout }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-title">
        <span className="ico-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
        </span>
        Dashboard
        <span className={`scope${profile.scopeAll ? ' all' : ''}`}>{profile.scope}</span>
      </div>

      <div className="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input placeholder="Buscar atletas, provas, comentários…" />
        <span className="kbd">⌘K</span>
      </div>

      <div className="topbar-right">
        <button className="icon-btn" title="Notificações">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className="badge-dot"></span>
        </button>

        <div ref={ref} className={`user-pill${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
          <div className={`avatar${profile.avatarClass ? ` ${profile.avatarClass}` : ''}`}>{profile.initials}</div>
          <div className="name">{profile.shortName}</div>
          <svg className="chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>

          <div className="user-menu">
            <div className="menu-head">
              <div className="who">{profile.name}</div>
              <div className="what">{profile.role}</div>
            </div>
            <button className="menu-item" onClick={(e) => { e.stopPropagation(); onSwitchProfile(); }}>
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Trocar perfil
            </button>
            <button className="menu-item">
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"/></svg>
              Preferências
            </button>
            <div className="menu-divider"></div>
            <button className="menu-item danger" onClick={(e) => { e.stopPropagation(); onLogout(); }}>
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sair da conta
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
