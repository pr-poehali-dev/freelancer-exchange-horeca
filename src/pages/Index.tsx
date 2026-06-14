import { useState } from "react";
import Icon from "@/components/ui/icon";
import { User, CHATS, INIT_MSGS, ORDERS, CHEF_IMG } from "@/data/marketplace";
import { WelcomeScreen, LoginScreen, RegisterScreen } from "@/components/marketplace/Auth";
import Experts from "@/components/marketplace/Experts";
import Shop from "@/components/marketplace/Shop";
import Education from "@/components/marketplace/Education";

type Screen = "welcome" | "login" | "register" | "app";
type Tab = "home" | "orders" | "chat" | "profile";
type Section = null | "experts" | "shop" | "education";

function MainApp({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("home");
  const [section, setSection] = useState<Section>(null);
  const [openChat, setOpenChat] = useState<typeof CHATS[0] | null>(null);
  const [orderTab, setOrderTab] = useState<"active" | "done">("active");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(INIT_MSGS);
  const [cart, setCart] = useState(0);

  const sendMsg = () => {
    if (!chatInput.trim()) return;
    setMessages((p) => [...p, { id: Date.now(), from: "me", text: chatInput, time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) }]);
    setChatInput("");
  };

  const switchTab = (t: Tab) => { setTab(t); setSection(null); setOpenChat(null); };
  const openChatFrom = (c: typeof CHATS[0]) => { setTab("chat"); setSection(null); setOpenChat(c); };

  const sectionTitles: Record<string, string> = { experts: "Биржа экспертов", shop: "Торговая площадка", education: "Образование" };
  const tabLabel: Record<Tab, string> = { home: "PELBYONE", orders: "Мои заказы", chat: openChat ? openChat.name : "Сообщения", profile: "Профиль" };

  const headerTitle = section ? sectionTitles[section] : tabLabel[tab];
  const showBack = section !== null || (tab === "chat" && openChat !== null);

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      <header className="px-5 pt-12 pb-3 flex items-center justify-between sticky top-0 z-20 bg-white border-b border-border">
        <div className="flex items-center gap-2">
          {showBack && (
            <button onClick={() => { setSection(null); setOpenChat(null); }} className="tap-scale mr-1">
              <Icon name="ArrowLeft" size={20} />
            </button>
          )}
          <div>
            <div className="text-[10px] font-black tracking-widest uppercase"><span className="blue-text">PELBY</span>ONE</div>
            <h1 className="text-base font-black leading-tight">{headerTitle}</h1>
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

      <main className="flex-1 overflow-y-auto pb-24">
        {/* SECTIONS */}
        {section === "experts" && <Experts onOpenChat={openChatFrom} />}
        {section === "shop" && <Shop cartCount={cart} onAddToCart={() => setCart((c) => c + 1)} />}
        {section === "education" && <Education />}

        {/* HOME HUB */}
        {tab === "home" && !section && (
          <div className="animate-fade-in px-5 pt-5">
            <div className="mb-5">
              <div className="text-2xl font-black leading-tight">Привет, <span className="blue-text">{user.name}!</span></div>
              <div className="text-sm text-muted-foreground mt-1">
                {user.role === "client" ? "Что нужно для вашего заведения?" : "Развивайте свой бизнес в HoReCa"}
              </div>
            </div>

            <div className="border-2 border-border rounded-2xl px-4 py-3.5 mb-6 flex items-center gap-3">
              <Icon name="Search" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Например: концепция для нового кафе</span>
            </div>

            <div className="text-xs font-black text-muted-foreground uppercase tracking-wider mb-3">Направления экосистемы</div>
            <div className="space-y-3">
              {[
                { id: "experts" as Section, icon: "Users", title: "Биржа экспертов", desc: "Шефы, сомелье, бармены, менеджеры", stat: "1 240+ специалистов", color: "var(--blue)" },
                { id: "shop" as Section, icon: "ShoppingBag", title: "Торговая площадка", desc: "B2B-товары для ресторанов и кафе", stat: "12 000+ товаров", color: "var(--orange)" },
                { id: "education" as Section, icon: "GraduationCap", title: "Образование", desc: "Курсы и тренинги от экспертов", stat: "340+ курсов", color: "var(--blue)" },
              ].map((s) => (
                <button key={s.id} onClick={() => setSection(s.id)}
                  className="w-full text-left border-2 border-border rounded-2xl p-4 flex items-center gap-4 tap-scale hover:border-[var(--blue)] transition-colors">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: s.color + "1A" }}>
                    <Icon name={s.icon} size={26} style={{ color: s.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-base">{s.title}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                    <div className="text-[10px] font-bold blue-text mt-1">{s.stat}</div>
                  </div>
                  <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
                </button>
              ))}
            </div>

            {user.role === "specialist" && (
              <div className="mt-6 orange-bg rounded-2xl p-5 text-white">
                <div className="font-black text-lg">Начните зарабатывать</div>
                <div className="text-sm text-white/90 mt-1 mb-4">Создайте профиль, добавьте услуги, товары или курсы</div>
                <button className="bg-white orange-text font-black rounded-full py-2.5 px-6 text-sm tap-scale">Создать предложение</button>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 mt-6">
              {[{ v: "12 000+", l: "Товаров" }, { v: "1 240+", l: "Экспертов" }, { v: "4.9★", l: "Рейтинг" }].map((s) => (
                <div key={s.l} className="gray-bg rounded-2xl p-3 text-center">
                  <div className="text-lg font-black blue-text">{s.v}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === "orders" && (
          <div className="animate-fade-in px-5 pt-4">
            <div className="flex gap-2 mb-5">
              {(["active", "done"] as const).map((t) => (
                <button key={t} onClick={() => setOrderTab(t)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-black tap-scale ${orderTab === t ? "blue-bg text-white" : "gray-bg text-muted-foreground"}`}>
                  {t === "active" ? "Активные" : "Завершённые"}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {ORDERS.filter((o) => o.status === orderTab).map((o) => (
                <div key={o.id} className="border-2 border-border rounded-2xl p-4 animate-slide-up">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-black gray-bg px-2 py-0.5 rounded-full text-muted-foreground uppercase">{o.type}</span>
                      </div>
                      <div className="font-black text-sm">{o.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{o.partner}</div>
                    </div>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full flex-shrink-0 ${o.status === "active" ? "bg-blue-100 blue-text" : "bg-green-100 text-green-700"}`}>
                      {o.status === "active" ? "В работе" : "Готово"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Icon name="Calendar" size={12} />{o.date}</div>
                    <div className="flex items-center gap-1.5 text-xs font-black orange-text"><Icon name="Banknote" size={12} />{o.amount}</div>
                  </div>
                  {o.status === "active" && (
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] text-muted-foreground mb-1"><span>Статус</span><span>{o.progress}%</span></div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full blue-bg rounded-full" style={{ width: `${o.progress}%` }} /></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHAT LIST */}
        {tab === "chat" && !openChat && (
          <div className="animate-fade-in pt-4">
            <div className="px-5 pb-3">
              <div className="relative">
                <Icon name="Search" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input placeholder="Поиск диалогов..." className="w-full gray-bg rounded-xl pl-10 pr-4 py-3 text-sm outline-none" />
              </div>
            </div>
            <div className="divide-y divide-border">
              {CHATS.map((chat) => (
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
                  {chat.unread > 0 && <span className="w-5 h-5 rounded-full orange-bg text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">{chat.unread}</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CHAT OPEN */}
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
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm ${msg.from === "me" ? "orange-bg text-white rounded-br-sm" : "gray-bg text-foreground rounded-bl-sm"}`}>
                    {msg.text}
                    <div className={`text-[9px] mt-1 ${msg.from === "me" ? "text-white/70 text-right" : "text-muted-foreground"}`}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-4 pt-2 flex gap-2 border-t border-border">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                placeholder="Сообщение..." className="flex-1 gray-bg rounded-xl px-4 py-3 text-sm outline-none" />
              <button onClick={sendMsg} className="w-11 h-11 orange-bg rounded-xl flex items-center justify-center tap-scale flex-shrink-0">
                <Icon name="Send" size={16} className="text-white" />
              </button>
            </div>
          </div>
        )}

        {/* PROFILE */}
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
              {[{ l: "Заказов", v: "24" }, { l: "Потрачено", v: "480К" }, { l: "Отзывов", v: "18" }].map((s) => (
                <div key={s.l} className="gray-bg rounded-xl p-3 text-center">
                  <div className="text-base font-black blue-text">{s.v}</div>
                  <div className="text-[10px] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="px-5 space-y-2">
              {[
                { icon: "User", label: "Редактировать профиль" },
                { icon: "Heart", label: "Избранное" },
                { icon: "CreditCard", label: "Платёжные методы" },
                { icon: "Star", label: "Мои отзывы" },
                { icon: "Bell", label: "Уведомления" },
                { icon: "HelpCircle", label: "Помощь" },
              ].map((item) => (
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

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-border px-2 pb-6 pt-2 z-30">
        <div className="flex justify-around">
          {([
            { id: "home", icon: "LayoutGrid", label: "Главная" },
            { id: "orders", icon: "Package", label: "Заказы" },
            { id: "chat", icon: "MessageCircle", label: "Чат" },
            { id: "profile", icon: "User", label: "Профиль" },
          ] as { id: Tab; icon: string; label: string }[]).map((item) => (
            <button key={item.id} onClick={() => switchTab(item.id)} className="flex flex-col items-center gap-0.5 tap-scale px-4 py-1">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${tab === item.id && !section ? "blue-bg" : "transparent"}`}>
                <Icon name={item.icon} size={16} className={tab === item.id && !section ? "text-white" : "text-muted-foreground"} />
              </div>
              <span className={`text-[9px] font-black ${tab === item.id && !section ? "blue-text" : "text-muted-foreground"}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

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
