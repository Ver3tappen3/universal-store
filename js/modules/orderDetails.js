function readOrders() {
  try {
    return JSON.parse(localStorage.getItem("sf_orders")) || []
  } catch {
    return []
  }
}

export function renderOrderDetails() {
  const root = document.getElementById("order")
  if (!root) return
  const params = new URLSearchParams(location.hash.split("?")[1])
  const id = params.get("id")
  const orders = readOrders()
  const order = orders.find(o => o.id === id)
  if (!order) {
    root.innerHTML = `
    
      <div class="empty">
        <h3>Заказ не найден</h3>
        <a href="#orders" class="btn">Назад к заказам</a>
      </div>
    
    `

    return
  }

  root.innerHTML = `
    <h2>Заказ ${order.id}</h2>

    <p>
      <strong>Статус:</strong>
      ${order.status}
    </p>

    <p>
      <strong>Дата:</strong>
      ${new Date(order.createdAt).toLocaleString()}
    </p>

    <h3>Товары</h3>

    <div class="products">

      ${order.items.map(item => `
      
        <div class="card">

          <h3>${item.title}</h3>

          <p>
            ${item.qty} шт × ${item.price} ₸
          </p>

          <p>
            Сумма: ${item.qty * item.price} ₸
          </p>

        </div>
      
      `).join("")}

    </div>

    <h3>Итого: ${order.total} ₸</h3>

    <a href="#orders" class="btn">
      Назад к заказам
    </a>
  
  `

}