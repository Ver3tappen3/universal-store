import { PRODUCTS } from "../data.js";
import { addToCart } from "./cart.js";
import { toggleFavorite } from "./favorites.js";

function getFavoriteIds() {
  try {
    return JSON.parse(localStorage.getItem("sf_favorites")) || [];
  } catch {
    return [];
  }
}

function renderSpecs(specs) {
  if (!specs || typeof specs !== "object") {
    return `<p style="color:gray;">Характеристики пока не добавлены.</p>`;
  }

  const entries = Object.entries(specs);

  if (entries.length === 0) {
    return `<p style="color:gray;">Характеристики пока не добавлены.</p>`;
  }

  return `
    <div style="display:grid; gap:10px; margin-top:10px;">
      ${entries.map(([key, value]) => `
        <div style="
          display:flex;
          justify-content:space-between;
          gap:20px;
          padding:10px 12px;
          border:1px solid rgba(0,0,0,0.08);
          border-radius:10px;
        ">
          <span><strong>${key}</strong></span>
          <span>${value}</span>
        </div>
      `).join("")}
    </div>
  `;
}

export function renderProduct() {
  const root = document.getElementById("product");
  if (!root) return;

  const params = new URLSearchParams(location.hash.split("?")[1]);
  const id = Number(params.get("id"));

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    root.innerHTML = `
      <div class="empty">
        <h3>Товар не найден</h3>
        <a href="#catalog" class="btn">Назад в каталог</a>
      </div>
    `;
    return;
  }

  const favIds = getFavoriteIds();
  const isFavorite = favIds.includes(product.id);

  root.innerHTML = `
    <div class="card" style="padding:24px; position:relative;">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:20px;
        gap:12px;
      ">
        <a href="#catalog" class="btn outline" style="text-decoration:none;">
          ← Назад в каталог
        </a>

        <button
          class="btn outline"
          id="addFavBtn"
          type="button"
          style="
            min-width:48px;
            padding:10px 14px;
            font-size:20px;
            line-height:1;
          "
          title="Избранное"
        >
          ${isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div style="
        display:grid;
        grid-template-columns: 1fr 1.2fr;
        gap:24px;
        align-items:start;
      " id="productLayout">

        <div>
          <img
            src="${product.image}"
            alt="${product.title}"
            style="
              width:100%;
              max-width:500px;
              border-radius:16px;
              display:block;
              margin:0 auto;
            "
          >
        </div>

        <div>
          <h2 style="margin-top:0;">${product.title}</h2>

          <p style="font-size:22px; font-weight:bold; margin:10px 0;">
            ${product.price} ₸
          </p>

          <p>
            <strong>Категория:</strong> ${product.category || "Не указана"}
          </p>

          <p>
            <strong>Рейтинг:</strong> ${product.rating ? "⭐ " + product.rating : "Нет рейтинга"}
          </p>

          <div style="margin-top:20px;">
            <h3>Описание</h3>
            <p>${product.desc || "Описание пока не добавлено."}</p>
          </div>

          <div style="margin-top:20px;">
            <h3>Характеристики</h3>
            ${renderSpecs(product.specs)}
          </div>

          <div style="margin-top:24px;">
            <button class="btn" id="addCartBtn" type="button">
              В корзину
            </button>
          </div>
        </div>

      </div>
    </div>
  `;

  document.getElementById("addCartBtn")?.addEventListener("click", () => {
    addToCart(product.id);
  });

  document.getElementById("addFavBtn")?.addEventListener("click", () => {
    toggleFavorite(product.id);
    renderProduct();
  });

  const layout = document.getElementById("productLayout");
  if (layout && window.innerWidth < 900) {
    layout.style.gridTemplateColumns = "1fr";
  }
}