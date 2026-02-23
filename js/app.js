(function () {
  const views = Array.from(document.querySelectorAll(".view"));

  function parseHash() {
    const raw = location.hash.slice(1) || "home";
    const [path, query] = raw.split("?");
    const params = new URLSearchParams(query || "");
    return { path, params };
  }

  function viewExists(name) {
    return views.some(v => v.dataset.view === name);
  }

  function isAuthed() {
    try {
      const s = JSON.parse(localStorage.getItem("sf_session") || "null");
      return !!(s && s.userId);
    } catch {
      return false;
    }
  }

  function applyGuard(path) {
    const protectedRoutes = new Set(["profile", "orders"]);
    const guestOnly = new Set(["login", "register"]);

    const authed = isAuthed();

    if (!viewExists(path)) return "home";

    if (!authed && protectedRoutes.has(path)) {
      return viewExists("login") ? "login" : "home";
    }

    if (authed && guestOnly.has(path)) {
      return viewExists("profile") ? "profile" : "home";
    }

    return path;
  }

  function setView(name) {
    views.forEach(v => {
      v.classList.toggle("view--active", v.dataset.view === name);
    });

    document.querySelectorAll(".nav__link").forEach(a => {
      const href = a.getAttribute("href") || "";
      const active = href === `#${name}`;
      a.classList.toggle("nav__link--active", active);
    });

    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function renderAuthBar() {
    const el = document.getElementById("authbar");
    if (!el) return;

    if (isAuthed()) {
      el.innerHTML = `
        <span class="authbar__text">Вы вошли</span>
        <button class="btn small outline" id="btnLogout" type="button">Выйти</button>
      `;
      document.getElementById("btnLogout")?.addEventListener("click", () => {
        localStorage.removeItem("sf_session");
        location.hash = "#home";
      });
    } else {
      el.innerHTML = viewExists("login")
        ? `<a class="btn small outline" href="#login">Войти</a>`
        : `<span class="authbar__text muted">Гость</span>`;
    }
  }

  function router() {
    const { path } = parseHash();
    const next = applyGuard(path);

    if (next !== path) {
      location.hash = `#${next}`;
      return;
    }

    setView(next);
    renderAuthBar();
  }

  function init() {
    if (!location.hash) location.hash = "#home";

    window.addEventListener("hashchange", router);
    router();
  }

  window.__appInit = init;
})();
