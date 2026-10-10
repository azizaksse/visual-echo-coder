import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";
import { useL } from "@/lib/shop";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité | Maschenliebe" },
      { name: "description", content: "Informations sur le traitement des données personnelles selon le RGPD." },
      { property: "og:title", content: "Politique de confidentialité | Maschenliebe" },
      { property: "og:description", content: "Informations sur le traitement des données personnelles selon le RGPD." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const L = useL();
  return (
    <Page title={L("Politique de confidentialité", "Privacy policy")}>
      <h2>{L("1. Responsable du traitement", "1. Data controller")}</h2><p>{L("[Nom, adresse, e-mail]", "[Name, address, email]")}</p>
      <h2>{L("2. Traitement des commandes", "2. Order processing")}</h2><p>{L("Pour traiter ta commande, nous utilisons ton nom et ton adresse e-mail (art. 6, al. 1, let. b RGPD). Les paiements sont traités par Stripe.", "To process your order we use your name and email address (Art. 6(1)(b) GDPR). Payments are processed by Stripe.")}</p>
      <h2>{L("3. Cookies", "3. Cookies")}</h2><p>{L("Les cookies techniquement nécessaires sont utilisés sans consentement. Les autres uniquement avec ton accord (art. 6, al. 1, let. a RGPD).", "Strictly necessary cookies are used without consent. Others only with your consent (Art. 6(1)(a) GDPR).")}</p>
      <h2>{L("4. Newsletter", "4. Newsletter")}</h2><p>{L("L'inscription se fait par double opt-in. Tu peux te désabonner à tout moment.", "Sign-up uses double opt-in. You can unsubscribe at any time.")}</p>
      <h2>{L("5. Tes droits", "5. Your rights")}</h2><p>{L("Accès, rectification, effacement, limitation, portabilité des données et opposition.", "Access, rectification, erasure, restriction, data portability and objection.")}</p>
    </Page>
  );
}
