import stripeServiceInstance from "@/services/StripeService";
import { RiStarFill, RiStarHalfFill } from "@remixicon/react";
import { List, ListItem, Divider } from "@tremor/react";
import { Button } from "@/components/Button";
import { useTranslation, Trans } from "react-i18next";
import { handleDemoLogin } from "@/lib/utils";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";

export const PricingSection = () => {
  const { t } = useTranslation();

  return (
    <>


      <div className="w-full">
        <div className="relative pr-4 w-fit ml-6">
          <h4 className="text-tremor-default font-medium text-lg ">
            <a href="/">
              <span className="absolute inset-0" aria-hidden={true} />
              {t("pricing.return_home")}
            </a>
          </h4>
        </div>   </div>

      <h1 className="mt-12 mb-8 text-5xl text-white font-semibold sm:text-7xl">
        {t("pricing.pricing_header")}
      </h1>
      <div className=" overflow-hidden flex w-4/5 mb-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="p-6 !text-gray-100">
            <h3 className="font-semibold text-xl">
              {t("pricing.pricing_subheader")}
            </h3>
            <p className="mt-2 text-lg leading-6">
              {t("pricing.pricing_text")}
            </p>
            <div className="mt-8 space-y-6">
              <div className="relative border-l-2 border-tremor-border pl-4 ">
                <h4 className="text-tremor-default font-medium text-lg ">
                  <a href="#" onClick={handleDemoLogin}>
                    <span className="absolute inset-0" aria-hidden={true} />
                    {t("pricing.pricing_demo_cta")}
                  </a>
                </h4>
                <p className="mt-1 text-tremor-default  ">
                  {t("pricing.pricing_demo_subtext")}
                </p>
              </div>
              <div className="bg-gray-50 p-10 m-0.5 rounded-[calc(1.5rem-1px)]">
                <p className="text-gray-700 text-lg mb-1">
                  <span className="flex">
                    <RiStarFill />
                    <RiStarFill />
                    <RiStarFill />
                    <RiStarFill />
                    <RiStarHalfFill />
                  </span>
                </p>
                <p className="text-gray-700 text-lg">
                  {t("pricing.review_text")}
                </p>
                <div className="mt-8 flex gap-4 items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 ">
                      Tijn Smits
                    </h3>
                    <span className="text-sm tracking-wide text-gray-600 ">
                      {t("pricing.review_role")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl p-1 pb-3 bg-gradient-to-r from-gb-secondary-500 to-gb-accent-400">
            <div className="bg-gray-50 p-6 m-1 h-full rounded-3xl text-gray-800 flex flex-col">
              <div className="flex items-start justify-between space-x-6">
                <h3 className="font-semibold text-2xl">
                  {t("pricing.subscription_title")}
                </h3>
                <p className="flex flex-col items-center">
                  <span className="flex items-baseline">
                    <span className="text-bold font-semibold text-3xl lg:text-5xl xl:text-5xl">
                      €20
                    </span>
                    <span className="text-tremor-default "> p/m</span>
                  </span>
                  <span className="text-tremor-default text-sm mt-1">
                    {" "}
                    ({t("pricing.ex_vat")})
                  </span>
                </p>
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <List className="mt-4 divide-y-0 text-gray-700 text-lg">
                  <ListItem
                    key="aha"
                    className="justify-start space-x-2 py-2.5"
                  >
                    <span>✅ {t("pricing.feature_1")}</span>
                  </ListItem>
                  <ListItem
                    key="aha"
                    className="justify-start space-x-2 py-2.5"
                  >
                    <span>✅ {t("pricing.feature_2")}</span>
                  </ListItem>
                  <ListItem
                    key="aha"
                    className="justify-start space-x-2 py-2.5"
                  >
                    <span>✅ {t("pricing.feature_3")}</span>
                  </ListItem>
                  <ListItem
                    key="aha"
                    className="justify-start space-x-2 py-2.5"
                  >
                    <span>✅ {t("pricing.feature_4")}</span>
                  </ListItem>
                </List>
              </div>
              <Divider />
              <Label className="mt-4" htmlFor="pricing.code" ><b>{t('pricing.referral_label')}</b></Label>
              <Input className="mt-4" placeholder={t("pricing.referral_placeholder")} id="referral" name="referral" />
              <p className="text-xs text-gray-900 mt-6 ml-2">
                <Trans
                  i18nKey="pricing.pricing_disclaimer"
                  components={{ i: <em />, b: <strong /> }}
                />
              </p>
              <div className="mt-2">
                <Button
                  onClick={stripeServiceInstance.createCheckoutSession}
                  className="group rounded-lg w-full text-xl lg:text-2xl xl:text-2xl"
                  variant="accent"
                >
                  {t("pricing.subscribe_cta")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
