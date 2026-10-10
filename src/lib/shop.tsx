import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";
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
  const [lang, setLang] = useState<Lang>("fr");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem("ml-cart") || "[]");
      const w = JSON.parse(localStorage.getItem("ml-wish") || "[]");
      if (Array.isArray(c)) setCart(c);
      if (Array.isArray(w)) setWish(w);
      const l = localStorage.getItem("ml-lang");
      if (l === "fr" || l === "en") setLang(l);
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("ml-cart", JSON.stringify(cart));
    localStorage.setItem("ml-wish", JSON.stringify(wishlist));
    localStorage.setItem("ml-lang", lang);
    document.documentElement.lang = lang;
  }, [cart, wishlist, lang, loaded]);
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
  fr: { shop: "Boutique", about: "À propos", faq: "FAQ", contact: "Contact", cart: "Panier", search: "Rechercher un modèle…", add: "Ajouter au panier", added: "Dans le panier", discover: "Découvrir", heroTitle: "Des patrons de crochet faits avec amour", heroSub: "Des e-books PDF pas à pas, écrits avec soin – téléchargement immédiat.", vat: "TVA incluse" },
  en: { shop: "Shop", about: "About me", faq: "FAQ", contact: "Contact", cart: "Cart", search: "Search patterns…", add: "Add to cart", added: "In cart", discover: "Discover now", heroTitle: "Crochet patterns made with love", heroSub: "Lovingly written step-by-step PDF ebooks – instant download.", vat: "incl. VAT" },
};
export const useT = () => dict[useShop().lang];
/** Inline translation helper: L("Français", "English") */
export const useL = () => {
  const { lang } = useShop();
  return (fr: string, en: string) => (lang === "fr" ? fr : en);
};
