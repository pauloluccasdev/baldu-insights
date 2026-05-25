export interface ProfileData {
  id: string;
  key: string;
  name: string;
  shortName: string;
  initials: string;
  role: string;
  avatarClass?: string;
  isOwner: boolean;
  scope: string;
  scopeAll: boolean;
}

export interface FolderData {
  id: string;
  name: string;
  tone: string;
  count: number;
}

export interface AthleteCard {
  id?: string;
  initials: string;
  tone: string;
  name: string;
  folder: string;
  meta: string[];
  badge: { tone: string; text: string; pulse?: boolean };
  statMini: { tone: string; v: string; l: string };
}

export interface CommentItem {
  id?: string;
  time: string;
  name: string;
  folder: string;
  tone: string;
  tag: string;
  text: string;
}

export interface RaceItem {
  id?: string;
  day: string;
  month: string;
  name: string;
  sub: string;
  athletes: Array<[string, string]>;
  more?: string;
}

export interface ChartBar {
  label: string;
  val: string;
  h: number;
  muted?: boolean;
}

export type AthleteView = 'atencao' | 'comentarios' | 'sem-treino' | 'provas';

export interface DashboardData {
  profile: ProfileData;
  folders: FolderData[];
  recents: string[];
  stats: {
    atletas: number;
    coments: number;
    inativos: number;
    provas: number;
    provasSub: string;
  };
  quickSub: {
    coments: string;
    inactive: string;
    races: string;
    attention: string;
  };
  chart: {
    title: string;
    sub: string;
    total: string;
    bars: ChartBar[];
  };
  athletes: Record<AthleteView, AthleteCard[]>;
  comments: CommentItem[];
  races: RaceItem[];
  responseTexts: Record<AthleteView, string>;
}

export interface LoginResponse {
  accessToken: string;
  profileKey: string;
}

export interface AuthSession {
  accessToken: string;
  profileKey: string;
}
