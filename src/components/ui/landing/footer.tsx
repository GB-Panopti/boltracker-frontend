import { useTranslation } from "react-i18next";

export const LandingFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-gray-300 pt-10">
      <div className=" mx-10 px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h4 className="text-xl font-bold text-white">Panopti</h4>
          <p className="mt-2 text-gray-400">{t("landing.footer_tagline")}</p>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <a href="mailto:info@panopti.nl" className="hover:underline">
            {t("landing.footer_contact")}
          </a>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p>© 2024 Panopti. {t("landing.footer_rights")}</p>
        <p className="text-sm text-gray-500 mt-2 pb-2">
          {t("landing.footer_built_with")}
        </p>
      </div>
    </footer>
  );
};
