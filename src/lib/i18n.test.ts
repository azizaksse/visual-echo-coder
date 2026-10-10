import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { products } from "./products";

// Words that are legitimately the same in French and English.
const SAME_OK = new Set(["FAQ", "Contact", "Amigurumi", "Maschenliebe", "PDF", "Total", "E-mail", "Email"]);
const root = resolve(__dirname, "..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");

describe("translation dictionary", () => {
  const src = read("lib/shop.tsx");
  const block = (lang: string) => {
    const m = src.match(new RegExp(`\\n\\s*${lang}: \\{([^\\n]*)\\}`));
    return Object.fromEntries([...(m?.[1] ?? "").matchAll(/(\w+): "([^"]*)"/g)].map((x) => [x[1], x[2]]));
  };
  const fr = block("fr"), en = block("en");
  it("has the same keys in FR and EN", () => {
    expect(Object.keys(fr).sort()).toEqual(Object.keys(en).sort());
  });
  it("has no empty values", () => {
    for (const [k, v] of [...Object.entries(fr), ...Object.entries(en)]) expect(v.trim(), k).not.toBe("");
  });
});

describe("product translations", () => {
  for (const p of products) {
    it(`${p.slug} is complete in FR and EN`, () => {
      for (const l of ["fr", "en"] as const) {
        const t = p[l] as Record<string, unknown>;
        for (const [k, v] of Object.entries(t)) {
          if (Array.isArray(v)) v.forEach((s) => expect(String(s).trim(), `${l}.${k}`).not.toBe(""));
          else expect(String(v ?? "").trim(), `${l}.${k}`).not.toBe("");
        }
      }
      expect(Object.keys(p.fr).sort()).toEqual(Object.keys(p.en).sort());
      expect(p.fr.materials.length, "materials count").toBe(p.en.materials.length);
      expect(p.fr.title, "title untranslated").not.toBe(p.en.title);
      expect(p.fr.description, "description untranslated").not.toBe(p.en.description);
    });
  }
});

const PAGES = ["routes/shop.tsx", "routes/produkt.$slug.tsx", "routes/warenkorb.tsx", "components/ProductCard.tsx"];

describe("page strings", () => {
  for (const file of PAGES) {
    const src = read(file);
    it(`${file}: every L("fr", "en") pair is filled and translated`, () => {
      const problems: string[] = [];
      for (const m of src.matchAll(/\bL\(\s*(["'`])((?:\\.|(?!\1).)*)\1\s*,\s*(["'`])((?:\\.|(?!\3).)*)\3\s*\)/g)) {
        const [fr, en] = [m[2].trim(), m[4].trim()];
        if (!fr || !en) problems.push(`empty: ${m[0]}`);
        else if (fr === en && !SAME_OK.has(fr)) problems.push(`identical: ${m[0]}`);
      }
      // L() calls with only one argument
      for (const m of src.matchAll(/\bL\(\s*(["'`])((?:\\.|(?!\1).)*)\1\s*\)/g)) problems.push(`missing EN: ${m[0]}`);
      expect(problems).toEqual([]);
    });
    it(`${file}: no hard-coded visible text outside L()`, () => {
      const body = src.replace(/head:\s*\(\)\s*=>\s*\(\{[\s\S]*?\n\s*\}\),/m, "");
      const hits = [...body.matchAll(/>\s*([A-Za-zÀ-ÿ][^<>{}]*?[A-Za-zÀ-ÿ.!?])\s*</g)]
        .map((m) => m[1].trim())
        .filter((s) => !/[;=()&|]/.test(s) && !SAME_OK.has(s));
      expect(hits, "wrap these in L(fr, en)").toEqual([]);
    });
  }
});
