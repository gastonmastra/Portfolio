import { Component, HostBinding, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { DarkmodeService } from './services/darkmode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mastra';
  private darkmodeEnabled: Signal<boolean>;

  constructor(private _darkmodeService: DarkmodeService) { 
    this.darkmodeEnabled = this._darkmodeService.enabled;
  }

  @HostBinding('class.dark') get mode() {
    return this.darkmodeEnabled();
  }

}
