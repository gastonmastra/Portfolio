/** API contracts shared by the public and the admin applications. */

export type SkillCategory = 'TECHNOLOGY' | 'TOOL';
export type StudyModality = 'PRESENTIAL' | 'REMOTE';

export interface Profile {
  firstName: string;
  lastName: string;
  headline: string;
  about: string;
  email: string | null;
  location: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
}

export interface SkillSummary {
  id: number;
  name: string;
  category: SkillCategory;
}

export interface Skill extends SkillSummary {
  description: string | null;
  sortOrder: number;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  /** ISO date string. */
  startDate: string;
  endDate: string | null;
  description: string | null;
  sortOrder: number;
  skills: SkillSummary[];
}

export interface Study {
  id: number;
  title: string;
  institution: string;
  modality: StudyModality;
  gradeAverage: number | null;
  startYear: number;
  endYear: number | null;
  description: string | null;
  sortOrder: number;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  url: string | null;
  repoUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  sortOrder: number;
  skills: SkillSummary[];
}
