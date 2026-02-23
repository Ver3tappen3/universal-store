export function isAuthed() {
  try {
    const s = JSON.parse(localStorage.getItem("sf_session") || "null");
    return !!(s && s.userId);
  } catch { return false; }
}

export function applyGuards(path) {
  const protectedRoutes = new Set(["profile", "orders"]);
  const authRoutes = new Set(["login", "register"]);
  const authed = isAuthed();

  if (!authed && protectedRoutes.has(path)) return "login";
  if (authed && authRoutes.has(path)) return "home";
  return path;
}
