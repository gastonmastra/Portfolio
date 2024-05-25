import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Job } from '../../models/job';

@Injectable()
export class MockExperienceService {
  public getExperience(): Observable<Job[]> {
    const experiences = [
      new Job({
        title: "Backend Developer",
        company: "Gilson Housing partners",
        beginDate: new Date(2024, 2)
      }),
      new Job({
        title: "Full Stack Developer",
        company: "CIDS - Centro de Investigación y Desarrollo de Software",
        beginDate: new Date(2022, 0)
      }),
      new Job({
        title: "Waiter",
        company: "Heroes Bar",
        beginDate: new Date(2020, 8),
        endDate: new Date(2021, 9)
      })
    ];
  
    return of(experiences);
  }
}
