import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async login(email: string, password: string) {
    const account = await this.prisma.account.findUnique({ where: { email } });
    if (!account) throw new UnauthorizedException('Credenciais inválidas');

    const valid = await bcrypt.compare(password, account.password);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas');

    const token = this.jwt.sign({ sub: account.id, profileKey: 'none' });
    return { accessToken: token };
  }

  async selectProfile(profileKey: string) {
    const profile = await this.prisma.profile.findUnique({ where: { key: profileKey } });
    if (!profile) throw new UnauthorizedException('Perfil não encontrado');

    const token = this.jwt.sign({ sub: profile.id, profileKey });
    return { accessToken: token, profileKey };
  }
}
