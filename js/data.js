export const PRODUCTS = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    price: 650000,
    image: "img/iphone.jpg",
    category: "Смартфоны",
    rating: 4.9,
    desc: "Флагманский смартфон Apple с мощной камерой, титановым корпусом и высоким уровнем производительности.",
    specs: {
      "Экран": "6.7 дюйма",
      "Память": "256 GB",
      "Камера": "48 MP",
      "Процессор": "A17 Pro",
      "Батарея": "4422 mAh"
    }
  },

  {
    id: 2,
    title: "Кроссовки Nike",
    price: 35000,
    image: "img/shoes.jpg",
    category: "clothes",
    rating: 4.5,
    desc: "Удобные кроссовки для спорта.",
    specs: {
      "Тип": "Спортивные",
      "Материал": "Текстиль",
      "Подошва": "Резина",
      "Вес": "Лёгкие",
      "Сезон": "Лето"
    }
  },

  {
    id: 3,
    title: "Ноутбук Lenovo",
    price: 320000,
    image: "img/laptop.jpg",
    category: "gadgets",
    rating: 4.6,
    desc: "Производительный ноутбук для работы.",
    specs: {
      "Процессор": "Intel Core i7",
      "ОЗУ": "32 GB",
      "Память": "512 GB SSD",
      "Экран": "15.6 дюйма",
      "Видеокарта": "RTX 4070 Ti"
    }
  },

  {
    id: 4,
    title: "Наушник",
    price: 45000,
    image: "img/earphone.jpg",
    category: "gadgets",
    rating: 4.2,
    desc: "Наушник Марвел.",
    specs: {
      "Тип": "Проводные",
      "Разъём": "Lightning",
      "Микрофон": "Есть",
      "Шумоподавление": "Пассивное"
    }
  },

  {
    id: 5,
    title: "Футболка",
    price: 15000,
    image: "img/tshirt.jpg",
    category: "clothes",
    rating: 4.3,
    desc: "Стильная футболка.",
    specs: {
      "Материал": "Хлопок",
      "Размеры": "S/M/L",
      "Цвет": "Разные",
      "Пол": "Унисекс"
    }
  },

  {
    id: 6,
    title: "Игровое кресло",
    price: 60000,
    image: "img/armchair.jpg",
    category: "gadgets",
    rating: 4.7,
    desc: "Игровое кресло DARKFLASH RC350.",
    specs: {
      "Материал": "Экокожа",
      "Макс вес": "120 кг",
      "Регулировка": "Да",
      "Подлокотники": "Есть"
    }
  },

  {
    id: 7,
    title: "Корпус для ПК",
    price: 30000,
    image: "img/frame.jpg",
    category: "gadgets",
    rating: 4.1,
    desc: "Корпуса для компьютера.",
    specs: {
      "Тип": "ATX",
      "Вентиляторы": "3 шт",
      "Материал": "Металл",
      "Подсветка": "RGB"
    }
  },

  {
    id: 8,
    title: "Водяной кулер",
    price: 30000,
    image: "img/watercooler.jpg",
    category: "gadgets",
    rating: 4.9,
    desc: "Лучшая система водяного охлаждения.",
    specs: {
      "Тип": "Жидкостное",
      "Радиатор": "240 мм",
      "Совместимость": "Intel/AMD",
      "Шум": "25 дБ"
    }
  },

  {
    id: 9,
    title: "AMD Ryzen",
    price: 150000,
    image: "img/ryzen.jpg",
    category: "gadgets",
    rating: 4.9,
    desc: "AMD Ryzen 5 5600.",
    specs: {
      "Ядра": "6",
      "Потоки": "12",
      "Частота": "3.5 GHz",
      "Макс частота": "4.4 GHz"
    }
  },

  {
    id: 10,
    title: "Куртка",
    price: 40000,
    image: "img/jacket.jpg",
    category: "clothes",
    rating: 4.5,
    desc: "Куртка THE NORTH FACE.",
    specs: {
      "Материал": "Полиэстер",
      "Сезон": "Зима",
      "Размеры": "S/M/L",
      "Цвет": "Чёрный"
    }
  },

  {
    id: 11,
    title: "Redmagic Планшет",
    price: 500000,
    image: "img/redmagic.jpg",
    category: "gadgets",
    rating: 5.0,
    desc: "Игровой планшет REDMAGIC.",
    specs: {
      "Экран": "11 дюймов",
      "ОЗУ": "16 GB",
      "Память": "256 GB",
      "Процессор": "Snapdragon 8 Gen 2"
    }
  },

  {
    id: 12,
    title: "Видео Карта",
    price: 1000000,
    image: "img/rtx5090.jpg",
    category: "gadgets",
    rating: 5.0,
    desc: "RTX 5090",
    specs: {
      "Память": "32 GB",
      "Интерфейс": "PCIe 5.0",
      "Ray Tracing": "Да",
      "Частота": "2.5 GHz"
    }
  },

  {
    id: 13,
    title: "МакБук",
    price: 950000,
    image: "img/macbook.jpg",
    category: "gadgets",
    rating: 5.0,
    desc: "MacBook Pro M3",
    specs: {
      "Процессор": "M3 Pro",
      "ОЗУ": "32 GB",
      "Память": "512 GB",
      "Экран": "16 дюймов"
    }
  },

  {
    id: 14,
    title: "Клавиатура",
    price: 12000,
    image: "img/keyboard.jpg",
    category: "gadgets",
    rating: 4.0,
    desc: "Royal Kludge RH81",
    specs: {
      "Тип": "Механическая",
      "Подключение": "Bluetooth",
      "Подсветка": "RGB",
      "Формат": "75%"
    }
  },

  {
    id: 15,
    title: "Монитор",
    price: 80000,
    image: "img/monitor.jpg",
    category: "gadgets",
    rating: 4.7,
    desc: "240Hz монитор",
    specs: {
      "Диагональ": "24 дюйма",
      "Частота": "240 Hz",
      "Разрешение": "Full HD",
      "Матрица": "IPS"
    }
  }
];