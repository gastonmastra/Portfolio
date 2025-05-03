import { Component, Input, OnInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @Input() title!: string;

  subtitles: string[] = [
    "Information Systems Engineer", 
    "Full Stack Developer",
  ]

  ngOnInit(): void {
    this._createWritingAnimation();
  }


  private _createWritingAnimation() {
    let subtitleTimeline = gsap.timeline({ repeat: -1 }).pause();
    this._animateCursor(subtitleTimeline);
    this._animateSubtitle(subtitleTimeline);
  }

  private _animateSubtitle(subtitleTimeline: gsap.core.Timeline) {
    this.subtitles.forEach(subtitle => {
      let tl = gsap.timeline({
        repeat: 1, yoyo: true, repeatDelay: 2, delay: 0.5
      });
      tl.to('.subtitle', {
        duration: subtitle.length / 15,
        text: subtitle,
        ease: 'none'
      });
      subtitleTimeline.add(tl);
    });
  }

  private _animateCursor(subtitleTimeline: gsap.core.Timeline) {
    gsap.to('.cursor',
      {
        opacity: 0,
        ease: 'power2.inOut',
        repeat: -1,
        duration: 0.7
      });
    let tl = gsap.timeline();
    tl.from('.overflow-clip', { y: '-100vh', duration: 1.5, ease: 'power3.out' });
    tl.from('.text-center', {
      y: '100vh', duration: 1.5, ease: 'power3.out',
      onComplete: () => { subtitleTimeline.play(); }
    }, '<');
  }
}
