"use client";
import { siteConfig } from "@/app/siteConfig";
import { Button } from "@/components/Button";
import { ArrowAnimated } from "@/components/ui/icons/ArrowAnimated";
import Image from "next/image";
import { Divider, List, ListItem } from "@tremor/react";
import LoginService from "@/services/LoginService";
import { Logo } from "@/components/ui/icons/Logo";
import stripeServiceInstance from "@/services/StripeService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Trans, useTranslation } from "react-i18next";
import i18n from "../i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/Dropdown";
import { changeLanguage } from "i18next";
import { RiStarFill, RiStarHalfFill } from "@remixicon/react";
import { AuroraHero } from "./hero";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const { t } = useTranslation();
  const [headerBg, setHeaderBg] = useState("bg-transparent"); // Default header background is transparent

  const handleDemoLogin = async () => {
    const demoEmail = "demo@panopti.nl";
    const demoPassword = "password";

    try {
      // Log out the current user (if logged in) and log in with the demo credentials
      await LoginService.logout();
      const response = await LoginService.checkUser(demoEmail, demoPassword);

      if (response.status === 200) {
        window.location.href = siteConfig.baseLinks.dashboard;
      }
    } catch {}
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHeaderBg("bg-gb-secondary-600 shadow-md"); // Apply background and shadow after scrolling 50px
      } else {
        setHeaderBg("bg-transparent"); // Transparent background at the top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Header */}
      <div
        className={`fixed top-0 z-40 w-full h-16 flex items-center justify-between px-2 sm:gap-x-6 sm:px-4 transition-colors duration-300 ${headerBg}`}
      >
        <div className="text-gray-200 font-extrabold ml-4 max-w-xs">
          <Logo className="!text-2xl" />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                🌍
                <span className="hidden min-[520px]:inline">
                  {i18n.language === "nl" ? "Nederlands" : "English"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => changeLanguage("nl")}>
                🇳🇱 Nederlands
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => changeLanguage("en")}>
                🇺🇸 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className="group text-gray-200 !text-lg"
            variant="ghost"
            asChild
          >
            <a href="#pricing">{t("landing.pricing")}</a>
          </Button>
          <Button
            className="group text-gray-200 !text-lg"
            variant="primary"
            asChild
          >
            <a href={siteConfig.baseLinks.login}>{t("landing.signin")}</a>
          </Button>
          <Button
            className="group !text-lg hidden md:block"
            variant="accent"
            asChild
          >
            <a href="#" onClick={handleDemoLogin}>
              {t("landing.demo_button")}
            </a>
          </Button>
        </div>
      </div>

      <AuroraHero handleDemoLogin={handleDemoLogin} />

      <section className="bg-gradient-to-r from-gb-primary-500 via-gb-primarylite-800 to-gb-primary-600 pb-56">
        <div className="relative pt-10 pb-24 bg-gb-primary-300 skew-y-0 shadow-[0_-20px_40px_rgba(0,0,0,0.2),_0_20px_40px_rgba(0,0,0,0.2)]">
          <div className="pt-6 flex w-full flex-col items-center justify-center -skew-y-0">
            <h1 className="mb-8 mt-12 mx-5 text-5xl text-white font-semibold text-center">
              <span className="hidden md:inline-block">🪴</span>{" "}
              {t("landing.growth_header")}{" "}
              <span className="hidden md:inline-block">🪴</span>
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
          className="flex w-full flex-col items-center justify-center -skew-y-3 bg-gb-accent-500  shadow-[0_-20px_40px_rgba(0,0,0,0.2),_0_20px_40px_rgba(0,0,0,0.2)]"
        >
          <h1 className="mt-12 mb-8 text-5xl text-white font-semibold sm:text-7xl skew-y-3">
            {t("landing.pricing_header")}
          </h1>
          <div className=" overflow-hidden flex w-4/5 mb-20 skew-y-3">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="p-6 !text-gray-100">
                <h3 className="font-semibold text-xl">
                  {t("landing.pricing_subheader")}
                </h3>
                <p className="mt-2 text-lg leading-6">
                  {t("landing.pricing_text")}
                </p>
                <div className="mt-8 space-y-6">
                  <div className="relative border-l-2 border-tremor-border pl-4 ">
                    <h4 className="text-tremor-default font-medium text-lg ">
                      <a href="#" onClick={handleDemoLogin}>
                        <span className="absolute inset-0" aria-hidden={true} />
                        {t("landing.pricing_demo_cta")}
                      </a>
                    </h4>
                    <p className="mt-1 text-tremor-default  ">
                      {t("landing.pricing_demo_subtext")}
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
                      {t("landing.review_text")}
                    </p>
                    <div className="mt-8 flex gap-4 items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-700 ">
                          Tijn Smits
                        </h3>
                        <span className="text-sm tracking-wide text-gray-600 ">
                          {t("landing.review_role")}
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
                      {t("landing.subscription_title")}
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
                        ({t("landing.ex_vat")})
                      </span>
                    </p>
                  </div>
                  <div className="flex-grow flex flex-col justify-center">
                    <List className="mt-4 divide-y-0 text-gray-700 text-lg">
                      <ListItem
                        key="aha"
                        className="justify-start space-x-2 py-2.5"
                      >
                        <span>✅ {t("landing.feature_1")}</span>
                      </ListItem>
                      <ListItem
                        key="aha"
                        className="justify-start space-x-2 py-2.5"
                      >
                        <span>✅ {t("landing.feature_2")}</span>
                      </ListItem>
                      <ListItem
                        key="aha"
                        className="justify-start space-x-2 py-2.5"
                      >
                        <span>✅ {t("landing.feature_3")}</span>
                      </ListItem>
                      <ListItem
                        key="aha"
                        className="justify-start space-x-2 py-2.5"
                      >
                        <span>✅ {t("landing.feature_4")}</span>
                      </ListItem>
                    </List>
                  </div>
                  <Divider />
                  <p className="text-xs text-gray-900 mt-2 ml-2">
                    <Trans
                      i18nKey="landing.pricing_disclaimer"
                      components={{ i: <em />, b: <strong /> }}
                    />
                  </p>
                  <div className="mt-2">
                    <Button
                      onClick={stripeServiceInstance.createCheckoutSession}
                      className="group rounded-lg w-full text-xl lg:text-2xl xl:text-2xl"
                      variant="accent"
                    >
                      {t("landing.subscribe_cta")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    </>
  );
}
