import "./app.js";
import { updateHeaderBadges } from "./ui.js";
import { renderAbout } from "./modules/about.js";

updateHeaderBadges();

import { renderCatalog } from "./modules/catalog.js";
import { renderProduct } from "./modules/product.js";
import { renderCart } from "./modules/cart.js";
import { renderFavorites } from "./modules/favorites.js";
import { renderOrders } from "./modules/orders.js";

window.__appInit();

function renderByRoute() {
  const raw = location.hash.slice(1) || "home";
  const [path] = raw.split("?");

  if (path === "catalog") renderCatalog();
  if (path === "product") renderProduct();
  if (path === "cart") renderCart();
  if (path === "favorites") renderFavorites();
  if (path === "orders") renderOrders();
  if (path === "about") renderAbout();
}

function handleRoute() {
  renderByRoute();
  updateActiveNav();
  updateHeaderBadges();
}

window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);

function updateActiveNav() {
  const path = location.hash || "#home";

  document.querySelectorAll(".nav__link").forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("nav__link--active");
    } else {
      link.classList.remove("nav__link--active");
    }
  });
}