import { Helmet } from "react-helmet-async";

const Meta = ({ meta }) => {
  return (
    <Helmet>
      <title>{meta?.title || "Portfolio"}</title>
      <meta property="og:title" content={meta?.title || "Portfolio"} />
      <meta
        property="og:description"
        content={meta?.description || "Personal portfolio"}
      />
      <meta property="og:url" content={meta?.url} />
      <meta property="og:type" content={meta?.type || "website"} />
      <meta property="og:site_name" content={meta?.siteName} />
      <meta
        property="og:image"
        itemProp="image"
        content={meta?.image || "/my-image.png"}
      />
      <meta
        name="keywords"
        content={meta?.keywords || "portfolio, software engineer, backend, cloud"}
      />
    </Helmet>
  );
};

export default Meta;
