import { Component, Input } from '@angular/core';
import { TechnologyKnowledge } from '../../../models/technology-knowledge';

@Component({
  selector: 'technology',
  standalone: true,
  imports: [],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.css'
})
export class TechnologyComponent {
  @Input() technologyKnowledge: TechnologyKnowledge;
  
  
}
