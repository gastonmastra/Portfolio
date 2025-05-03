import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Job } from '../../models/job';

@Injectable()
export class MockExperienceService {
  public getExperience(): Observable<Job[]> {
    const experiences = [
      new Job({
        title: "Software Engineer",
        company: "JazuSoft",
        beginDate: new Date(2024, 8)
      }),
      new Job({
        title: "Backend Developer",
        company: "Gilson Housing partners",
        endDate: new Date(2024, 8),
        beginDate: new Date(2024, 2)
      }),
      new Job({
        title: "Full Stack Developer",
        company: "CIDS - Centro de Investigación y Desarrollo de Software",
        description: "Full stack developer working for guverment projects.",
        beginDate: new Date(2022, 0)
      }),
      new Job({
        title: "Waiter",
        company: "Heroes Bar",
        description: "Waiter and bartender. Developed a landing website with the menu and contact information using WordPress.",
        beginDate: new Date(2020, 8),
        endDate: new Date(2021, 9)
      })
    ];
  
    return of(experiences);
  }
}
