import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { ExperiencesController } from './experiences/experiences.controller.js';
import { ProfileController } from './profile/profile.controller.js';
import { ProjectsController } from './projects/projects.controller.js';
import { SkillsController } from './skills/skills.controller.js';
import { StudiesController } from './studies/studies.controller.js';

@Module({
  imports: [DatabaseModule],
  controllers: [
    ProfileController,
    SkillsController,
    ExperiencesController,
    StudiesController,
    ProjectsController,
  ],
})
export class AdminAppModule {}
