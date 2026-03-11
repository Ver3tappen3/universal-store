import { PRODUCTS } from "../data.js";

export function renderAbout() {
  const root = document.getElementById("about");
  if (!root) return;

  const users = JSON.parse(localStorage.getItem("sf_users")) || [];
  const orders = JSON.parse(localStorage.getItem("sf_orders")) || [];

  root.innerHTML = `
    <h2>О проекте</h2>

    <p class="muted">
      Это учебный интернет-магазин.
      Проект создан на JavaScript, LocalStorage
      и модульной архитектуры.
    </p>

    <div class="aboutStats">

      <div class="stat">
        <h3>${PRODUCTS.length}</h3>
        <p>Товаров</p>
      </div>

      <div class="stat">
        <h3>${users.length}</h3>
        <p>Пользователей</p>
      </div>

      <div class="stat">
        <h3>${orders.length}</h3>
        <p>Заказов</p>
      </div>

    </div>
  `;
}