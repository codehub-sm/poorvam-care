import { useEffect } from "react";
import { SITE_URL, PRIMARY_LOCATION } from "@/config/site";

interface SeoHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string;
  robots?: string;
  /**
   * Open Graph type. Blog posts should pass "article"; everything else can
   * take the default.
   */
  ogType?: string;
  /**
   * Whether to emit the Electronic City geo meta tags.
   *
   * Defaults to true because almost every page is about the physical centres.
   * The online/teletherapy pages MUST pass false — stamping Bangalore
   * coordinates onto a page that sells to Australian and UAE families tells
   * search engines the page is a local Bangalore result, which is precisely
   * the signal we do not want it to carry.
   */
  localGeo?: boolean;
  /**
   * hreflang alternates, as [hreflang, href] pairs. An "x-default" entry
   * should be included when supplied.
   */
  alternates?: Array<{ hreflang: string; href: string }>;
}

/** Meta tags this component owns and must clear when a page opts out. */
const GEO_META = ["geo.region", "geo.placename", "geo.position"];

export default function SeoHead({
  title,
  description,
  canonical,
  ogImage,
  keywords,
  robots,
  ogType = "website",
  localGeo = true,
  alternates,
}: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property?: boolean) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const removeMeta = (name: string) => {
      document.querySelector(`meta[name="${name}"]`)?.remove();
    };

    setMeta("description", description);
    setMeta("robots", robots || "index, follow");

    // Keywords carry no ranking weight, but a stale one left over from the
    // previous route is worse than none — so clear it when absent.
    if (keywords) setMeta("keywords", keywords);
    else removeMeta("keywords");

    // This is an SPA and these tags are set imperatively, so they persist
    // across navigation unless explicitly removed. Without this branch, moving
    // from a Bangalore page to an /online page would leave the Electronic City
    // coordinates attached to the teletherapy page.
    if (localGeo) {
      setMeta("geo.region", "IN-KA");
      setMeta("geo.placename", "Electronic City, Bangalore");
      setMeta(
        "geo.position",
        `${PRIMARY_LOCATION.latitude};${PRIMARY_LOCATION.longitude}`,
      );
    } else {
      GEO_META.forEach(removeMeta);
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Rebuild alternates from scratch each time — a leftover hreflang pointing
    // at the previous route would cross-wire two unrelated pages.
    document
      .querySelectorAll('link[rel="alternate"][data-seo-head]')
      .forEach((el) => el.remove());
    alternates?.forEach(({ hreflang, href }) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = href;
      link.setAttribute("data-seo-head", "");
      document.head.appendChild(link);
    });

    const image = ogImage || `${SITE_URL}/og-image.jpg`;

    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", ogType, true);
    setMeta("og:site_name", "Poorvam Care", true);
    setMeta("og:locale", "en_IN", true);
    setMeta("og:image", image, true);
    if (canonical) setMeta("og:url", canonical, true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
    // `alternates` is compared by value, not identity: callers naturally pass a
    // fresh array literal each render, which as a raw dependency would re-run
    // this effect (and rebuild every link tag) on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    title,
    description,
    canonical,
    ogImage,
    keywords,
    robots,
    ogType,
    localGeo,
    JSON.stringify(alternates ?? null),
  ]);

  return null;
}
