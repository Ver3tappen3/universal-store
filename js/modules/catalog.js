import { PRODUCTS } from "../data.js";
import { addToCart } from "./cart.js";
import { toggleFavorite } from "./favorites.js";

// localStorage ключ для избранного (как мы использовали ранее)
const FAV_KEY = "sf_favorites";

function getFavIds() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
  } catch {
    return [];
  }
}

function uniqCategories() {
  const set = new Set(PRODUCTS.map(p => p.category).filter(Boolean));
  return ["Все", ...Array.from(set)];
}

function formatPrice(x) {
  const n = Number(x || 0);
  return n.toLocaleString("ru-RU") + " ₸";
}

function getQueryParams() {
  const q = location.hash.split("?")[1] || "";
  const params = new URLSearchParams(q);
  return {
    q: (params.get("q") || "").trim(),
    cat: (params.get("cat") || "Все").trim(),
    sort: (params.get("sort") || "").trim(), // asc | desc | rating
  };
}

function setQueryParams(next) {
  const { q, cat, sort } = next;
  const params = new URLSearchParams();

  if (q) params.set("q", q);
  if (cat && cat !== "Все") params.set("cat", cat);
  if (sort) params.set("sort", sort);

  const qs = params.toString();
  location.hash = qs ? `#catalog?${qs}` : "#catalog";
}

function applyFilters() {
  const { q, cat, sort } = getQueryParams();

  let list = [...PRODUCTS];

  if (cat && cat !== "Все") {
    list = list.filter(p => (p.category || "") === cat);
  }

  if (q) {
    const s = q.toLowerCase();
    list = list.filter(p => (p.title || "").toLowerCase().includes(s));
  }

  if (sort === "asc") list.sort((a, b) => Number(a.price) - Number(b.price));
  if (sort === "desc") list.sort((a, b) => Number(b.price) - Number(a.price));
  if (sort === "rating") list.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));

  return { list, q, cat, sort };
}

export function renderCatalog() {
  const root = document.getElementById("catalog");
  if (!root) return;

  const cats = uniqCategories();
  const favIds = getFavIds();
  const { list, q, cat, sort } = applyFilters();

  root.innerHTML = `
    <div class="catalogHeader">
      <h2>Каталог</h2>

      <div class="catalogControls">
        <input
          id="catalogSearch"
          class="input"
          type="text"
          placeholder="Поиск товаров..."
          value="${q.replaceAll('"', "&quot;")}"
        />

        <select id="catalogCategory" class="input">
          ${cats.map(c => `<option value="${c}" ${c === cat ? "selected" : ""}>${c}</option>`).join("")}
        </select>

        <select id="catalogSort" class="input">
          <option value="" ${sort === "" ? "selected" : ""}>Сортировка</option>
          <option value="asc" ${sort === "asc" ? "selected" : ""}>Цена ↑</option>
          <option value="desc" ${sort === "desc" ? "selected" : ""}>Цена ↓</option>
          <option value="rating" ${sort === "rating" ? "selected" : ""}>По рейтингу</option>
        </select>
      </div>

      <p class="muted">Товаров: ${list.length}</p>
    </div>

    ${
      list.length === 0
        ? `
          <div class="empty">
            <h3>Ничего не найдено</h3>
            <p>Попробуйте изменить поиск или фильтр</p>
            <button class="btn" id="resetCatalogBtn" type="button">Сбросить фильтры</button>
          </div>
        `
        : `
          <div class="products">
            ${list.map(p => {
              const isFav = favIds.includes(p.id);
              return `
                <div class="card" data-card="${p.id}">
                  <img src="${p.image}" alt="${p.title}">
                  <h3>${p.title}</h3>
                  <p>${formatPrice(p.price)}</p>
                  <p class="muted">${p.category || ""}${p.rating ? ` • ⭐ ${p.rating}` : ""}</p>

                  <div class="cardActions">
                    <button class="btn" type="button" data-open="${p.id}">Открыть</button>
                    <button class="btn" type="button" data-cart="${p.id}">В корзину</button>
                    <button class="btn outline" type="button" data-fav="${p.id}">
                      ${isFav ? "♥" : "♡"}
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        `
    }
  `;

  // controls
  const searchEl = root.querySelector("#catalogSearch");
  const catEl = root.querySelector("#catalogCategory");
  const sortEl = root.querySelector("#catalogSort");

  let searchTimer = null;
  searchEl?.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setQueryParams({ q: searchEl.value.trim(), cat: catEl.value, sort: sortEl.value });
    }, 180);
  });

  catEl?.addEventListener("change", () => {
    setQueryParams({ q: searchEl.value.trim(), cat: catEl.value, sort: sortEl.value });
  });

  sortEl?.addEventListener("change", () => {
    setQueryParams({ q: searchEl.value.trim(), cat: catEl.value, sort: sortEl.value });
  });

  root.querySelector("#resetCatalogBtn")?.addEventListener("click", () => {
    setQueryParams({ q: "", cat: "Все", sort: "" });
  });

  // actions
  root.querySelectorAll("[data-open]").forEach(btn => {
    btn.addEventListener("click", () => {
      location.hash = `#product?id=${btn.dataset.open}`;
    });
  });

  root.querySelectorAll("[data-cart]").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(Number(btn.dataset.cart));
    });
  });

  root.querySelectorAll("[data-fav]").forEach(btn => {
    btn.addEventListener("click", () => {
      toggleFavorite(Number(btn.dataset.fav));
      // быстро перерендерим каталог, чтобы сердечко обновилось
      renderCatalog();
    });
  });
}
