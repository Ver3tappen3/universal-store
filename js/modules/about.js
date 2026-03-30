import { PRODUCTS } from "../data.js";

export function renderAbout() {
  const root = document.getElementById("about");
  if (!root) return;

  const users = JSON.parse(localStorage.getItem("sf_users")) || [];
  const orders = JSON.parse(localStorage.getItem("sf_orders")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  const cartItems = Object.values(cart).reduce((a, b) => a + b, 0);

  root.innerHTML = `
    <h2>О проекте</h2>

    <p class="muted">
      <b>Universal Store</b> это учебный интернет-магазин,
      разработанный для демонстрации работы современного
      веб-приложения без использования серверной части.
    </p>

    <p class="muted">
      Проект построен на <b>JavaScript</b> с использованием
      <b>LocalStorage</b> для хранения данных и модульной
      архитектуры для разделения логики приложения.
      Пользователь может просматривать каталог товаров,
      добавлять их в корзину и избранное, оформлять заказы
      и управлять своим профилем.
    </p>

    <p class="muted">
      Все действия пользователя (аккаунты, корзина, заказы)
      сохраняются прямо в браузере, что позволяет приложению
      работать как полноценный одностраничный сайт.
    </p>

    <div class="aboutStats">

      <div class="statCard">
        <div class="statIcon">📦</div>
        <h3>${PRODUCTS.length}</h3>
        <p>Товаров</p>
      </div>

      <div class="statCard">
        <div class="statIcon">👤</div>
        <h3>${users.length}</h3>
        <p>Пользователей</p>
      </div>

      <div class="statCard">
        <div class="statIcon">🧾</div>
        <h3>${orders.length}</h3>
        <p>Заказов</p>
      </div>

      <div class="statCard">
        <div class="statIcon">🛒</div>
        <h3>${cartItems}</h3>
        <p>Товаров в корзине</p>
      </div>

    </div>
  `;
}