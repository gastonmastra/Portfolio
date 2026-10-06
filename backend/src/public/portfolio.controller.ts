import { Controller, Get } from '@nestjs/common';
import { PortfolioService } from './portfolio.service.js';

/** Read-only endpoints consumed by the public portfolio site. */
@Controller()
export class PortfolioController {
  constructor(private readonly portfolio: PortfolioService) {}

  @Get('profile')
  getProfile() {
    return this.portfolio.getProfile();
  }

  @Get('experiences')
  getExperiences() {
    return this.portfolio.getExperiences();
  }

  @Get('studies')
  getStudies() {
    return this.portfolio.getStudies();
  }

  @Get('projects')
  getProjects() {
    return this.portfolio.getProjects();
  }

  @Get('skills')
  getSkills() {
    return this.portfolio.getSkills();
  }
}
