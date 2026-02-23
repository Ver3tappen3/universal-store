const state = {
  search: "",
  category: "Все",
  sort: "popular",
  filters: { priceMax: 2000, ratingMin: 0 },
};

const subs = new Set();

export function getState() { return state; }

export function setState(patch) {
  Object.assign(state, patch);
  subs.forEach(fn => fn(state));
}

export function subscribe(fn) {
  subs.add(fn);
  return () => subs.delete(fn);
}
