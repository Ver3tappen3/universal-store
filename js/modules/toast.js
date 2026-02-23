export function toast(msg) {
  let box = document.getElementById("toastBox");
  if (!box) {
    box = document.createElement("div");
    box.id = "toastBox";
    box.className = "toastBox";
    document.body.appendChild(box);
  }

  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  box.appendChild(t);

  requestAnimationFrame(() => t.classList.add("toast--show"));

  setTimeout(() => {
    t.classList.remove("toast--show");
    setTimeout(() => t.remove(), 250);
  }, 2200);
}
