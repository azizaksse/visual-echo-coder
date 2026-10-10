import { createFileRoute } from "@tanstack/react-router";
import about from "@/assets/about.jpg";

export const Route = createFileRoute("/ueber-mich")({
  head: () => ({
    meta: [
      { title: "Über mich – Die Designerin hinter Maschenliebe" },
      { name: "description", content: "Meine Häkelreise: wie aus einem Hobby liebevolle Anleitungen wurden." },
      { property: "og:title", content: "Über mich – Maschenliebe" },
      { property: "og:description", content: "Die Geschichte hinter den Anleitungen." },
    ],
  }),
  component: () => (
    <main className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-12 md:grid-cols-2">
      <img src={about} alt="Designerin beim Häkeln auf dem Sofa" className="card-soft w-full object-cover" />
      <div className="space-y-4 text-muted-foreground">
        <h1 className="text-4xl text-foreground">Hallo, ich bin Anna!</h1>
        <p>Vor zehn Jahren hat mir meine Oma die erste Luftmaschenkette gezeigt – seitdem lässt mich die Häkelnadel nicht mehr los.</p>
        <p>Aus unzähligen Abenden auf dem Sofa sind Anleitungen entstanden, die so erklärt sind, wie ich sie mir als Anfängerin gewünscht hätte: mit vielen Fotos, klarer Sprache und ganz ohne Frust.</p>
        <p>Heute häkeln tausende Menschen in ganz Europa nach meinen Mustern. Danke, dass du Teil davon bist!</p>
      </div>
    </main>
  ),
});
