"use client";
import { siteConfig } from "@/app/siteConfig";
import { Button } from "@/components/Button";
import { ArrowAnimated } from "@/components/ui/icons/ArrowAnimated";
import Image from "next/image";
import { Divider, List, ListItem } from "@tremor/react";
import LoginService from "@/services/LoginService";
import { Logo } from "@/components/ui/icons/Logo";
import stripeServiceInstance from "@/services/StripeService";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/Accordion";

export default function LandingPage() {
  const handleDemoLogin = async () => {
    const demoEmail = "demo@panopti.nl";
    const demoPassword = "password";

    try {
      // Log out the current user (if logged in) and log in with the demo credentials
      await LoginService.logout();
      const response = await LoginService.checkUser(demoEmail, demoPassword);

      if (response.status === 200) {
        window.location.href = siteConfig.baseLinks.home;
      }
    } catch { }
  };

  return (
    <>
      <section className="bg-gradient-to-b to-gb-primary-500 from-gb-primarylite-700 ">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between  bg-gb-secondary-600 px-2 shadow-sm sm:gap-x-6 sm:px-4 border-b-2 border-b-gray100">
          <div className="text-gray-200 font-extrabold ml-4 max-w-xs">
            <Logo className="!text-2xl" />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 ">
            <Button
              className="group text-gray-200 !text-lg"
              variant="ghost"
              asChild
            >
              <a href="#pricing">Pricing</a>
            </Button>
            {/* <Button className="group text-gray-200" variant="ghost" asChild>
            <a href={siteConfig.baseLinks.changelog}>
              Changelog
            </a>
          </Button> */}
            <Button
              className="group text-gray-200 !text-lg"
              variant="primary"
              asChild
            >
              <a href={siteConfig.baseLinks.login}>Sign in</a>
            </Button>
            <Button className="group !text-lg" variant="accent" asChild>
              <a href="#" onClick={handleDemoLogin}>
                Try the demo now!
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 lg:mt-10">


          {/* Hero */}
          {/* Hero */}
<div className="mt-20 flex flex-col items-center w-full justify-center">
  {/* Title */}
  <h1 className="mt-6 mb-10 text-gray-200 text-4xl lg:text-7xl font-bold font-body text-center leading-tight">
    Turbocharge Your Bol.com Sales<br/> with Next-Level Product Insights 🚀
  </h1>

  {/* Content Section with text on the left and image on the right */}
  <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-8 w-full max-w-7xl">

    {/* Subheader Text */}
    <div className="lg:w-1/2 text-left mx-4">
      <p className="text-lg lg:text-xl text-gray-200 font-light leading-relaxed">
        Imagine knowing exactly what products are flying off the shelves on Bol.com.<br />
        With <b>Panopti</b>, you’ll track your competitors, spot untapped niches, and
        fine-tune your strategy to effortlessly boost your sales and stay ahead of the pack.
      </p>

      {/* CTA Button */}
      <Button
        className="group mt-6 p-3 w-full sm:w-auto max-w-sm lg:max-w-xs rounded-lg mb-20"
        variant="accent"
        asChild
      >
        <a href="#" onClick={handleDemoLogin}>
          <p className="text-lg font-semibold">See it in action</p>
          <ArrowAnimated className="stroke-gray-200 size-3" aria-hidden="true" />
        </a>
      </Button>
    </div>

    {/* Image */}
    <div className="lg:w-5/6 flex justify-center lg:justify-end mt-10 lg:mt-0  mx-4 mb-20">
      <Image
        className="rounded-xl shadow-lg"
        src="/img/landing/dashboard.png"
        width={1900}
        height={150}
        alt="dashboard-preview"
      />
    </div>
  </div>
</div>




        </div>
      </section>

      <section className="bg-gradient-to-r from-gb-primary-500 via-gb-primarylite-800 to-gb-primary-600">

        {/* Discover your growth section */}
        <div className=" bg-gb-primary-300 skew-y-2 shadow-[0_-20px_40px_rgba(0,0,0,0.2),_0_20px_40px_rgba(0,0,0,0.2)]">
          <div className="pt-6 flex w-full flex-col items-center justify-center -skew-y-2">
            <h1 className="mb-8 mt-12 mx-5 text-5xl text-white font-semibold text-center">
              🪴 Discover your growth opportunities🪴
            </h1>


            <div className="overflow-hidden flex flex-col lg:flex-row w-11/12 justify-around">
              <div className="pt-6 w-full lg:w-1/2 flex justify-center lg:justify-start">
                <div className="relative w-full h-full">
                  <Image
                    className="rounded-lg shadow-2xl"
                    src="/img/landing/details.png"
                    alt="Image description"
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
                    Ever experienced the frustration of investing time, effort, and energy into a product only for it not to sell? What a waste!
                  </p>
                </div>
                <div className="flex items-start space-x-2 mt-4">
                  <p className="text-3xl">🌟</p>
                  <p className="text-white font-display text-xl">
                    With <b>Panopti</b>'s product tracker and database, you can avoid that nightmare scenario.
                  </p>
                </div>
                <div className="flex items-start space-x-2 mt-4">
                  <p className="text-3xl">🎯</p>
                  <p className="text-white font-display text-xl">
                    <b>Panopti</b> lets you access detailed product performance stats, including sales data, pricing trends, and revenue insights.
                  </p>
                </div>
                <div className="flex items-start space-x-2 mt-4">
                  <p className="text-3xl">🤴</p>
                  <p className="text-white font-display text-xl">
                    Monitor individual products, track their sales history over time, and come out on top!
                  </p>
                </div>
              </div>
            </div>



            <Button className="group mt-6" variant="accent" asChild>
              <a href="#" onClick={handleDemoLogin}>
                <p className="text-xl px-2">Try the demo now!</p>
                <ArrowAnimated
                  className="stroke-gray-100"
                  aria-hidden="true"
                />
              </a>
            </Button>
            <div className="mb-12"></div>
          </div>
        </div>


        <h1 className="mt-12 mb-8 text-5xl text-white font-semibold sm:text-7xl justify-around text-center">
          FAQ
        </h1>

        <div className="flex justify-center bg-gray-100 rounded-lg max-w-7xl mx-auto">
          <div className="m-4 mr-20 w-full max-w-5xl">
            <Accordion type="multiple" className="mx-10 mt-3 w-full" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-bold text-xl">How do you differ from other product research tools?</AccordionTrigger>
                <AccordionContent className="text-md">
                  We're focused solely on product research and are still in development, which means we're more affordable but may not have all the features yet. We're actively listening to customer feedback to build the perfect tool, with open communication channels for your input.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-bold text-xl">What is the cancellation notice period for Panopti?</AccordionTrigger>
                <AccordionContent className="text-md">
                  You can cancel at any time. Once canceled, your subscription will remain active until the prepaid period ends, with no further charges.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-bold text-xl">Is my data safe with you?</AccordionTrigger>
                <AccordionContent className="text-md">
                  Yes! We only collect your email and store it securely in an encrypted database, along with our product data. We prioritize your data's security and privacy.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="font-bold text-xl">How often is the research data updated?</AccordionTrigger>
                <AccordionContent className="text-md">
                  Product research data is updated once daily, using data samples gathered throughout the day to provide the most accurate insights.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="font-bold text-xl">I have further questions, how do I reach you?</AccordionTrigger>
                <AccordionContent className="text-md">
                  Feel free to reach out anytime at info@panopti.nl. We're happy to assist with any questions you have!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>



        <div
          id="pricing"
          className="mt-20 flex w-full flex-col items-center justify-center -skew-y-3 bg-gb-primary-400  shadow-[0_-20px_40px_rgba(0,0,0,0.2),_0_20px_40px_rgba(0,0,0,0.2)]"
        >
          <h1 className="mt-12 mb-8 text-5xl text-white font-semibold sm:text-7xl skew-y-3">
            Pricing
          </h1>

          <div className=" overflow-hidden flex w-4/5 mb-20 skew-y-3">
            {/* tremor blocks pricing template*/}
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-6 !text-gray-100">
                  <h3 className="font-semibold text-xl">
                    Maximize Your E-commerce Success
                  </h3>
                  <p className="mt-2 text-lg leading-6">
                    Unlock unparalleled insights and take full control of your
                    sales strategy with Panopti’s premium features. Get
                    real-time data, compare your performance with competitors,
                    and make informed decisions that drive growth.
                  </p>
                  <div className="mt-8 space-y-6">
                    <div className="relative border-l-2 border-tremor-border pl-4 ">
                      <h4 className="text-tremor-default font-medium text-lg ">
                        <a href="#" onClick={handleDemoLogin}>
                          <span
                            className="absolute inset-0"
                            aria-hidden={true}
                          />
                          Try the demo &#8594;
                        </a>
                      </h4>
                      <p className="mt-1 text-tremor-default  ">
                        Explore our powerful features in action
                      </p>
                    </div>
                    <div className="bg-gray-50 p-10 m-0.5 rounded-[calc(1.5rem-1px)]">
                      <p className="text-gray-700 text-lg mb-1">⭐⭐⭐⭐⭐</p>
                      <p className="text-gray-700 text-lg">
                        Panopti is fantastic! While they may not have every
                        feature other tools offer, they deliver exactly the
                        insights I need to discover new products to sell.
                        Plus, they're significantly more affordable than the
                        competition.
                      </p>

                      <div className="mt-8 flex gap-4 items-center">
                        <div>
                          <h3 className="text-lg font-medium text-gray-700 ">
                            Eddie Albington
                          </h3>
                          <span className="text-sm tracking-wide text-gray-600 ">
                            Bol.com dropshipper
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
                        Full access subscription
                      </h3>
                      <p className="flex items-baseline">
                        <span className="text-bold font-semibold text-3xl lg:text-5xl xl:text-5xl">
                          €20
                        </span>
                        <span className="text-tremor-default ">/mo</span>
                      </p>
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <List className="mt-4 divide-y-0 text-gray-700 text-lg">
                        <ListItem
                          key="aha"
                          className="justify-start space-x-2 py-2.5"
                        >
                          <span>✅ Real-time sales tracking</span>
                        </ListItem>
                        <ListItem
                          key="aha"
                          className="justify-start space-x-2 py-2.5"
                        >
                          <span>✅ Compare with competitors</span>
                        </ListItem>
                        <ListItem
                          key="aha"
                          className="justify-start space-x-2 py-2.5"
                        >
                          <span>✅ Actionable KPI insights</span>
                        </ListItem>
                        <ListItem
                          key="aha"
                          className="justify-start space-x-2 py-2.5"
                        >
                          <span>✅ Historical performance analysis</span>
                        </ListItem>
                      </List>
                    </div>
                    <Divider />
                    <div className="mt-auto">
                      <Button
                        onClick={stripeServiceInstance.createCheckoutSession} className="group mt-6 rounded-lg w-full text-xl lg:text-2xl xl:text-2xl"
                        variant="accent"
                      >
                        👉 Subscribe now! 👈
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>

        <div className="flex mb-24 w-full flex-col items-center justify-center" />

        <footer className="bg-gray-800 text-gray-300 pt-10">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl font-bold text-white">Panopti</h4>
              <p className="mt-2 text-gray-400">
                Your e-commerce insights platform
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <a href="mailto:info@panopti.nl" className="hover:underline">
                Contact
              </a>
              {/* <a href="/privacy" className="hover:underline">Privacy Policy</a> */}
              {/* <a href="/terms" className="hover:underline">Terms of Service</a> */}
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-6 text-center">
            <p>© 2024 Panopti. All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-2 pb-2">
              Built with ❤️ by the Panopti team.
            </p>
          </div>
        </footer>
      </section>
    </>
  );
}
