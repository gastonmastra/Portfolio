import { Component, Input } from '@angular/core';
import { TechnologyKnowledge } from '../../../models/technology-knowledge';
import { NgClass } from '@angular/common';

@Component({
  selector: 'technology',
  standalone: true,
  imports: [ NgClass ],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.css'
})
export class TechnologyComponent {
  @Input() technologyKnowledge: TechnologyKnowledge;
  @Input() scale: boolean = false;
  @Input() tooltip: string;
  
}
