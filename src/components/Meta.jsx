import { Helmet } from "react-helmet-async";

const Meta = ({ meta }) => {
  const title = meta?.title || "Shanaaz Ahamed | Software Engineer";
  const description =
    meta?.description ||
    "Software Engineer specializing in backend systems and cloud infrastructure. Currently working on a large-scale Health Information System (HIS) deployed across Saudi Arabia and the Middle East.";
  const keywords =
    meta?.keywords ||
    "Shanaaz Ahamed, imshaaz21, Software Engineer, Backend, Cloud Infrastructure, Kubernetes, Spring Boot, Keycloak, HIS, Portfolio";
  const baseUrl = meta?.url || "https://imshaaz21.github.io";
  const siteName = meta?.siteName || "Shanaaz Ahamed";
  const type = meta?.type || "website";

  const rawImage = meta?.image || "/my-image.png";
  const imageUrl = rawImage.startsWith("http")
    ? rawImage
    : `${baseUrl}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shanaaz Ahamed",
    "url": baseUrl,
    "image": imageUrl,
    "jobTitle": "Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Cloud Solutions International"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Moratuwa"
    },
    "sameAs": [
      "https://github.com/imshaaz21",
      "https://www.linkedin.com/in/imshaaz/"
    ],
    "email": "mailto:shanaaz.ahd@gmail.com",
    "knowsAbout": [
      "Backend Systems",
      "Cloud Infrastructure",
      "Kubernetes",
      "Spring Boot",
      "Keycloak",
      "Health Information Systems",
      "Python",
      "Java"
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Shanaaz Ahamed" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={baseUrl} />

      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Shanaaz Ahamed - Software Engineer" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" content="imshaaz21.github.io" />
      <meta name="twitter:url" content={baseUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default Meta;
