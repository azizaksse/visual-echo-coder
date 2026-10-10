import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { formatEUR, type Product } from "@/lib/products";
import { useShop, useT } from "@/lib/shop";

export function ProductCard({ p }: { p: Product }) {
  const { wishlist, toggleWish, addToCart, cart } = useShop();
  const t = useT();
  const wished = wishlist.includes(p.slug);
  return (
    <div className="card-soft group overflow-hidden">
      <div className="relative">
        <Link to="/produkt/$slug" params={{ slug: p.slug }}>
          <img src={p.image} alt={`Häkelanleitung ${p.title}`} loading="lazy" className="aspect-square w-full object-cover transition group-hover:scale-105" />
        </Link>
        <button onClick={() => toggleWish(p.slug)} aria-label="Zur Wunschliste" className="absolute right-3 top-3 rounded-full bg-card p-2 shadow">
          <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-sage px-2.5 py-0.5 text-xs font-bold text-sage-foreground">{p.level}</span>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground">{p.category}</p>
        <Link to="/produkt/$slug" params={{ slug: p.slug }} className="font-display text-lg font-bold">{p.title}</Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3.5 w-3.5 fill-primary text-primary" />{p.rating.toLocaleString("de-DE")}</div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold">{formatEUR(p.price)}</span>
          <button onClick={() => addToCart(p.slug)} className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
            {cart.includes(p.slug) ? t.added : t.add}
          </button>
        </div>
      </div>
    </div>
  );
}
