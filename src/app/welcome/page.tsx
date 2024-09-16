"use client";
import { siteConfig } from "@/app/siteConfig";
import { Button } from "@/components/Button";
import { ArrowAnimated } from "@/components/ui/icons/ArrowAnimated";
import Image from "next/image";
import { Divider, List, ListItem } from "@tremor/react";
import LoginService from "@/services/LoginService";
import { Logo } from "@/components/ui/icons/Logo";
import stripeServiceInstance from "@/services/StripeService";

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
    } catch {}
  };

  return (
    <>
      <section className="bg-gradient-to-r from-gb-primary-600 via-gb-primarylite-800 to-gb-primary-600">
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

        {/* Hero */}
        <div className="mt-4 sm:mt-6 lg:mt-10">
          <div className="my-20 flex w-full flex-col items-center justify-center">
            <h1 className="mt-6 mb-5 text-gray-200 text-5xl font-bold font-body sm:text-5xl text-center">
              Find 💸Top-Selling💸 Products <br /> and Skyrocket Your Sales 🚀
            </h1>
            <p className="mt-3 max-w-xl text-gray-200 text-center">
              Panopti is your ultimate e-commerce insights platform
              {/*, empowering you to track, analyze, and outperform the competition*/}
              . Discover trending products, monitor key metrics, and optimize
              your strategies to maximize profits—effortlessly.
            </p>
            <Button
              className="group mt-6 p-2 w-1/4 rounded-lg"
              variant="accent"
              asChild
            >
              <a  href="#" onClick={handleDemoLogin}>
                <p className="text-lg font-semibold">Try the demo now!</p>
                <ArrowAnimated
                  className="stroke-gray-200 size-3"
                  aria-hidden="true"
                />
              </a>
            </Button>

            <Image
              className="rounded-xl mt-6 mx-12"
              src="/img/landing/dashboard.png"
              width={900}
              height={150}
              alt="dashboard-preview"
            ></Image>
          </div>

          <div className="my-20 bg-gb-secondary-500 skew-y-2 shadow-[0_-20px_40px_rgba(0,0,0,0.2),_0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="my-20 flex w-full flex-col items-center justify-center -skew-y-2 ">
              <h1 className="mt-12 mb-8 mx-5 text-5xl text-white font-semibold ">
                Discover your growth opportunities
              </h1>
              <div className=" overflow-hidden flex w-4/5">
                <Image
                  className="w-1/2 object-cover rounded-lg shadow-2xl"
                  src="/img/landing/details.png"
                  alt="Image description"
                  width={1900}
                  height={1}
                />
                <div className="p-4 flex flex-col justify-between max-w-xl">
                  <div className="flex items-start space-x-2">
                    <p className="text-2xl">👀</p>
                    <p className="text-gray-300 font-display text-xl">
                      With <b>Panopti</b>, get instant access to detailed
                      product performance stats, including sales data, pricing
                      trends, and revenue insights.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2 mt-4">
                    <p className="text-2xl">🎯</p>
                    <p className="text-gray-300 font-display text-xl">
                      Monitor individual products, track their sales history
                      over time, and identify top performers.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2 mt-4">
                    <p className="text-2xl">📈</p>
                    <p className="text-gray-300 font-display text-xl">
                      Stay ahead of the competition by understanding how pricing
                      affects demand, and compare your own products with
                      competitors' to spot opportunities for growth.
                    </p>
                  </div>
                </div>
              </div>
              <Button className="group mt-6" variant="accentInverse" asChild>
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

          <div className="flex justify-around">
            <div className="m-20 flex justify-around max-w-5xl sm:md:mx-40">
              {/* SECTION FOR FUNCTIONALITY IMAGES DEMO */}
              <div className="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8 sm:md:gap-1">
                <div className="rounded-xl transform scale-110 -rotate-6 ">
                  <Image
                    width={1000}
                    height={1}
                    src="/img/landing/details.png"
                    alt=""
                    loading="lazy"
                    className=" rounded-xl"
                  />
                  <div className="w-full h-8 text-center font-bold text-gb-secondary-200 text-lg">
                    mid
                  </div>
                </div>
                <div className="col-start-3 transform scale-75 rotate-6 translate-x-2 translate-y-15">
                  <Image
                    width={1000}
                    height={1}
                    src="/img/landing/details.png"
                    alt=""
                    loading="lazy"
                    className=" rounded-xl"
                  />
                  <div className="w-full h-8 text-center justify-center font-bold text-gb-secondary-200 text-lg">
                    mini feature
                  </div>
                </div>
                <div className="transform scale-150 translate-y-11">
                  <Image
                    width={1000}
                    height={1}
                    src="/img/landing/details.png"
                    alt=""
                    loading="lazy"
                    className=" rounded-xl"
                  />
                  <div className="w-full h-8 text-center justify-center font-bold text-gb-secondary-200 text-lg">
                    big
                  </div>
                </div>
                <div className="transform translate-y-24">
                  <Image
                    width={1000}
                    height={1}
                    src="/img/landing/details.png"
                    alt=""
                    loading="lazy"
                    className=" rounded-xl"
                  />
                  <div className="w-full h-8 text-center justify-center font-bold text-gb-secondary-200 text-lg">
                    mid
                  </div>
                </div>
                <div className="row-start-1 col-start-2 col-span-2 transform translate-x-20 translate-y-4">
                  <Image
                    width={1000}
                    height={1}
                    src="/img/landing/details.png"
                    alt=""
                    loading="lazy"
                    className=" rounded-xl"
                  />
                  <div className="w-full h-8 text-center justify-center font-bold text-gb-secondary-200 text-xl">
                    mega feature
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="pricing"
            className="flex w-full flex-col items-center justify-center -skew-y-3 bg-gb-primary-400  shadow-[0_-20px_40px_rgba(0,0,0,0.2),_0_20px_40px_rgba(0,0,0,0.2)]"
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
        </div>
      </section>
    </>
  );
}
