import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  subtitles: string[] = [
    "Information Systems Engineer", 
    "Full Stack Developer",
  ]
  ngOnInit(): void {
    let cursor = gsap.to('.cursor',
      {
        opacity: 0,
        ease: 'power2.inOut',
        repeat: -1,
        duration: 0.7
      });
    gsap.from('.overflow-clip', { y: '-50vh', duration: 1.5, ease: 'power3.out' });
    gsap.from('.text-center', { y: '100vh', duration: 1.5, ease: 'power3.out' , 
    onComplete: () => {subtitleTimeline.play()}});

    let subtitleTimeline = gsap.timeline({repeat: -1}).pause();
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

}
