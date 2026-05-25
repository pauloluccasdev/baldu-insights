'use client';
import { useState } from 'react';
import type { AthleteView } from './Dashboard';

interface Props {
  profile: any;
  onQuery: (view: AthleteView) => void;
}

function route(text: string): AthleteView {
  const t = text.toLowerCase();
  if (t.includes('coment')) return 'comentarios';
  if (t.includes('sem treino') || t.includes('inativo') || t.includes('não trein') || t.includes('nao trein')) return 'sem-treino';
  if (t.includes('prov') || t.includes('calend') || t.includes('evento')) return 'provas';
  return 'atencao';
}

export default function AskHero({ profile, onQuery }: Props) {
  const [value, setValue] = useState('');

  function submit() {
    if (!value.trim()) return;
    onQuery(route(value));
    setValue('');
  }

  return (
    <div className="ask">
      <div className="ask-prompt">
        <h2>Boa noite, <span className="accent">{profile.shortName}</span></h2>
        <p>
          {profile.scopeAll
            ? 'Visão completa da assessoria — todos os atletas e pastas.'
            : `Workspace: ${profile.scope}. Pergunte sobre seus atletas em linguagem natural.`}
        </p>
      </div>
      <div className="ask-input">
        <svg className="search" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          placeholder="Como posso ajudar hoje?"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
        <button className="ask-send" onClick={submit} title="Enviar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </div>
    </div>
  );
}
