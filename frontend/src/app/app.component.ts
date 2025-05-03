import { Component, HostBinding, OnInit, Signal } from '@angular/core';
import { DarkmodeComponent } from './shared/toolbar/darkmode.component';
import { DarkmodeService } from './services/darkmode.service';
import { HomeComponent } from './pages/home/home.component';
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
    ExperienceComponent,
    KnowledgeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Gastón Mastrapasqua Álvarez';
  private readonly darkmodeEnabled: Signal<boolean>;

  constructor(private readonly _darkmodeService: DarkmodeService) { 
    this.darkmodeEnabled = this._darkmodeService.enabled;
  }

  @HostBinding('class.dark') get mode() {
    return this.darkmodeEnabled();
  }

  ngOnInit(): void {
    this._registerGsapPluggins();
    this._animateHomeSection();
    this._animatePannels();
  }

  private _registerGsapPluggins() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);
  }
  
  private _animateHomeSection() {
    // Get home section
    const homeSection = document.querySelector(".home-section");
    
    // Scale up and fade out effect for home section without vertical movement
    if (homeSection) {
      // First, set the transform origin to center
      gsap.set(homeSection, {
        transformOrigin: "center center"
      });
      
      gsap.to(homeSection, {
        scale: 1.3,
        opacity: 0,
        ease: "power1.in",
        // No position changes, just scale and opacity
        scrollTrigger: {
          trigger: homeSection,
          start: "top top",
          end: "bottom 20%",
          scrub: true,
          pin: true, // Pin the section while animating
          pinSpacing: false, // Don't add extra space for pinning
          toggleActions: "play none none reverse"
        }
      });
    }
  }

  private _animatePannels() {
    // Get all panel sections
    let sections = gsap.utils.toArray(".panel");
  
    // Set initial scale for panels
    gsap.set(sections, {
      scale: 0.9,
      opacity: 0,
    });
  
    // Create zoom-in effect for each panel
    sections.forEach((section: any) => {
      gsap.to(section, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%", // Start animation earlier when the panel is 85% from the top
          end: "top 40%",
          scrub: 0.5, // Smoother scrubbing effect
          toggleActions: "play none none reverse"
        }
      });
    });
  }
}
