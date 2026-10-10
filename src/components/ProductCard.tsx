import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { formatEUR, levelLabel, categoryLabel, type Product } from "@/lib/products";
import { useShop, useT } from "@/lib/shop";

export function ProductCard({ p }: { p: Product }) {
  const { wishlist, toggleWish, addToCart, cart, lang } = useShop();
  const x = p[lang];
  const t = useT();
  const wished = wishlist.includes(p.slug);
  return (
    <div className="card-soft card-soft-hover group overflow-hidden">
      <div className="relative">
        <Link to="/produkt/$slug" params={{ slug: p.slug }}>
          <img src={p.image} alt={x.title} loading="lazy" decoding="async" className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105" />
        </Link>
        <button onClick={() => toggleWish(p.slug)} aria-label="Wishlist" className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full bg-card shadow-md sm:right-3 sm:top-3">
          <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
        </button>
        <span className="absolute left-2 top-2 rounded-full bg-sage px-2 py-0.5 text-[11px] font-bold text-sage-foreground shadow-sm sm:left-3 sm:top-3 sm:px-2.5 sm:text-xs">{levelLabel[p.level][lang]}</span>
      </div>
      <div className="p-3 sm:p-4">
        <p className="truncate text-xs text-muted-foreground">{categoryLabel[p.category][lang]}</p>
        <Link to="/produkt/$slug" params={{ slug: p.slug }} className="line-clamp-2 font-display text-lg leading-tight sm:text-xl">{x.title}</Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3.5 w-3.5 fill-primary text-primary" />{p.rating.toLocaleString(lang)}</div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-bold">{formatEUR(p.price)}</span>
          <button onClick={() => addToCart(p.slug)} className="min-h-10 w-full rounded-full bg-accent px-3 py-2 text-xs font-bold text-accent-foreground shadow-sm active:scale-95 transition sm:w-auto sm:py-1.5">
            {cart.includes(p.slug) ? t.added : t.add}
          </button>
        </div>
      </div>
    </div>
  );
}
