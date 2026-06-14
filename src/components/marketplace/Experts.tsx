import { useState } from "react";
import Icon from "@/components/ui/icon";
import { EXPERT_CATEGORIES, SPECIALISTS, CHATS } from "@/data/marketplace";

interface Props {
  onOpenChat: (chat: typeof CHATS[0]) => void;
}

export default function Experts({ onOpenChat }: Props) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<typeof SPECIALISTS[0] | null>(null);

  const filtered = SPECIALISTS.filter((s) => {
    const mc = category === "all" || s.category === category;
    const mq = !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.role.toLowerCase().includes(query.toLowerCase());
    return mc && mq;
  });

  if (selected) {
    return (
      <div className="animate-slide-up">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 px-5 pt-4 pb-1 text-sm text-muted-foreground tap-scale">
          <Icon name="ArrowLeft" size={14} /> Назад
        </button>
        <div className="relative mt-2">
          <img src={selected.img} alt={selected.name} className="w-full h-52 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-black text-white">{selected.name}</h2>
              <p className="text-sm text-white/80">{selected.role}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${selected.available ? "bg-green-500 text-white" : "bg-white/30 text-white"}`}>
              {selected.available ? "Доступен" : "Занят"}
            </span>
          </div>
        </div>
        <div className="px-5 pt-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[{ l: "Рейтинг", v: `${selected.rating}★` }, { l: "Отзывов", v: `${selected.reviews}` }, { l: "Проектов", v: `${selected.projects}` }].map((s) => (
              <div key={s.l} className="gray-bg rounded-xl p-3 text-center">
                <div className="text-base font-black blue-text">{s.v}</div>
                <div className="text-[10px] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="border-2 border-border rounded-2xl p-4">
            <div className="text-xs font-black text-muted-foreground uppercase tracking-wide mb-2">Навыки</div>
            <div className="flex flex-wrap gap-2">
              {selected.skills.map((sk) => (
                <span key={sk} className="text-xs gray-bg px-3 py-1.5 rounded-full font-medium">{sk}</span>
              ))}
            </div>
          </div>
          <div className="border-2 border-border rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Стоимость</div>
              <div className="text-xl font-black orange-text mt-0.5">{selected.rate}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onOpenChat(CHATS[0])} className="w-11 h-11 gray-bg rounded-xl flex items-center justify-center tap-scale">
                <Icon name="MessageCircle" size={18} className="blue-text" />
              </button>
              <button className="btn-orange !w-auto px-6 !py-2.5 !rounded-xl">Нанять</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-4 pb-3">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Шефы, сомелье, навыки..."
            className="w-full border-2 border-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-500" />
        </div>
      </div>
      <div className="px-5 pb-4 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {EXPERT_CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap tap-scale ${category === cat.id ? "blue-bg text-white" : "gray-bg text-muted-foreground"}`}>
              <Icon name={cat.icon} size={13} />{cat.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-black text-muted-foreground uppercase tracking-wider">Специалисты</span>
          <span className="text-xs blue-text font-bold">{filtered.length} найдено</span>
        </div>
        {filtered.map((spec) => (
          <button key={spec.id} onClick={() => setSelected(spec)}
            className="w-full bg-white border-2 border-border rounded-2xl p-4 flex gap-3 items-start tap-scale hover:border-[var(--blue)] transition-colors text-left">
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
                <span className="text-[10px] text-muted-foreground">({spec.reviews})</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {spec.skills.slice(0, 2).map((sk) => (
                  <span key={sk} className="text-[10px] gray-bg px-2 py-0.5 rounded-full text-muted-foreground">{sk}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
