export const siteConfig = {
  name: "Panopti",
  url: "http://localhost:3000",
  description: "Kies Panopti voor nauwkeurige Bol.com product research zonder hoge kosten. Simpel, effectief en betaalbaar sales tracking.",
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
    privacy: "/privacy-policy",
    terms: "/terms-of-service",
  },
};

export type siteConfig = typeof siteConfig;
