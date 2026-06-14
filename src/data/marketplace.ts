export const CHEF_IMG = "https://cdn.poehali.dev/projects/e95ca8b8-bea5-47a8-a08e-e2c2ec5c3e3c/files/4c3a97aa-dc7d-460e-a6be-47e15a6e921e.jpg";
export const SOMMELIER_IMG = "https://cdn.poehali.dev/projects/e95ca8b8-bea5-47a8-a08e-e2c2ec5c3e3c/files/44fc44a3-7baf-4088-afc9-29725ff54d5d.jpg";
export const BARTENDER_IMG = "https://cdn.poehali.dev/projects/e95ca8b8-bea5-47a8-a08e-e2c2ec5c3e3c/files/c3f3c4a7-02db-4c5d-9f57-b558d9c39173.jpg";
export const KNIFE_IMG = "https://cdn.poehali.dev/projects/e95ca8b8-bea5-47a8-a08e-e2c2ec5c3e3c/files/f8f015f3-6277-4a65-aa95-cb96b2c82f96.jpg";
export const COFFEE_IMG = "https://cdn.poehali.dev/projects/e95ca8b8-bea5-47a8-a08e-e2c2ec5c3e3c/files/943ad360-4e99-4c7d-9d43-2087fdd53d6a.jpg";
export const COURSE_IMG = "https://cdn.poehali.dev/projects/e95ca8b8-bea5-47a8-a08e-e2c2ec5c3e3c/files/6ce166ac-8870-48e6-8cc0-b60c1466f72d.jpg";

export type Role = "client" | "specialist";

export interface User {
  name: string;
  email: string;
  role: Role;
}

export const EXPERT_CATEGORIES = [
  { id: "all", label: "Все", icon: "Grid3x3" },
  { id: "chef", label: "Шефы", icon: "ChefHat" },
  { id: "sommelier", label: "Сомелье", icon: "Wine" },
  { id: "barman", label: "Бармены", icon: "GlassWater" },
  { id: "manager", label: "Менеджеры", icon: "CalendarCheck" },
];

export const SPECIALISTS = [
  { id: 1, name: "Алексей Морозов", role: "Шеф-повар", category: "chef", rating: 4.9, reviews: 87, rate: "8 000 ₽/день", skills: ["Французская кухня", "Су-вид", "Банкеты"], available: true, img: CHEF_IMG, projects: 142 },
  { id: 2, name: "Елена Соколова", role: "Сомелье", category: "sommelier", rating: 5.0, reviews: 54, rate: "6 500 ₽/день", skills: ["Дегустация", "Винные карты", "Бургундия"], available: true, img: SOMMELIER_IMG, projects: 98 },
  { id: 3, name: "Дмитрий Краснов", role: "Бар-менеджер", category: "barman", rating: 4.8, reviews: 63, rate: "5 500 ₽/день", skills: ["Коктейли", "Бар-меню", "Обучение"], available: false, img: BARTENDER_IMG, projects: 115 },
  { id: 4, name: "Мария Волкова", role: "Event-менеджер", category: "manager", rating: 4.7, reviews: 41, rate: "7 000 ₽/день", skills: ["Корпоративы", "Свадьбы", "Логистика"], available: true, img: CHEF_IMG, projects: 76 },
];

export const SHOP_CATEGORIES = [
  { id: "all", label: "Всё", icon: "Grid3x3" },
  { id: "kitchen", label: "Кухня", icon: "UtensilsCrossed" },
  { id: "drinks", label: "Напитки", icon: "Coffee" },
  { id: "tableware", label: "Посуда", icon: "Soup" },
  { id: "textile", label: "Текстиль", icon: "Shirt" },
];

export const PRODUCTS = [
  { id: 1, title: "Набор поварских ножей Pro", category: "kitchen", price: "12 400 ₽", oldPrice: "15 900 ₽", rating: 4.9, sold: 234, seller: "KitchenPro", img: KNIFE_IMG, badge: "Хит" },
  { id: 2, title: "Кофе в зёрнах Premium, 1кг", category: "drinks", price: "1 850 ₽", oldPrice: null, rating: 4.8, sold: 1240, seller: "CoffeeLab", img: COFFEE_IMG, badge: null },
  { id: 3, title: "Профессиональный блендер", category: "kitchen", price: "28 900 ₽", oldPrice: "34 000 ₽", rating: 4.7, sold: 89, seller: "TechHoReCa", img: KNIFE_IMG, badge: "-15%" },
  { id: 4, title: "Сироп для коктейлей, набор", category: "drinks", price: "3 200 ₽", oldPrice: null, rating: 4.9, sold: 567, seller: "BarSupply", img: COFFEE_IMG, badge: null },
];

export const COURSE_CATEGORIES = [
  { id: "all", label: "Все курсы", icon: "Grid3x3" },
  { id: "cooking", label: "Кухня", icon: "ChefHat" },
  { id: "bar", label: "Бар", icon: "Wine" },
  { id: "management", label: "Управление", icon: "Briefcase" },
];

export const COURSES = [
  { id: 1, title: "Французская кухня с нуля", category: "cooking", price: "12 900 ₽", lessons: 24, hours: 18, rating: 4.9, students: 1240, author: "Алексей Морозов", img: COURSE_IMG, level: "Начинающий" },
  { id: 2, title: "Искусство сомелье", category: "bar", price: "18 500 ₽", lessons: 32, hours: 26, rating: 5.0, students: 540, author: "Елена Соколова", img: COURSE_IMG, level: "Продвинутый" },
  { id: 3, title: "Управление рестораном", category: "management", price: "24 000 ₽", lessons: 40, hours: 35, rating: 4.8, students: 890, author: "Мария Волкова", img: COURSE_IMG, level: "Профи" },
  { id: 4, title: "Авторские коктейли", category: "bar", price: "9 900 ₽", lessons: 16, hours: 12, rating: 4.7, students: 720, author: "Дмитрий Краснов", img: COURSE_IMG, level: "Средний" },
];

export const ORDERS = [
  { id: 1, title: "Банкет на 200 человек", type: "Услуга", status: "active", amount: "45 000 ₽", date: "20 июня", partner: "Алексей Морозов", progress: 60 },
  { id: 2, title: "Набор ножей Pro", type: "Товар", status: "active", amount: "12 400 ₽", date: "В пути", partner: "KitchenPro", progress: 40 },
  { id: 3, title: "Курс «Французская кухня»", type: "Обучение", status: "done", amount: "12 900 ₽", date: "Завершён", partner: "Алексей Морозов", progress: 100 },
  { id: 4, title: "Винная карта", type: "Услуга", status: "done", amount: "18 000 ₽", date: "10 июня", partner: "Елена Соколова", progress: 100 },
];

export const CHATS = [
  { id: 1, name: "Алексей Морозов", role: "Шеф-повар", lastMsg: "Да, могу выйти в пятницу. Пришлите детали.", time: "14:32", unread: 2, img: CHEF_IMG },
  { id: 2, name: "KitchenPro", role: "Продавец", lastMsg: "Заказ отправлен, трек-номер в письме.", time: "вчера", unread: 0, img: KNIFE_IMG },
  { id: 3, name: "Елена Соколова", role: "Сомелье", lastMsg: "Карта готова, отправляю на почту.", time: "вчера", unread: 0, img: SOMMELIER_IMG },
];

export const INIT_MSGS = [
  { id: 1, from: "them", text: "Добрый день! Смотрел ваш запрос на банкет.", time: "14:20" },
  { id: 2, from: "me", text: "Здравствуйте! Нам нужен шеф на 20 июня, 200 персон.", time: "14:22" },
  { id: 3, from: "them", text: "Дата свободна. Какая концепция меню?", time: "14:25" },
  { id: 4, from: "me", text: "Европейская кухня, 4 блюда + десерт. Бюджет 45 000 ₽.", time: "14:28" },
  { id: 5, from: "them", text: "Да, могу выйти в пятницу. Пришлите детали.", time: "14:32" },
];
