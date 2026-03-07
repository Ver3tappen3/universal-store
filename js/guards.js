function hasSession() {
  try {
    const s = JSON.parse(localStorage.getItem("sf_session"));
    return !!s?.userId;
  } catch {
    return false;
  }
}

// Какие страницы закрытые (нужна авторизация)
const PROTECTED = new Set([
  "profile",
  "orders",
  "order",
  "favorites",
  "cart",
  "settings",
]);

export function checkGuard(routeName) {
  // если страница не защищена, все ок
  if (!PROTECTED.has(routeName)) return true;

  // если авторизован, все ок
  if (hasSession()) return true;

  // запоминаем куда хотел зайти
  localStorage.setItem("sf_redirect_after_login", location.hash || "#home");

  // кидаем на логин
  location.hash = "#login";
  return false;
}