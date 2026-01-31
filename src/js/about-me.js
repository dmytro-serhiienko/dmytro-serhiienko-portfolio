import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Додаємо цей імпорт

// Реєструємо плагін
gsap.registerPlugin(ScrollTrigger);

// Краще обгорнути в подію завантаження DOM, щоб JS бачив елементи
window.addEventListener("DOMContentLoaded", () => {
  // Анімація для тексту
  gsap.from(".about-me-bg-text", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".flex-container",
      start: "top 80%",
      toggleActions: "play none none reverse",
      // markers: true, // Розкоментуйте цю строку, щоб побачити маркери спрацювання (для тесту)
    },
  });

  // Анімація для фото
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
