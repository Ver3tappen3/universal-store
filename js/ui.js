function getCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    return Object.values(cart).reduce((sum, qty) => sum + Number(qty), 0);
  } catch {
    return 0;
  }
}

function getFavCount() {
  try {
    const fav = JSON.parse(localStorage.getItem("sf_favorites")) || [];
    return fav.length;
  } catch {
    return 0;
  }
}

export function updateHeaderBadges() {
  const cartEl = document.getElementById("cart-count");
  const favEl = document.getElementById("fav-count");

  if (cartEl) cartEl.textContent = getCartCount();
  if (favEl) favEl.textContent = getFavCount();
}