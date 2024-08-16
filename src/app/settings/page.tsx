import { Button } from "@/components/Button"
import { ArrowAnimated } from "@/components/ui/icons/ArrowAnimated"
import { TremorPlaceholder } from "@/components/ui/icons/TremorPlaceholder"
import { siteConfig } from "../siteConfig"

export default function Settings() {
  return (
    <>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <div className="my-40 flex w-full flex-col items-center justify-center">
          <TremorPlaceholder className="size-20 shrink-0" aria-hidden="true" />
          <h2 className="mt-6 text-lg font-semibold sm:text-xl">
            Coming soon !!
          </h2>
          <Button className="group mt-6" variant="secondary" asChild>
            <a href={siteConfig.baseLinks.overview}>
              Return home
              <ArrowAnimated
                className="stroke-gray-900 dark:stroke-gray-50"
                aria-hidden="true"
              />
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}
