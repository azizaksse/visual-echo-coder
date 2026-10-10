import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";

export const Route = createFileRoute("/danke")({
  head: () => ({
    meta: [
      { title: "Danke für deine Bestellung | Maschenliebe" },
      { name: "description", content: "Deine Häkelanleitungen stehen zum Download bereit." },
      { property: "og:title", content: "Danke für deine Bestellung" },
      { property: "og:description", content: "Download-Link zu deinen Anleitungen." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl">Danke für deine Bestellung! 💕</h1>
      <p className="mt-4 text-muted-foreground">Deine Anleitungen stehen bereit. Den Link schicken wir dir zusätzlich per E-Mail – er ist 7 Tage gültig.</p>
      <button className="btn btn-primary mt-8"><Download className="h-4 w-4" />PDF herunterladen (Demo)</button>
      <div className="mt-6"><Link to="/shop" className="text-sm text-primary underline">Weiter stöbern</Link></div>
    </main>
  ),
});
