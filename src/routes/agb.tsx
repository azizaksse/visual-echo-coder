import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";
import { useL } from "@/lib/shop";

export const Route = createFileRoute("/agb")({
  head: () => ({
    meta: [
      { title: "Conditions générales de vente | Maschenliebe" },
      { name: "description", content: "Conditions générales de vente pour les patrons de crochet numériques." },
      { property: "og:title", content: "Conditions générales de vente | Maschenliebe" },
      { property: "og:description", content: "Conditions générales de vente pour les patrons de crochet numériques." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Terms,
});

function Terms() {
  const L = useL();
  return (
    <Page title={L("Conditions générales de vente", "Terms and conditions")}>
      <h2>{L("Art. 1 Champ d'application", "§ 1 Scope")}</h2><p>{L("Ces CGV s'appliquent à toutes les commandes de contenus numériques (patrons PDF) sur cette boutique.", "These terms apply to all orders of digital content (PDF patterns) in this shop.")}</p>
      <h2>{L("Art. 2 Conclusion du contrat", "§ 2 Conclusion of contract")}</h2><p>{L("En cliquant sur « Commander et payer », tu fais une offre ferme.", "By clicking “Place order and pay” you submit a binding offer.")}</p>
      <h2>{L("Art. 3 Prix", "§ 3 Prices")}</h2><p>{L("Tous les prix sont en euros, TVA légale incluse.", "All prices are in euros including statutory VAT.")}</p>
      <h2>{L("Art. 4 Droits d'utilisation", "§ 4 Usage rights")}</h2><p>{L("Tu reçois un droit d'utilisation simple et non transférable pour un usage privé.", "You receive a simple, non-transferable right of use for private purposes.")}</p>
    </Page>
  );
}
