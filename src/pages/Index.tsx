import { useState } from "react";
import Icon from "@/components/ui/icon";

const CHEF_IMG = "https://cdn.poehali.dev/projects/e95ca8b8-bea5-47a8-a08e-e2c2ec5c3e3c/files/4c3a97aa-dc7d-460e-a6be-47e15a6e921e.jpg";
const SOMMELIER_IMG = "https://cdn.poehali.dev/projects/e95ca8b8-bea5-47a8-a08e-e2c2ec5c3e3c/files/44fc44a3-7baf-4088-afc9-29725ff54d5d.jpg";
const BARTENDER_IMG = "https://cdn.poehali.dev/projects/e95ca8b8-bea5-47a8-a08e-e2c2ec5c3e3c/files/c3f3c4a7-02db-4c5d-9f57-b558d9c39173.jpg";

const CATEGORIES = [
  { id: "all", label: "Все", icon: "Grid3x3" },
  { id: "chef", label: "Шефы", icon: "ChefHat" },
  { id: "sommelier", label: "Сомелье", icon: "Wine" },
  { id: "barman", label: "Бармены", icon: "GlassWater" },
  { id: "manager", label: "Менеджеры", icon: "CalendarCheck" },
  { id: "waiter", label: "Официанты", icon: "UtensilsCrossed" },
];

const SPECIALISTS = [
  {
    id: 1,
    name: "Алексей Морозов",
    role: "Шеф-повар",
    category: "chef",
    rating: 4.9,
    reviews: 87,
    rate: "8 000 ₽/день",
    skills: ["Французская кухня", "Су-вид", "Банкеты"],
    available: true,
    img: CHEF_IMG,
    projects: 142,
  },
  {
    id: 2,
    name: "Елена Соколова",
    role: "Сомелье",
    category: "sommelier",
    rating: 5.0,
    reviews: 54,
    rate: "6 500 ₽/день",
    skills: ["Дегустация", "Винные карты", "Бургундия"],
    available: true,
    img: SOMMELIER_IMG,
    projects: 98,
  },
  {
    id: 3,
    name: "Дмитрий Краснов",
    role: "Бар-менеджер",
    category: "barman",
    rating: 4.8,
    reviews: 63,
    rate: "5 500 ₽/день",
    skills: ["Коктейли", "Бар-меню", "Обучение"],
    available: false,
    img: BARTENDER_IMG,
    projects: 115,
  },
  {
    id: 4,
    name: "Мария Волкова",
    role: "Event-менеджер",
    category: "manager",
    rating: 4.7,
    reviews: 41,
    rate: "7 000 ₽/день",
    skills: ["Корпоративы", "Свадьбы", "Логистика"],
    available: true,
    img: CHEF_IMG,
    projects: 76,
  },
  {
    id: 5,
    name: "Игорь Белов",
    role: "Шеф-повар",
    category: "chef",
    rating: 4.6,
    reviews: 29,
    rate: "6 000 ₽/день",
    skills: ["Итальянская кухня", "Пицца", "Паста"],
    available: true,
    img: BARTENDER_IMG,
    projects: 53,
  },
];

const PROJECTS = [
  {
    id: 1,
    title: "Банкет на 200 человек",
    status: "active",
    budget: "45 000 ₽",
    deadline: "20 июня",
    specialist: "Алексей Морозов",
    category: "Шеф-повар",
  },
  {
    id: 2,
    title: "Составление винной карты",
    status: "active",
    budget: "18 000 ₽",
    deadline: "25 июня",
    specialist: "Елена Соколова",
    category: "Сомелье",
  },
  {
    id: 3,
    title: "Корпоратив на 80 человек",
    status: "done",
    budget: "32 000 ₽",
    deadline: "10 июня",
    specialist: "Мария Волкова",
    category: "Event-менеджер",
  },
  {
    id: 4,
    title: "Разработка коктейльного меню",
    status: "done",
    budget: "12 000 ₽",
    deadline: "5 июня",
    specialist: "Дмитрий Краснов",
    category: "Бар-менеджер",
  },
];

const CHATS = [
  {
    id: 1,
    name: "Алексей Морозов",
    role: "Шеф-повар",
    lastMsg: "Да, могу выйти в пятницу. Пришлите детали меню.",
    time: "14:32",
    unread: 2,
    img: CHEF_IMG,
  },
  {
    id: 2,
    name: "Елена Соколова",
    role: "Сомелье",
    lastMsg: "Карта готова, отправляю на почту.",
    time: "вчера",
    unread: 0,
    img: SOMMELIER_IMG,
  },
  {
    id: 3,
    name: "Дмитрий Краснов",
    role: "Бар-менеджер",
    lastMsg: "Список оборудования уточним завтра.",
    time: "вчера",
    unread: 0,
    img: BARTENDER_IMG,
  },
];

const REVIEWS = [
  {
    id: 1,
    specialist: "Алексей Морозов",
    role: "Шеф-повар",
    rating: 5,
    text: "Алексей — профессионал высшего уровня. Гости были в восторге от меню. Обязательно пригласим снова на следующий банкет.",
    author: "Ресторан «Белуга»",
    date: "8 июня 2026",
    img: CHEF_IMG,
  },
  {
    id: 2,
    specialist: "Елена Соколова",
    role: "Сомелье",
    rating: 5,
    text: "Великолепная экспертиза по винам. Составила карту под концепцию ресторана идеально. Гости часто спрашивают о вине.",
    author: "Bistro Noire",
    date: "2 июня 2026",
    img: SOMMELIER_IMG,
  },
  {
    id: 3,
    specialist: "Дмитрий Краснов",
    role: "Бар-менеджер",
    rating: 4,
    text: "Отличный специалист. Разработал авторское коктейльное меню, обучил персонал. Продажи бара выросли на 30%.",
    author: "Sky Bar Moscow",
    date: "28 мая 2026",
    img: BARTENDER_IMG,
  },
];

const INITIAL_MESSAGES = [
  { id: 1, from: "them", text: "Добрый день! Смотрел ваш запрос на банкет.", time: "14:20" },
  { id: 2, from: "me", text: "Здравствуйте! Да, нам нужен шеф на 20 июня, 200 персон.", time: "14:22" },
  { id: 3, from: "them", text: "Дата свободна. Какая концепция меню?", time: "14:25" },
  { id: 4, from: "me", text: "Европейская кухня, 4 блюда + десерт. Бюджет 45 000 ₽.", time: "14:28" },
  { id: 5, from: "them", text: "Да, могу выйти в пятницу. Пришлите детали меню.", time: "14:32" },
];

type Tab = "search" | "projects" | "chat" | "profile" | "wallet" | "reviews";
type Spec = typeof SPECIALISTS[0];
type Chat = typeof CHATS[0];

export default function Index() {
  const [tab, setTab] = useState<Tab>("search");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpec, setSelectedSpec] = useState<Spec | null>(null);
  const [openChat, setOpenChat] = useState<Chat | null>(null);
  const [projectsTab, setProjectsTab] = useState<"active" | "done">("active");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const filteredSpecs = SPECIALISTS.filter((s) => {
    const matchCat = selectedCategory === "all" || s.category === selectedCategory;
    const matchQ =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.skills.some((sk) => sk.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchQ;
  });

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: "me",
        text: chatInput,
        time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setChatInput("");
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setSelectedSpec(null);
    setOpenChat(null);
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md flex flex-col min-h-screen relative">

        {/* HEADER */}
        <header className="px-5 pt-12 pb-4 flex items-center justify-between sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
          <div>
            <span className="text-xs font-medium tracking-widest uppercase gold-text">ChefHub</span>
            <h1 className="text-lg font-bold leading-tight mt-0.5">
              {tab === "search" && "Найти специалиста"}
              {tab === "projects" && "Проекты"}
              {tab === "chat" && (openChat ? openChat.name : "Сообщения")}
              {tab === "profile" && "Профиль"}
              {tab === "wallet" && "Кошелёк"}
              {tab === "reviews" && "Отзывы"}
            </h1>
          </div>
          <div className="flex gap-2">
            {tab === "search" && (
              <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center tap-scale">
                <Icon name="SlidersHorizontal" size={16} className="text-foreground" />
              </button>
            )}
            {tab === "chat" && openChat && (
              <button
                onClick={() => setOpenChat(null)}
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center tap-scale"
              >
                <Icon name="ArrowLeft" size={16} className="text-foreground" />
              </button>
            )}
            <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center tap-scale relative">
              <Icon name="Bell" size={16} className="text-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full gold-bg" />
            </button>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto pb-24">

          {/* ── SEARCH TAB ── */}
          {tab === "search" && !selectedSpec && (
            <div className="animate-fade-in">
              <div className="px-5 pt-4 pb-3">
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Шефы, сомелье, навыки..."
                    className="w-full bg-secondary rounded-xl pl-10 pr-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-[var(--gold)]"
                  />
                </div>
              </div>

              <div className="px-5 pb-4 overflow-x-auto">
                <div className="flex gap-2 w-max">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap tap-scale transition-all ${
                        selectedCategory === cat.id
                          ? "gold-bg text-[#111]"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <Icon name={cat.icon} size={13} />
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-4 grid grid-cols-3 gap-3">
                {[
                  { label: "Специалистов", value: "1 240+" },
                  { label: "Проектов", value: "8 500+" },
                  { label: "Рейтинг", value: "4.9 ★" },
                ].map((s) => (
                  <div key={s.label} className="bg-secondary rounded-xl p-3 text-center">
                    <div className="text-base font-bold gold-text">{s.value}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="px-5 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Специалисты</span>
                  <span className="text-xs gold-text font-medium">{filteredSpecs.length} найдено</span>
                </div>
                {filteredSpecs.map((spec, i) => (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedSpec(spec)}
                    className="w-full bg-card rounded-2xl p-4 flex gap-3 items-start tap-scale border border-border hover:border-[var(--gold-dim)] transition-colors text-left"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="relative flex-shrink-0">
                      <img src={spec.img} alt={spec.name} className="w-14 h-14 rounded-xl object-cover" />
                      <span
                        className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-card ${
                          spec.available ? "bg-green-500" : "bg-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold text-sm">{spec.name}</div>
                          <div className="text-xs text-muted-foreground">{spec.role}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs font-bold gold-text">{spec.rate}</div>
                          <div className="text-[10px] text-muted-foreground">{spec.projects} проектов</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Icon name="Star" size={11} className="gold-text fill-current" />
                        <span className="text-xs font-semibold">{spec.rating}</span>
                        <span className="text-[10px] text-muted-foreground">({spec.reviews})</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {spec.skills.slice(0, 2).map((sk) => (
                          <span key={sk} className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── SPECIALIST DETAIL ── */}
          {tab === "search" && selectedSpec && (
            <div className="animate-slide-up">
              <button
                onClick={() => setSelectedSpec(null)}
                className="flex items-center gap-2 px-5 pt-4 pb-2 text-sm text-muted-foreground tap-scale"
              >
                <Icon name="ArrowLeft" size={14} /> Назад
              </button>
              <div className="relative">
                <img src={selectedSpec.img} alt={selectedSpec.name} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{selectedSpec.name}</h2>
                      <p className="text-sm text-muted-foreground">{selectedSpec.role}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        selectedSpec.available
                          ? "bg-green-500/20 text-green-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {selectedSpec.available ? "Доступен" : "Занят"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-5 pt-4 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Рейтинг", value: `${selectedSpec.rating} ★` },
                    { label: "Отзывов", value: selectedSpec.reviews },
                    { label: "Проектов", value: selectedSpec.projects },
                  ].map((s) => (
                    <div key={s.label} className="bg-secondary rounded-xl p-3 text-center">
                      <div className="text-base font-bold gold-text">{s.value}</div>
                      <div className="text-[10px] text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-card rounded-2xl p-4 border border-border">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Навыки</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpec.skills.map((sk) => (
                      <span key={sk} className="text-xs bg-secondary px-3 py-1.5 rounded-full text-foreground">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-card rounded-2xl p-4 border border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">Стоимость</div>
                    <div className="text-lg font-bold gold-text mt-0.5">{selectedSpec.rate}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setTab("chat");
                        setSelectedSpec(null);
                        setOpenChat(CHATS[0]);
                      }}
                      className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center tap-scale"
                    >
                      <Icon name="MessageCircle" size={16} />
                    </button>
                    <button className="px-5 py-2.5 gold-bg text-[#111] font-semibold text-sm rounded-xl tap-scale">
                      Нанять
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PROJECTS TAB ── */}
          {tab === "projects" && (
            <div className="animate-fade-in px-5 pt-4">
              <div className="flex gap-2 mb-5">
                {(["active", "done"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setProjectsTab(t)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold tap-scale transition-all ${
                      projectsTab === t ? "gold-bg text-[#111]" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {t === "active" ? "Активные" : "Завершённые"}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {PROJECTS.filter((p) => p.status === projectsTab).map((proj, i) => (
                  <div
                    key={proj.id}
                    className="bg-card rounded-2xl p-4 border border-border animate-slide-up"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{proj.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {proj.specialist} · {proj.category}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                          proj.status === "active"
                            ? "bg-blue-500/15 text-blue-400"
                            : "bg-green-500/15 text-green-400"
                        }`}
                      >
                        {proj.status === "active" ? "В работе" : "Готово"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon name="Calendar" size={12} />
                        {proj.deadline}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold gold-text">
                        <Icon name="Banknote" size={12} />
                        {proj.budget}
                      </div>
                    </div>
                    {proj.status === "active" && (
                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                          <span>Прогресс</span>
                          <span>60%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full gold-bg rounded-full w-3/5" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3.5 border border-dashed border-[var(--gold-dim)] rounded-2xl text-sm font-semibold gold-text tap-scale flex items-center justify-center gap-2">
                <Icon name="Plus" size={16} />
                Новый проект
              </button>
            </div>
          )}

          {/* ── CHAT LIST ── */}
          {tab === "chat" && !openChat && (
            <div className="animate-fade-in pt-4">
              <div className="px-5 pb-3">
                <div className="relative">
                  <Icon name="Search" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    placeholder="Поиск диалогов..."
                    className="w-full bg-secondary rounded-xl pl-10 pr-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div className="divide-y divide-border">
                {CHATS.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setOpenChat(chat)}
                    className="w-full flex gap-3 px-5 py-4 items-center tap-scale hover:bg-secondary/50 transition-colors text-left"
                  >
                    <div className="relative flex-shrink-0">
                      <img src={chat.img} alt={chat.name} className="w-12 h-12 rounded-xl object-cover" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{chat.name}</span>
                        <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground">{chat.role}</div>
                      <div className="text-xs text-muted-foreground truncate mt-0.5">{chat.lastMsg}</div>
                    </div>
                    {chat.unread > 0 && (
                      <span className="w-5 h-5 rounded-full gold-bg text-[#111] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── CHAT OPEN ── */}
          {tab === "chat" && openChat && (
            <div className="animate-fade-in flex flex-col" style={{ height: "calc(100vh - 180px)" }}>
              <div className="flex items-center gap-3 px-5 py-3 border-b border-border">
                <img src={openChat.img} alt={openChat.name} className="w-9 h-9 rounded-lg object-cover" />
                <div>
                  <div className="text-sm font-semibold">{openChat.name}</div>
                  <div className="text-[10px] text-green-400">онлайн</div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm ${
                        msg.from === "me"
                          ? "gold-bg text-[#111] rounded-br-sm"
                          : "bg-secondary text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                      <div
                        className={`text-[9px] mt-1 ${
                          msg.from === "me" ? "text-[#111]/60 text-right" : "text-muted-foreground"
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-4 pt-2 flex gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Сообщение..."
                  className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-[var(--gold)]"
                />
                <button
                  onClick={sendMessage}
                  className="w-11 h-11 gold-bg rounded-xl flex items-center justify-center tap-scale flex-shrink-0"
                >
                  <Icon name="Send" size={16} className="text-[#111]" />
                </button>
              </div>
            </div>
          )}

          {/* ── PROFILE TAB ── */}
          {tab === "profile" && (
            <div className="animate-fade-in">
              <div className="px-5 pt-6 pb-4 flex flex-col items-center">
                <div className="relative">
                  <img
                    src={CHEF_IMG}
                    alt="Профиль"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-[var(--gold)]"
                  />
                  <button className="absolute -bottom-2 -right-2 w-7 h-7 gold-bg rounded-full flex items-center justify-center">
                    <Icon name="Camera" size={12} className="text-[#111]" />
                  </button>
                </div>
                <h2 className="text-lg font-bold mt-3">Иван Петров</h2>
                <p className="text-sm text-muted-foreground">Заказчик · ресторатор</p>
                <div className="flex gap-2 mt-3">
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full text-muted-foreground">Москва</span>
                  <span className="text-xs gold-bg px-3 py-1 rounded-full text-[#111] font-semibold">Pro</span>
                </div>
              </div>

              <div className="px-5 grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Проектов", value: "24" },
                  { label: "Потрачено", value: "480К" },
                  { label: "Отзывов", value: "18" },
                ].map((s) => (
                  <div key={s.label} className="bg-card rounded-xl p-3 text-center border border-border">
                    <div className="text-base font-bold gold-text">{s.value}</div>
                    <div className="text-[10px] text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="px-5 space-y-2">
                {[
                  { icon: "User", label: "Редактировать профиль" },
                  { icon: "Star", label: "Мои отзывы" },
                  { icon: "Heart", label: "Избранные специалисты" },
                  { icon: "Shield", label: "Безопасность" },
                  { icon: "Bell", label: "Уведомления" },
                  { icon: "HelpCircle", label: "Помощь" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-3 px-4 py-3.5 bg-card rounded-xl border border-border tap-scale"
                  >
                    <Icon name={item.icon} size={16} className="text-muted-foreground" />
                    <span className="text-sm flex-1 text-left">{item.label}</span>
                    <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── WALLET TAB ── */}
          {tab === "wallet" && (
            <div className="animate-fade-in px-5 pt-4">
              <div className="relative overflow-hidden rounded-2xl gold-bg p-5 mb-5">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-black/10 translate-y-8 -translate-x-8" />
                <div className="relative z-10">
                  <div className="text-sm font-medium text-[#111]/70">Баланс кошелька</div>
                  <div className="text-3xl font-black text-[#111] mt-1">₽ 128 400</div>
                  <div className="text-xs text-[#111]/60 mt-1">Обновлено сегодня в 14:35</div>
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 bg-[#111]/20 text-[#111] font-semibold text-sm py-2.5 rounded-xl tap-scale">
                      Пополнить
                    </button>
                    <button className="flex-1 bg-[#111]/20 text-[#111] font-semibold text-sm py-2.5 rounded-xl tap-scale">
                      Вывести
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Последние операции
                </div>
                {[
                  { label: "Алексей Морозов — банкет", sum: "-45 000", date: "20 июня", type: "out" },
                  { label: "Пополнение счёта", sum: "+100 000", date: "15 июня", type: "in" },
                  { label: "Елена Соколова — карта вин", sum: "-18 000", date: "10 июня", type: "out" },
                  { label: "Возврат по отмене", sum: "+8 500", date: "5 июня", type: "in" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 bg-card rounded-xl p-3.5 border border-border">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        t.type === "in" ? "bg-green-500/15" : "bg-red-500/15"
                      }`}
                    >
                      <Icon
                        name={t.type === "in" ? "ArrowDownLeft" : "ArrowUpRight"}
                        size={16}
                        className={t.type === "in" ? "text-green-400" : "text-red-400"}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{t.label}</div>
                      <div className="text-[10px] text-muted-foreground">{t.date}</div>
                    </div>
                    <span className={`text-sm font-bold flex-shrink-0 ${t.type === "in" ? "text-green-400" : "text-red-400"}`}>
                      {t.sum} ₽
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-card rounded-2xl p-4 border border-border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Платёжные методы</div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-blue-500/15 rounded-xl flex items-center justify-center">
                    <Icon name="CreditCard" size={16} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">•••• •••• •••• 4521</div>
                    <div className="text-[10px] text-muted-foreground">Visa · основная</div>
                  </div>
                  <Icon name="Check" size={14} className="gold-text" />
                </div>
                <button className="w-full py-2.5 border border-dashed border-[var(--gold-dim)] rounded-xl text-sm gold-text font-medium tap-scale flex items-center justify-center gap-2">
                  <Icon name="Plus" size={14} />
                  Добавить карту
                </button>
              </div>
            </div>
          )}

          {/* ── REVIEWS TAB ── */}
          {tab === "reviews" && (
            <div className="animate-fade-in px-5 pt-4 space-y-4">
              <div className="bg-card rounded-2xl p-4 border border-border flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-black gold-text">4.9</div>
                  <div className="flex gap-0.5 justify-center mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icon key={s} name="Star" size={10} className="gold-text fill-current" />
                    ))}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">198 отзывов</div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[
                    { stars: 5, pct: 82 },
                    { stars: 4, pct: 12 },
                    { stars: 3, pct: 4 },
                    { stars: 2, pct: 1 },
                    { stars: 1, pct: 1 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground w-3">{row.stars}</span>
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full gold-bg rounded-full transition-all"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-7 text-right">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {REVIEWS.map((rev, i) => (
                <div
                  key={rev.id}
                  className="bg-card rounded-2xl p-4 border border-border animate-slide-up"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="flex gap-3 mb-3">
                    <img src={rev.img} alt={rev.specialist} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">{rev.specialist}</div>
                      <div className="text-xs text-muted-foreground">{rev.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icon
                        key={s}
                        name="Star"
                        size={12}
                        className={s <= rev.rating ? "gold-text fill-current" : "text-muted"}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rev.text}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-xs font-medium">{rev.author}</span>
                    <span className="text-[10px] text-muted-foreground">{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* BOTTOM NAV */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/95 backdrop-blur-sm border-t border-border px-2 pb-6 pt-2 z-30">
          <div className="flex justify-around">
            {(
              [
                { id: "search", icon: "Search", label: "Поиск" },
                { id: "projects", icon: "FolderOpen", label: "Проекты" },
                { id: "chat", icon: "MessageCircle", label: "Чат" },
                { id: "reviews", icon: "Star", label: "Отзывы" },
                { id: "wallet", icon: "Wallet", label: "Кошелёк" },
                { id: "profile", icon: "User", label: "Профиль" },
              ] as { id: Tab; icon: string; label: string }[]
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => switchTab(item.id)}
                className="flex flex-col items-center gap-0.5 tap-scale px-2 py-1"
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                    tab === item.id ? "gold-bg" : "bg-transparent"
                  }`}
                >
                  <Icon
                    name={item.icon}
                    size={16}
                    className={tab === item.id ? "text-[#111]" : "text-muted-foreground"}
                  />
                </div>
                <span className={`text-[9px] font-medium ${tab === item.id ? "gold-text" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}