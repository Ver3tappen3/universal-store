export function parseHash() {
  const raw = location.hash.slice(1) || "home";
  const [path, query] = raw.split("?");
  const params = new URLSearchParams(query || "");
  return { path, params };
}

export function navigate(hash) {
  location.hash = hash.startsWith("#") ? hash : `#${hash}`;
}
