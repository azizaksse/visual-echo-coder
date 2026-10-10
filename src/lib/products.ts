import bunny from "@/assets/p-bunny.jpg";
import blanket from "@/assets/p-blanket.jpg";
import cardigan from "@/assets/p-cardigan.jpg";
import bag from "@/assets/p-bag.jpg";
import deco from "@/assets/p-deco.jpg";

export type Level = "Anfänger" | "Fortgeschritten";
export type Category = "Amigurumi" | "Decken" | "Kleidung" | "Accessoires" | "Deko";

export interface Product {
  slug: string;
  title: string;
  price: number;
  image: string;
  level: Level;
  category: Category;
  pages: number;
  time: string;
  materials: string[];
  description: string;
  popularity: number;
  date: string;
  rating: number;
}

export const products: Product[] = [
  { slug: "hase-rosalie", title: "Häschen Rosalie", price: 5.9, image: bunny, level: "Anfänger", category: "Amigurumi", pages: 18, time: "ca. 4–6 Stunden", materials: ["Baumwollgarn 50 g rosé", "Häkelnadel 2,5 mm", "Füllwatte", "Sicherheitsaugen 8 mm"], description: "Ein kuscheliges Amigurumi-Häschen – ideal für dein erstes Häkelprojekt. Mit Fotos zu jeder Runde.", popularity: 98, date: "2026-09-12", rating: 4.9 },
  { slug: "granny-decke-salbei", title: "Granny-Decke Salbei", price: 7.5, image: blanket, level: "Anfänger", category: "Decken", pages: 24, time: "ca. 20–25 Stunden", materials: ["Wollmischgarn 900 g", "Häkelnadel 5 mm", "Wollnadel"], description: "Zeitlose Granny-Square-Decke in sanften Salbeitönen. Mit Farbplan und Zusammennäh-Anleitung.", popularity: 91, date: "2026-07-02", rating: 4.8 },
  { slug: "cardigan-mila", title: "Cardigan Mila", price: 9.9, image: cardigan, level: "Fortgeschritten", category: "Kleidung", pages: 32, time: "ca. 30–40 Stunden", materials: ["Merinogarn 600–900 g", "Häkelnadel 4 mm", "5 Knöpfe"], description: "Locker sitzender Cardigan in den Größen XS–XXL mit Maßtabelle und Schritt-für-Schritt-Fotos.", popularity: 87, date: "2026-09-28", rating: 4.7 },
  { slug: "markttasche-lotta", title: "Markttasche Lotta", price: 4.9, image: bag, level: "Anfänger", category: "Accessoires", pages: 12, time: "ca. 3–4 Stunden", materials: ["Baumwollgarn 200 g", "Häkelnadel 4 mm"], description: "Stabile, nachhaltige Einkaufstasche – schnell gehäkelt und perfekt als Geschenk.", popularity: 80, date: "2026-05-15", rating: 4.8 },
  { slug: "blumen-deko-set", title: "Blumen-Deko Set", price: 6.5, image: deco, level: "Fortgeschritten", category: "Deko", pages: 20, time: "ca. 8–10 Stunden", materials: ["Baumwollreste", "Häkelnadel 2,5 mm", "Draht"], description: "Sechs Blumenmotive und eine Topfhülle für dein Zuhause – Frühling das ganze Jahr.", popularity: 75, date: "2026-08-20", rating: 4.6 },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatEUR = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
