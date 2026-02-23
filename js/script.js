document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".theme-switcher button");

  if (buttons.length >= 3) {
    buttons[0].addEventListener("click", () => changeTheme("purple"));
    buttons[1].addEventListener("click", () => changeTheme("dark"));
    buttons[2].addEventListener("click", () => changeTheme("alt"));
  }

  function changeTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme);
  }

  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => console.log("IMG ERROR:", img.src));
    img.addEventListener("load", () => console.log("IMG OK:", img.src));
  });
});

window.openModal = function () {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "flex";
};

window.closeModal = function () {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
};

