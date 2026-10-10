import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";
import { useL } from "@/lib/shop";

export const Route = createFileRoute("/widerruf")({
  head: () => ({
    meta: [
      { title: "Droit de rétractation | Maschenliebe" },
      { name: "description", content: "Droit de rétractation et sa perte anticipée pour les contenus numériques." },
      { property: "og:title", content: "Droit de rétractation | Maschenliebe" },
      { property: "og:description", content: "Droit de rétractation et sa perte anticipée pour les contenus numériques." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Withdrawal,
});

function Withdrawal() {
  const L = useL();
  return (
    <Page title={L("Droit de rétractation", "Right of withdrawal")}>
      <h2>{L("Droit de rétractation", "Right of withdrawal")}</h2><p>{L("Tu as le droit de te rétracter de ce contrat dans un délai de quatorze jours sans donner de motif. Le délai commence à la conclusion du contrat.", "You have the right to withdraw from this contract within fourteen days without giving any reason. The period starts when the contract is concluded.")}</p>
      <h2>{L("Perte anticipée", "Early expiry")}</h2><p>{L("Pour les contenus numériques, le droit de rétractation prend fin lorsque l'exécution a commencé après ton accord exprès et ta reconnaissance de la perte de ce droit.", "For digital content, the right of withdrawal expires once delivery has begun after your express consent and your acknowledgement that you lose this right.")}</p>
      <h2>{L("Contact pour la rétractation", "Contact for withdrawal")}</h2><p>{L("[Nom, adresse, e-mail]", "[Name, address, email]")}</p>
    </Page>
  );
}
