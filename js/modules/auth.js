const USERS_KEY = "sf_users";
const SESSION_KEY = "sf_session";
const REDIRECT_KEY = "sf_redirect_after_login";

function readJSON(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function showError(el, msg) {
  if (!el) return;
  el.textContent = msg || "";
  el.style.display = msg ? "block" : "none";
}

function getUsers() {
  return readJSON(USERS_KEY, []);
}

function setUsers(users) {
  writeJSON(USERS_KEY, users);
}

function setSession(userId) {
  writeJSON(SESSION_KEY, { userId });
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function getSession() {
  return readJSON(SESSION_KEY, null);
}

function getCurrentUser() {
  const s = getSession();
  if (!s?.userId) return null;
  const users = getUsers();
  return users.find(u => u.id === s.userId) || null;
}

function redirectAfterLogin() {
  const target = localStorage.getItem(REDIRECT_KEY);
  localStorage.removeItem(REDIRECT_KEY);
  location.hash = target || "#home";
}

function renderProfile() {
  const user = getCurrentUser();

  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");

  if (nameEl) nameEl.textContent = user?.name || "—";
  if (emailEl) emailEl.textContent = user?.email || "—";

  const orders = JSON.parse(localStorage.getItem("sf_orders") || "[]");

  const ordersCount = orders.length;

  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const totalItems = orders.reduce((sum, o) => {
    return sum + (o.items || []).reduce((s, i) => s + (i.qty || 0), 0);
  }, 0);

  let level = "Новичок";

  if (totalSpent > 100000) level = "Постоянный клиент";
  if (totalSpent > 1000000) level = "👑 VIP клиент";

  const levelEl = document.getElementById("profileLevel");
  if (levelEl) levelEl.textContent = level;

  const stats = document.getElementById("profileStats");

  if (stats) {
    stats.innerHTML = `
      <div class="statCard">
        <h3>${ordersCount}</h3>
        <p>Заказов</p>
      </div>

      <div class="statCard">
        <h3>${totalSpent} ₸</h3>
        <p>Потрачено</p>
      </div>

      <div class="statCard">
        <h3>${totalItems}</h3>
        <p>Товаров</p>
      </div>

      <div class="statCard">
        <h3>${user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</h3>
        <p>Регистрация</p>
      </div>
    `;
  }
}

// --- Register ---
function register() {
  const nameEl = document.getElementById("regName");
  const emailEl = document.getElementById("regEmail");
  const passEl = document.getElementById("regPassword");
  const errEl = document.getElementById("regError");

  const name = String(nameEl?.value || "").trim();
  const email = normalizeEmail(emailEl?.value);
  const password = String(passEl?.value || "");

  if (!name) return showError(errEl, "Введите имя.");
  if (!email.includes("@")) return showError(errEl, "Введите корректный email.");
  if (password.length < 6) return showError(errEl, "Пароль минимум 6 символов.");

  const users = getUsers();
  if (users.some(u => u.email === email)) {
    return showError(errEl, "Этот email уже занят.");
  }

  const user = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  setUsers(users);
  setSession(user.id);
  showError(errEl, "");

  redirectAfterLogin();
}

// --- Login ---
function login() {
  const emailEl = document.getElementById("loginEmail");
  const passEl = document.getElementById("loginPassword");
  const errEl = document.getElementById("loginError");

  const email = normalizeEmail(emailEl?.value);
  const password = String(passEl?.value || "");

  if (!email.includes("@")) return showError(errEl, "Введите корректный email.");
  if (!password) return showError(errEl, "Введите пароль.");

  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) return showError(errEl, "Пользователь не найден.");
  if (user.password !== password) return showError(errEl, "Неверный пароль.");

  setSession(user.id);
  showError(errEl, "");

  redirectAfterLogin();
}

// --- Logout ---
function logout() {
  clearSession();
  location.hash = "#home";
}

// --- Events ---
document.addEventListener("click", (e) => {
  const id = e.target?.id;
  if (id === "regBtn") register();
  if (id === "loginBtn") login();
  if (id === "logoutBtn") logout();
});

window.addEventListener("hashchange", () => {
  if (location.hash.startsWith("#profile")) renderProfile();
});

document.addEventListener("DOMContentLoaded", () => {
  if (location.hash.startsWith("#profile")) renderProfile();
});