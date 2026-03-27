import { useEffect } from "react";

interface SeoHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string;
}

export default function SeoHead({ title, description, canonical, ogImage, keywords }: SeoHeadProps) {
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

    setMeta("description", description);

    if (keywords) {
      setMeta("keywords", keywords);
    }

    // Local SEO geo meta tags
    setMeta("geo.region", "IN-KA");
    setMeta("geo.placename", "Electronic City, Bangalore");
    setMeta("geo.position", "12.8311;77.6483");

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "Poorvam Care", true);
    if (ogImage) setMeta("og:image", ogImage, true);
    if (canonical) setMeta("og:url", canonical, true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    if (ogImage) setMeta("twitter:image", ogImage);
  }, [title, description, canonical, ogImage, keywords]);

  return null;
}
