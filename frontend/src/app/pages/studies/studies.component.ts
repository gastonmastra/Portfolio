import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { Study } from '../../models/study';

@Component({
  selector: 'app-studies',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './studies.component.html',
  styleUrl: './studies.component.css'
})
export class StudiesComponent {
  studies: Study[] = [{
    title: 'Ingenieria en Sistemas de Información',
    institution: 'Universidad Tecnologica Nacional',
    modality: 'Presential',
    beginYear: 2019
  }];

}
