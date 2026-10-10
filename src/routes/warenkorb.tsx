import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { formatEUR, getProduct } from "@/lib/products";
import { useShop } from "@/lib/shop";
import { PaymentIcons } from "@/components/Layout";

export const Route = createFileRoute("/warenkorb")({
  head: () => ({
    meta: [
      { title: "Warenkorb & Kasse | Maschenliebe" },
      { name: "description", content: "Einfache Kasse, Gastbestellung möglich. Sofort-Download nach der Zahlung." },
      { property: "og:title", content: "Warenkorb & Kasse | Maschenliebe" },
      { property: "og:description", content: "Schnell und sicher bestellen." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { cart, removeFromCart, clearCart } = useShop();
  const nav = useNavigate();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const items = cart.map((s) => getProduct(s)!).filter(Boolean);
  const subtotal = items.reduce((a, p) => a + p.price, 0);
  const total = subtotal * (1 - discount);
  const vat = total - total / 1.19;

  if (!items.length) return <main className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="text-3xl">Dein Warenkorb ist leer</h1><Link to="/shop" className="btn btn-primary mt-6">Zum Shop</Link></main>;

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1fr_380px]">
      <form onSubmit={(e) => { e.preventDefault(); clearCart(); nav({ to: "/danke" }); }} className="space-y-6">
        <h1 className="text-4xl">Kasse</h1>
        <div className="card-soft space-y-3 p-6">
          <h2 className="text-lg">Deine Daten <span className="text-sm font-normal text-muted-foreground">(Gastbestellung)</span></h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input required placeholder="Vorname" className="field" /><input required placeholder="Nachname" className="field" />
          </div>
          <input required type="email" placeholder="E-Mail für den Download-Link" className="field" />
        </div>
        <div className="card-soft space-y-3 p-6">
          <h2 className="text-lg">Zahlungsart</h2>
          <PaymentIcons />
          <p className="text-xs text-muted-foreground">Die Zahlung wird später sicher über Stripe abgewickelt.</p>
        </div>
        <label className="flex gap-3 text-sm"><input required type="checkbox" className="mt-1" />Ich stimme ausdrücklich zu, dass mit der Bereitstellung der digitalen Inhalte vor Ablauf der Widerrufsfrist begonnen wird. Mir ist bekannt, dass ich dadurch mein Widerrufsrecht verliere.</label>
        <label className="flex gap-3 text-sm"><input required type="checkbox" className="mt-1" />Ich akzeptiere die <Link to="/agb" className="underline">AGB</Link> und habe die <Link to="/datenschutz" className="underline">Datenschutzerklärung</Link> gelesen.</label>
        <button className="btn btn-primary w-full">Zahlungspflichtig bestellen · {formatEUR(total)}</button>
      </form>
      <aside className="card-soft h-fit space-y-4 p-6">
        <h2 className="text-lg">Bestellübersicht</h2>
        {items.map((p) => (
          <div key={p.slug} className="flex items-center gap-3">
            <img src={p.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
            <span className="flex-1 text-sm font-semibold">{p.title}</span>
            <span className="text-sm">{formatEUR(p.price)}</span>
            <button onClick={() => removeFromCart(p.slug)} aria-label="Entfernen"><X className="h-4 w-4" /></button>
          </div>
        ))}
        <div className="flex gap-2">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Rabattcode" className="field" />
          <button type="button" className="btn btn-outline px-4 py-2 text-sm" onClick={() => setDiscount(code.trim().toUpperCase() === "MASCHE10" ? 0.1 : 0)}>Einlösen</button>
        </div>
        {discount > 0 && <p className="text-sm text-sage-foreground">10 % Rabatt angewendet</p>}
        <div className="space-y-1 border-t pt-3 text-sm">
          <div className="flex justify-between"><span>Zwischensumme</span><span>{formatEUR(subtotal)}</span></div>
          <div className="flex justify-between text-lg font-bold"><span>Gesamt</span><span>{formatEUR(total)}</span></div>
          <p className="text-xs text-muted-foreground">inkl. 19 % MwSt. ({formatEUR(vat)})</p>
        </div>
      </aside>
    </main>
  );
}
