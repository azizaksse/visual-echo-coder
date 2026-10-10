import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";
import { useL } from "@/lib/shop";

const faqs: [string, string, string, string][] = [
  ["Comment je reçois mon patron ?", "Juste après le paiement sur la page de confirmation, et aussi par e-mail avec un lien de téléchargement.", "How do I receive my pattern?", "Right after payment on the confirmation page, plus a download link by email."],
  ["Combien de temps le lien est-il valable ?", "7 jours. Ensuite, tu peux me contacter à tout moment.", "How long is the download link valid?", "7 days. After that, just get in touch with me any time."],
  ["Les patrons conviennent-ils aux débutants ?", "Tous les patrons marqués « Débutant » expliquent chaque étape avec des photos.", "Are the patterns beginner friendly?", "All patterns marked “Beginner” explain every step with photos."],
  ["Puis-je vendre mes créations ?", "Oui, en petites quantités en mentionnant le design. Le patron lui-même ne doit pas être partagé.", "May I sell the finished pieces?", "Yes, in small quantities with credit to the design. The pattern itself may not be shared."],
  ["Quels moyens de paiement acceptez-vous ?", "Carte bancaire, PayPal, Apple Pay, Google Pay, prélèvement SEPA, Klarna et iDEAL.", "Which payment methods do you accept?", "Credit card, PayPal, Apple Pay, Google Pay, SEPA Direct Debit, Klarna and iDEAL."],
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Questions fréquentes | Maschenliebe" },
      { name: "description", content: "Réponses sur le téléchargement, le paiement et l'utilisation des patrons." },
      { property: "og:title", content: "Questions fréquentes | Maschenliebe" },
      { property: "og:description", content: "Réponses sur le téléchargement, le paiement et l'utilisation des patrons." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Faq,
});

function Faq() {
  const L = useL();
  return (
    <Page title={L("Questions fréquentes", "Frequently asked questions")}>
      {faqs.map(([qf, af, qe, ae]) => (
        <details key={qf} className="card-soft p-5"><summary className="cursor-pointer font-bold text-foreground">{L(qf, qe)}</summary><p className="mt-2">{L(af, ae)}</p></details>
      ))}
    </Page>
  );
}
