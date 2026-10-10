import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { useL } from "@/lib/shop";

export const Route = createFileRoute("/danke")({
  head: () => ({
    meta: [
      { title: "Merci pour ta commande | Maschenliebe" },
      { name: "description", content: "Tes patrons de crochet sont prêts à être téléchargés." },
      { property: "og:title", content: "Merci pour ta commande | Maschenliebe" },
      { property: "og:description", content: "Tes patrons de crochet sont prêts à être téléchargés." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Thanks,
});

function Thanks() {
  const L = useL();
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl">{L("Merci pour ta commande ! 💕", "Thank you for your order! 💕")}</h1>
      <p className="mt-4 text-muted-foreground">{L("Tes patrons sont prêts. Nous t'envoyons aussi le lien par e-mail – il est valable 7 jours.", "Your patterns are ready. We'll also email you the link – it's valid for 7 days.")}</p>
      <button className="btn btn-primary mt-8"><Download className="h-4 w-4" />{L("Télécharger le PDF (démo)", "Download PDF (demo)")}</button>
      <div className="mt-6"><Link to="/shop" className="text-sm text-primary underline">{L("Continuer mes achats", "Keep browsing")}</Link></div>
    </main>
  );
}
