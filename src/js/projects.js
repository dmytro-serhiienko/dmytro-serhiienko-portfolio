import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger"; // Додаємо цей імпорт

// // Знаходимо всі елементи списку
// const projectItems = document.querySelectorAll(".projects-item");

// projectItems.forEach((item, index) => {
//   const direction = index % 2 === 0 ? -100 : 100;

//   gsap.from(item, {
//     x: direction,
//     opacity: 0,
//     duration: 1,
//     ease: "power2.out",
//     scrollTrigger: {
//       trigger: item, // Кожен елемент спрацьовує окремо, коли з'являється у в'юпорті
//       start: "top 90%", // Початок анімації трохи раніше
//       toggleActions: "play none none reverse",
//     },
//   });
// });
// Переконайся, що в HTML підключено GSAP та Draggable:
// <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Draggable.min.js"></script>

window.onload = () => {
  const track = document.querySelector(".projects-track");
  const cards = Array.from(track.children);

  // 1. Клонуємо елементи для безкінечності
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  // 2. Вираховуємо ширину одного повного набору карток
  const gap = 30; // має збігатися з gap у CSS
  const totalWidth = track.scrollWidth / 2;

  // 3. Основна анімація руху (Marquee)
  const marquee = gsap.to(track, {
    x: `-=${totalWidth}`,
    duration: 30,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth), // Магічний фікс для безшовності
    },
  });

  // 4. Пауза при наведенні
  track.addEventListener("mouseenter", () => marquee.pause());
  track.addEventListener("mouseleave", () => marquee.play());

  // 5. Додаємо можливість перетягування (Drag)
  if (typeof Draggable !== "undefined") {
    Draggable.create(track, {
      type: "x",
      edgeResistance: 0.65,
      onPress: () => marquee.pause(),
      onRelease: () => marquee.play(),
      // Обмежуємо зону перетягування, щоб не "втекло"
      bounds: { minX: -totalWidth, maxX: 0 },
    });
  }
};
