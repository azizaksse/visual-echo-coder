import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "de" | "en";
interface ShopState {
  cart: string[];
  wishlist: string[];
  lang: Lang;
  setLang: (l: Lang) => void;
  addToCart: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  toggleWish: (slug: string) => void;
}

const Ctx = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWish] = useState<string[]>([]);
  const [lang, setLang] = useState<Lang>("de");
  return (
    <Ctx.Provider
      value={{
        cart, wishlist, lang, setLang,
        addToCart: (s) => setCart((c) => (c.includes(s) ? c : [...c, s])),
        removeFromCart: (s) => setCart((c) => c.filter((x) => x !== s)),
        clearCart: () => setCart([]),
        toggleWish: (s) => setWish((w) => (w.includes(s) ? w.filter((x) => x !== s) : [...w, s])),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useShop = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("ShopProvider missing");
  return c;
};

const dict = {
  de: { shop: "Shop", about: "Über mich", faq: "FAQ", contact: "Kontakt", cart: "Warenkorb", search: "Anleitungen suchen…", add: "In den Warenkorb", added: "Im Warenkorb", discover: "Jetzt entdecken", heroTitle: "Häkelanleitungen mit Herz", heroSub: "Liebevolle Schritt-für-Schritt E-Books als PDF – sofort zum Download.", vat: "inkl. MwSt." },
  en: { shop: "Shop", about: "About me", faq: "FAQ", contact: "Contact", cart: "Cart", search: "Search patterns…", add: "Add to cart", added: "In cart", discover: "Discover now", heroTitle: "Crochet patterns made with love", heroSub: "Lovingly written step-by-step PDF ebooks – instant download.", vat: "incl. VAT" },
};
export const useT = () => dict[useShop().lang];
