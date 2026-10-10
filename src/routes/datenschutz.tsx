import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({ meta: [{ title: "Datenschutzerklärung | Maschenliebe" }, { name: "description", content: "Informationen zur Verarbeitung personenbezogener Daten nach DSGVO." }, { property: "og:title", content: "Datenschutzerklärung | Maschenliebe" }, { property: "og:description", content: "Datenschutz nach DSGVO." }] }),
  component: () => (
    <Page title="Datenschutzerklärung">
      <h2>1. Verantwortliche Stelle</h2><p>[Name, Anschrift, E-Mail]</p>
      <h2>2. Bestellabwicklung</h2><p>Zur Abwicklung deiner Bestellung verarbeiten wir Name und E-Mail-Adresse (Art. 6 Abs. 1 lit. b DSGVO). Zahlungen werden über Stripe abgewickelt.</p>
      <h2>3. Cookies</h2><p>Technisch notwendige Cookies setzen wir ohne Einwilligung. Weitere Cookies nur mit deiner Zustimmung (Art. 6 Abs. 1 lit. a DSGVO).</p>
      <h2>4. Newsletter</h2><p>Die Anmeldung erfolgt per Double-Opt-in. Eine Abmeldung ist jederzeit möglich.</p>
      <h2>5. Deine Rechte</h2><p>Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch.</p>
    </Page>
  ),
});
