import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/Layout";
import { useL } from "@/lib/shop";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Contact | Maschenliebe" },
      { name: "description", content: "Une question sur un patron ? Écris-moi un message." },
      { property: "og:title", content: "Contact | Maschenliebe" },
      { property: "og:description", content: "Une question sur un patron ? Écris-moi un message." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const L = useL();
  const [sent, setSent] = useState(false);
  return (
    <Page title="Contact">
      <p>{L("Une question sur un patron ou ta commande ? Je réponds généralement sous 24 heures.", "A question about a pattern or your order? I usually reply within 24 hours.")}</p>
      {sent ? <p className="card-soft p-6 font-bold text-foreground">{L("Merci pour ton message ! 💌", "Thanks for your message! 💌")}</p> : (
        <form className="card-soft space-y-3 p-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <input required placeholder={L("Nom", "Name")} className="field" />
          <input required type="email" placeholder="E-mail" className="field" />
          <textarea required rows={5} placeholder={L("Ton message", "Your message")} className="field" />
          <label className="flex gap-2 text-sm"><input required type="checkbox" />{L("J'accepte que mes données soient utilisées pour me répondre.", "I agree that my data is used to answer my request.")}</label>
          <button className="btn btn-primary">{L("Envoyer", "Send")}</button>
        </form>
      )}
    </Page>
  );
}
