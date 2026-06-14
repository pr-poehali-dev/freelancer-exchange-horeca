import { useState } from "react";
import Icon from "@/components/ui/icon";
import { COURSE_CATEGORIES, COURSES } from "@/data/marketplace";

export default function Education() {
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<typeof COURSES[0] | null>(null);

  const filtered = COURSES.filter((c) => category === "all" || c.category === category);

  if (selected) {
    return (
      <div className="animate-slide-up">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 px-5 pt-4 pb-2 text-sm text-muted-foreground tap-scale">
          <Icon name="ArrowLeft" size={14} /> Назад
        </button>
        <div className="relative">
          <img src={selected.img} alt={selected.title} className="w-full h-52 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center tap-scale">
              <Icon name="Play" size={26} className="blue-text ml-1 fill-current" />
            </div>
          </button>
          <span className="absolute top-3 left-3 text-[10px] font-black bg-white px-2.5 py-1 rounded-full blue-text">{selected.level}</span>
        </div>
        <div className="px-5 pt-4 space-y-4">
          <div>
            <h2 className="text-xl font-black leading-tight">{selected.title}</h2>
            <div className="text-sm text-muted-foreground mt-1">Автор: {selected.author}</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[{ i: "PlayCircle", v: `${selected.lessons}`, l: "уроков" }, { i: "Clock", v: `${selected.hours} ч`, l: "видео" }, { i: "Users", v: `${selected.students}`, l: "учеников" }].map((s) => (
              <div key={s.l} className="gray-bg rounded-xl p-3 text-center">
                <Icon name={s.i} size={16} className="blue-text mx-auto mb-1" />
                <div className="text-sm font-black">{s.v}</div>
                <div className="text-[10px] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="border-2 border-border rounded-2xl p-4">
            <div className="text-xs font-black text-muted-foreground uppercase tracking-wide mb-3">Программа курса</div>
            <div className="space-y-2.5">
              {["Введение и базовые техники", "Работа с продуктами", "Авторские рецепты", "Подача и сервировка"].map((m, i) => (
                <div key={m} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full gray-bg flex items-center justify-center text-[10px] font-black blue-text flex-shrink-0">{i + 1}</div>
                  <span className="text-sm">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-5 py-4 flex items-center justify-between gap-3 sticky bottom-20 bg-white">
          <div>
            <div className="text-[10px] text-muted-foreground">Стоимость</div>
            <div className="text-2xl font-black blue-text">{selected.price}</div>
          </div>
          <button className="btn-orange !w-auto px-8">Записаться на курс</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-4 pb-4 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {COURSE_CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap tap-scale ${category === cat.id ? "blue-bg text-white" : "gray-bg text-muted-foreground"}`}>
              <Icon name={cat.icon} size={13} />{cat.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 space-y-3">
        {filtered.map((c) => (
          <button key={c.id} onClick={() => setSelected(c)}
            className="w-full bg-white border-2 border-border rounded-2xl overflow-hidden tap-scale hover:border-[var(--blue)] transition-colors text-left flex">
            <div className="relative w-28 flex-shrink-0">
              <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 text-[9px] font-black bg-white px-2 py-0.5 rounded-full blue-text">{c.level}</span>
            </div>
            <div className="p-3 flex-1 min-w-0">
              <div className="text-sm font-black leading-tight line-clamp-2">{c.title}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{c.author}</div>
              <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-0.5"><Icon name="PlayCircle" size={11} />{c.lessons}</span>
                <span className="flex items-center gap-0.5"><Icon name="Star" size={11} className="orange-text fill-current" />{c.rating}</span>
                <span className="flex items-center gap-0.5"><Icon name="Users" size={11} />{c.students}</span>
              </div>
              <div className="text-sm font-black blue-text mt-1.5">{c.price}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
