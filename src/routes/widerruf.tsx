import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Layout";

export const Route = createFileRoute("/widerruf")({
  head: () => ({ meta: [{ title: "Widerrufsbelehrung | Maschenliebe" }, { name: "description", content: "Widerrufsrecht und vorzeitiges Erlöschen bei digitalen Inhalten." }, { property: "og:title", content: "Widerrufsbelehrung | Maschenliebe" }, { property: "og:description", content: "Widerrufsrecht für digitale Inhalte." }] }),
  component: () => (
    <Page title="Widerrufsbelehrung">
      <h2>Widerrufsrecht</h2><p>Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Frist beginnt mit Vertragsschluss.</p>
      <h2>Vorzeitiges Erlöschen</h2><p>Das Widerrufsrecht erlischt bei Verträgen über digitale Inhalte, wenn wir mit der Ausführung begonnen haben, nachdem du ausdrücklich zugestimmt hast, dass wir vor Ablauf der Widerrufsfrist beginnen, und du deine Kenntnis davon bestätigt hast, dass du dein Widerrufsrecht verlierst (§ 356 Abs. 5 BGB).</p>
      <h2>Kontakt für den Widerruf</h2><p>[Name, Anschrift, E-Mail]</p>
    </Page>
  ),
});
