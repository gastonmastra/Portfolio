import { Component } from '@angular/core';
import { Study } from '../../models/study';

@Component({
  selector: 'app-studies',
  standalone: true,
  imports: [],
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
