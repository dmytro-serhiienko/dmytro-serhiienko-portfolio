document.addEventListener("DOMContentLoaded", async () => {
  const loadTags = document.querySelectorAll("load[src]");
  let loadedCount = 0;
  const total = loadTags.length;
  for (const tag of loadTags) {
    const src = tag.getAttribute("src");
    try {
      const resp = await fetch(src);
      if (!resp.ok) throw new Error("Not found: " + src);
      const html = await resp.text();
      // Створюємо тимчасовий контейнер для парсингу
      const temp = document.createElement("div");
      temp.innerHTML = html;
      // Вставляємо всі дочірні елементи
      while (temp.firstChild) {
        tag.parentNode.insertBefore(temp.firstChild, tag);
      }
      tag.remove();
      loadedCount++;
      document.dispatchEvent(
        new CustomEvent("partial:loaded", { detail: { src } }),
      );
      if (loadedCount === total) {
        document.dispatchEvent(new Event("partials:all-loaded"));
      }
    } catch (e) {
      tag.outerHTML = `<div style='color:red'>Помилка завантаження partial: ${src}</div>`;
    }
  }
});
