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

  setTimeout(() => t.classList.add("toast--show"), 10);

  setTimeout(() => {
    t.classList.remove("toast--show");
    setTimeout(() => t.remove(), 300);
  }, 2000);
}
