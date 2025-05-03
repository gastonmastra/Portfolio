import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Job } from '../../models/job';
import { ANGULAR, AWS, DOCKER, DOT_NET, FLASK, GIT, GRAPHQL, LINUX, REACT } from './mock-knowledge.service';

const JAZUSOFT = Job.CreateJob({
  title: "Software Engineer",
  company: "JazuSoft",
  beginDate: new Date(2024, 9),
  description: "Software engineer working in different projects with many technologies. The most relevant project was a web application for data anlysis in the NGO sector. The application was developed using Django, React and Postgres. Currently working on two projects for the health sector. Both projects are in a web application. The first one is for nutritionists and the second one is for beds management in hospitals. Both applications are developed using Angular and .Net.",
  toolsUsed: [ANGULAR, DOT_NET, DOCKER, REACT, LINUX, GIT, AWS]
});
const GILSON = Job.CreateJob({
  title: "Backend Developer",
  company: "Gilson Housing partners",
  endDate: new Date(2024, 8),
  beginDate: new Date(2024, 2),
  description: "Backend developer working mainly with Flask in a microservices architecture. Developed an application for buying healthy products in Florida.",
  toolsUsed: [FLASK, GRAPHQL, DOCKER, LINUX, GIT],
});
const CIDS = Job.CreateJob({
  title: "Full Stack Developer",
  company: "CIDS - Centro de Investigación y Desarrollo de Software",
  description: "Full stack developer working for guverment projects.",
  beginDate: new Date(2022, 0),
  toolsUsed: [ANGULAR, DOT_NET, LINUX, GIT],
});
const HEROES = Job.CreateJob({
  title: "Waiter",
  company: "Heroes Bar",
  description: "Waiter and bartender. Developed a landing website with the menu and contact information using WordPress.",
  beginDate: new Date(2020, 8),
  endDate: new Date(2021, 9)
});

@Injectable()
export class MockExperienceService {
  public getExperience(): Observable<Job[]> {
    const experiences: Job[] = [
      JAZUSOFT,
      GILSON,
      CIDS,
      HEROES,
    ];
  
    return of(experiences);
  }
}
