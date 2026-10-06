/**
 * Seeds the database with the content of the previous (mock-based) portfolio.
 * It only runs on an empty database, so it never overwrites data edited in the admin app.
 */
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  PrismaClient,
  SkillCategory,
  StudyModality,
} from '../src/generated/prisma/client.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env['DATABASE_URL'] }),
});

const skills: { name: string; category: SkillCategory; description?: string }[] = [
  {
    name: 'Angular',
    category: SkillCategory.TECHNOLOGY,
    description:
      "2 years of experience developing web applications with Angular. I've used many versions in different projects.",
  },
  {
    name: '.NET',
    category: SkillCategory.TECHNOLOGY,
    description:
      '2 Years using .NET in web applications. Knowledge in older versions like 2.1 and 3.1 and also the newest ones. I enjoy working with .NET and I think it is a great framework for web applications.',
  },
  {
    name: 'Docker',
    category: SkillCategory.TECHNOLOGY,
    description:
      'I did the configuration and deploy of the final project of my career using docker containers in a microservice architecture. I also worked in many small projects running over docker in order to make easy the deployments.',
  },
  { name: 'React', category: SkillCategory.TECHNOLOGY },
  {
    name: 'Flask',
    category: SkillCategory.TECHNOLOGY,
    description:
      'I have used Flask in a couple of projects and I think it is a great tool for web applications. I like the way it works and the way it integrates with other tools.',
  },
  {
    name: 'Git',
    category: SkillCategory.TOOL,
    description:
      'In every project that I participated I have used git as the versioning tool. I\'ve used mainly GitHub and GitLab. I understand the branching and the good practices that git promove.',
  },
  {
    name: 'GraphQL',
    category: SkillCategory.TOOL,
    description:
      'I have used GraphQL in a project and I think it is a great tool if it is needed. Otherwise I think that it may be an overkill.',
  },
  {
    name: 'Jira',
    category: SkillCategory.TOOL,
    description:
      'I have worked with Jira in a couple of projects and I think it is one of the best tools for project management. I like the way it works and the way it integrates with other tools.',
  },
  {
    name: 'Linux',
    category: SkillCategory.TOOL,
    description:
      'I know the most important things and I use it very often. My main OS is MacOS currently, but I have used Linux in the past. I know how to use the terminal and I can do some configurations.',
  },
  {
    name: 'AWS',
    category: SkillCategory.TOOL,
    description:
      'I have used AWS in different situations and I know many of the most important services it offers. I have used S3, EC2, ECS, IAM, CloudFront, Route53 and others. I have also used AWS CLI and some of the SDKs.',
  },
];

const experiences = [
  {
    title: 'Software Engineer',
    company: 'JazuSoft',
    startDate: '2024-10-01',
    description:
      'Software engineer working in different projects with many technologies. The most relevant project was a web application for data anlysis in the NGO sector. The application was developed using Django, React and Postgres. Currently working on two projects for the health sector. Both projects are in a web application. The first one is for nutritionists and the second one is for beds management in hospitals. Both applications are developed using Angular and .Net.',
    skills: ['Angular', '.NET', 'Docker', 'React', 'Linux', 'Git', 'AWS'],
  },
  {
    title: 'Backend Developer',
    company: 'Gilson Housing partners',
    startDate: '2024-03-01',
    endDate: '2024-09-01',
    description:
      'Backend developer working mainly with Flask in a microservices architecture. Developed an application for buying healthy products in Florida.',
    skills: ['Flask', 'GraphQL', 'Docker', 'Linux', 'Git'],
  },
  {
    title: 'Full Stack Developer',
    company: 'CIDS - Centro de Investigación y Desarrollo de Software',
    startDate: '2022-01-01',
    description: 'Full stack developer working for guverment projects.',
    skills: ['Angular', '.NET', 'Linux', 'Git'],
  },
  {
    title: 'Waiter',
    company: 'Heroes Bar',
    startDate: '2020-09-01',
    endDate: '2021-10-01',
    description:
      'Waiter and bartender. Developed a landing website with the menu and contact information using WordPress.',
    skills: [],
  },
];

async function main(): Promise<void> {
  if (await prisma.profile.findUnique({ where: { id: 1 } })) {
    console.log('Database already seeded, skipping.');
    return;
  }

  await prisma.$transaction(async (tx) => {
    await tx.profile.create({
      data: {
        id: 1,
        firstName: 'Gastón',
        lastName: 'Mastrapasqua',
        headline: 'Software Engineer',
        about: '',
      },
    });

    for (const [index, skill] of skills.entries()) {
      await tx.skill.create({ data: { ...skill, sortOrder: index } });
    }

    for (const [index, { skills: names, startDate, endDate, ...job }] of experiences.entries()) {
      await tx.experience.create({
        data: {
          ...job,
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : null,
          sortOrder: index,
          skills: { connect: names.map((name) => ({ name })) },
        },
      });
    }

    await tx.study.create({
      data: {
        title: 'Ingenieria en Sistemas de Información',
        institution: 'Universidad Tecnologica Nacional',
        modality: StudyModality.PRESENTIAL,
        startYear: 2019,
      },
    });
  });

  console.log('Database seeded.');
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
