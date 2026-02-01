import { gsap } from "gsap";

const animateHero = () => {
  const tl = gsap.timeline();

  tl.from(".heroTitle", {
    duration: 1.2,
    y: 100,
    opacity: 0,
    skewY: 7,
    ease: "power4.out",
    delay: 0.2,
  });

  tl.to(".heroTitle", {
    y: "-=10",
    duration: 2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
};

window.addEventListener("load", animateHero);
