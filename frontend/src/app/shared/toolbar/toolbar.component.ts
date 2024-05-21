import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
  selector: 'toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  darkmodeEnabled: boolean = true;

  constructor(
    private _darkmodeService: DarkmodeService
  ) {

  }

  ngOnInit(): void {
    this.darkmodeEnabled = this._darkmodeService.isEnabled();
  }

  toggleDarkmode(): void {
    this._darkmodeService.toggleDarkmode();
    this.darkmodeEnabled = !this.darkmodeEnabled;
  }
  
}
