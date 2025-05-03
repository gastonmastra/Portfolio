const { innerHeight } = window;

gsap.to('#zoom-out h2', {
  x: '-100vw', duration: 3,
  scrollTrigger: {
    trigger: '#zoom-out',
    pin: true,
    end: `+=${innerHeight * 1.3}`,
    scrub: 3
  }
})
gsap.to('#zoom-out h3', {
  x: '100vw', duration: 3,
  scrollTrigger: {
    trigger: '#zoom-out',
    pin: true,
    end: `+=${innerHeight * 1.3}`,
    scrub: 3
  }
})

