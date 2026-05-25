'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { apiGetProfiles, apiSelectProfile, clearSession, saveSession } from '@/lib/api';

interface Profile {
  id: string;
  key: string;
  name: string;
  initials: string;
  role: string;
  avatarClass?: string;
  isOwner: boolean;
  scope: string;
  athleteCount: number;
  folderCount: number;
}

function avatarClass(p: Profile, index: number) {
  if (p.isOwner) return 'owner';
  return index === 1 ? 'coach-1' : 'coach-2';
}

export default function ProfilePicker() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('baldu_token');
    if (!token) { router.replace('/login'); return; }
    apiGetProfiles()
      .then(setProfiles)
      .catch(() => router.replace('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  const select = useCallback(async (profileKey: string) => {
    const token = localStorage.getItem('baldu_token');
    if (!token || selecting) return;
    setSelecting(profileKey);
    try {
      const res = await apiSelectProfile(profileKey, token);
      saveSession(res.accessToken, res.profileKey);
      router.push('/dashboard');
    } catch {
      setSelecting('');
    }
  }, [router, selecting]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const map: Record<string, number> = { '1': 0, '2': 1, '3': 2 };
      if (e.key in map && profiles[map[e.key]]) {
        select(profiles[map[e.key]].key);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [profiles, select]);

  function handleLogout() {
    clearSession();
    router.push('/login');
  }

  return (
    <div className="screen-profile">
      <div className="profile-top">
        <div className="brand">
          <div className="brand-mark">B</div>
          <div className="brand-name">Baldú Insights</div>
        </div>
        <button className="logout-link" onClick={handleLogout}>← Sair</button>
      </div>

      <div className="profile-content">
        <h1>Quem está consultando?</h1>
        <p className="sub">Selecione seu perfil para acessar seu workspace de treinador.</p>

        {loading ? (
          <p style={{ color: 'var(--ink-3)', fontSize: 14 }}>Carregando perfis…</p>
        ) : (
          <div className="profile-grid">
            {profiles.map((p, i) => (
              <button
                key={p.key}
                className="profile-card"
                onClick={() => select(p.key)}
                disabled={!!selecting}
              >
                {p.isOwner && <span className="profile-badge">DONO</span>}
                <div className={`profile-avatar ${avatarClass(p, i)}`}>{p.initials}</div>
                <div className="profile-name">{p.name}</div>
                <div className="profile-role">{p.role}</div>
                <div className="profile-meta">
                  <span className="dot"></span>
                  {p.athleteCount} atletas · {p.folderCount} {p.folderCount === 1 ? 'pasta' : 'pastas'}
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="profile-foot">
          Pressione <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> para selecionar rapidamente
        </div>
      </div>
    </div>
  );
}
