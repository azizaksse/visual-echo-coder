import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Download, ListChecks, Sparkles, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useT } from "@/lib/shop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maschenliebe – Häkelanleitungen als PDF zum Sofort-Download" },
      { name: "description", content: "Amigurumi, Decken, Kleidung & Deko: Schritt-für-Schritt Häkelanleitungen als PDF, auch für Anfänger." },
      { property: "og:title", content: "Maschenliebe – Häkelanleitungen als PDF" },
      { property: "og:description", content: "Schritt-für-Schritt Häkel-E-Books zum Sofort-Download." },
    ],
  }),
  component: Index,
});

const reviews = [
  { name: "Lena, Hamburg", text: "Super verständlich erklärt – mein erstes Amigurumi ist perfekt geworden!" },
  { name: "Sophie, Wien", text: "Die Fotos zu jedem Schritt sind Gold wert. Schon die dritte Anleitung gekauft." },
  { name: "Marie, Köln", text: "Download kam sofort, die Decke ist ein Traum. Danke!" },
];

function Index() {
  const t = useT();
  const [sent, setSent] = useState(false);
  const bestsellers = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
  return (
    <main>
      <section className="relative">
        <img src={hero} alt="Pastellfarbene Wollknäuel und gehäkeltes Häschen" className="h-[70vh] min-h-[460px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center px-4">
          <h1 className="max-w-lg text-4xl leading-tight md:text-6xl">{t.heroTitle}</h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">{t.heroSub}</p>
          <Link to="/shop" className="btn btn-primary mt-8 w-fit">{t.discover}</Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-16 sm:grid-cols-3">
        {[
          { i: Download, t: "Sofortiger Download", d: "PDF direkt nach dem Kauf" },
          { i: ListChecks, t: "Schritt-für-Schritt Anleitungen", d: "Mit Fotos zu jeder Runde" },
          { i: Sparkles, t: "Für Anfänger geeignet", d: "Klar erklärt, ohne Stress" },
        ].map(({ i: I, t: title, d }) => (
          <div key={title} className="card-soft flex items-center gap-4 p-5">
            <span className="rounded-full bg-accent p-3 text-accent-foreground"><I className="h-5 w-5" /></span>
            <div><p className="font-bold">{title}</p><p className="text-sm text-muted-foreground">{d}</p></div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-end justify-between"><h2 className="text-3xl">Neu & ausgewählt</h2><Link to="/shop" className="text-sm font-bold text-primary">Alle ansehen →</Link></div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{products.slice(0, 3).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="mb-6 text-3xl">Bestseller</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{bestsellers.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <h2 className="mb-6 text-center text-3xl">Das sagen meine Kundinnen</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="card-soft p-6">
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}</div>
              <blockquote className="mt-3">„{r.text}“</blockquote>
              <figcaption className="mt-3 text-sm text-muted-foreground">– {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl rounded-3xl bg-sage px-6 py-12 text-center text-sage-foreground">
        <h2 className="text-3xl">Gratis-Anleitung für dich 🧶</h2>
        <p className="mt-2">Melde dich zum Newsletter an und erhalte das Muster „Mini-Herz“ geschenkt.</p>
        {sent ? <p className="mt-6 font-bold">Danke! Bitte bestätige deine Anmeldung per E-Mail.</p> : (
          <form className="mx-auto mt-6 flex max-w-md gap-2" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input required type="email" placeholder="Deine E-Mail" className="field" aria-label="E-Mail" />
            <button className="btn btn-primary shrink-0">Anmelden</button>
          </form>
        )}
      </section>
    </main>
  );
}
