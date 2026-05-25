const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('baldu_token');
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Credenciais inválidas');
  return res.json() as Promise<{ accessToken: string }>;
}

export async function apiSelectProfile(profileKey: string, token: string) {
  const res = await fetch(`${BASE}/auth/select-profile`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileKey }),
  });
  if (!res.ok) throw new Error('Erro ao selecionar perfil');
  return res.json() as Promise<{ accessToken: string; profileKey: string }>;
}

export async function apiGetProfiles() {
  const res = await fetch(`${BASE}/profiles`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Erro ao buscar perfis');
  return res.json();
}

export async function apiGetDashboard() {
  const res = await fetch(`${BASE}/dashboard`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Erro ao buscar dashboard');
  return res.json();
}

export function saveSession(token: string, profileKey: string) {
  localStorage.setItem('baldu_token', token);
  localStorage.setItem('baldu_profile', profileKey);
}

export function clearSession() {
  localStorage.removeItem('baldu_token');
  localStorage.removeItem('baldu_profile');
}

export function getSession() {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('baldu_token');
  const profileKey = localStorage.getItem('baldu_profile');
  if (!token || !profileKey || profileKey === 'none') return null;
  return { token, profileKey };
}
