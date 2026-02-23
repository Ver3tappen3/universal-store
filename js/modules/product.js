import { PRODUCTS } from "../data.js";
import { addToCart } from "./cart.js";

export function renderProduct() {
  const root = document.getElementById("product");
  if (!root) return;

  const params = new URLSearchParams(location.hash.split("?")[1]);
  const id = Number(params.get("id"));

  const product = PRODUCTS.find(p => p.id === id);
  if (!product) {
    root.innerHTML = "<h2>Товар не найден</h2>";
    return;
  }

  root.innerHTML = `
    <div class="card">
      <img src="${product.image}" />
      <h2>${product.title}</h2>
      <p>${product.price} ₸</p>
      <button class="btn" id="addCartBtn">В корзину</button>
    </div>
  `;

  document.getElementById("addCartBtn")
    .addEventListener("click", () => addToCart(product.id));
}
