import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/Layout";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt | Maschenliebe" },
      { name: "description", content: "Fragen zu einer Anleitung? Schreib mir eine Nachricht." },
      { property: "og:title", content: "Kontakt | Maschenliebe" },
      { property: "og:description", content: "Schreib mir eine Nachricht." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Page title="Kontakt">
      <p>Du hast eine Frage zu einer Anleitung oder deiner Bestellung? Ich antworte meist innerhalb von 24 Stunden.</p>
      {sent ? <p className="card-soft p-6 font-bold text-foreground">Danke für deine Nachricht! 💌</p> : (
        <form className="card-soft space-y-3 p-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <input required placeholder="Name" className="field" />
          <input required type="email" placeholder="E-Mail" className="field" />
          <textarea required rows={5} placeholder="Deine Nachricht" className="field" />
          <label className="flex gap-2 text-sm"><input required type="checkbox" />Ich stimme der Verarbeitung meiner Daten zur Beantwortung zu.</label>
          <button className="btn btn-primary">Absenden</button>
        </form>
      )}
    </Page>
  );
}
