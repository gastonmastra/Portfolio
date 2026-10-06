import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

const skillSummary = {
  select: { id: true, name: true, category: true },
  orderBy: [{ sortOrder: 'asc' as const }, { name: 'asc' as const }],
};

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile() {
    const profile = await this.prisma.profile.findUnique({ where: { id: 1 } });
    if (!profile) throw new NotFoundException('Profile has not been configured');
    return profile;
  }

  getExperiences() {
    return this.prisma.experience.findMany({
      include: { skills: skillSummary },
      orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }],
    });
  }

  getStudies() {
    return this.prisma.study.findMany({
      orderBy: [{ sortOrder: 'asc' }, { startYear: 'desc' }],
    });
  }

  getProjects() {
    return this.prisma.project.findMany({
      include: { skills: skillSummary },
      orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }],
    });
  }

  getSkills() {
    return this.prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
    });
  }
}
