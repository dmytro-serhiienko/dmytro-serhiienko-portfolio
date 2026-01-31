/*=============== SHOW MENU ===============*/
const showMenu = (navId, toggleId) => {
  const nav = document.getElementById(navId),
    toggle = document.getElementById(toggleId);

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show-menu");
    toggle.classList.toggle("show-icon");
  });
};

showMenu("nav-menu", "nav-toggle");

/*=============== DOWNLOAD RESUME ===============*/
const navEmail = document.getElementById("nav-email");
const navText = document.getElementById("nav-text");

navEmail.addEventListener("click", () => {
  // Міняємо "Download" на "Done 👌🏻"
  navText.innerHTML = "Done 👌🏻";

  // Через 2 секунди повертаємо назад
  setTimeout(() => {
    navText.innerHTML = "Download";
  }, 2000);
});
