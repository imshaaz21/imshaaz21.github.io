import { Helmet } from "react-helmet-async";

const Meta = ({ meta }) => {
  const title = meta?.title || "Shanaaz Ahamed | Software Engineer";
  const description =
    meta?.description ||
    "Software Engineer specializing in backend systems and cloud infrastructure. Currently working on a large-scale Health Information System (HIS) deployed across Saudi Arabia and the Middle East.";
  const siteUrl = meta?.url || "https://imshaaz21.github.io";
  const siteName = meta?.siteName || "Shanaaz Ahamed Portfolio";
  const image = meta?.image
    ? meta.image.startsWith("http")
      ? meta.image
      : `https://imshaaz21.github.io${meta.image}`
    : "https://imshaaz21.github.io/og-image.png";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph / WhatsApp */}
      <meta property="og:type" content={meta?.type || "website"} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta
        name="keywords"
        content={
          meta?.keywords ||
          "Shanaaz Ahamed, imshaaz21, Software Engineer, Backend, Cloud Infrastructure, Kubernetes, Spring Boot, Keycloak, HIS"
        }
      />
    </Helmet>
  );
};

export default Meta;
