import { useTranslation } from "react-i18next";
import { siteConfig } from "@/app/siteConfig";

export const LandingFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-gray-300 pt-8">
      <div className="mx-8 px-3 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h4 className="text-xl font-bold text-white">Panopti</h4>
          <p className="text-sm text-gray-500 mt-2">KVK: 94867410</p>
          <p className="text-sm text-gray-500">BTW-ID: NL866918851B01</p>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
          <a href="mailto:info@panopti.nl" className="hover:underline">
            {t("landing.footer_contact")}
          </a>
          <a href={siteConfig.baseLinks.privacy} className="hover:underline">
            {t("landing.footer_privacy")}
          </a>
          <a href={siteConfig.baseLinks.terms} className="hover:underline">
            {t("landing.footer_terms")}
          </a>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-700 pt-4 text-center">
        <p>© 2024 Panopti. {t("landing.footer_rights")}</p>
        <p className="text-sm text-gray-500 mt-2 pb-2">
          {t("landing.footer_built_with")}
        </p>
      </div>
    </footer>
  );
};
