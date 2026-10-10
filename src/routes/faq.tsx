import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";

const faqs = [
  ["Wie erhalte ich meine Anleitung?", "Direkt nach der Zahlung auf der Bestätigungsseite und zusätzlich per E-Mail als Download-Link."],
  ["Wie lange ist der Download-Link gültig?", "7 Tage. Danach kannst du dich jederzeit bei mir melden."],
  ["Sind die Anleitungen für Anfänger geeignet?", "Alle mit „Anfänger“ markierten Anleitungen erklären jeden Schritt mit Fotos."],
  ["Darf ich die gehäkelten Stücke verkaufen?", "Ja, in kleinen Mengen mit Hinweis auf das Design. Die Anleitung selbst darf nicht weitergegeben werden."],
  ["Welche Zahlungsarten gibt es?", "Kreditkarte, PayPal, Apple Pay, Google Pay, SEPA-Lastschrift, Klarna und iDEAL."],
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Häufige Fragen | Maschenliebe" },
      { name: "description", content: "Antworten zu Download, Zahlung und Nutzung der Häkelanleitungen." },
      { property: "og:title", content: "Häufige Fragen | Maschenliebe" },
      { property: "og:description", content: "Alles zu Download, Zahlung & Anleitungen." },
    ],
  }),
  component: () => (
    <Page title="Häufige Fragen">
      {faqs.map(([q, a]) => (
        <details key={q} className="card-soft p-5"><summary className="cursor-pointer font-bold text-foreground">{q}</summary><p className="mt-2">{a}</p></details>
      ))}
    </Page>
  ),
});
