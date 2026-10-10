import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";

export const Route = createFileRoute("/agb")({
  head: () => ({ meta: [{ title: "AGB | Maschenliebe" }, { name: "description", content: "Allgemeine Geschäftsbedingungen für digitale Häkelanleitungen." }, { property: "og:title", content: "AGB | Maschenliebe" }, { property: "og:description", content: "Allgemeine Geschäftsbedingungen." }] }),
  component: () => (
    <Page title="Allgemeine Geschäftsbedingungen">
      <h2>§ 1 Geltungsbereich</h2><p>Diese AGB gelten für alle Bestellungen digitaler Inhalte (PDF-Anleitungen) über diesen Shop.</p>
      <h2>§ 2 Vertragsschluss</h2><p>Mit Klick auf „Zahlungspflichtig bestellen“ gibst du ein verbindliches Angebot ab.</p>
      <h2>§ 3 Preise</h2><p>Alle Preise in Euro inkl. der gesetzlichen Mehrwertsteuer.</p>
      <h2>§ 4 Nutzungsrechte</h2><p>Du erhältst ein einfaches, nicht übertragbares Nutzungsrecht für den privaten Gebrauch.</p>
    </Page>
  ),
});
