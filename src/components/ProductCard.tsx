import { Link } from "@tanstack/react-router";
import { Heart, Star, Plus, Check } from "lucide-react";
import { formatEUR, levelLabel, categoryLabel, type Product } from "@/lib/products";
import { useShop, useT } from "@/lib/shop";

export function ProductCard({ p }: { p: Product }) {
  const { wishlist, toggleWish, addToCart, cart, lang } = useShop();
  const x = p[lang];
  const t = useT();
  const wished = wishlist.includes(p.slug);
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-secondary shadow-[var(--shadow-soft)] transition duration-500 group-hover:-translate-y-1">
        <Link to="/produkt/$slug" params={{ slug: p.slug }}>
          <img src={p.image} alt={x.title} loading="lazy" decoding="async" className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105" />
        </Link>
        <button onClick={() => toggleWish(p.slug)} aria-label="Wishlist" className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full bg-card/85 backdrop-blur-md shadow-[var(--shadow-soft)] sm:right-3 sm:top-3">
          <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
        </button>
        <span className="absolute left-2 top-2 rounded-full bg-card/85 backdrop-blur-md px-3 py-1 text-foreground text-[11px] font-bold shadow-[var(--shadow-soft)] sm:left-3 sm:top-3 sm:text-xs">{levelLabel[p.level][lang]}</span>
      </div>
      <div className="px-1 pt-4">
        <p className="truncate text-xs text-muted-foreground">{categoryLabel[p.category][lang]}</p>
        <Link to="/produkt/$slug" params={{ slug: p.slug }} className="line-clamp-2 font-display text-lg font-semibold leading-tight">{x.title}</Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3.5 w-3.5 fill-primary text-primary" />{p.rating.toLocaleString(lang)}</div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="font-display text-lg font-semibold">{formatEUR(p.price)}</span>
          <button onClick={() => addToCart(p.slug)} aria-label={cart.includes(p.slug) ? t.added : t.add} title={cart.includes(p.slug) ? t.added : t.add} className="grid h-12 w-12 place-items-center rounded-full bg-foreground text-background shadow-[0_10px_24px_-8px_oklch(0.3_0.05_30/0.5)] transition hover:scale-105 active:scale-95">
            {cart.includes(p.slug) ? <Check className="h-4 w-4" /> : <Plus className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
