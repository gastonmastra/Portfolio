import { httpResource } from '@angular/common/http';
import { Service } from '@angular/core';
import type { Experience, Profile, Project, Skill, Study } from '@shared/models';

const API = 'api';

/** Read-only portfolio data, fetched once when the console starts. */
@Service()
export class PortfolioApi {
  readonly profile = httpResource<Profile>(() => `${API}/profile`);
  readonly experiences = httpResource<Experience[]>(() => `${API}/experiences`);
  readonly studies = httpResource<Study[]>(() => `${API}/studies`);
  readonly projects = httpResource<Project[]>(() => `${API}/projects`);
  readonly skills = httpResource<Skill[]>(() => `${API}/skills`);
}
