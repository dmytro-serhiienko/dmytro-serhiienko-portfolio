import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.from(".about-me-text", {
  x: -100, // Початкова точка: 100 пікселів лівіше
  opacity: 0, // Починаємо з повної прозорості
  duration: 1.2, // Тривалість анімації в секундах
  ease: "power3.out", // Плавне сповільнення в кінці
  scrollTrigger: {
    trigger: ".about-me-text", // Елемент, який запускає анімацію
    start: "top 85%", // Анімація почнеться, коли верх тексту перетне 85% екрана
    toggleActions: "play none none none", // Програти лише один раз
  },
});
