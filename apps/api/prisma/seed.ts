import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Auth account — single login for the assessoria
  const hash = await bcrypt.hash('baldu123', 10);
  await prisma.account.upsert({
    where: { email: 'admin@baldu.com' },
    update: {},
    create: { email: 'admin@baldu.com', password: hash },
  });

  // ── PAULO (owner) ─────────────────────────────────────────────
  const paulo = await prisma.profile.upsert({
    where: { key: 'paulo' },
    update: {},
    create: {
      key: 'paulo',
      name: 'Paulo Ribeiro',
      shortName: 'Paulo',
      initials: 'PR',
      role: 'Dono · Assessoria Carvalho',
      isOwner: true,
      scope: 'Assessoria completa',
      scopeAll: true,
      recents: [
        'Quem comentou em treino hoje?',
        'Atletas sem treino esta semana',
        'Próximas provas dos maratonistas',
        'Threshold do Lucas Camargo',
        'Volume da Triatletas SP semana',
      ],
      statsData: {
        atletas: 47,
        coments: 12,
        inativos: 5,
        provas: 2,
        provasSub: '11 atletas envolvidos',
        quickSub: {
          coments: '6 novos · 2 perguntas',
          inactive: '5 atletas inativos',
          races: '4 em 60 dias',
          attention: '3 com alerta hoje',
        },
        responseTexts: {
          atencao: '<strong>3 atletas precisam de atenção hoje:</strong> Marcelle (3d sem treino), Paulo Andrade (RPE alto) e Lucas (pergunta pendente).',
          comentarios: '<strong>6 comentários nas últimas 24h.</strong> 2 perguntas diretas para você (Lucas, Joana) e 1 marcado como atenção (Marcelle).',
          'sem-treino': '<strong>5 atletas sem treino esta semana.</strong> 2 já passaram de 5 dias — recomendo contato direto.',
          provas: '<strong>4 provas nas próximas 8 semanas</strong> envolvendo 11 atletas. Marcelle tem o evento mais próximo (70.3 em 28d).',
        },
      },
      chartData: {
        title: 'Volume semanal por pasta',
        sub: 'Horas treinadas · últimos 7 dias',
        total: 'Total: <strong>510h</strong> · meta semanal <strong>540h</strong>',
        bars: [
          { label: 'Equipe<br/>Carvalho', val: '142h', h: 78 },
          { label: 'Maratonistas', val: '118h', h: 64 },
          { label: 'Triatletas<br/>SP', val: '94h', h: 52, muted: true },
          { label: 'Iniciantes', val: '68h', h: 38, muted: true },
          { label: 'Trail<br/>Runners', val: '52h', h: 28, muted: true },
          { label: 'Cyclists', val: '36h', h: 20, muted: true },
        ],
      },
      athleteViews: {
        atencao: [
          {
            initials: 'MV', tone: 'rose', name: 'Marcelle Vieira', folder: 'Triatletas SP',
            meta: ['Último treino: Seg · Long ride 90km', 'Próxima: Ironman 70.3 Floripa'],
            badge: { tone: 'rose', text: 'sem treino há 3 dias', pulse: true },
            statMini: { tone: 'rose', v: '3d', l: 'inativa' },
          },
          {
            initials: 'PA', tone: 'amber', name: 'Paulo Andrade', folder: 'Maratonistas',
            meta: ['Tempo run hoje · 14km', 'FC repouso ↑5 bpm · RPE alto 3 sessões'],
            badge: { tone: 'amber', text: 'RPE alto · 3 sessões' },
            statMini: { tone: 'amber', v: '8.5', l: 'rpe médio' },
          },
          {
            initials: 'LC', tone: 'green', name: 'Lucas Camargo', folder: 'Equipe Carvalho',
            meta: ['Intervalado 8×800 hoje', 'Maratona POA em 41 dias'],
            badge: { tone: 'tan', text: 'comentou hoje' },
            statMini: { tone: 'green', v: '+12%', l: 'ritmo' },
          },
        ],
        comentarios: [
          {
            initials: 'LC', tone: 'green', name: 'Lucas Camargo', folder: 'Equipe Carvalho',
            meta: ['"Posso subir o volume?"', 'comentou hoje · 19:05'],
            badge: { tone: 'tan', text: 'pergunta pendente', pulse: true },
            statMini: { tone: 'green', v: '19:05', l: 'hoje' },
          },
          {
            initials: 'BA', tone: 'green', name: 'Beatriz Almeida', folder: 'Iniciantes',
            meta: ['"Primeira vez completando 10km contínuos!"', 'comentou hoje · 14:22'],
            badge: { tone: 'green', text: 'milestone' },
            statMini: { tone: 'green', v: '14:22', l: 'hoje' },
          },
          {
            initials: 'MV', tone: 'rose', name: 'Marcelle Vieira', folder: 'Triatletas SP',
            meta: ['"Tontura e pressão baixa, vou repousar."', 'comentou hoje · 09:17'],
            badge: { tone: 'rose', text: 'atenção', pulse: true },
            statMini: { tone: 'rose', v: '09:17', l: 'hoje' },
          },
          {
            initials: 'PA', tone: 'amber', name: 'Paulo Andrade', folder: 'Maratonistas',
            meta: ['"Perna pesada desde o longão."', 'comentou hoje · 08:30'],
            badge: { tone: 'amber', text: 'observação' },
            statMini: { tone: 'amber', v: '08:30', l: 'hoje' },
          },
        ],
        'sem-treino': [
          {
            initials: 'TS', tone: 'rose', name: 'Tiago Salles', folder: 'Maratonistas',
            meta: ['Último: Long run · 18 mai', 'Sem comentário registrado'],
            badge: { tone: 'rose', text: 'sem treino há 7 dias', pulse: true },
            statMini: { tone: 'rose', v: '7d', l: 'inativo' },
          },
          {
            initials: 'CO', tone: 'amber', name: 'Camila Otero', folder: 'Iniciantes',
            meta: ['Último: Trote 5km · 18 mai', 'Lesão reportada há 4 dias'],
            badge: { tone: 'amber', text: 'sem treino há 6 dias' },
            statMini: { tone: 'amber', v: '6d', l: 'inativa' },
          },
          {
            initials: 'BF', tone: 'amber', name: 'Bruno Falcão', folder: 'Equipe Carvalho',
            meta: ['Último: Tempo · 20 mai', 'Threshold sem atualização há 30d'],
            badge: { tone: 'amber', text: 'sem treino há 4 dias' },
            statMini: { tone: 'amber', v: '4d', l: 'inativo' },
          },
        ],
        provas: [
          {
            initials: 'MV', tone: 'tan', name: 'Marcelle Vieira', folder: 'Triatletas SP',
            meta: ['Ironman 70.3 Floripa · 21 jun', 'Pico de carga: semana 4'],
            badge: { tone: 'tan', text: 'em 28 dias', pulse: true },
            statMini: { tone: 'green', v: 'A2', l: 'foco' },
          },
          {
            initials: 'LC', tone: 'tan', name: 'Lucas Camargo', folder: 'Equipe Carvalho',
            meta: ['Maratona POA · 05 jul', 'Long run subindo 5%/sem'],
            badge: { tone: 'tan', text: 'em 42 dias' },
            statMini: { tone: 'green', v: 'A1', l: 'foco' },
          },
          {
            initials: 'PA', tone: 'tan', name: 'Paulo Andrade', folder: 'Maratonistas',
            meta: ['Maratona POA · 05 jul', 'Ritmo alvo: 4:15/km'],
            badge: { tone: 'tan', text: 'em 42 dias' },
            statMini: { tone: 'amber', v: 'B', l: 'foco' },
          },
        ],
      },
      comments: [
        { time: '19:05', name: 'Lucas Camargo', folder: 'Equipe Carvalho', tone: 'tan', tag: 'pergunta', text: '"Sensações ótimas hoje, completei todos os tiros no ritmo prescrito. Posso subir o volume?"' },
        { time: '14:22', name: 'Beatriz Almeida', folder: 'Iniciantes', tone: 'green', tag: 'feedback', text: '"Primeira vez completando os 10km contínuos! Ainda lento mas sem parar."' },
        { time: '09:17', name: 'Marcelle Vieira', folder: 'Triatletas SP', tone: 'rose', tag: 'atenção', text: '"Não consegui completar a sessão da manhã. Tontura e pressão baixa, vou repousar."' },
        { time: '08:30', name: 'Paulo Andrade', folder: 'Maratonistas', tone: 'amber', tag: 'observação', text: '"Tempo run com sensação travada, perna ainda pesada do longão de domingo."' },
      ],
      races: [
        { day: '21', month: 'jun', name: 'Ironman 70.3 Floripa', sub: 'Triathlon · Florianópolis · SC · em 28 dias', athletes: [['MV', ''], ['RT', 'bg-blue'], ['CS', 'bg-green']], more: '+1' },
        { day: '05', month: 'jul', name: 'Maratona de Porto Alegre', sub: 'Corrida 42km · Porto Alegre · RS · em 42 dias', athletes: [['LC', 'bg-rose'], ['PA', 'bg-amber'], ['TS', ''], ['JP', 'bg-blue']], more: '+2' },
        { day: '19', month: 'jul', name: 'Volta da Pampulha', sub: 'Corrida 18km · Belo Horizonte · MG · em 56 dias', athletes: [['BA', 'bg-green'], ['JM', 'bg-amber']] },
        { day: '10', month: 'ago', name: 'São Silvestre Training Race', sub: 'Corrida 15km · São Paulo · SP · em 78 dias', athletes: [['LC', 'bg-rose'], ['PA', 'bg-amber'], ['BF', '']] },
      ],
      folders: {
        create: [
          { name: 'Equipe Carvalho', tone: 'tan', count: 14 },
          { name: 'Triatletas SP', tone: 'amber', count: 9 },
          { name: 'Maratonistas', tone: 'green', count: 11 },
          { name: 'Iniciantes', tone: 'blue', count: 13 },
        ],
      },
    },
  });

  // ── CARVALHO ──────────────────────────────────────────────────
  await prisma.profile.upsert({
    where: { key: 'carvalho' },
    update: {},
    create: {
      key: 'carvalho',
      name: 'Gabriel Carvalho',
      shortName: 'Gabriel',
      initials: 'GC',
      role: 'Treinador · Corrida',
      avatarClass: 'bg-blue',
      scope: 'Equipe Carvalho',
      scopeAll: false,
      recents: [
        'Quem comentou hoje na minha pasta?',
        'Lucas Camargo · últimos 5 treinos',
        'Bruno Falcão sem treinar há quantos dias?',
        'Threshold do Lucas',
        'Próxima prova do Paulo Andrade',
      ],
      statsData: {
        atletas: 14,
        coments: 5,
        inativos: 2,
        provas: 1,
        provasSub: '4 atletas envolvidos',
        quickSub: {
          coments: '2 novos · 1 pergunta',
          inactive: '2 atletas inativos',
          races: '1 em 60 dias',
          attention: '2 com alerta hoje',
        },
        responseTexts: {
          atencao: '<strong>2 atletas da sua pasta precisam de atenção:</strong> Lucas (pergunta pendente) e Bruno (4d sem treino).',
          comentarios: '<strong>3 comentários da Equipe Carvalho nas últimas 24h.</strong> 1 pergunta direta do Lucas para você.',
          'sem-treino': '<strong>2 atletas da sua pasta sem treino esta semana.</strong> Bruno (4d) e Renata (3d, em viagem).',
          provas: '<strong>2 provas no calendário</strong> da Equipe Carvalho. Maratona POA em 42 dias é a mais próxima.',
        },
      },
      chartData: {
        title: 'Volume diário · Equipe Carvalho',
        sub: 'Horas treinadas · últimos 7 dias',
        total: 'Total: <strong>142h</strong> · meta semanal <strong>150h</strong>',
        bars: [
          { label: 'Seg', val: '24h', h: 72 },
          { label: 'Ter', val: '18h', h: 54 },
          { label: 'Qua', val: '22h', h: 66, muted: true },
          { label: 'Qui', val: '19h', h: 57, muted: true },
          { label: 'Sex', val: '14h', h: 42, muted: true },
          { label: 'Sáb', val: '28h', h: 84 },
          { label: 'Dom', val: '17h', h: 51, muted: true },
        ],
      },
      athleteViews: {
        atencao: [
          {
            initials: 'LC', tone: 'green', name: 'Lucas Camargo', folder: 'Equipe Carvalho',
            meta: ['Intervalado 8×800 hoje', 'Pergunta pendente: "Posso subir o volume?"'],
            badge: { tone: 'tan', text: 'pergunta hoje', pulse: true },
            statMini: { tone: 'green', v: '+12%', l: 'ritmo' },
          },
          {
            initials: 'BF', tone: 'amber', name: 'Bruno Falcão', folder: 'Equipe Carvalho',
            meta: ['Último: Tempo · 20 mai', 'Threshold sem atualização há 30d'],
            badge: { tone: 'amber', text: 'sem treino há 4 dias' },
            statMini: { tone: 'amber', v: '4d', l: 'inativo' },
          },
        ],
        comentarios: [
          {
            initials: 'LC', tone: 'green', name: 'Lucas Camargo', folder: 'Equipe Carvalho',
            meta: ['"Posso subir o volume?"', 'comentou hoje · 19:05'],
            badge: { tone: 'tan', text: 'pergunta pendente', pulse: true },
            statMini: { tone: 'green', v: '19:05', l: 'hoje' },
          },
          {
            initials: 'BF', tone: 'amber', name: 'Bruno Falcão', folder: 'Equipe Carvalho',
            meta: ['"Vou pausar o tempo run de quinta, lombar incomodando."', 'comentou hoje · 11:08'],
            badge: { tone: 'amber', text: 'observação' },
            statMini: { tone: 'amber', v: '11:08', l: 'hoje' },
          },
        ],
        'sem-treino': [
          {
            initials: 'BF', tone: 'amber', name: 'Bruno Falcão', folder: 'Equipe Carvalho',
            meta: ['Último: Tempo · 20 mai', 'Threshold sem atualização há 30d'],
            badge: { tone: 'amber', text: 'sem treino há 4 dias' },
            statMini: { tone: 'amber', v: '4d', l: 'inativo' },
          },
          {
            initials: 'RV', tone: 'amber', name: 'Renata Vargas', folder: 'Equipe Carvalho',
            meta: ['Último: Regenerativo · 21 mai', 'Comentou que está em viagem'],
            badge: { tone: 'amber', text: 'sem treino há 3 dias' },
            statMini: { tone: 'amber', v: '3d', l: 'inativa' },
          },
        ],
        provas: [
          {
            initials: 'LC', tone: 'tan', name: 'Lucas Camargo', folder: 'Equipe Carvalho',
            meta: ['Maratona POA · 05 jul', 'Long run subindo 5%/sem'],
            badge: { tone: 'tan', text: 'em 42 dias', pulse: true },
            statMini: { tone: 'green', v: 'A1', l: 'foco' },
          },
          {
            initials: 'BF', tone: 'tan', name: 'Bruno Falcão', folder: 'Equipe Carvalho',
            meta: ['São Silvestre Training · 10 ago', 'Ritmo alvo: 4:45/km'],
            badge: { tone: 'tan', text: 'em 78 dias' },
            statMini: { tone: 'amber', v: 'B', l: 'foco' },
          },
        ],
      },
      comments: [
        { time: '19:05', name: 'Lucas Camargo', folder: 'Equipe Carvalho', tone: 'tan', tag: 'pergunta', text: '"Posso subir o volume? Sensações ótimas hoje."' },
        { time: '11:08', name: 'Bruno Falcão', folder: 'Equipe Carvalho', tone: 'amber', tag: 'observação', text: '"Vou pausar o tempo run de quinta, lombar incomodando."' },
        { time: '07:42', name: 'Renata Vargas', folder: 'Equipe Carvalho', tone: 'green', tag: 'feedback', text: '"Trote em viagem, 5km tranquilo. Volto à rotina sexta."' },
      ],
      races: [
        { day: '05', month: 'jul', name: 'Maratona de Porto Alegre', sub: 'Corrida 42km · Porto Alegre · RS · em 42 dias', athletes: [['LC', 'bg-rose'], ['BF', '']] },
        { day: '10', month: 'ago', name: 'São Silvestre Training Race', sub: 'Corrida 15km · São Paulo · SP · em 78 dias', athletes: [['LC', 'bg-rose'], ['BF', ''], ['RV', 'bg-amber']] },
      ],
      folders: {
        create: [{ name: 'Equipe Carvalho', tone: 'tan', count: 14 }],
      },
    },
  });

  // ── MARCELLE ──────────────────────────────────────────────────
  await prisma.profile.upsert({
    where: { key: 'marcelle' },
    update: {},
    create: {
      key: 'marcelle',
      name: 'Marcelle Silva',
      shortName: 'Marcelle',
      initials: 'MS',
      role: 'Treinadora · Triathlon',
      avatarClass: 'bg-rose',
      scope: 'Triatletas SP',
      scopeAll: false,
      recents: [
        'Marcelle Vieira sem treinar há quantos dias?',
        'Quem está na fase de pico do 70.3?',
        'Comentários da semana',
        'Volume bike vs corrida',
        'Threshold de bike — Rafael',
      ],
      statsData: {
        atletas: 9,
        coments: 3,
        inativos: 1,
        provas: 1,
        provasSub: '4 atletas envolvidos',
        quickSub: {
          coments: '2 novos',
          inactive: '1 atleta inativo',
          races: '1 em 30 dias',
          attention: '1 com alerta hoje',
        },
        responseTexts: {
          atencao: '<strong>1 atleta da Triatletas SP em alerta:</strong> Marcelle Vieira (3d sem treino, tontura reportada).',
          comentarios: '<strong>2 comentários hoje na Triatletas SP.</strong> Rafael (feedback positivo) e Marcelle (atenção).',
          'sem-treino': '<strong>1 atleta sem treino esta semana:</strong> Marcelle Vieira (3d, lesão reportada).',
          provas: '<strong>1 prova no horizonte de 90 dias:</strong> Ironman 70.3 Floripa em 28 dias, 4 atletas envolvidos.',
        },
      },
      chartData: {
        title: 'Volume por modalidade · Triatletas SP',
        sub: 'Horas treinadas · últimos 7 dias',
        total: 'Total: <strong>94h</strong> · meta semanal <strong>108h</strong>',
        bars: [
          { label: 'Natação', val: '18h', h: 42, muted: true },
          { label: 'Bike', val: '42h', h: 88 },
          { label: 'Corrida', val: '28h', h: 62 },
          { label: 'Força', val: '6h', h: 18, muted: true },
        ],
      },
      athleteViews: {
        atencao: [
          {
            initials: 'MV', tone: 'rose', name: 'Marcelle Vieira', folder: 'Triatletas SP',
            meta: ['Long ride 90km · 2ª-feira', '"Tontura e pressão baixa, vou repousar"'],
            badge: { tone: 'rose', text: 'sem treino há 3 dias', pulse: true },
            statMini: { tone: 'rose', v: '3d', l: 'inativa' },
          },
        ],
        comentarios: [
          {
            initials: 'MV', tone: 'rose', name: 'Marcelle Vieira', folder: 'Triatletas SP',
            meta: ['"Tontura e pressão baixa, vou repousar."', 'comentou hoje · 09:17'],
            badge: { tone: 'rose', text: 'atenção', pulse: true },
            statMini: { tone: 'rose', v: '09:17', l: 'hoje' },
          },
          {
            initials: 'RT', tone: 'green', name: 'Rafael Tonon', folder: 'Triatletas SP',
            meta: ['"Bike de 80km em Z2, perna ótima."', 'comentou hoje · 11:40'],
            badge: { tone: 'green', text: 'feedback' },
            statMini: { tone: 'green', v: '11:40', l: 'hoje' },
          },
        ],
        'sem-treino': [
          {
            initials: 'MV', tone: 'rose', name: 'Marcelle Vieira', folder: 'Triatletas SP',
            meta: ['Último: Long ride 90km · 21 mai', 'Lesão reportada há 3 dias'],
            badge: { tone: 'rose', text: 'sem treino há 3 dias', pulse: true },
            statMini: { tone: 'rose', v: '3d', l: 'inativa' },
          },
        ],
        provas: [
          {
            initials: 'MV', tone: 'tan', name: 'Marcelle Vieira', folder: 'Triatletas SP',
            meta: ['Ironman 70.3 Floripa · 21 jun', 'Pico de carga: semana 4'],
            badge: { tone: 'tan', text: 'em 28 dias', pulse: true },
            statMini: { tone: 'green', v: 'A2', l: 'foco' },
          },
        ],
      },
      comments: [
        { time: '11:40', name: 'Rafael Tonon', folder: 'Triatletas SP', tone: 'green', tag: 'feedback', text: '"Bike de 80km em Z2, perna ótima. Fiz tudo na clip."' },
        { time: '09:17', name: 'Marcelle Vieira', folder: 'Triatletas SP', tone: 'rose', tag: 'atenção', text: '"Tontura e pressão baixa, vou repousar."' },
      ],
      races: [
        { day: '21', month: 'jun', name: 'Ironman 70.3 Floripa', sub: 'Triathlon · Florianópolis · SC · em 28 dias', athletes: [['MV', ''], ['RT', 'bg-blue'], ['CS', 'bg-green'], ['JD', 'bg-amber']] },
      ],
      folders: {
        create: [{ name: 'Triatletas SP', tone: 'amber', count: 9 }],
      },
    },
  });

  console.log('✅ Seed completo — 1 conta, 3 perfis');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
