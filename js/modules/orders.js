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

export function createOrder({ items, total }) {
  const orders = readOrders();

  const newOrder = {
    id: "ORD-" + Date.now(),
    items,                 // [{id, qty, price, title}]
    total,                 // number
    status: "Создан",      // можно менять позже
    createdAt: new Date().toISOString(),
  };

  orders.unshift(newOrder); // новый заказ сверху
  writeOrders(orders);

  return newOrder;
}

export function renderOrders() {
  const root = document.getElementById("orders");
  if (!root) return;

  const orders = readOrders();

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
    <div class="ordersList">
      ${orders.map(o => `
        <div class="card">
          <h3>${o.id}</h3>
          <p><strong>Сумма:</strong> ${o.total} ₸</p>
          <p><strong>Статус:</strong> ${o.status}</p>
          <p class="muted"><strong>Дата:</strong> ${new Date(o.createdAt).toLocaleString()}</p>
          <details>
            <summary>Состав заказа</summary>
            <ul>
              ${o.items.map(it => `
                <li>${it.title} • ${it.qty} шт • ${it.price} ₸</li>
              `).join("")}
            </ul>
          </details>
        </div>
      `).join("")}
    </div>
  `;
}
