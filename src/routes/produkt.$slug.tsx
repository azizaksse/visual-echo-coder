import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShieldCheck, Download, Smile, Star, Gauge, Clock, FileText, Package } from "lucide-react";
import { formatEUR, getProduct, products, levelLabel, categoryLabel } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useShop, useT, useL } from "@/lib/shop";

export const Route = createFileRoute("/produkt/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Introuvable" }, { name: "robots", content: "noindex" }] };
    const { p } = loaderData;
    const title = `${p.fr.title} – Patron crochet PDF | Maschenliebe`;
    return { meta: [{ title }, { name: "description", content: p.fr.description }, { property: "og:title", content: title }, { property: "og:description", content: p.fr.description }, { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  notFoundComponent: NotFound,
  component: ProductPage,
});

function ProductPage() {
  const { p } = Route.useLoaderData();
  const { addToCart, cart, toggleWish, wishlist, lang } = useShop();
  const t = useT();
  const L = useL();
  const x = p[lang];
  const [img, setImg] = useState(0);
  const gallery = [p.image, ...products.filter((x) => x.slug !== p.slug).slice(0, 2).map((x) => x.image)];
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <img src={gallery[img]} alt={x.title} className="card-soft aspect-square w-full object-cover" />
          <div className="mt-3 flex gap-3">
            {gallery.map((g, i) => <button key={i} onClick={() => setImg(i)} className={`grid h-20 w-20 place-items-center overflow-hidden rounded-full shadow-[var(--shadow-soft)] ring-2 transition ${i === img ? "ring-foreground" : "ring-transparent opacity-70 hover:opacity-100"}`}><img src={g} alt="" loading="lazy" className="h-20 w-20 rounded-full object-cover" /></button>)}
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{categoryLabel[p.category][lang]} · {levelLabel[p.level][lang]}</p>
          <h1 className="mt-1 text-4xl">{x.title}</h1>
          <div className="mt-2 flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-primary text-primary" /> {p.rating.toLocaleString(lang)} / 5</div>
          <p className="mt-4 text-3xl font-bold">{formatEUR(p.price)} <span className="text-sm font-normal text-muted-foreground">{t.vat}</span></p>
          <p className="mt-4 text-muted-foreground">{x.description}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-3xl bg-card p-4 shadow-[var(--shadow-soft)]"><dt className="flex items-center gap-1.5 text-muted-foreground"><Gauge className="h-4 w-4" />{L("Niveau", "Difficulty")}</dt><dd className="mt-1 font-bold">{levelLabel[p.level][lang]}</dd></div>
            <div className="rounded-3xl bg-card p-4 shadow-[var(--shadow-soft)]"><dt className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-4 w-4" />{L("Durée", "Time")}</dt><dd className="mt-1 font-bold">{x.time}</dd></div>
            <div className="rounded-3xl bg-card p-4 shadow-[var(--shadow-soft)]"><dt className="flex items-center gap-1.5 text-muted-foreground"><FileText className="h-4 w-4" />{L("Patron", "Pattern")}</dt><dd className="mt-1 font-bold">{p.pages} {L("pages PDF", "PDF pages")}</dd></div>
          </dl>
          <h2 className="mt-6 flex items-center gap-2 text-lg"><Package className="h-5 w-5 text-primary" />{L("Matériel nécessaire", "Materials you need")}</h2>
          <ul className="mt-2 grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">{x.materials.map((m) => <li key={m} className="pill-soft px-4 py-1.5">{m}</li>)}</ul>
          <div className="mt-8 flex gap-3">
            <button onClick={() => addToCart(p.slug)} className="btn btn-primary flex-1">{cart.includes(p.slug) ? t.added : t.add}</button>
            <button onClick={() => toggleWish(p.slug)} className="btn btn-outline px-4" aria-label="Wishlist"><Heart className={`h-5 w-5 ${wishlist.includes(p.slug) ? "fill-primary text-primary" : ""}`} /></button>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-muted-foreground">
            <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" />{L("Paiement sécurisé", "Secure payment")}</span>
            <span className="flex items-center gap-1"><Download className="h-4 w-4" />{L("Téléchargement immédiat", "Instant download")}</span>
            <span className="flex items-center gap-1"><Smile className="h-4 w-4" />{L("Satisfaction garantie", "Satisfaction guarantee")}</span>
          </div>
        </div>
      </div>
      <section className="mt-16">
        <h2 className="text-2xl">{L("Avis", "Reviews")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[L("Très bien expliqué, réussi du premier coup !", "Great explanations, worked first time!"), L("Résultat magnifique, je recommande.", "Beautiful result, highly recommended.")].map((r, i) => (
            <div key={i} className="card-soft p-5"><p>“{r}”</p><p className="mt-2 text-xs text-muted-foreground">{L("Achat vérifié", "Verified purchase")} · {new Date(2026, 8, 3 + i * 9).toLocaleDateString(lang)}</p></div>
          ))}
        </div>
      </section>
      <section className="mt-16">
        <h2 className="mb-4 text-2xl">{L("Tu aimeras aussi", "You may also like")}</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{products.filter((x) => x.slug !== p.slug).slice(0, 4).map((x) => <ProductCard key={x.slug} p={x} />)}</div>
      </section>
    </main>
  );
}

function NotFound() {
  const L = useL();
  return <main className="p-16 text-center">{L("Patron introuvable.", "Pattern not found.")} <Link to="/shop" className="text-primary underline">{L("Boutique", "Shop")}</Link></main>;
}
