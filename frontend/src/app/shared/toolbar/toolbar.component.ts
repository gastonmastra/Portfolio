import { Component, HostBinding, OnInit, Signal, computed, signal } from '@angular/core';
import { DarkmodeService } from '../../services/darkmode.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  darkmodeEnabled: Signal<boolean>;

  @HostBinding('class.dark') get mode() {
    return this.darkmodeEnabled();
  }

  constructor(
    private _darkmodeService: DarkmodeService
  ) { 
    this.darkmodeEnabled = _darkmodeService.enabled;
  }

  ngOnInit(): void {
  }

  toggleDarkmode(): void {
    this._darkmodeService.toggleDarkmode();
  }

}
