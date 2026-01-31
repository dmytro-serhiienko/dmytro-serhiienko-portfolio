import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Додаємо цей імпорт

// Знаходимо всі елементи списку
const projectItems = document.querySelectorAll(".projects-item");

projectItems.forEach((item, index) => {
  // Визначаємо сторону: якщо індекс парний — зліва (-100), якщо непарний — справа (100)
  const direction = index % 2 === 0 ? -100 : 100;

  gsap.from(item, {
    x: direction,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: item, // Кожен елемент спрацьовує окремо, коли з'являється у в'юпорті
      start: "top 90%", // Початок анімації трохи раніше
      toggleActions: "play none none reverse",
    },
  });
});
