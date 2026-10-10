import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";

export const Route = createFileRoute("/impressum")({
  head: () => ({ meta: [{ title: "Impressum | Maschenliebe" }, { name: "description", content: "Angaben gemäß § 5 DDG." }, { property: "og:title", content: "Impressum | Maschenliebe" }, { property: "og:description", content: "Anbieterkennzeichnung." }] }),
  component: () => (
    <Page title="Impressum">
      <p>Angaben gemäß § 5 DDG</p>
      <p>[Vor- und Nachname]<br />[Straße Hausnummer]<br />[PLZ Ort], Deutschland</p>
      <h2>Kontakt</h2><p>E-Mail: [deine@email.de]</p>
      <h2>Umsatzsteuer-ID</h2><p>[DE000000000]</p>
      <h2>EU-Streitschlichtung</h2><p>Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    </Page>
  ),
});
