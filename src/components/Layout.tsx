import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { useShop, useT, useL } from "@/lib/shop";

export const SHOP_NAME = "Maschenliebe";

export function Header() {
  const { cart, wishlist, lang, setLang } = useShop();
  const t = useT();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">{SHOP_NAME}</Link>
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
          <input aria-label={t.search} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} className="w-40 bg-transparent text-sm outline-none" />
        </form>
        <button onClick={() => setLang(lang === "fr" ? "en" : "fr")} className="ml-auto rounded-full border px-2.5 py-1 text-xs font-bold sm:ml-0" aria-label="Langue / Language">
          {lang === "fr" ? "FR | en" : "fr | EN"}
        </button>
        <Link to="/shop" search={{ wish: true }} className="relative" aria-label="Wishlist">
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

export function PaymentIcons() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {PAYMENTS.map((p) => (
        <span key={p} className="rounded-md border border-border/60 bg-card/70 px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground">{p}</span>
      ))}
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <nav className="grid gap-2.5">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      {links.map((l) => (
        <Link key={l.to} to={l.to} className="w-fit text-sm text-foreground/80 transition-colors hover:text-primary">{l.label}</Link>
      ))}
    </nav>
  );
}

export function Footer() {
  const L = useL();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 pb-6 pt-14">
        <div className="grid gap-10 border-b pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">{SHOP_NAME}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {L("Patrons de crochet en PDF – faits avec amour en Europe.", "Crochet patterns as PDF – made with love in Europe.")}
            </p>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {L("Paiement sécurisé", "Secure payment")}
            </p>
            <div className="mt-3"><PaymentIcons /></div>
          </div>
          <FooterCol title={L("Boutique", "Shop")} links={[
            { to: "/shop", label: L("Tous les modèles", "All patterns") },
            { to: "/ueber-mich", label: L("À propos", "About") },
            { to: "/dashboard", label: "Dashboard" },
          ]} />
          <FooterCol title={L("Aide", "Help")} links={[
            { to: "/faq", label: "FAQ" },
            { to: "/kontakt", label: L("Contact", "Contact") },
          ]} />
          <FooterCol title={L("Légal", "Legal")} links={[
            { to: "/impressum", label: L("Mentions légales", "Legal notice") },
            { to: "/datenschutz", label: L("Confidentialité", "Privacy") },
            { to: "/agb", label: L("CGV", "Terms") },
            { to: "/widerruf", label: L("Droit de rétractation", "Right of withdrawal") },
          ]} />
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SHOP_NAME} · {L("Tous les prix TVA incluse", "All prices incl. VAT")}</p>
          <p className="sm:text-right">
            {L("Conçu et tricoté avec ❤", "Designed and knitted with ❤")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function CookieBanner() {
  const L = useL();
  const [show, setShow] = useState(false);
  useEffect(() => setShow(true), []);
  if (!show) return null;
  return (
    <div className="card-soft fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl p-5 md:flex md:items-center md:gap-4">
      <p className="text-sm">{L("Nous utilisons uniquement des cookies nécessaires. Avec ton accord, nous utilisons aussi des cookies statistiques.", "We only use necessary cookies. With your consent we also use statistics cookies.")} <Link to="/datenschutz" className="underline">{L("En savoir plus", "Learn more")}</Link></p>
      <div className="mt-3 flex shrink-0 gap-2 md:mt-0">
        <button className="btn btn-outline px-4 py-2 text-sm" onClick={() => setShow(false)}>{L("Nécessaires uniquement", "Necessary only")}</button>
        <button className="btn btn-primary px-4 py-2 text-sm" onClick={() => setShow(false)}>{L("Tout accepter", "Accept all")}</button>
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
