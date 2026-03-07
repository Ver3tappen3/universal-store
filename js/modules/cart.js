import { PRODUCTS } from "../data.js";
import { createOrder } from "./orders.js";
import { updateHeaderBadges } from "../ui.js";
import { toast } from "./toast.js";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || {};
  } catch {
    return {};
  }
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateHeaderBadges();
}

export function addToCart(id) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + 1;
  setCart(cart);
  toast("Добавлено в корзину");
}

export function renderCart() {
  const root = document.getElementById("cart");
  if (!root) return;

  const cart = getCart();
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    root.innerHTML = `
      <div class="empty">
        <h3>Корзина пуста</h3>
        <p>Добавьте товары из каталога</p>
        <a href="#catalog" class="btn">Перейти в каталог</a>
      </div>
    `;
    return;
  }

  const items = entries.map(([id, qty]) => {
    const product = PRODUCTS.find(p => String(p.id) === String(id));
    return {
      id: Number(id),
      qty: Number(qty),
      title: product?.title || "Товар",
      price: Number(product?.price || 0),
      image: product?.image || "",
    };
  });

  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  root.innerHTML = `
    <h2>Корзина</h2>

    <div class="products">
      ${items.map(it => `
        <div class="card">
          ${it.image ? `<img src="${it.image}" alt="">` : ""}
          <h3>${it.title}</h3>
          <p>${it.qty} x ${it.price} ₸</p>
        </div>
      `).join("")}
    </div>

    <h3>Итого: ${total} ₸</h3>

    <button class="btn" id="checkoutBtn" type="button">Оформить заказ</button>
  `;

  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    createOrder({ items, total })
    localStorage.removeItem("cart");
    updateHeaderBadges();
    location.hash = "#orders";
  });
}
