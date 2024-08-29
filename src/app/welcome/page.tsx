"use client";
import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/Button"
import { ArrowAnimated } from "@/components/ui/icons/ArrowAnimated"
import { TremorPlaceholder } from "@/components/ui/icons/TremorPlaceholder"
import Image from "next/image"
import { UserProfileMobile } from "@/components/ui/navigation/UserProfile"
import { Card, Divider, List, ListItem } from "@tremor/react";
import { RiCheckboxCircleFill } from "@remixicon/react";
import { features } from "process";
import MobileSidebar from "@/components/ui/navigation/MobileSidebar";

export default function LandingPage() {
  return (
    <>
    <section className="bg-gradient-to-r from-gb-primary-600 via-gb-primarylite-800 to-gb-primary-600">
      
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between  bg-gb-primary-600 px-2 shadow-sm sm:gap-x-6 sm:px-4">
        <div className="text-gray-200 font-extrabold ml-8 max-w-xs">
          Logo Panopti
        </div>
        <div className="flex items-center gap-1 sm:gap-2 ">
          <Button className="group text-gray-200" variant="ghost" asChild>
            <a href={siteConfig.baseLinks.pricing}>
              Pricing
            </a>
          </Button>
          <Button className="group text-gray-200" variant="ghost" asChild>
            <a href={siteConfig.baseLinks.changelog}>
              Changelog
            </a>
          </Button>
          <Button className="group text-gray-200" variant="ghost" asChild>
            <a href={siteConfig.baseLinks.login}>
              Sign in
            </a>
          </Button>
          <Button className="group" variant="accent" asChild>
            <a href={siteConfig.baseLinks.settings}>
              Try the demo now!
            </a>
          </Button>
        </div>
      </div>

      {/* Hero */}
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <div className="my-20 flex w-full flex-col items-center justify-center">
          <h1 className="mt-6 mb-5 text-gray-200 text-7xl font-body sm:text-7xl">
            Sell more, sell faster <br/>with better data
          </h1>
          <p className="mt-3 max-w-xl text-center text-gray-200">
            Panopti is your powerful, easy-to-use Bol.com e-commerce dashboard that lets you track your and your competitors&apos; performance to help you maximize your profits.
          </p>
          <Button className="group mt-6 p-3 rounded-xl" variant="accent" asChild>
            <a href={siteConfig.baseLinks.settings}>
              <p className="text-lg">Try the demo now!</p>
              <ArrowAnimated
                className="stroke-gray-200 size-3"
                aria-hidden="true"
              />
            </a>
          </Button>

          <Image className="rounded-xl mt-6" src="/img/landing/dashboard.png" width={1000} height={150} alt="dashboard-preview"></Image>
          
        </div>


        <div className="my-20  bg-gb-secondary-500 skew-y-2">
          <div className="my-20 flex w-full flex-col items-center justify-center -skew-y-2 ">
            <h1 className="mt-12 mb-6 text-5xl text-white font-semibold sm:text-7xl" style={{ fontFamily: 'Rubik,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol' }}>
              We have many details, yes yes!
            </h1>
              {/* <Image src="/img/landing/details.png" width={700} height={250} alt="dashboard-preview"></Image> */}
            
            <div className=" overflow-hidden flex w-4/5">
              <Image className="w-1/2 object-cover rounded-lg shadow-2xl" src="/img/landing/details.png" alt="Image description" width={1900} height={1}/>
              <div className="p-4 flex flex-col justify-between max-w-xl">
                <h3 className="text-white text-lg font-bold">Typography</h3>
                <p className="text-gray-300 text-sm mt-2">
                  Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.
                </p>
              </div>
            </div>
            <Button className="group mt-6" variant="accentInverse" asChild>
              <a href={siteConfig.baseLinks.settings}>
                <p className="text-xl px-2">Try the demo now!</p>
                <ArrowAnimated
                  className="stroke-gray-900"
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
                <Image width={1000} height={1} src="/img/landing/details.png" alt="" loading="lazy" className=" rounded-xl"/>
                <div className="w-full h-8 text-center font-bold text-gb-secondary-200 text-lg"> 
                  hello 
                </div>
              </div>
              <div className="col-start-3 transform scale-75 rotate-6 translate-x-2 translate-y-15">
                <Image width={1000} height={1} src="/img/landing/details.png" alt="" loading="lazy" className=" rounded-xl"/>
                <div className="w-full h-8 text-center justify-center font-bold text-gb-secondary-200 text-lg"> 
                  mini feature
                </div>
              </div>
              <div className="transform scale-150 translate-y-11">
                <Image width={1000} height={1} src="/img/landing/details.png" alt="" loading="lazy" className=" rounded-xl"/>
                <div className="w-full h-8 text-center justify-center font-bold text-gb-secondary-200 text-lg"> 
                  big 
                </div>
              </div>
              <div className="transform translate-y-24">
                <Image width={1000} height={1} src="/img/landing/details.png" alt="" loading="lazy" className=" rounded-xl"/>
                <div className="w-full h-8 text-center justify-center font-bold text-gb-secondary-200 text-lg"> 
                  mid 
                </div>
              </div>
              <div className="row-start-1 col-start-2 col-span-2 transform translate-x-20 translate-y-4">
                <Image width={1000} height={1} src="/img/landing/details.png" alt="" loading="lazy" className=" rounded-xl"/>
                <div className="w-full h-8 text-center justify-center font-bold text-gb-secondary-200 text-xl"> 
                  mega feature
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="flex w-full flex-col items-center justify-center ">
          <h1 className="mt-12 mb-6 text-5xl text-white font-semibold sm:text-7xl" style={{ fontFamily: 'Rubik,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol' }}>
            Pricing
          </h1>
            
          
          <div className=" overflow-hidden flex w-4/5">
            {/* tremor blocks pricing template*/}
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
                <div className="p-6">
                  <h3 className="font-semibold text-tremor-content-strong ">
                    Unlock all features
                  </h3>
                  <p className="mt-2 text-tremor-default leading-6 text-tremor-content ">
                    Get the full potential of your data with our enhanced features that
                    enable advanced data analytics and informed decision-making.
                  </p>
                  <div className="mt-8 space-y-6">
                    <div className="relative border-l-2 border-tremor-border pl-4 ">
                      <h4 className="text-tremor-default font-medium text-tremor-content-strong ">
                        <a href="#" className="focus:outline-none">
                          {/* Extend link to entire card */}
                          <span className="absolute inset-0" aria-hidden={true} />
                          Talk to Sales &#8594;
                        </a>
                      </h4>
                      <p className="mt-1 text-tremor-default text-tremor-content ">
                        Schedule a call with one of our sales representative
                      </p>
                    </div>
                    <div className="relative border-l-2 border-tremor-border pl-4 ">
                      <h4 className="text-tremor-default font-medium text-tremor-content-strong ">
                        <a href="#" className="focus:outline-none">
                          {/* Extend link to entire card */}
                          <span className="absolute inset-0" aria-hidden={true} />
                          Book a demo &#8594;
                        </a>
                      </h4>
                      <p className="mt-1 text-tremor-default text-tremor-content ">
                        Try out our premium features in a demo
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-tremor-border bg-tremor-background-muted p-6 ">
                  <div className="flex items-start justify-between space-x-6">
                    <h3 className="font-semibold text-tremor-content-strong ">
                      Professional Plan Subscription
                    </h3>
                    <p className="flex items-baseline">
                      <span className="text-tremor-metric font-semibold text-tremor-content-strong ">
                        $89
                      </span>
                      <span className="text-tremor-default text-tremor-content ">
                        /mo
                      </span>
                    </p>
                  </div>
                  <List className="mt-4 divide-y-0 text-tremor-content-emphasis ">
                    
                  <ListItem
                        key="aha"
                        className="justify-start space-x-2 py-2.5"
                      >
                        <RiCheckboxCircleFill
                          className="size-5 shrink-0 text-tremor-brand "
                          aria-hidden={true}
                        />
                        <span>uwu</span>
                      </ListItem>
                      <ListItem
                        key="aha"
                        className="justify-start space-x-2 py-2.5"
                      >
                        <RiCheckboxCircleFill
                          className="size-5 shrink-0 text-tremor-brand "
                          aria-hidden={true}
                        />
                        <span>uwu</span>
                      </ListItem>
                      <ListItem
                        key="aha"
                        className="justify-start space-x-2 py-2.5"
                      >
                        <RiCheckboxCircleFill
                          className="size-5 shrink-0 text-tremor-brand "
                          aria-hidden={true}
                        />
                        <span>uwu</span>
                      </ListItem>
                      <ListItem
                        key="aha"
                        className="justify-start space-x-2 py-2.5"
                      >
                        <RiCheckboxCircleFill
                          className="size-5 shrink-0 text-tremor-brand "
                          aria-hidden={true}
                        />
                        <span>uwu</span>
                      </ListItem>
                    
                  </List>
                  <Divider />
                  <Button className="group mt-6" variant="primary">
                    Subscribe now
                  </Button>
                  <UserProfileMobile/>


                  <div className="rounded-3xl p-px bg-gradient-to-b from-gray-200 to-transparent">
                    <div className="bg-gray-50 p-10 rounded-[calc(1.5rem-1px)]">
                      <p className="text-gray-700">I absolutely 
                        love Tailus! The component blocks are beautifully designed and easy to use, which makes creating a great-looking website a breeze.
                      </p>

                      <div className="mt-8 flex gap-4 items-center">
                        <img className="h-12 w-12 rounded-full" src="https://pbs.twimg.com/profile_images/1599029039297077249/p0znhFdE_400x400.jpg" alt="" />
                        <div>
                          <h3 className="text-lg font-medium text-gray-700 ">Oketa Fred</h3>
                          <span className="text-sm tracking-wide text-gray-600 ">Fullstack Developer</span>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </>
          </div>
        </div>


        <div className="flex w-full flex-col items-center justify-center"/>
        <div className="mt-6 flex w-full flex-col items-center justify-center">
          <h1 className="text-2xl">footer</h1>
        </div>
      </div>
      </section>
    </>
  )
}