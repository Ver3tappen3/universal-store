function readUsers() {
  try {
    return JSON.parse(localStorage.getItem("sf_users")) || []
  } catch {
    return []
  }
}

function readOrders() {
  try {
    return JSON.parse(localStorage.getItem("sf_orders")) || []
  } catch {
    return []
  }
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem("sf_session"))
  } catch {
    return null
  }
}

function getCurrentUser() {
  const session = getSession()
  if (!session?.userId) return null
  const users = readUsers()
  return users.find(u => u.id === session.userId)

}

export function renderProfile() {
  const root = document.getElementById("profileCard")
  if (!root) return
  const user = getCurrentUser()
  if (!user) {
    root.innerHTML = `
    
      <p>Вы не авторизованы</p>
      <a href="#login" class="btn">Войти</a>
    
    `

    return
  }

  const orders = readOrders()
  const myOrders = orders.filter(o => o.userId === user.id)
  const ordersCount = myOrders.length
  const totalSpent = myOrders.reduce((sum, o) => sum + o.total, 0)
  root.innerHTML = `

    <h3>${user.name}</h3>

    <p><strong>Email:</strong> ${user.email}</p>

    <p>
      <strong>Дата регистрации:</strong>
      ${new Date(user.createdAt).toLocaleDateString()}
    </p>

    <hr>

    <p>
      <strong>Заказов:</strong> ${ordersCount}
    </p>

    <p>
      <strong>Потрачено:</strong> ${totalSpent} ₸
    </p>

    <hr>
    <div style="display:flex; gap:10px; flex-wrap:wrap">

      <a href="#orders" class="btn">
        Мои заказы
      </a>

      <a href="#favorites" class="btn outline">
        Избранное
      </a>

      <a href="#cart" class="btn outline">
        Корзина
      </a>

      <button id="logoutBtn" class="btn">
        Выйти
      </button>
    </div>

  `

  document
  .getElementById("logoutBtn")
  ?.addEventListener("click", () => {
    localStorage.removeItem("sf_session")
    location.hash = "#home"

  })

}