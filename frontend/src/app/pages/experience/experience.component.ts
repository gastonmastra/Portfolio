import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { CardComponent } from '../../shared/card/card.component';
import { CommonModule } from '@angular/common';
import { MockExperienceService } from '../../services/mocks/mock-experience.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ CommonModule, CardComponent ],
  providers: [ MockExperienceService ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  experiences: Job[];

  constructor(private _experienceService: MockExperienceService) {}

  ngOnInit(): void {
    this._experienceService.getExperience().subscribe({
      next: (experiences) => this.experiences = experiences,
      error: (error) => console.error(error)
    })
  }

}
