import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart3, Download, Euro, Package, ShoppingBag, Users, Settings, Search } from "lucide-react";
import { products, formatEUR } from "@/lib/products";
import { useShop, useL } from "@/lib/shop";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Tableau de bord – Maschenliebe" },
      { name: "description", content: "Aperçu des ventes, commandes et patrons de la boutique Maschenliebe." },
      { property: "og:title", content: "Tableau de bord – Maschenliebe" },
      { property: "og:description", content: "Ventes, commandes et patrons en un coup d'œil." },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

const sales = [42, 58, 51, 73, 66, 89, 95, 81, 104, 118, 99, 127];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const orders = [
  { id: "#1048", name: "Camille D.", items: 2, total: 13.4, status: "paid" },
  { id: "#1047", name: "Sophie M.", items: 1, total: 9.9, status: "paid" },
  { id: "#1046", name: "Emma L.", items: 3, total: 18.3, status: "pending" },
  { id: "#1045", name: "Léa R.", items: 1, total: 5.9, status: "paid" },
  { id: "#1044", name: "Julia K.", items: 2, total: 12.4, status: "refunded" },
];

function Dashboard() {
  const L = useL();
  const { lang } = useShop();
  const [tab, setTab] = useState("overview");
  const max = Math.max(...sales);
  const statusLabel: Record<string, string> = { paid: L("Payée", "Paid"), pending: L("En attente", "Pending"), refunded: L("Remboursée", "Refunded") };
  const statusCls: Record<string, string> = { paid: "bg-accent text-accent-foreground", pending: "bg-muted text-foreground", refunded: "bg-destructive/15 text-destructive" };
  const nav = [
    { k: "overview", icon: BarChart3, l: L("Aperçu", "Overview") },
    { k: "orders", icon: ShoppingBag, l: L("Commandes", "Orders") },
    { k: "products", icon: Package, l: L("Patrons", "Patterns") },
    { k: "customers", icon: Users, l: L("Clients", "Customers") },
    { k: "settings", icon: Settings, l: L("Réglages", "Settings") },
  ];
  const stats = [
    { icon: Euro, l: L("Chiffre d'affaires", "Revenue"), v: formatEUR(1003.4), d: "+18 %" },
    { icon: ShoppingBag, l: L("Commandes", "Orders"), v: "148", d: "+12 %" },
    { icon: Download, l: L("Téléchargements", "Downloads"), v: "312", d: "+24 %" },
    { icon: Users, l: L("Nouveaux clients", "New customers"), v: "67", d: "+9 %" },
  ];
  return (
    <main className="mx-auto grid max-w-7xl gap-4 px-3 py-4 sm:gap-6 sm:px-4 sm:py-8 lg:grid-cols-[220px_1fr]">
      <aside className="card-soft sticky top-2 z-10 h-fit p-2 sm:p-3 lg:top-24">
        <p className="eyebrow hidden px-3 py-2 lg:block">{L("Tableau de bord", "Dashboard")}</p>
        <nav className="-mx-1 flex snap-x gap-1 overflow-x-auto px-1 [scrollbar-width:none] lg:flex-col">
          {nav.map(({ k, icon: I, l }) => (
            <button key={k} onClick={() => setTab(k)} className={`flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-xl px-3 py-2 text-sm lg:min-h-0 font-semibold ${tab === k ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              <I className="h-4 w-4" />{l}
            </button>
          ))}
        </nav>
      </aside>

      <section className="min-w-0 space-y-4 sm:space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl">{L("Bonjour Anna", "Hello Anna")} 👋</h1>
          <label className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input className="field min-h-11 w-full pl-9" placeholder={L("Rechercher…", "Search…")} />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          {stats.map(({ icon: I, l, v, d }) => (
            <div key={l} className="card-soft min-w-0 p-3 sm:p-4">
              <div className="flex items-center justify-between text-muted-foreground"><span className="min-w-0 truncate text-xs sm:text-sm">{l}</span><I className="h-4 w-4 shrink-0" /></div>
              <p className="mt-2 truncate font-display text-xl font-bold sm:text-2xl">{v}</p>
              <p className="text-xs font-semibold text-accent-foreground">{d} {L("ce mois", "this month")}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="card-soft p-4 sm:p-5">
            <h2 className="text-xl">{L("Ventes 2026", "Sales 2026")}</h2>
            <div className="mt-4 flex h-40 items-end gap-1 sm:mt-6 sm:h-48 sm:gap-2">
              {sales.map((s, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t-lg bg-primary/80 transition hover:bg-primary" style={{ height: `${(s / max) * 100}%` }} title={formatEUR(s * 8)} />
                  <span className="text-[11px] text-muted-foreground">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-soft p-4 sm:p-5">
            <h2 className="text-xl">{L("Meilleures ventes", "Top sellers")}</h2>
            <ul className="mt-4 space-y-3">
              {[...products].sort((a, b) => b.popularity - a.popularity).map((p) => (
                <li key={p.slug} className="flex items-center gap-3">
                  <img src={p.image} alt={p[lang].title} loading="lazy" decoding="async" className="h-10 w-10 rounded-lg object-cover" />
                  <span className="flex-1 truncate text-sm font-semibold">{p[lang].title}</span>
                  <span className="text-sm text-muted-foreground">{p.popularity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card-soft p-4 sm:p-5">
          <h2 className="text-xl">{L("Dernières commandes", "Recent orders")}</h2>
          <ul className="mt-4 divide-y sm:hidden">
            {orders.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0"><p className="truncate font-semibold">{o.name}</p><p className="text-xs text-muted-foreground">{o.id} · {o.items} {L("articles", "items")}</p></div>
                <div className="shrink-0 text-right"><p className="font-semibold">{formatEUR(o.total)}</p><span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusCls[o.status]}`}>{statusLabel[o.status]}</span></div>
              </li>
            ))}
          </ul>
          <table className="mt-4 hidden w-full text-left text-sm sm:table">
            <thead className="text-muted-foreground"><tr><th className="py-2">N°</th><th>{L("Client", "Customer")}</th><th>{L("Articles", "Items")}</th><th>Total</th><th>{L("Statut", "Status")}</th></tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="py-3 font-semibold">{o.id}</td><td>{o.name}</td><td>{o.items}</td><td>{formatEUR(o.total)}</td>
                  <td><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusCls[o.status]}`}>{statusLabel[o.status]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
