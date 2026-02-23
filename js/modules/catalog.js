import { PRODUCTS } from "../data.js";

export function renderCatalog() {
  const root = document.getElementById("catalog");
  if (!root) return;

  root.innerHTML = `
    <h2>Каталог</h2>
    <div class="products">
      ${PRODUCTS.map(p => `
        <div class="card">
          <img src="${p.image}" />
          <h3>${p.title}</h3>
          <p>${p.price} ₸</p>
          <button class="btn" data-id="${p.id}">Открыть</button>
        </div>
      `).join("")}
    </div>
  `;

  root.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      location.hash = `#product?id=${btn.dataset.id}`;
    });
  });
}
