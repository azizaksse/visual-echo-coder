import { createFileRoute } from "@tanstack/react-router";
import about from "@/assets/about.webp";
import { useL } from "@/lib/shop";

export const Route = createFileRoute("/ueber-mich")({
  head: () => ({
    meta: [
      { title: "À propos – La créatrice de Maschenliebe" },
      { name: "description", content: "Mon histoire au crochet : comment une passion est devenue des patrons faits avec amour." },
      { property: "og:title", content: "À propos – La créatrice de Maschenliebe" },
      { property: "og:description", content: "Mon histoire au crochet : comment une passion est devenue des patrons faits avec amour." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

function About() {
  const L = useL();
  return (
    <main className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-12 md:grid-cols-2">
      <img src={about} alt={L("La créatrice en train de crocheter", "The designer crocheting")} className="card-soft w-full object-cover" />
      <div className="space-y-4 text-muted-foreground">
        <h1 className="text-4xl text-foreground">{L("Bonjour, je suis Anna !", "Hi, I'm Anna!")}</h1>
        <p>{L("Il y a dix ans, ma grand-mère m'a montré ma première chaînette – depuis, le crochet ne m'a plus quittée.", "Ten years ago my grandma showed me my first chain – I've been hooked ever since.")}</p>
        <p>{L("De nombreuses soirées sur le canapé ont donné naissance à des patrons expliqués comme j'aurais aimé les avoir en débutant : beaucoup de photos, un langage clair et zéro frustration.", "Countless evenings on the sofa turned into patterns explained the way I wished for as a beginner: lots of photos, clear language and no frustration.")}</p>
        <p>{L("Aujourd'hui, des milliers de personnes en Europe crochètent mes modèles. Merci d'en faire partie !", "Today thousands of people across Europe crochet my designs. Thank you for being part of it!")}</p>
      </div>
    </main>
  );
}
