import "./app.js";

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
}

window.addEventListener("hashchange", renderByRoute);
renderByRoute();
