import { useState } from "react";
import Icon from "@/components/ui/icon";
import { User, Role } from "@/data/marketplace";

function Logo({ subtitle }: { subtitle?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-black tracking-widest uppercase blue-text">PELBY<span className="text-foreground">ONE</span></div>
      {subtitle && <div className="text-xs text-muted-foreground">экосистема гостеприимства</div>}
    </div>
  );
}

export function WelcomeScreen({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  return (
    <div className="min-h-screen flex flex-col px-5 pt-16 pb-10 animate-fade-in max-w-md mx-auto">
      <div className="mb-8">
        <div className="text-3xl font-black tracking-tight"><span className="blue-text">PELBY</span>ONE</div>
        <div className="text-sm text-muted-foreground mt-1">экосистема гостеприимства</div>
      </div>
      <div className="flex-1">
        <h1 className="text-4xl font-black leading-[1.1]">
          Всё для HoReCa<br />в одном <span className="blue-text">месте</span>
        </h1>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          Эксперты, товары и обучение для ресторанов, кафе и баров — на одной платформе
        </p>
        <div className="space-y-3 mt-8">
          {[
            { icon: "Users", title: "Биржа экспертов", desc: "Шефы, сомелье, бармены и менеджеры", color: "var(--blue)" },
            { icon: "ShoppingBag", title: "Торговая площадка", desc: "B2B-маркетплейс товаров для бизнеса", color: "var(--orange)" },
            { icon: "GraduationCap", title: "Образование", desc: "Курсы и тренинги от лучших экспертов", color: "var(--blue)" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-4 border border-border rounded-2xl p-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: f.color + "1A" }}>
                <Icon name={f.icon} size={20} style={{ color: f.color }} />
              </div>
              <div>
                <div className="font-black text-sm">{f.title}</div>
                <div className="text-xs text-muted-foreground">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3 mt-8">
        <button className="btn-orange" onClick={onRegister}>Стать частью экосистемы</button>
        <button className="btn-outline" onClick={onLogin}>Войти в аккаунт</button>
      </div>
    </div>
  );
}

export function LoginScreen({ onBack, onSuccess }: { onBack: () => void; onSuccess: (u: User) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) return setError("Заполните все поля");
    if (password.length < 6) return setError("Пароль минимум 6 символов");
    onSuccess({ name: email.split("@")[0], email, role: "client" });
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in max-w-md mx-auto">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3 border-b border-border">
        <button onClick={onBack} className="tap-scale"><Icon name="ArrowLeft" size={20} /></button>
        <Logo />
        <h1 className="text-base font-black ml-1">Вход</h1>
      </div>
      <div className="flex-1 px-5 pt-8 space-y-4">
        <div>
          <div className="text-3xl font-black leading-tight mb-1">С возвращением!</div>
          <div className="text-muted-foreground text-sm">Войдите, чтобы продолжить</div>
        </div>
        <div className="space-y-3 pt-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.ru"
              className="mt-1 w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Пароль</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              className="mt-1 w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500" />
          </div>
          {error && <div className="text-red-500 text-xs font-medium">{error}</div>}
        </div>
      </div>
      <div className="px-5 pb-10 pt-4">
        <button className="btn-orange" onClick={handleLogin}>Войти</button>
      </div>
    </div>
  );
}

export function RegisterScreen({ onBack, onSuccess }: { onBack: () => void; onSuccess: (u: User) => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const [error, setError] = useState("");

  const handleStep1 = () => {
    if (!name || !email || !password) return setError("Заполните все поля");
    if (password.length < 6) return setError("Пароль минимум 6 символов");
    setError("");
    setStep(2);
  };
  const handleFinish = () => {
    if (!role) return setError("Выберите роль");
    onSuccess({ name, email, role });
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in max-w-md mx-auto">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3 border-b border-border">
        <button onClick={step === 2 ? () => setStep(1) : onBack} className="tap-scale"><Icon name="ArrowLeft" size={20} /></button>
        <Logo />
        <h1 className="text-base font-black ml-1">Регистрация</h1>
        <div className="ml-auto flex gap-1.5">
          {[1, 2].map((s) => <div key={s} className={`h-1.5 rounded-full transition-all ${step >= s ? "w-6 blue-bg" : "w-3 bg-border"}`} />)}
        </div>
      </div>

      {step === 1 && (
        <div className="flex-1 px-5 pt-8 space-y-4 animate-slide-up">
          <div>
            <div className="text-3xl font-black leading-tight mb-1">Создать аккаунт</div>
            <div className="text-muted-foreground text-sm">Шаг 1 из 2 — основная информация</div>
          </div>
          <div className="space-y-3 pt-4">
            {[
              { label: "Ваше имя", value: name, set: setName, type: "text", ph: "Иван Петров" },
              { label: "Email", value: email, set: setEmail, type: "email", ph: "your@email.ru" },
              { label: "Пароль", value: password, set: setPassword, type: "password", ph: "Минимум 6 символов" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{f.label}</label>
                <input type={f.type} value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.ph}
                  className="mt-1 w-full border-2 border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500" />
              </div>
            ))}
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
              { id: "client" as Role, icon: "Building2", title: "Заказчик", desc: "Ищу специалистов, товары и обучение для своего заведения", color: "var(--orange)" },
              { id: "specialist" as Role, icon: "ChefHat", title: "Специалист", desc: "Я эксперт HoReCa — предлагаю услуги, товары или курсы", color: "var(--blue)" },
            ]).map((r) => (
              <button key={r.id} onClick={() => setRole(r.id)}
                className={`w-full text-left p-5 rounded-2xl border-2 tap-scale transition-all ${role === r.id ? "border-[var(--blue)] bg-[#F0F3FF]" : "border-border bg-white"}`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: r.color + "1A" }}>
                    <Icon name={r.icon} size={22} style={{ color: r.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-base">{r.title}</div>
                    <div className="text-sm text-muted-foreground mt-1 leading-snug">{r.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${role === r.id ? "border-[var(--blue)] blue-bg" : "border-border"}`}>
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
