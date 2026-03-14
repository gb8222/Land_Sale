import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords }) => {
  const siteTitle = "DHAMMIKA RESIDENCE | Premium Real Estate Negombo";
  const fullTitle = title ? `${title} | DHAMMIKA RESIDENCE` : siteTitle;
  const defaultDesc = "Modern houses and lands for sale in Negombo. View completed houses, sold properties and ongoing projects by DHAMMIKA RESIDENCE.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
    </Helmet>
  );
};

export default SEO;
