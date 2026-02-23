import { PRODUCTS } from "../data.js";

function getFav() {
  try {
    return JSON.parse(localStorage.getItem("sf_favorites")) || [];
  } catch {
    return [];
  }
}

function setFav(arr) {
  localStorage.setItem("sf_favorites", JSON.stringify(arr));
}

export function toggleFavorite(id) {
  const fav = getFav();
  const exists = fav.includes(id);
  const next = exists ? fav.filter(x => x !== id) : [...fav, id];
  setFav(next);
}

export function renderFavorites() {
  const root = document.getElementById("favorites");
  if (!root) return;

  const favIds = getFav();

  // ✅ Empty state
  if (favIds.length === 0) {
    root.innerHTML = `
      <div class="empty">
        <h3>Избранное пусто</h3>
        <p>Добавляйте товары сердечком ❤</p>
        <a href="#catalog" class="btn">Перейти в каталог</a>
      </div>
    `;
    return;
  }

  const items = favIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean);

  root.innerHTML = `
    <h2>Избранное</h2>
    <div class="products">
      ${items.map(p => `
        <div class="card">
          <img src="${p.image}" alt="">
          <h3>${p.title}</h3>
          <p>${p.price} ₸</p>
          <button class="btn" type="button" data-open="${p.id}">Открыть</button>
        </div>
      `).join("")}
    </div>
  `;

  root.querySelectorAll("[data-open]").forEach(btn => {
    btn.addEventListener("click", () => {
      location.hash = `#product?id=${btn.dataset.open}`;
    });
  });
}
