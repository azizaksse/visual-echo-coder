import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShieldCheck, Download, Smile, Star, Gauge, Clock, FileText, Package } from "lucide-react";
import { formatEUR, getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useShop, useT } from "@/lib/shop";

export const Route = createFileRoute("/produkt/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Nicht gefunden" }, { name: "robots", content: "noindex" }] };
    const { p } = loaderData;
    const title = `${p.title} – Häkelanleitung PDF | Maschenliebe`;
    return { meta: [{ title }, { name: "description", content: p.description }, { property: "og:title", content: title }, { property: "og:description", content: p.description }] };
  },
  notFoundComponent: () => <main className="p-16 text-center">Anleitung nicht gefunden. <Link to="/shop" className="text-primary underline">Zum Shop</Link></main>,
  component: ProductPage,
});

function ProductPage() {
  const { p } = Route.useLoaderData();
  const { addToCart, cart, toggleWish, wishlist } = useShop();
  const t = useT();
  const [img, setImg] = useState(0);
  const gallery = [p.image, ...products.filter((x) => x.slug !== p.slug).slice(0, 2).map((x) => x.image)];
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <img src={gallery[img]} alt={`${p.title} Vorschau`} className="card-soft aspect-square w-full object-cover" />
          <div className="mt-3 flex gap-3">
            {gallery.map((g, i) => <button key={i} onClick={() => setImg(i)} className={`overflow-hidden rounded-xl border-2 ${i === img ? "border-primary" : "border-transparent"}`}><img src={g} alt="" loading="lazy" className="h-20 w-20 object-cover" /></button>)}
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{p.category} · {p.level}</p>
          <h1 className="mt-1 text-4xl">{p.title}</h1>
          <div className="mt-2 flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-primary text-primary" /> {p.rating.toLocaleString("de-DE")} / 5</div>
          <p className="mt-4 text-3xl font-bold">{formatEUR(p.price)} <span className="text-sm font-normal text-muted-foreground">{t.vat}</span></p>
          <p className="mt-4 text-muted-foreground">{p.description}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-muted p-3"><dt className="flex items-center gap-1.5 text-muted-foreground"><Gauge className="h-4 w-4" />Schwierigkeit</dt><dd className="mt-1 font-bold">{p.level}</dd></div>
            <div className="rounded-xl bg-muted p-3"><dt className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-4 w-4" />Aufwand</dt><dd className="mt-1 font-bold">{p.time}</dd></div>
            <div className="rounded-xl bg-muted p-3"><dt className="flex items-center gap-1.5 text-muted-foreground"><FileText className="h-4 w-4" />Anleitung</dt><dd className="mt-1 font-bold">{p.pages} Seiten PDF</dd></div>
          </dl>
          <h2 className="mt-6 flex items-center gap-2 text-lg"><Package className="h-5 w-5 text-primary" />Material, das du brauchst</h2>
          <ul className="mt-2 grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">{p.materials.map((m) => <li key={m} className="rounded-lg bg-muted/60 px-3 py-1.5">{m}</li>)}</ul>
          <div className="mt-8 flex gap-3">
            <button onClick={() => addToCart(p.slug)} className="btn btn-primary flex-1">{cart.includes(p.slug) ? t.added : t.add}</button>
            <button onClick={() => toggleWish(p.slug)} className="btn btn-outline px-4" aria-label="Wunschliste"><Heart className={`h-5 w-5 ${wishlist.includes(p.slug) ? "fill-primary text-primary" : ""}`} /></button>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-muted-foreground">
            <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" />Sichere Zahlung</span>
            <span className="flex items-center gap-1"><Download className="h-4 w-4" />Sofort-Download</span>
            <span className="flex items-center gap-1"><Smile className="h-4 w-4" />Zufriedenheitsgarantie</span>
          </div>
        </div>
      </div>
      <section className="mt-16">
        <h2 className="text-2xl">Bewertungen</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {["Toll erklärt, hat auf Anhieb geklappt!", "Wunderschönes Ergebnis, sehr empfehlenswert."].map((r, i) => (
            <div key={i} className="card-soft p-5"><p>„{r}“</p><p className="mt-2 text-xs text-muted-foreground">Verifizierter Kauf · {new Date(2026, 8, 3 + i * 9).toLocaleDateString("de-DE")}</p></div>
          ))}
        </div>
      </section>
      <section className="mt-16">
        <h2 className="mb-4 text-2xl">Das könnte dir auch gefallen</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{products.filter((x) => x.slug !== p.slug).slice(0, 4).map((x) => <ProductCard key={x.slug} p={x} />)}</div>
      </section>
    </main>
  );
}
