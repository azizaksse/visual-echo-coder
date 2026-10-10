import bunny from "@/assets/p-bunny.webp";
import blanket from "@/assets/p-blanket.webp";
import cardigan from "@/assets/p-cardigan.webp";
import bag from "@/assets/p-bag.webp";
import deco from "@/assets/p-deco.webp";
import type { Lang } from "@/lib/shop";

export type Level = "beginner" | "advanced";
export type Category = "amigurumi" | "blankets" | "clothing" | "accessories" | "decor";

export const levelLabel: Record<Level, Record<Lang, string>> = {
  beginner: { fr: "Débutant", en: "Beginner" },
  advanced: { fr: "Avancé", en: "Advanced" },
};
export const categoryLabel: Record<Category, Record<Lang, string>> = {
  amigurumi: { fr: "Amigurumi", en: "Amigurumi" },
  blankets: { fr: "Couvertures", en: "Blankets" },
  clothing: { fr: "Vêtements", en: "Clothing" },
  accessories: { fr: "Accessoires", en: "Accessories" },
  decor: { fr: "Déco", en: "Decor" },
};

interface Text { title: string; time: string; materials: string[]; description: string }
export interface Product {
  slug: string;
  price: number;
  image: string;
  level: Level;
  category: Category;
  pages: number;
  popularity: number;
  date: string;
  rating: number;
  fr: Text;
  en: Text;
}

export const products: Product[] = [
  { slug: "hase-rosalie", price: 5.9, image: bunny, level: "beginner", category: "amigurumi", pages: 18, popularity: 98, date: "2026-09-12", rating: 4.9,
    fr: { title: "Lapin Rosalie", time: "env. 4–6 heures", materials: ["Fil coton 50 g rose", "Crochet 2,5 mm", "Ouate de rembourrage", "Yeux de sécurité 8 mm"], description: "Un adorable lapin amigurumi – idéal pour ton premier projet. Avec des photos pour chaque rang." },
    en: { title: "Bunny Rosalie", time: "approx. 4–6 hours", materials: ["Cotton yarn 50 g rose", "Crochet hook 2.5 mm", "Toy stuffing", "Safety eyes 8 mm"], description: "A cuddly amigurumi bunny – perfect for your first crochet project. With photos for every round." } },
  { slug: "granny-decke-salbei", price: 7.5, image: blanket, level: "beginner", category: "blankets", pages: 24, popularity: 91, date: "2026-07-02", rating: 4.8,
    fr: { title: "Couverture Granny Sauge", time: "env. 20–25 heures", materials: ["Fil laine mélangée 900 g", "Crochet 5 mm", "Aiguille à laine"], description: "Une couverture granny intemporelle aux tons sauge. Avec plan de couleurs et guide d'assemblage." },
    en: { title: "Granny Blanket Sage", time: "approx. 20–25 hours", materials: ["Wool blend yarn 900 g", "Crochet hook 5 mm", "Yarn needle"], description: "A timeless granny-square blanket in soft sage tones. With colour chart and joining guide." } },
  { slug: "cardigan-mila", price: 9.9, image: cardigan, level: "advanced", category: "clothing", pages: 32, popularity: 87, date: "2026-09-28", rating: 4.7,
    fr: { title: "Cardigan Mila", time: "env. 30–40 heures", materials: ["Fil mérinos 600–900 g", "Crochet 4 mm", "5 boutons"], description: "Cardigan ample du XS au XXL, avec tableau des mesures et photos pas à pas." },
    en: { title: "Cardigan Mila", time: "approx. 30–40 hours", materials: ["Merino yarn 600–900 g", "Crochet hook 4 mm", "5 buttons"], description: "Relaxed-fit cardigan in sizes XS–XXL with size chart and step-by-step photos." } },
  { slug: "markttasche-lotta", price: 4.9, image: bag, level: "beginner", category: "accessories", pages: 12, popularity: 80, date: "2026-05-15", rating: 4.8,
    fr: { title: "Sac de marché Lotta", time: "env. 3–4 heures", materials: ["Fil coton 200 g", "Crochet 4 mm"], description: "Un sac de courses solide et durable – vite crocheté et parfait à offrir." },
    en: { title: "Market Bag Lotta", time: "approx. 3–4 hours", materials: ["Cotton yarn 200 g", "Crochet hook 4 mm"], description: "A sturdy, sustainable shopping bag – quick to crochet and perfect as a gift." } },
  { slug: "blumen-deko-set", price: 6.5, image: deco, level: "advanced", category: "decor", pages: 20, popularity: 75, date: "2026-08-20", rating: 4.6,
    fr: { title: "Set déco Fleurs", time: "env. 8–10 heures", materials: ["Restes de fil coton", "Crochet 2,5 mm", "Fil de fer"], description: "Six motifs de fleurs et un cache-pot pour ta maison – le printemps toute l'année." },
    en: { title: "Flower Decor Set", time: "approx. 8–10 hours", materials: ["Cotton yarn scraps", "Crochet hook 2.5 mm", "Wire"], description: "Six flower motifs and a pot cover for your home – spring all year round." } },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatEUR = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
