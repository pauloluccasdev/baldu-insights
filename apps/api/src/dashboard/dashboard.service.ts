import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(profileKey: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { key: profileKey },
      include: { folders: true },
    });

    if (!profile) throw new NotFoundException('Perfil não encontrado');

    const stats = profile.statsData as any;

    return {
      profile: {
        id: profile.id,
        key: profile.key,
        name: profile.name,
        shortName: profile.shortName,
        initials: profile.initials,
        role: profile.role,
        avatarClass: profile.avatarClass,
        isOwner: profile.isOwner,
        scope: profile.scope,
        scopeAll: profile.scopeAll,
      },
      folders: profile.folders.map((f) => ({
        id: f.id,
        name: f.name,
        tone: f.tone,
        count: f.count,
      })),
      recents: profile.recents,
      stats: {
        atletas: stats.atletas,
        coments: stats.coments,
        inativos: stats.inativos,
        provas: stats.provas,
        provasSub: stats.provasSub,
      },
      quickSub: stats.quickSub,
      chart: profile.chartData,
      athletes: profile.athleteViews,
      comments: profile.comments,
      races: profile.races,
      responseTexts: stats.responseTexts,
    };
  }
}
