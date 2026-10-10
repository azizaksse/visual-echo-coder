import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Download, ListChecks, Sparkles, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useT, useL } from "@/lib/shop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maschenliebe – Patrons de crochet PDF à télécharger" },
      { name: "description", content: "Amigurumi, couvertures, vêtements et déco : patrons de crochet pas à pas en PDF, même pour débutants." },
      { property: "og:title", content: "Maschenliebe – Patrons de crochet en PDF" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "E-books de crochet pas à pas, téléchargement immédiat." },
    ],
  }),
  component: Index,
});

const reviews = [
  { name: "Léa, Lyon", fr: "Super bien expliqué – mon premier amigurumi est parfait !", en: "So clearly explained – my first amigurumi turned out perfect!" },
  { name: "Sophie, Bruxelles", fr: "Les photos à chaque étape valent de l'or. Déjà mon troisième patron.", en: "The photos for every step are gold. Already my third pattern." },
  { name: "Marie, Paris", fr: "Téléchargement immédiat, la couverture est un rêve. Merci !", en: "Instant download, the blanket is a dream. Thank you!" },
];

function Index() {
  const t = useT();
  const L = useL();
  const [sent, setSent] = useState(false);
  const bestsellers = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
  return (
    <main>
      <section className="relative">
        <img src={hero} alt={L("Pelotes pastel et lapin au crochet", "Pastel yarn balls and crocheted bunny")} className="h-[85vh] min-h-[520px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center px-4">
          <p className="eyebrow">{L("Fait main · Téléchargement immédiat", "Handmade · Instant download")}</p>
          <h1 className="mt-5 max-w-xl text-5xl md:text-7xl">{t.heroTitle}</h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">{t.heroSub}</p>
          <Link to="/shop" className="btn btn-primary mt-8 w-fit">{t.discover}</Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-24 sm:grid-cols-3">
        {[
          { i: Download, t: L("Téléchargement immédiat", "Instant download"), d: L("PDF juste après l'achat", "PDF right after purchase") },
          { i: ListChecks, t: L("Patrons pas à pas", "Step-by-step patterns"), d: L("Avec photos à chaque rang", "With photos for every round") },
          { i: Sparkles, t: L("Pour débutants", "Beginner friendly"), d: L("Clair et sans stress", "Clear and stress-free") },
        ].map(({ i: I, t: title, d }) => (
          <div key={title} className="card-soft flex items-center gap-4 p-5">
            <span className="rounded-full bg-accent p-3 text-accent-foreground"><I className="h-5 w-5" /></span>
            <div><p className="font-bold">{title}</p><p className="text-sm text-muted-foreground">{d}</p></div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-end justify-between"><h2 className="text-4xl md:text-5xl">{L("Nouveautés", "New & featured")}</h2><Link to="/shop" className="text-sm font-bold text-primary">{L("Tout voir →", "View all →")}</Link></div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{products.slice(0, 3).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-28">
        <h2 className="mb-6 text-4xl md:text-5xl">Bestseller</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{bestsellers.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-28">
        <h2 className="mb-6 text-center text-4xl md:text-5xl">{L("Ce que disent mes clientes", "What my customers say")}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="card-soft p-6">
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}</div>
              <blockquote className="mt-3">“{L(r.fr, r.en)}”</blockquote>
              <figcaption className="mt-3 text-sm text-muted-foreground">– {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl rounded-3xl bg-sage px-6 py-12 text-center text-sage-foreground shadow-[0_2px_4px_oklch(0.3_0.03_40/0.06),0_20px_48px_-20px_oklch(0.3_0.05_30/0.3)]">
        <h2 className="text-3xl">{L("Un patron offert pour toi 🧶", "A free pattern for you 🧶")}</h2>
        <p className="mt-2">{L("Inscris-toi à la newsletter et reçois le patron « Mini-cœur » en cadeau.", "Sign up for the newsletter and get the “Mini Heart” pattern as a gift.")}</p>
        {sent ? <p className="mt-6 font-bold">{L("Merci ! Confirme ton inscription par e-mail.", "Thank you! Please confirm your sign-up by email.")}</p> : (
          <form className="mx-auto mt-6 flex max-w-md gap-2" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input required type="email" placeholder={L("Ton e-mail", "Your email")} className="field" aria-label="Email" />
            <button className="btn btn-primary shrink-0">{L("S'inscrire", "Sign up")}</button>
          </form>
        )}
      </section>
    </main>
  );
}
