export const siteConfig = {
  name: "Panopti",
  url: "http://localhost:3000",
  description: "I spy with my little eye..",
  baseLinks: {
    dashboard: "/dashboard",
    trackNew: "/trackNew",
    login: "/login",
    welcome: "/",
    settings: "/settings",
    details: "/details",
    changelog: "/changelog",
    pricing: "/pricing",
    forgottenPassword: "/forgotten-password",
  },
};

export type siteConfig = typeof siteConfig;
