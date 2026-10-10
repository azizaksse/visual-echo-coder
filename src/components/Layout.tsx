import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { useShop, useT } from "@/lib/shop";

export const SHOP_NAME = "Maschenliebe";

export function Header() {
  const { cart, wishlist, lang, setLang } = useShop();
  const t = useT();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link to="/" className="font-display text-2xl italic tracking-tight">{SHOP_NAME}</Link>
        <nav className="hidden gap-5 text-sm font-semibold md:flex">
          <Link to="/shop" activeProps={{ className: "text-primary" }}>{t.shop}</Link>
          <Link to="/ueber-mich" activeProps={{ className: "text-primary" }}>{t.about}</Link>
          <Link to="/faq" activeProps={{ className: "text-primary" }}>{t.faq}</Link>
          <Link to="/kontakt" activeProps={{ className: "text-primary" }}>{t.contact}</Link>
        </nav>
        <form
          className="ml-auto hidden items-center gap-2 rounded-full border bg-card px-3 py-1.5 sm:flex"
          onSubmit={(e) => { e.preventDefault(); nav({ to: "/shop", search: { q } }); }}
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <input aria-label="Suche" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} className="w-40 bg-transparent text-sm outline-none" />
        </form>
        <button onClick={() => setLang(lang === "de" ? "en" : "de")} className="ml-auto rounded-full border px-2.5 py-1 text-xs font-bold sm:ml-0" aria-label="Sprache wechseln">
          {lang === "de" ? "DE | en" : "de | EN"}
        </button>
        <Link to="/shop" search={{ wish: true }} className="relative" aria-label="Wunschliste">
          <Heart className="h-5 w-5" />
          {wishlist.length > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">{wishlist.length}</span>}
        </Link>
        <Link to="/warenkorb" className="relative" aria-label={t.cart}>
          <ShoppingBag className="h-5 w-5" />
          {cart.length > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">{cart.length}</span>}
        </Link>
      </div>
      <nav className="flex justify-around border-t py-2 text-sm font-semibold md:hidden">
        <Link to="/shop">{t.shop}</Link><Link to="/ueber-mich">{t.about}</Link><Link to="/faq">{t.faq}</Link><Link to="/kontakt">{t.contact}</Link>
      </nav>
    </header>
  );
}

export const PAYMENTS = ["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay", "SEPA", "Klarna", "iDEAL"];

export function PaymentIcons() {
  return (
    <div className="flex flex-wrap gap-2">
      {PAYMENTS.map((p) => (
        <span key={p} className="rounded-md border bg-card px-2 py-1 text-xs font-semibold text-muted-foreground">{p}</span>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl italic">{SHOP_NAME}</p>
          <p className="mt-2 text-sm text-muted-foreground">Häkelanleitungen als PDF – mit Liebe gemacht in Deutschland.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link to="/impressum">Impressum</Link><Link to="/datenschutz">Datenschutz</Link>
          <Link to="/agb">AGB</Link><Link to="/widerruf">Widerrufsbelehrung</Link>
          <Link to="/faq">FAQ</Link><Link to="/kontakt">Kontakt</Link>
        </div>
        <div><p className="mb-3 text-sm font-bold">Sicher bezahlen</p><PaymentIcons /></div>
      </div>
      <p className="pb-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} {SHOP_NAME} · Alle Preise inkl. MwSt.</p>
    </footer>
  );
}

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(true), []);
  if (!show) return null;
  return (
    <div className="card-soft fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl p-5 md:flex md:items-center md:gap-4">
      <p className="text-sm">Wir verwenden nur technisch notwendige Cookies. Mit deiner Zustimmung nutzen wir zusätzlich Statistik-Cookies. <Link to="/datenschutz" className="underline">Mehr erfahren</Link></p>
      <div className="mt-3 flex shrink-0 gap-2 md:mt-0">
        <button className="btn btn-outline px-4 py-2 text-sm" onClick={() => setShow(false)}>Nur notwendige</button>
        <button className="btn btn-primary px-4 py-2 text-sm" onClick={() => setShow(false)}>Alle akzeptieren</button>
      </div>
    </div>
  );
}

export function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-4xl">{title}</h1>
      <div className="space-y-4 leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:text-foreground">{children}</div>
    </main>
  );
}
