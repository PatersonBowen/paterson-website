// Single source of truth for every public page's search/social metadata.
// Used by scripts/build.js (static head + crawler-visible body per route),
// and shipped to the browser as #seo-pages so the SPA can keep the title,
// description and canonical correct as visitors navigate.
//
// `index: false` => the page gets <meta robots noindex> and is left out of the sitemap.

export const SITE = "https://www.patersoncompany.com";
export const BRAND = "Paterson";
export const LOGO = SITE + "/favicon-512.png";
export const OG_IMAGE = SITE + "/og-image.png";

export const ORG = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  name: "Paterson",
  legalName: "Paterson Group L.L.C-FZ",
  alternateName: ["Paterson & Co", "Paterson Company", "Paterson Group"],
  url: SITE + "/",
  logo: LOGO,
  image: OG_IMAGE,
  description:
    "Paterson is an executive search firm placing senior construction and real estate leaders across the US.",
  email: "info@patersoncompany.com",
  sameAs: ["https://www.linkedin.com/company/patersoncompany/"],
  areaServed: ["United States"],
  knowsAbout: ["Executive search", "Construction recruitment", "Real estate recruitment"],
};

// path: URL path. nav: link text used in the crawler-visible link list.
export const ROUTES = [
  {
    key: "home",
    path: "/",
    nav: "Home",
    title: "Paterson — Executive Search for Construction & Real Estate",
    description:
      "We build the teams that build your skyline. Paterson is an executive search firm for senior construction and real estate roles across the US.",
    h1: "We build the teams that build your skyline.",
    body: "Paterson is an executive search firm for senior construction and real estate roles — owner's representative, general contractor and developer side — across the US.",
  },
  {
    key: "jobs",
    path: "/jobs",
    nav: "Live Roles",
    title: "Live Roles — Construction & Real Estate Jobs | Paterson",
    description:
      "Browse live senior construction and real estate roles handled by Paterson across New York, Miami and beyond.",
    h1: "Who we're searching for.",
    body: "Current senior construction and real estate roles Paterson is recruiting for. Many of the best roles are filled before they reach the market — register your details to hear about them.",
  },
  {
    key: "candidates",
    path: "/candidates",
    nav: "Candidates",
    title: "For Candidates — Senior Construction & Real Estate Roles | Paterson",
    description:
      "Many senior construction and real estate roles never reach the market. Send Paterson your details and we'll reach out when the right one appears.",
    h1: "The best roles rarely make it to the market.",
    body: "The most sought-after roles often never reach the market. They are filled by individuals already on our radar. Send us your details and we'll reach out when the time is right.",
  },
  {
    key: "clients",
    path: "/clients",
    nav: "Clients",
    title: "For Clients — Construction & Real Estate Executive Search | Paterson",
    description:
      "Deep industry knowledge, real role expertise and a network of pre-screened candidates who already know the industry. Paterson fills senior construction and real estate positions in days, not weeks.",
    h1: "Positions filled in days, not weeks.",
    body: "Deep industry knowledge, real role expertise, and a network of pre-screened candidates who already know the industry — so when you need someone, we know exactly who can start.",
  },
  {
    key: "team",
    path: "/team",
    nav: "Team",
    title: "The Team — Senior Search Consultants | Paterson",
    description:
      "A small, senior team that runs every search itself — no account managers, no hand-offs between desks. Meet the people behind Paterson.",
    h1: "The people behind the search.",
    body: "A small, senior team that runs every search itself — no account managers, no hand-offs between desks. When you call Paterson, you reach the person actually doing the work, from first conversation through offer.",
  },
  {
    key: "contact",
    path: "/contact",
    nav: "Contact",
    title: "Contact Paterson — Executive Search for Construction & Real Estate",
    description:
      "Tell us what you need and we'll come back to you. Contact Paterson, an executive search firm for construction and real estate.",
    h1: "Let's talk.",
    body: "Tell us what you need and we'll come back to you.",
  },
  {
    key: "careers",
    path: "/careers",
    nav: "Join the Team",
    title: "Careers — Join the Paterson Team",
    description:
      "We're growing the team across the US. If you're a proven biller who knows the construction and real estate market and wants a focused desk of your own, talk to Paterson.",
    h1: "Build the desk with us.",
    body: "We're growing the team across the US. If you're a proven biller who knows the construction and real estate market and wants a focused desk of your own, we should talk.",
  },
  {
    key: "terms",
    path: "/terms",
    nav: "Terms & Conditions",
    title: "Terms and Conditions | Paterson",
    description: "The terms and conditions governing use of the Paterson website and services.",
    h1: "Terms and Conditions.",
    body: "The terms and conditions governing use of the Paterson website and services.",
  },
  {
    key: "privacy",
    path: "/privacy",
    nav: "Privacy Policy",
    title: "Privacy Policy | Paterson",
    description: "How Paterson collects, uses and protects personal information.",
    h1: "Privacy Policy.",
    body: "How Paterson collects, uses and protects personal information.",
  },
  {
    key: "disclaimer",
    path: "/disclaimer",
    nav: "Disclaimer",
    title: "Disclaimer | Paterson",
    description: "Important information about the content and use of the Paterson website.",
    h1: "Disclaimer.",
    body: "Important information about the content and use of the Paterson website.",
  },
  {
    // Deliberately unlinked and unindexed — see the Terms of Business request.
    key: "termsofbusiness",
    path: "/termsofbusiness",
    nav: "Terms of Business",
    title: "Terms of Business | Paterson",
    description: "Paterson's Terms of Business.",
    h1: "Terms of Business.",
    body: "Paterson's Terms of Business.",
    index: false,
    hidden: true,
  },
];

// Long-form guide pages. Their HTML is generated by scripts/guides.mjs; this list feeds the sitemap.
export const GUIDE_PAGES = [
  { path: "/how-we-work", lastmod: "2026-10-19" },
  { path: "/guides/construction-careers-nyc", lastmod: "2026-10-19" },
];

export const NOT_FOUND = {
  key: "notfound",
  title: "Page not found | Paterson",
  description: "The page you were looking for could not be found.",
  h1: "Page not found.",
  body: "The page you were looking for could not be found.",
  index: false,
};

// Shell served for /jobs/<slug>. The SPA fills in the real title and
// description once the role loads (see updateSeo in the template).
export const JOB_SHELL = {
  key: "job",
  title: "Live Role | Paterson",
  description: "A live senior construction or real estate role handled by Paterson.",
  h1: "Live role.",
  body: "A live senior construction or real estate role handled by Paterson.",
};
