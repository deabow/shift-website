import type { PortfolioProject } from "@/lib/portfolio-types";

const BASE_URL = "https://hodour.com";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "AdvertisingAgency"],
    "@id": `${BASE_URL}/#organization`,
    name: "حضور | Hodour",
    alternateName: ["Hodour Agency", "شركة حضور للإعلانات والتسويق المتكامل"],
    url: BASE_URL,
    logo: `${BASE_URL}/portfolio-media/kamal-abou-ali-law-video-cover.jpeg`,
    image: `${BASE_URL}/portfolio-media/kamal-abou-ali-law-video-cover.jpeg`,
    description:
      "شركة إعلانات وتسويق متكاملة في مصر: إنتاج إعلامي وسينمائي، تصوير درون بدقة 4K، تصميم جرافيكي وهوية بصرية، تسويق رقمي وإعلانات ممولة، وتطوير مواقع وتطبيقات.",
    telephone: "+201211050297",
    email: "info@hodour.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
      addressLocality: "Cairo",
      addressRegion: "Giza & Cairo",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0444,
      longitude: 31.2357,
    },
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+201211050297",
      contactType: "sales & customer support",
      areaServed: "EG",
      availableLanguage: ["Arabic", "English"],
    },
    priceRange: "$$",
    sameAs: [
      "https://wa.me/201211050297",
      "https://facebook.com/hodour",
      "https://instagram.com/hodour",
      "https://linkedin.com/company/hodour",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "خدمات حضور | Hodour Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "الإنتاج الإعلامي والسينمائي والتصوير بالدرون",
            description: "تصوير فوتوغرافي تجاري، فيديوهات إعلانية سينمائية، تصوير جوي بالدرون بدقة 4K ومونتاج احترافي.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "التصميم الجرافيكي وبناء الهوية البصرية",
            description: "تصميم الهويات البصرية الكاملة، حملات السوشيال ميديا، المطبوعات، وتصميم العبوات.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "التسويق الرقمي وإدارة الحملات الإعلانية",
            description: "إدارة حملات Meta و Google Ads الممولة، استراتيجيات تحسين محركات البحث SEO، وتحليل العائد الإعلاني.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "تطوير المواقع والمنصات والتطبيقات الرقمية",
            description: "تصميم وبرمجة مواقع ويب فائقة السرعة بـ Next.js، لاندنج بيدجز ذات تحويل عالي ومتاجر إلكترونية.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "إدارة حسابات السوشيال ميديا وصناعة المحتوى",
            description: "كتابة سيناريوهات وسكربتات إعلانية، إدارة تفاعل الجمهور، وإدارة التواجد الرقمي المستمر للعلامات التجارية.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "حضور | Hodour",
    alternateName: "Hodour Marketing",
    description: "شركة إعلانات وتسويق متكاملة في مصر",
    inLanguage: ["ar-EG", "en-US"],
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProjectJsonLd({ project }: { project: PortfolioProject }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: project.title,
    name: project.title,
    description: project.description,
    image: project.imageUrl?.startsWith("http")
      ? project.imageUrl
      : `${BASE_URL}${project.imageUrl}`,
    url: `${BASE_URL}/portfolio/${project.slug}`,
    datePublished: project.createdAt,
    dateModified: project.updatedAt,
    author: {
      "@type": "Organization",
      name: "حضور | Hodour",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "حضور | Hodour",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/portfolio-media/kamal-abou-ali-law-video-cover.jpeg`,
      },
    },
    genre: project.category,
    keywords: project.keyFeatures?.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
