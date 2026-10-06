import { Body, Controller, Get, Put } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';
import { ProfileDto } from './profile.dto.js';

const PROFILE_ID = 1;

@Controller('profile')
export class ProfileController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  get() {
    return this.prisma.profile.findUnique({ where: { id: PROFILE_ID } });
  }

  @Put()
  save(@Body() dto: ProfileDto) {
    const data = {
      ...dto,
      email: dto.email ?? null,
      location: dto.location ?? null,
      githubUrl: dto.githubUrl ?? null,
      linkedinUrl: dto.linkedinUrl ?? null,
    };
    return this.prisma.profile.upsert({
      where: { id: PROFILE_ID },
      create: { id: PROFILE_ID, ...data },
      update: data,
    });
  }
}
