import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SHOP_CATEGORIES, PRODUCTS } from "@/data/marketplace";

interface Props {
  cartCount: number;
  onAddToCart: () => void;
}

export default function Shop({ cartCount, onAddToCart }: Props) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<typeof PRODUCTS[0] | null>(null);

  const filtered = PRODUCTS.filter((p) => {
    const mc = category === "all" || p.category === category;
    const mq = !query || p.title.toLowerCase().includes(query.toLowerCase());
    return mc && mq;
  });

  if (selected) {
    return (
      <div className="animate-slide-up">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 px-5 pt-4 pb-2 text-sm text-muted-foreground tap-scale">
          <Icon name="ArrowLeft" size={14} /> Назад
        </button>
        <img src={selected.img} alt={selected.title} className="w-full h-64 object-cover" />
        <div className="px-5 pt-4 space-y-4">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Icon name="Star" size={13} className="orange-text fill-current" />
              <span className="text-xs font-bold">{selected.rating}</span>
              <span className="text-[11px] text-muted-foreground">· {selected.sold} продано · {selected.seller}</span>
            </div>
            <h2 className="text-xl font-black leading-tight">{selected.title}</h2>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black blue-text">{selected.price}</span>
            {selected.oldPrice && <span className="text-sm text-muted-foreground line-through mb-1">{selected.oldPrice}</span>}
          </div>
          <div className="border-2 border-border rounded-2xl p-4">
            <div className="text-xs font-black text-muted-foreground uppercase tracking-wide mb-2">Описание</div>
            <p className="text-sm text-muted-foreground leading-relaxed">Профессиональное оборудование для ресторанов и кафе. Гарантия качества, быстрая доставка по всей России. Оптовые цены для бизнеса.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[{ i: "Truck", l: "Доставка 1-3 дня" }, { i: "ShieldCheck", l: "Гарантия 2 года" }, { i: "RotateCcw", l: "Возврат 14 дней" }].map((b) => (
              <div key={b.l} className="gray-bg rounded-xl p-3 text-center">
                <Icon name={b.i} size={18} className="blue-text mx-auto mb-1" />
                <div className="text-[10px] text-muted-foreground leading-tight">{b.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 py-4 flex gap-3 sticky bottom-20 bg-white">
          <button onClick={onAddToCart} className="flex-1 border-2 border-[var(--blue)] blue-text font-black rounded-full py-3.5 tap-scale">В корзину</button>
          <button onClick={onAddToCart} className="btn-orange flex-1 !py-3.5">Купить</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-4 pb-3 flex gap-2">
        <div className="relative flex-1">
          <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Товары для HoReCa..."
            className="w-full border-2 border-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-500" />
        </div>
        <button className="relative w-12 border-2 border-border rounded-xl flex items-center justify-center tap-scale">
          <Icon name="ShoppingCart" size={18} className="blue-text" />
          {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 orange-bg text-white text-[10px] font-black rounded-full flex items-center justify-center">{cartCount}</span>}
        </button>
      </div>
      <div className="px-5 pb-4 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {SHOP_CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap tap-scale ${category === cat.id ? "blue-bg text-white" : "gray-bg text-muted-foreground"}`}>
              <Icon name={cat.icon} size={13} />{cat.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 grid grid-cols-2 gap-3">
        {filtered.map((p) => (
          <button key={p.id} onClick={() => setSelected(p)}
            className="bg-white border-2 border-border rounded-2xl overflow-hidden tap-scale hover:border-[var(--blue)] transition-colors text-left">
            <div className="relative">
              <img src={p.img} alt={p.title} className="w-full h-28 object-cover" />
              {p.badge && <span className="absolute top-2 left-2 text-[10px] font-black orange-bg text-white px-2 py-0.5 rounded-full">{p.badge}</span>}
            </div>
            <div className="p-3">
              <div className="text-xs font-bold leading-tight line-clamp-2 h-8">{p.title}</div>
              <div className="flex items-center gap-1 mt-1.5">
                <Icon name="Star" size={10} className="orange-text fill-current" />
                <span className="text-[10px] font-bold">{p.rating}</span>
                <span className="text-[9px] text-muted-foreground">· {p.sold} продано</span>
              </div>
              <div className="flex items-end gap-1.5 mt-2">
                <span className="text-sm font-black blue-text">{p.price}</span>
                {p.oldPrice && <span className="text-[10px] text-muted-foreground line-through">{p.oldPrice}</span>}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
