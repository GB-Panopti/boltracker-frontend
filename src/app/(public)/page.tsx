"use client";
import { Button } from "@/components/Button";
import { ArrowAnimated } from "@/components/ui/icons/ArrowAnimated";
import Image from "next/image";
import { PricingSection } from "@/components/ui/landing/pricing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Trans, useTranslation } from "react-i18next";
import { handleDemoLogin } from "@/lib/utils";
import { AuroraHero } from "../../components/ui/landing/hero";
import { LandingHeader } from "@/components/ui/landing/header";
import { LandingFooter } from "@/components/ui/landing/footer";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Fixed Header */}
      <LandingHeader scrollFade />

      <AuroraHero handleDemoLogin={handleDemoLogin} />

      <section className="bg-gradient-to-r from-gb-primary-500 via-gb-primarylite-800 to-gb-primary-600 pb-56">
        <div className="relative pt-10 pb-24 bg-gb-primary-300 skew-y-0 shadow-[0_-20px_40px_rgba(0,0,0,0.2),_0_20px_40px_rgba(0,0,0,0.2)]">
          <div className="pt-6 flex w-full flex-col items-center justify-center -skew-y-0">
            <h1 className="mb-8 mt-12 mx-5 text-5xl text-white font-semibold text-center">
              {/* <span className="hidden md:inline-block">🪴</span>{" "} */}
              {t("landing.growth_header")}{" "}
              {/* <span className="hidden md:inline-block">🪴</span> */}
            </h1>
            <div className="overflow-hidden flex flex-col lg:flex-row w-11/12 justify-around">
              <div className="pt-6 w-full lg:w-1/2 flex justify-center lg:justify-start">
                <div className="relative w-full h-full">
                  <Image
                    className="rounded-lg shadow-2xl"
                    src="/img/landing/Panopti_1.png"
                    alt={t("landing.image_alt")}
                    layout="responsive"
                    width={1900}
                    height={1080}
                  />
                </div>
              </div>
              <div className="p-4 pt-6 flex flex-col justify-around w-full lg:max-w-xl lg:mt-0">
                <div className="flex items-start space-x-2">
                  <p className="text-3xl">😩</p>
                  <p className="text-white font-display text-xl">
                    {t("landing.frustration_text")}
                  </p>
                </div>
                <div className="flex items-start space-x-2 mt-4">
                  <p className="text-3xl">🌟</p>
                  <p className="text-white font-display text-xl">
                    {t("landing.tracker_text")}
                  </p>
                </div>
                <div className="flex items-start space-x-2 mt-4">
                  <p className="text-3xl">🎯</p>
                  <p className="text-white font-display text-xl">
                    {t("landing.insights_text")}
                  </p>
                </div>
                <div className="flex items-start space-x-2 mt-4">
                  <p className="text-3xl">🏆</p>
                  <p className="text-white font-display text-xl">
                    {t("landing.monitor_text")}
                  </p>
                </div>
                <div className="flex items-start space-x-2 mt-4">
                  <Button className="group mt-6" variant="accent" asChild>
                    <a href="#" onClick={handleDemoLogin}>
                      <p className="text-2xl px-2">
                        {t("landing.demo_button")}
                      </p>
                      <ArrowAnimated
                        className="stroke-gray-100"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>
                </div>
                <p className="text-xs text-white mt-2">
                  <Trans
                    i18nKey="landing.demo_no_register"
                    components={{ i: <em />, b: <strong /> }}
                  />
                </p>
                <p className="text-xs text-white mt-2">
                  <Trans
                    i18nKey="landing.free_trial"
                    components={{ i: <em />, b: <strong /> }}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-40 pb-60">
          <h1 className="mt-12 mb-8 text-5xl text-white font-semibold sm:text-7xl justify-around text-center">
            {t("landing.faq_header")}
          </h1>
          <div className="flex justify-center bg-gray-100 rounded-lg max-w-7xl mx-auto">
            <div className="m-4 mr-20 w-full max-w-5xl">
              <Accordion
                type="multiple"
                className="mx-10 mt-3 w-full"
                collapsible
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-bold text-xl">
                    {t("landing.faq_question_1")}
                  </AccordionTrigger>
                  <AccordionContent className="text-md">
                    {t("landing.faq_answer_1")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-bold text-xl">
                    {t("landing.faq_question_2")}
                  </AccordionTrigger>
                  <AccordionContent className="text-md">
                    {t("landing.faq_answer_2")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="font-bold text-xl">
                    {t("landing.faq_question_3")}
                  </AccordionTrigger>
                  <AccordionContent className="text-md">
                    {t("landing.faq_answer_3")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="font-bold text-xl">
                    {t("landing.faq_question_4")}
                  </AccordionTrigger>
                  <AccordionContent className="text-md">
                    {t("landing.faq_answer_4")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="font-bold text-xl">
                    {t("landing.faq_question_5")}
                  </AccordionTrigger>
                  <AccordionContent className="text-md">
                    {t("landing.faq_answer_5")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>


        <div
          id="pricing"
          className="-skew-y-3 bg-gb-accent-500  shadow-[0_-20px_40px_rgba(0,0,0,0.2),_0_20px_40px_rgba(0,0,0,0.2)] mb-10 pb-20"
        >
          <div className="flex w-full flex-col items-center justify-center skew-y-3">
            <PricingSection />
          </div></div>

      </section>
      <LandingFooter />
    </>
  );
}
