import { Component, HostBinding, OnInit, Signal } from '@angular/core';
import { DarkmodeComponent } from './shared/toolbar/darkmode.component';
import { DarkmodeService } from './services/darkmode.service';
import { HomeComponent } from './pages/home/home.component';
import { StudiesComponent } from './pages/studies/studies.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { KnowledgeComponent } from './pages/knowledge/knowledge.component';
import gsap from 'gsap';
import { ScrollTrigger, TextPlugin } from 'gsap/all';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DarkmodeComponent,
    HomeComponent,
    StudiesComponent,
    ExperienceComponent,
    KnowledgeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Mastra';
  private darkmodeEnabled: Signal<boolean>;

  constructor(private _darkmodeService: DarkmodeService) { 
    this.darkmodeEnabled = this._darkmodeService.enabled;
  }

  @HostBinding('class.dark') get mode() {
    return this.darkmodeEnabled();
  }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);
  }

}
