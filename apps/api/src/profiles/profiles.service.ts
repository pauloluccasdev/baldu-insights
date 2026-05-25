import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const profiles = await this.prisma.profile.findMany({
      include: { folders: true },
      orderBy: [{ isOwner: 'desc' }, { name: 'asc' }],
    });

    return profiles.map((p) => ({
      id: p.id,
      key: p.key,
      name: p.name,
      shortName: p.shortName,
      initials: p.initials,
      role: p.role,
      avatarClass: p.avatarClass,
      isOwner: p.isOwner,
      scope: p.scope,
      scopeAll: p.scopeAll,
      athleteCount: p.folders.reduce((s, f) => s + f.count, 0),
      folderCount: p.folders.length,
    }));
  }
}
