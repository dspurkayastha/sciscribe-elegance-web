
import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const Seo = ({
  title,
  description,
  keywords = "science, editing, publication, sciscribe, research, consulting, academic services, manuscript editing, scientific communication",
  image = "/favicon.ico",
  url
}: SeoProps) => {
  useEffect(() => {
    document.title = title;

    const setMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name='${name}']`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setMetaTag("description", description ?? "");
    setMetaTag("keywords", keywords);

    // Open Graph & Twitter
    const og = [
      { property: "og:title", content: title },
      { property: "og:description", content: description ?? "" },
      { property: "og:image", content: image },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url ?? window.location.href },
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:title", content: title },
      { property: "twitter:description", content: description ?? "" },
      { property: "twitter:image", content: image },
    ];
    og.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property='${property}'],meta[name='${property}']`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        if (property.startsWith("og:")) tag.setAttribute("property", property);
        else tag.setAttribute("name", property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });
  }, [title, description, keywords, image, url]);

  return null;
};
export default Seo;
