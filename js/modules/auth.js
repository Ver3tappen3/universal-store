(function () {
  const USERS_KEY = "sf_users";
  const SESSION_KEY = "sf_session";

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

  function register() {
    const nameEl = document.getElementById("regName");
    const emailEl = document.getElementById("regEmail");
    const passEl = document.getElementById("regPassword");
    const errEl = document.getElementById("regError");

    const name = String(nameEl?.value || "").trim();
    const email = normalizeEmail(emailEl?.value);
    const password = String(passEl?.value || "");

    if (!name) return showError(errEl, "Введите имя.");
    if (!email.includes("@")) return showError(errEl, "Введите корректный email");
    if (password.length < 6) return showError(errEl, "Пароль должен быть минимум 6 символов");

    const users = getUsers();
    const exists = users.some(u => u.email === email);
    if (exists) return showError(errEl, "Этот email уже занят");

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

    location.hash = "#profile";
  }

  function login() {
    const emailEl = document.getElementById("loginEmail");
    const passEl = document.getElementById("loginPassword");
    const errEl = document.getElementById("loginError");

    const email = normalizeEmail(emailEl?.value);
    const password = String(passEl?.value || "");

    if (!email.includes("@")) return showError(errEl, "Введите корректный email");
    if (!password) return showError(errEl, "Введите пароль");

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) return showError(errEl, "Пользователь не найден");
    if (user.password !== password) return showError(errEl, "Неверный пароль");

    setSession(user.id);
    showError(errEl, "");

    location.hash = "#profile";
  }

  function renderProfile() {
    const user = getCurrentUser();
    const nameEl = document.getElementById("profileName");
    const emailEl = document.getElementById("profileEmail");

    if (nameEl) nameEl.textContent = user?.name || "—";
    if (emailEl) emailEl.textContent = user?.email || "—";
  }

  function logout() {
    clearSession();
    location.hash = "#home";
  }

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
})();
