import { Component, Input } from '@angular/core';
import { Technology } from '../../../models/technology';
import { NgClass } from '@angular/common';

@Component({
  selector: 'technology',
  standalone: true,
  imports: [ NgClass ],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.css'
})
export class TechnologyComponent {
  @Input() technologyKnowledge: Technology;
  @Input() scale: boolean = false;
  @Input() tooltip: string;
  
}
