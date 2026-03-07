function readOrders() {
  try {
    return JSON.parse(localStorage.getItem("sf_orders")) || [];
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  localStorage.setItem("sf_orders", JSON.stringify(orders));
}

function getSessionUserId() {
  try {
    const s = JSON.parse(localStorage.getItem("sf_session"));
    return s?.userId || null;
  } catch {
    return null;
  }
}

function calcStatus(createdAt) {
  const ms = Date.now() - new Date(createdAt).getTime();
  if (ms < 10000) return "Создан";
  if (ms < 25000) return "В обработке";
  return "Доставлен";
}

function normalizeStatuses(orders) {
  let changed = false;

  for (const order of orders) {
    const newStatus = calcStatus(order.createdAt);
    if (order.status !== newStatus) {
      order.status = newStatus;
      changed = true;
    }
  }

  return changed;
}

export function createOrder({ items, total }) {
  const userId = getSessionUserId();
  const orders = readOrders();

  const newOrder = {
    id: "ORD-" + Date.now(),
    userId: userId,           // ✅ привязка к пользователю
    items: items,
    total: total,
    status: "Создан",
    createdAt: new Date().toISOString(),
  };

  orders.unshift(newOrder);
  writeOrders(orders);

  return newOrder;
}

export function renderOrders() {
  const root = document.getElementById("orders");
  if (!root) return;

  const userId = getSessionUserId();
  const allOrders = readOrders();

  // обновляем статусы для всех заказов, но показываем только свои
  if (normalizeStatuses(allOrders)) {
    writeOrders(allOrders);
  }

  // берем только заказы текущего пользователя
  const orders = allOrders
    .filter(o => o.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (orders.length === 0) {
    root.innerHTML = `
      <div class="empty">
        <h3>У вас пока нет заказов</h3>
        <p>Сделайте первый заказ в каталоге</p>
        <a href="#catalog" class="btn">Перейти в каталог</a>
      </div>
    `;
    return;
  }

  root.innerHTML = `
    <h2>Мои заказы</h2>

    <div style="display:flex; gap:10px; flex-wrap:wrap; margin: 10px 0 18px;">
      <button class="btn" id="clearMyOrders" type="button">Очистить мои заказы</button>
      <a class="btn outline" href="#catalog">В каталог</a>
    </div>

    <div class="ordersList">
      ${orders.map(order => `
        <div class="card">
          <h3>${order.id}</h3>

          <p><strong>Сумма:</strong> ${order.total} ₸</p>

          <p>
            <strong>Статус:</strong>
            <span class="status">${order.status}</span>
          </p>

          <p class="muted">
            <strong>Дата:</strong>
            ${new Date(order.createdAt).toLocaleString()}
          </p>

          <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top: 10px;">
            <button class="btn" type="button" data-order="${order.id}">Открыть заказ</button>
          </div>

          <details style="margin-top:12px;">
            <summary>Состав заказа</summary>
            <ul>
              ${order.items.map(item => `
                <li>${item.title} • ${item.qty} шт • ${item.price} ₸</li>
              `).join("")}
            </ul>
          </details>
        </div>
      `).join("")}
    </div>
  `;

  // open order
  root.querySelectorAll("[data-order]").forEach(btn => {
    btn.addEventListener("click", () => {
      location.hash = "#order?id=" + btn.dataset.order;
    });
  });

  // clear only my orders
  root.querySelector("#clearMyOrders")?.addEventListener("click", () => {
    const rest = allOrders.filter(o => o.userId !== userId);
    writeOrders(rest);
    renderOrders();
  });
}