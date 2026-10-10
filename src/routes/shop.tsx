import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products, type Category, type Level } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useShop } from "@/lib/shop";

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): { q?: string | undefined; wish?: boolean | undefined } => ({
    q: typeof s["q"] === "string" ? s["q"] : undefined,
    wish: s["wish"] === true || s["wish"] === "true" ? true : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop – Alle Häkelanleitungen | Maschenliebe" },
      { name: "description", content: "Häkelanleitungen filtern nach Schwierigkeit und Kategorie: Amigurumi, Decken, Kleidung, Accessoires, Deko." },
      { property: "og:title", content: "Shop – Alle Häkelanleitungen" },
      { property: "og:description", content: "Finde deine nächste Häkelanleitung als PDF." },
    ],
  }),
  component: Shop,
});

const cats: Category[] = ["Amigurumi", "Decken", "Kleidung", "Accessoires", "Deko"];
const levels: Level[] = ["Anfänger", "Fortgeschritten"];

function Chip({ on, children, onClick }: { on: boolean; children: string; onClick: () => void }) {
  return <button onClick={onClick} className={`min-h-10 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold shadow-sm sm:min-h-0 sm:px-3 sm:py-1.5 ${on ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>{children}</button>;
}

function Shop() {
  const { q, wish } = Route.useSearch();
  const { wishlist } = useShop();
  const [level, setLevel] = useState<Level | null>(null);
  const [cat, setCat] = useState<Category | null>(null);
  const [sort, setSort] = useState("neu");
  let list = products.filter((p) =>
    (!level || p.level === level) && (!cat || p.category === cat) &&
    (!q || p.title.toLowerCase().includes(q.toLowerCase())) && (!wish || wishlist.includes(p.slug)));
  list = [...list].sort((a, b) =>
    sort === "beliebt" ? b.popularity - a.popularity : sort === "preis-auf" ? a.price - b.price : sort === "preis-ab" ? b.price - a.price : b.date.localeCompare(a.date));
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl">{wish ? "Meine Wunschliste" : q ? `Suche: „${q}“` : "Alle Anleitungen"}</h1>
      <select value={sort} onChange={(e) => setSort(e.target.value)} className="field mt-4 w-full sm:hidden" aria-label="Sortieren">
        <option value="neu">Neueste</option><option value="beliebt">Beliebt</option>
        <option value="preis-auf">Preis aufsteigend</option><option value="preis-ab">Preis absteigend</option>
      </select>
      <div className="-mx-4 mt-4 flex items-center gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-6 sm:flex-wrap sm:overflow-visible sm:px-0 [&>button]:shrink-0">
        {levels.map((l) => <Chip key={l} on={level === l} onClick={() => setLevel(level === l ? null : l)}>{l}</Chip>)}
        <span className="mx-1 h-6 w-px shrink-0 bg-border" />
        {cats.map((c) => <Chip key={c} on={cat === c} onClick={() => setCat(cat === c ? null : c)}>{c}</Chip>)}
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="field ml-auto hidden w-auto sm:block" aria-label="Sortieren">
          <option value="neu">Neueste</option><option value="beliebt">Beliebt</option>
          <option value="preis-auf">Preis aufsteigend</option><option value="preis-ab">Preis absteigend</option>
        </select>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      {list.length === 0 && <p className="mt-10 text-center text-muted-foreground">Keine Anleitungen gefunden.</p>}
    </main>
  );
}
