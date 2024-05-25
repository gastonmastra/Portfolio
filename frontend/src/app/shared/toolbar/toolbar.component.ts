import { Component, Signal } from '@angular/core';
import { DarkmodeService } from '../../services/darkmode.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  darkmodeEnabled: Signal<boolean>;

  constructor(private _darkmodeService: DarkmodeService) {
    this.darkmodeEnabled = this._darkmodeService.enabled;
  }

  toggleDarkmode(): void {
    this._darkmodeService.toggleDarkmode();
  }

}
