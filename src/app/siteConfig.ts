export const siteConfig = {
  name: "Panopti",
  url: "http://localhost:3000",
  description: "I spy with my little eye..",
  baseLinks: {
    home: "/",
    overview: "/",
    trackNew: "/trackNew",
    login: "/login",
    welcome: "/welcome",
    settings: "/settings",
    details: "/details",
    changelog: "/changelog",
    pricing: "/pricing",
  },
}

export type siteConfig = typeof siteConfig
