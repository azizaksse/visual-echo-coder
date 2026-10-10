import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";
import { useL } from "@/lib/shop";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Mentions légales | Maschenliebe" },
      { name: "description", content: "Informations légales sur l'éditeur du site." },
      { property: "og:title", content: "Mentions légales | Maschenliebe" },
      { property: "og:description", content: "Informations légales sur l'éditeur du site." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Imprint,
});

function Imprint() {
  const L = useL();
  return (
    <Page title={L("Mentions légales", "Legal notice")}>
      <p>[Prénom Nom / Full name]<br />[Adresse / Address]<br />[Code postal Ville / Postcode City]</p>
      <h2>Contact</h2><p>E-mail : [ton@email.com]</p>
      <h2>{L("Numéro de TVA", "VAT ID")}</h2><p>{L("[FR00000000000]", "[FR00000000000]")}</p>
      <h2>{L("Règlement des litiges", "Dispute resolution")}</h2><p>{L("Nous ne sommes ni obligés ni disposés à participer à une procédure de règlement des litiges devant un organisme de médiation des consommateurs.", "We are neither obliged nor willing to take part in dispute resolution proceedings before a consumer arbitration board.")}</p>
    </Page>
  );
}
