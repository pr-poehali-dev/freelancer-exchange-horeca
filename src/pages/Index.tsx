import { useState } from "react";
import Icon from "@/components/ui/icon";

const CHEF_IMG = "https://cdn.poehali.dev/projects/e95ca8b8-bea5-47a8-a08e-e2c2ec5c3e3c/files/4c3a97aa-dc7d-460e-a6be-47e15a6e921e.jpg";
const SOMMELIER_IMG = "https://cdn.poehali.dev/projects/e95ca8b8-bea5-47a8-a08e-e2c2ec5c3e3c/files/44fc44a3-7baf-4088-afc9-29725ff54d5d.jpg";
const BARTENDER_IMG = "https://cdn.poehali.dev/projects/e95ca8b8-bea5-47a8-a08e-e2c2ec5c3e3c/files/c3f3c4a7-02db-4c5d-9f57-b558d9c39173.jpg";

// ─── ТИПЫ ───────────────────────────────────────────────
type Screen = "welcome" | "login" | "register" | "role" | "app";
type Role = "client" | "specialist";
type Tab = "home" | "search" | "projects" | "chat" | "profile";

interface User {
  name: string;
  email: string;
  role: Role;
}

// ─── ДАННЫЕ ─────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "Все", icon: "Grid3x3" },
  { id: "chef", label: "Шефы", icon: "ChefHat" },
  { id: "sommelier", label: "Сомелье", icon: "Wine" },
  { id: "barman", label: "Бармены", icon: "GlassWater" },
  { id: "manager", label: "Менеджеры", icon: "CalendarCheck" },
];

const SPECIALISTS = [
  { id: 1, name: "Алексей Морозов", role: "Шеф-повар", category: "chef", rating: 4.9, reviews: 87, rate: "8 000 ₽/день", skills: ["Французская кухня", "Су-вид", "Банкеты"], available: true, img: CHEF_IMG, projects: 142 },
  { id: 2, name: "Елена Соколова", role: "Сомелье", category: "sommelier", rating: 5.0, reviews: 54, rate: "6 500 ₽/день", skills: ["Дегустация", "Винные карты", "Бургундия"], available: true, img: SOMMELIER_IMG, projects: 98 },
  { id: 3, name: "Дмитрий Краснов", role: "Бар-менеджер", category: "barman", rating: 4.8, reviews: 63, rate: "5 500 ₽/день", skills: ["Коктейли", "Бар-меню", "Обучение"], available: false, img: BARTENDER_IMG, projects: 115 },
  { id: 4, name: "Мария Волкова", role: "Event-менеджер", category: "manager", rating: 4.7, reviews: 41, rate: "7 000 ₽/день", skills: ["Корпоративы", "Свадьбы", "Логистика"], available: true, img: CHEF_IMG, projects: 76 },
];

const PROJECTS = [
  { id: 1, title: "Банкет на 200 человек", status: "active", budget: "45 000 ₽", deadline: "20 июня", specialist: "Алексей Морозов", progress: 60 },
  { id: 2, title: "Составление винной карты", status: "active", budget: "18 000 ₽", deadline: "25 июня", specialist: "Елена Соколова", progress: 30 },
  { id: 3, title: "Корпоратив на 80 человек", status: "done", budget: "32 000 ₽", deadline: "10 июня", specialist: "Мария Волкова", progress: 100 },
  { id: 4, title: "Разработка коктейльного меню", status: "done", budget: "12 000 ₽", deadline: "5 июня", specialist: "Дмитрий Краснов", progress: 100 },
];

const CHATS = [
  { id: 1, name: "Алексей Морозов", role: "Шеф-повар", lastMsg: "Да, могу выйти в пятницу. Пришлите детали.", time: "14:32", unread: 2, img: CHEF_IMG },
  { id: 2, name: "Елена Соколова", role: "Сомелье", lastMsg: "Карта готова, отправляю на почту.", time: "вчера", unread: 0, img: SOMMELIER_IMG },
];

const INIT_MSGS = [
  { id: 1, from: "them", text: "Добрый день! Смотрел ваш запрос на банкет.", time: "14:20" },
  { id: 2, from: "me", text: "Здравствуйте! Нам нужен шеф на 20 июня, 200 персон.", time: "14:22" },
  { id: 3, from: "them", text: "Дата свободна. Какая концепция меню?", time: "14:25" },
  { id: 4, from: "me", text: "Европейская кухня, 4 блюда + десерт. Бюджет 45 000 ₽.", time: "14:28" },
  { id: 5, from: "them", text: "Да, могу выйти в пятницу. Пришлите детали.", time: "14:32" },
];

// ─── КОМПОНЕНТЫ ──────────────────────────────────────────

function AppHeader({ title, onBack, actions }: { title: string; onBack?: () => void; actions?: React.ReactNode }) {
  return (
    <header className="px-5 pt-12 pb-4 flex items-center justify-between sticky top-0 z-20 bg-white border-b border-border">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="tap-scale">
            <Icon name="ArrowLeft" size={20} className="text-foreground" />
          </button>
        )}
        <div>
          <div className="text-[10px] font-bold tracking-widest uppercase blue-text">PELBY<span className="text-foreground">ONE</span></div>
          <h1 className="text-base font-black leading-tight">{title}</h1>
        </div>
      </div>
      <div className="flex gap-2">{actions}</div>
    </header>
  );
}

// ─── ЭКРАН ПРИВЕТСТВИЯ ───────────────────────────────────

function WelcomeScreen({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  return (
    <div className="min-h-screen flex flex-col px-5 pt-16 pb-10 animate-fade-in">
      {/* Logo */}
      <div className="mb-10">
        <div className="text-3xl font-black tracking-tight">
          <span className="blue-text">PELBY</span>ONE
        </div>
        <div className="text-sm text-muted-foreground mt-1">экосистема гостеприимства</div>
      </div>

      {/* Hero */}
      <div className="flex-1">
        <h1 className="text-4xl font-black leading-[1.1] mb-2">
          Поставьте задачу<br />и мы подберём<br />
          <span className="blue-text">решение</span>
        </h1>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          Биржа HoReCa-специалистов: шефы, сомелье, бармены, менеджеры событий
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-2 gap-3 mt-8">
          {[
            { title: "БИРЖА ЭКСПЕРТОВ", desc: "быстрый подбор специалистов по вашим заданиям" },
            { title: "ПОДБОР СОТРУДНИКОВ", desc: "на постоянной основе или на короткий срок" },
            { title: "СИСТЕМА ОЦЕНОК", desc: "проверенные отзывы и рейтинги специалистов" },
            { title: "БЕЗОПАСНАЯ ОПЛАТА", desc: "деньги переводятся после выполнения работы" },
          ].map((f) => (
            <div key={f.title} className="border border-border rounded-2xl p-3">
              <div className="text-xs font-black blue-text leading-tight mb-1">{f.title}</div>
              <div className="text-[11px] text-muted-foreground leading-snug">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3 mt-10">
        <button className="btn-orange" onClick={onRegister}>Стать частью экосистемы</button>
        <button className="btn-outline" onClick={onLogin}>Войти в аккаунт</button>
      </div>
    </div>
  );
}

// ─── ЭКРАН ВХОДА ─────────────────────────────────────────

function LoginScreen({ onBack, onSuccess }: { onBack: () => void; onSuccess: (u: User) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) { setError("Заполните все поля"); return; }
    if (password.length < 6) { setError("Пароль минимум 6 символов"); return; }
    onSuccess({ name: email.split("@")[0], email, role: "client" });
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3 border-b border-border">
        <button onClick={onBack} className="tap-scale"><Icon name="ArrowLeft" size={20} /></button>
        <div>
          <div className="text-[10px] font-black tracking-widest uppercase blue-text">PELBY<span className="text-foreground">ONE</span></div>
          <h1 className="text-base font-black">Вход в аккаунт</h1>
        </div>
      </div>

      <div className="flex-1 px-5 pt-8 space-y-4">
        <div>
          <div className="text-3xl font-black leading-tight mb-1">С возвращением!</div>
          <div className="text-muted-foreground text-sm">Войдите, чтобы продолжить работу</div>
        </div>

        <div className="space-y-3 pt-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.ru"
              className="mt-1 w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          {error && <div className="text-red-500 text-xs font-medium">{error}</div>}
          <button className="text-xs blue-text font-bold text-right w-full">Забыли пароль?</button>
        </div>
      </div>

      <div className="px-5 pb-10 pt-4">
        <button className="btn-orange" onClick={handleLogin}>Войти</button>
      </div>
    </div>
  );
}

// ─── ЭКРАН РЕГИСТРАЦИИ ────────────────────────────────────

function RegisterScreen({ onBack, onSuccess }: { onBack: () => void; onSuccess: (u: User) => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const [error, setError] = useState("");

  const handleStep1 = () => {
    if (!name || !email || !password) { setError("Заполните все поля"); return; }
    if (password.length < 6) { setError("Пароль минимум 6 символов"); return; }
    setError("");
    setStep(2);
  };

  const handleFinish = () => {
    if (!role) { setError("Выберите роль"); return; }
    onSuccess({ name, email, role });
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3 border-b border-border">
        <button onClick={step === 2 ? () => setStep(1) : onBack} className="tap-scale">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <div>
          <div className="text-[10px] font-black tracking-widest uppercase blue-text">PELBY<span className="text-foreground">ONE</span></div>
          <h1 className="text-base font-black">Регистрация</h1>
        </div>
        {/* Step indicator */}
        <div className="ml-auto flex gap-1.5">
          {[1, 2].map(s => (
            <div key={s} className={`h-1.5 rounded-full transition-all ${step >= s ? "w-6 blue-bg" : "w-3 bg-border"}`} />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="flex-1 px-5 pt-8 space-y-4 animate-slide-up">
          <div>
            <div className="text-3xl font-black leading-tight mb-1">Создать аккаунт</div>
            <div className="text-muted-foreground text-sm">Шаг 1 из 2 — основная информация</div>
          </div>
          <div className="space-y-3 pt-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Ваше имя</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Иван Петров"
                className="mt-1 w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.ru"
                className="mt-1 w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Пароль</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Минимум 6 символов"
                className="mt-1 w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
            </div>
            {error && <div className="text-red-500 text-xs font-medium">{error}</div>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 px-5 pt-8 animate-slide-up">
          <div className="mb-6">
            <div className="text-3xl font-black leading-tight mb-1">Кто вы?</div>
            <div className="text-muted-foreground text-sm">Шаг 2 из 2 — выберите роль</div>
          </div>
          <div className="space-y-4">
            {([
              {
                id: "client" as Role,
                icon: "Building2",
                title: "Заказчик",
                desc: "Ищу специалистов для ресторана, кафе, событий или проектов в HoReCa",
                color: "var(--orange)",
              },
              {
                id: "specialist" as Role,
                icon: "ChefHat",
                title: "Специалист",
                desc: "Я шеф, сомелье, бармен или менеджер — ищу проекты и заказы",
                color: "var(--blue)",
              },
            ]).map(r => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`w-full text-left p-5 rounded-2xl border-2 tap-scale transition-all ${
                  role === r.id ? "border-[var(--blue)] bg-[#F0F3FF]" : "border-border bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: r.color + "1A" }}>
                    <Icon name={r.icon} size={22} style={{ color: r.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-base">{r.title}</div>
                    <div className="text-sm text-muted-foreground mt-1 leading-snug">{r.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    role === r.id ? "border-[var(--blue)] blue-bg" : "border-border"
                  }`}>
                    {role === r.id && <Icon name="Check" size={11} className="text-white" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
          {error && <div className="text-red-500 text-xs font-medium mt-3">{error}</div>}
        </div>
      )}

      <div className="px-5 pb-10 pt-4">
        <button className="btn-orange" onClick={step === 1 ? handleStep1 : handleFinish}>
          {step === 1 ? "Продолжить" : "Начать работу"}
        </button>
      </div>
    </div>
  );
}

// ─── ГЛАВНОЕ ПРИЛОЖЕНИЕ ───────────────────────────────────

function MainApp({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("home");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedSpec, setSelectedSpec] = useState<typeof SPECIALISTS[0] | null>(null);
  const [openChat, setOpenChat] = useState<typeof CHATS[0] | null>(null);
  const [projTab, setProjTab] = useState<"active" | "done">("active");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(INIT_MSGS);

  const filtered = SPECIALISTS.filter(s => {
    const mc = category === "all" || s.category === category;
    const mq = !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.role.toLowerCase().includes(query.toLowerCase());
    return mc && mq;
  });

  const sendMsg = () => {
    if (!chatInput.trim()) return;
    setMessages(p => [...p, { id: Date.now(), from: "me", text: chatInput, time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) }]);
    setChatInput("");
  };

  const switchTab = (t: Tab) => { setTab(t); setSelectedSpec(null); setOpenChat(null); };

  const tabLabel: Record<Tab, string> = {
    home: "Главная",
    search: "Специалисты",
    projects: "Проекты",
    chat: openChat ? openChat.name : "Сообщения",
    profile: "Профиль",
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="px-5 pt-12 pb-3 flex items-center justify-between sticky top-0 z-20 bg-white border-b border-border">
        <div className="flex items-center gap-2">
          {(tab === "search" && selectedSpec || tab === "chat" && openChat) && (
            <button onClick={() => { setSelectedSpec(null); setOpenChat(null); }} className="tap-scale mr-1">
              <Icon name="ArrowLeft" size={20} />
            </button>
          )}
          <div>
            <div className="text-[10px] font-black tracking-widest uppercase">
              <span className="blue-text">PELBY</span>ONE
            </div>
            <h1 className="text-base font-black leading-tight">{tabLabel[tab]}</h1>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button className="relative w-9 h-9 rounded-full gray-bg flex items-center justify-center tap-scale">
            <Icon name="Bell" size={16} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full orange-bg border-2 border-white" />
          </button>
          <img src={CHEF_IMG} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-24">

        {/* ── HOME ── */}
        {tab === "home" && (
          <div className="animate-fade-in px-5 pt-5">
            <div className="mb-5">
              <div className="text-2xl font-black leading-tight">
                Привет, <span className="blue-text">{user.name}!</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {user.role === "client" ? "Найдите лучших специалистов" : "Найдите новые проекты"}
              </div>
            </div>

            {/* Task input */}
            <div className="border-2 border-border rounded-2xl px-4 py-3.5 mb-5">
              <div className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">Например:</span> разработать концепцию для нового кафе
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { v: "1 240+", l: "Специалистов" },
                { v: "8 500+", l: "Проектов" },
                { v: "4.9", l: "Средний рейтинг" },
              ].map(s => (
                <div key={s.l} className="gray-bg rounded-2xl p-3 text-center">
                  <div className="text-lg font-black blue-text">{s.v}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Sections */}
            <div className="mb-4">
              <div className="text-xs font-black text-muted-foreground uppercase tracking-wider mb-3">Что такое экосистема:</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: "БИРЖА ЭКСПЕРТОВ", desc: "быстрый подбор по вашим заданиям", action: () => switchTab("search") },
                  { title: "ПОДБОР СОТРУДНИКОВ", desc: "на постоянной основе или короткий срок", action: () => switchTab("search") },
                  { title: "МОИ ПРОЕКТЫ", desc: "активные и завершённые заказы", action: () => switchTab("projects") },
                  { title: "СООБЩЕНИЯ", desc: "чат со специалистами", action: () => switchTab("chat") },
                ].map(f => (
                  <button key={f.title} onClick={f.action}
                    className="border-2 border-border rounded-2xl p-3.5 text-left tap-scale hover:border-[var(--blue)] transition-colors">
                    <div className="text-xs font-black blue-text leading-tight mb-1">{f.title}</div>
                    <div className="text-[11px] text-muted-foreground leading-snug">{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button className="btn-orange mt-2" onClick={() => switchTab("search")}>
              Найти специалиста
            </button>
          </div>
        )}

        {/* ── SEARCH ── */}
        {tab === "search" && !selectedSpec && (
          <div className="animate-fade-in">
            <div className="px-5 pt-4 pb-3">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Шефы, сомелье, навыки..."
                  className="w-full border-2 border-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="px-5 pb-4 overflow-x-auto">
              <div className="flex gap-2 w-max">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap tap-scale ${
                      category === cat.id ? "blue-bg text-white" : "gray-bg text-muted-foreground"
                    }`}>
                    <Icon name={cat.icon} size={13} />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="px-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-muted-foreground uppercase tracking-wider">Специалисты</span>
                <span className="text-xs blue-text font-bold">{filtered.length} найдено</span>
              </div>
              {filtered.map((spec, i) => (
                <button key={spec.id} onClick={() => setSelectedSpec(spec)}
                  className="w-full bg-white border-2 border-border rounded-2xl p-4 flex gap-3 items-start tap-scale hover:border-[var(--blue)] transition-colors text-left"
                  style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="relative flex-shrink-0">
                    <img src={spec.img} alt={spec.name} className="w-14 h-14 rounded-xl object-cover" />
                    <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${spec.available ? "bg-green-500" : "bg-gray-300"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-black text-sm">{spec.name}</div>
                        <div className="text-xs text-muted-foreground">{spec.role}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs font-black orange-text">{spec.rate}</div>
                        <div className="text-[10px] text-muted-foreground">{spec.projects} проектов</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Icon name="Star" size={11} className="orange-text fill-current" />
                      <span className="text-xs font-bold">{spec.rating}</span>
                      <span className="text-[10px] text-muted-foreground">({spec.reviews} отзывов)</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {spec.skills.slice(0, 2).map(sk => (
                        <span key={sk} className="text-[10px] gray-bg px-2 py-0.5 rounded-full text-muted-foreground">{sk}</span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── SPEC DETAIL ── */}
        {tab === "search" && selectedSpec && (
          <div className="animate-slide-up">
            <div className="relative">
              <img src={selectedSpec.img} alt={selectedSpec.name} className="w-full h-52 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">{selectedSpec.name}</h2>
                  <p className="text-sm text-white/80">{selectedSpec.role}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${selectedSpec.available ? "bg-green-500 text-white" : "bg-white/30 text-white"}`}>
                  {selectedSpec.available ? "Доступен" : "Занят"}
                </span>
              </div>
            </div>
            <div className="px-5 pt-5 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[{ l: "Рейтинг", v: `${selectedSpec.rating}★` }, { l: "Отзывов", v: `${selectedSpec.reviews}` }, { l: "Проектов", v: `${selectedSpec.projects}` }]
                  .map(s => (
                    <div key={s.l} className="gray-bg rounded-xl p-3 text-center">
                      <div className="text-base font-black blue-text">{s.v}</div>
                      <div className="text-[10px] text-muted-foreground">{s.l}</div>
                    </div>
                  ))}
              </div>
              <div className="border-2 border-border rounded-2xl p-4">
                <div className="text-xs font-black text-muted-foreground uppercase tracking-wide mb-2">Навыки</div>
                <div className="flex flex-wrap gap-2">
                  {selectedSpec.skills.map(sk => (
                    <span key={sk} className="text-xs gray-bg px-3 py-1.5 rounded-full font-medium">{sk}</span>
                  ))}
                </div>
              </div>
              <div className="border-2 border-border rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Стоимость</div>
                  <div className="text-xl font-black orange-text mt-0.5">{selectedSpec.rate}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setTab("chat"); setSelectedSpec(null); setOpenChat(CHATS[0]); }}
                    className="w-11 h-11 gray-bg rounded-xl flex items-center justify-center tap-scale">
                    <Icon name="MessageCircle" size={18} className="blue-text" />
                  </button>
                  <button className="btn-orange !w-auto px-6 !py-2.5 !rounded-xl">Нанять</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PROJECTS ── */}
        {tab === "projects" && (
          <div className="animate-fade-in px-5 pt-4">
            <div className="flex gap-2 mb-5">
              {(["active", "done"] as const).map(t => (
                <button key={t} onClick={() => setProjTab(t)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-black tap-scale transition-all ${projTab === t ? "blue-bg text-white" : "gray-bg text-muted-foreground"}`}>
                  {t === "active" ? "Активные" : "Завершённые"}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {PROJECTS.filter(p => p.status === projTab).map((proj, i) => (
                <div key={proj.id} className="border-2 border-border rounded-2xl p-4 animate-slide-up" style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-black text-sm">{proj.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{proj.specialist}</div>
                    </div>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full flex-shrink-0 ${proj.status === "active" ? "bg-blue-100 blue-text" : "bg-green-100 text-green-700"}`}>
                      {proj.status === "active" ? "В работе" : "Готово"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon name="Calendar" size={12} />{proj.deadline}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-black orange-text">
                      <Icon name="Banknote" size={12} />{proj.budget}
                    </div>
                  </div>
                  {proj.status === "active" && (
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                        <span>Прогресс</span><span>{proj.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full blue-bg rounded-full transition-all" style={{ width: `${proj.progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3.5 border-2 border-dashed border-[var(--blue)] rounded-2xl text-sm font-black blue-text tap-scale flex items-center justify-center gap-2">
              <Icon name="Plus" size={16} />Новый проект
            </button>
          </div>
        )}

        {/* ── CHAT LIST ── */}
        {tab === "chat" && !openChat && (
          <div className="animate-fade-in pt-4">
            <div className="px-5 pb-3">
              <div className="relative">
                <Icon name="Search" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input placeholder="Поиск диалогов..." className="w-full gray-bg rounded-xl pl-10 pr-4 py-3 text-sm outline-none" />
              </div>
            </div>
            <div className="divide-y divide-border">
              {CHATS.map(chat => (
                <button key={chat.id} onClick={() => setOpenChat(chat)}
                  className="w-full flex gap-3 px-5 py-4 items-center tap-scale hover:bg-gray-50 transition-colors text-left">
                  <div className="relative flex-shrink-0">
                    <img src={chat.img} alt={chat.name} className="w-12 h-12 rounded-xl object-cover" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm">{chat.name}</span>
                      <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">{chat.role}</div>
                    <div className="text-xs text-muted-foreground truncate mt-0.5">{chat.lastMsg}</div>
                  </div>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 rounded-full orange-bg text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">{chat.unread}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── CHAT OPEN ── */}
        {tab === "chat" && openChat && (
          <div className="animate-fade-in flex flex-col" style={{ height: "calc(100vh - 176px)" }}>
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border">
              <img src={openChat.img} alt={openChat.name} className="w-9 h-9 rounded-lg object-cover" />
              <div>
                <div className="text-sm font-black">{openChat.name}</div>
                <div className="text-[10px] text-green-600 font-medium">онлайн</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.from === "me" ? "orange-bg text-white rounded-br-sm" : "gray-bg text-foreground rounded-bl-sm"
                  }`}>
                    {msg.text}
                    <div className={`text-[9px] mt-1 ${msg.from === "me" ? "text-white/70 text-right" : "text-muted-foreground"}`}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-4 pt-2 flex gap-2 border-t border-border">
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()}
                placeholder="Сообщение..."
                className="flex-1 gray-bg rounded-xl px-4 py-3 text-sm outline-none" />
              <button onClick={sendMsg} className="w-11 h-11 orange-bg rounded-xl flex items-center justify-center tap-scale flex-shrink-0">
                <Icon name="Send" size={16} className="text-white" />
              </button>
            </div>
          </div>
        )}

        {/* ── PROFILE ── */}
        {tab === "profile" && (
          <div className="animate-fade-in">
            <div className="px-5 pt-6 pb-5 flex flex-col items-center border-b border-border">
              <div className="relative">
                <img src={CHEF_IMG} alt="avatar" className="w-20 h-20 rounded-2xl object-cover border-2 border-[var(--blue)]" />
                <button className="absolute -bottom-2 -right-2 w-7 h-7 orange-bg rounded-full flex items-center justify-center">
                  <Icon name="Camera" size={12} className="text-white" />
                </button>
              </div>
              <h2 className="text-xl font-black mt-3">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.role === "client" ? "Заказчик" : "Специалист"}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs gray-bg px-3 py-1 rounded-full text-muted-foreground font-medium">Москва</span>
                <span className="text-xs orange-bg px-3 py-1 rounded-full text-white font-black">Pro</span>
              </div>
            </div>

            <div className="px-5 grid grid-cols-3 gap-3 py-5">
              {[{ l: "Проектов", v: "24" }, { l: "Потрачено", v: "480К" }, { l: "Отзывов", v: "18" }].map(s => (
                <div key={s.l} className="gray-bg rounded-xl p-3 text-center">
                  <div className="text-base font-black blue-text">{s.v}</div>
                  <div className="text-[10px] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="px-5 space-y-2">
              {[
                { icon: "User", label: "Редактировать профиль" },
                { icon: "Star", label: "Мои отзывы" },
                { icon: "Heart", label: "Избранные специалисты" },
                { icon: "CreditCard", label: "Платёжные методы" },
                { icon: "Bell", label: "Уведомления" },
                { icon: "HelpCircle", label: "Помощь" },
              ].map(item => (
                <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3.5 border-2 border-border rounded-xl tap-scale hover:border-[var(--blue)] transition-colors">
                  <Icon name={item.icon} size={16} className="text-muted-foreground" />
                  <span className="text-sm flex-1 text-left font-medium">{item.label}</span>
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                </button>
              ))}
              <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3.5 border-2 border-red-200 rounded-xl tap-scale mt-2">
                <Icon name="LogOut" size={16} className="text-red-500" />
                <span className="text-sm text-red-500 font-black">Выйти из аккаунта</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-border px-2 pb-6 pt-2 z-30">
        <div className="flex justify-around">
          {([
            { id: "home", icon: "Home", label: "Главная" },
            { id: "search", icon: "Search", label: "Поиск" },
            { id: "projects", icon: "FolderOpen", label: "Проекты" },
            { id: "chat", icon: "MessageCircle", label: "Чат" },
            { id: "profile", icon: "User", label: "Профиль" },
          ] as { id: Tab; icon: string; label: string }[]).map(item => (
            <button key={item.id} onClick={() => switchTab(item.id)} className="flex flex-col items-center gap-0.5 tap-scale px-3 py-1">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${tab === item.id ? "blue-bg" : "transparent"}`}>
                <Icon name={item.icon} size={16} className={tab === item.id ? "text-white" : "text-muted-foreground"} />
              </div>
              <span className={`text-[9px] font-black ${tab === item.id ? "blue-text" : "text-muted-foreground"}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────

export default function Index() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [user, setUser] = useState<User | null>(null);

  const handleAuth = (u: User) => { setUser(u); setScreen("app"); };
  const handleLogout = () => { setUser(null); setScreen("welcome"); };

  if (screen === "welcome") return <WelcomeScreen onLogin={() => setScreen("login")} onRegister={() => setScreen("register")} />;
  if (screen === "login") return <LoginScreen onBack={() => setScreen("welcome")} onSuccess={handleAuth} />;
  if (screen === "register") return <RegisterScreen onBack={() => setScreen("welcome")} onSuccess={handleAuth} />;
  if (screen === "app" && user) return <MainApp user={user} onLogout={handleLogout} />;
  return null;
}
