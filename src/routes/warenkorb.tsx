import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { formatEUR, getProduct } from "@/lib/products";
import { useShop, useL } from "@/lib/shop";
import { PaymentIcons } from "@/components/Layout";

export const Route = createFileRoute("/warenkorb")({
  head: () => ({
    meta: [
      { title: "Panier & paiement | Maschenliebe" },
      { name: "description", content: "Paiement simple, commande sans compte possible. Téléchargement immédiat après paiement." },
      { property: "og:title", content: "Panier & paiement | Maschenliebe" },
      { property: "og:description", content: "Commander rapidement et en toute sécurité." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { cart, removeFromCart, clearCart, lang } = useShop();
  const L = useL();
  const nav = useNavigate();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const items = cart.map((s) => getProduct(s)!).filter(Boolean);
  const subtotal = items.reduce((a, p) => a + p.price, 0);
  const total = subtotal * (1 - discount);
  const vat = total - total / 1.19;

  if (!items.length) return <main className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="text-3xl">{L("Ton panier est vide", "Your cart is empty")}</h1><Link to="/shop" className="btn btn-primary mt-6">{L("Vers la boutique", "Go to shop")}</Link></main>;

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1fr_380px]">
      <form onSubmit={(e) => { e.preventDefault(); clearCart(); nav({ to: "/danke" }); }} className="space-y-6">
        <h1 className="text-4xl">{L("Paiement", "Checkout")}</h1>
        <div className="card-soft space-y-3 p-6">
          <h2 className="text-lg">{L("Tes coordonnées", "Your details")} <span className="text-sm font-normal text-muted-foreground">({L("sans compte", "guest checkout")})</span></h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input required placeholder={L("Prénom", "First name")} className="field" /><input required placeholder={L("Nom", "Last name")} className="field" />
          </div>
          <input required type="email" placeholder={L("E-mail pour le lien de téléchargement", "Email for the download link")} className="field" />
        </div>
        <div className="card-soft space-y-3 p-6">
          <h2 className="text-lg">{L("Moyen de paiement", "Payment method")}</h2>
          <PaymentIcons />
          <p className="text-xs text-muted-foreground">{L("Le paiement sera traité en toute sécurité via Stripe.", "Payment will be processed securely via Stripe.")}</p>
        </div>
        <label className="flex gap-3 text-sm"><input required type="checkbox" className="mt-1" />{L("J'accepte expressément que la fourniture du contenu numérique commence avant la fin du délai de rétractation et je reconnais perdre ainsi mon droit de rétractation.", "I expressly agree that delivery of the digital content begins before the withdrawal period ends, and I acknowledge that I thereby lose my right of withdrawal.")}</label>
        <label className="flex gap-3 text-sm"><input required type="checkbox" className="mt-1" />{L("J'accepte les", "I accept the")} <Link to="/agb" className="underline">{L("CGV", "Terms")}</Link> {L("et j'ai lu la", "and have read the")} <Link to="/datenschutz" className="underline">{L("politique de confidentialité", "privacy policy")}</Link>.</label>
        <button className="btn btn-primary w-full">{L("Commander et payer", "Place order and pay")} · {formatEUR(total)}</button>
      </form>
      <aside className="card-soft h-fit space-y-4 p-6">
        <h2 className="text-lg">{L("Récapitulatif", "Order summary")}</h2>
        {items.map((p) => (
          <div key={p.slug} className="flex items-center gap-3">
            <img src={p.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
            <span className="flex-1 text-sm font-semibold">{p[lang].title}</span>
            <span className="text-sm">{formatEUR(p.price)}</span>
            <button onClick={() => removeFromCart(p.slug)} aria-label={L("Retirer", "Remove")}><X className="h-4 w-4" /></button>
          </div>
        ))}
        <div className="flex gap-2">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={L("Code promo", "Discount code")} className="field" />
          <button type="button" className="btn btn-outline px-4 py-2 text-sm" onClick={() => setDiscount(code.trim().toUpperCase() === "MASCHE10" ? 0.1 : 0)}>{L("Appliquer", "Apply")}</button>
        </div>
        {discount > 0 && <p className="text-sm text-sage-foreground">{L("Réduction de 10 % appliquée", "10% discount applied")}</p>}
        <div className="space-y-1 border-t pt-3 text-sm">
          <div className="flex justify-between"><span>{L("Sous-total", "Subtotal")}</span><span>{formatEUR(subtotal)}</span></div>
          <div className="flex justify-between text-lg font-bold"><span>Total</span><span>{formatEUR(total)}</span></div>
          <p className="text-xs text-muted-foreground">{L("dont TVA 19 %", "incl. 19% VAT")} ({formatEUR(vat)})</p>
        </div>
      </aside>
    </main>
  );
}
