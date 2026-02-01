import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Додаємо цей імпорт

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("partial:loaded", (e) => {
  if (!e.detail || !e.detail.src || !e.detail.src.includes("about-me.html"))
    return;
  console.log("[about-me] partial:loaded event received", e.detail);
  // Дочекаємось рендеру DOM
  requestAnimationFrame(() => {
    gsap.from(".about-me-bg-text", {
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".flex-container",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".about-me-foto", {
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".flex-container",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });
});
console.log("about-me partial loaded");
