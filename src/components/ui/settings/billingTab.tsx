import { Button } from "@/components/Button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/Dialog"; // Assuming you have a Dialog component
import { useTranslation } from "react-i18next";
import { RiDoorClosedLine } from "@remixicon/react";
import { useAppData } from "@/app/contexts/AppProvider";
import { Input } from "@/components/Input";

export default function BillingTab() {
  const { t } = useTranslation();
  const { user } = useAppData();

  const handleCancelSubscription = () => {
    // Call the API to cancel the subscription
    console.log("Subscription Canceled");
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10 xl:grid-cols-5">
        <div className="col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            {t("settings.billing.title")}
          </h2>
        </div>

        {/* Subscription Type */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-gray-500 dark:text-gray-400">{t("settings.billing.subscription_type")}</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {user?.subscription_type ? user.subscription_type : "?"}
          </p>
        </div>

        {/* Subscribed Since */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-gray-500 dark:text-gray-400">{t("settings.billing.subscribed_since")}</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {user?.subscribed_since ? user.subscribed_since : "?"}
          </p>
        </div>

        {/* Billing Date */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-gray-500 dark:text-gray-400">{t("settings.billing.billing_date")}</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {user?.billing_date ? user.billing_date : "?"}
          </p>
        </div>

        {/* Billing Method */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-gray-500 dark:text-gray-400">{t("settings.billing.billing_method")}</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {user?.billing_method ? user.billing_method : "?"}
          </p>
        </div>
      </div>
      
      <div className="">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex mt-20 bg-red-600 text-white hover:bg-red-700">
              <RiDoorClosedLine className="size-5 mr-1" />
              {t("settings.billing.cancel_subscription")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{t("settings.billing.confirm_cancel_title")}</DialogTitle>
              <DialogDescription className="mt-1 text-sm leading-6 grid-flow-row">
                <div>{t("settings.billing.confirm_cancel_description")}</div>
                <div>
                    {t("settings.billing.confirm_cancel_feedback")}
                    <Input type="text" placeholder={t("settings.billing.confirm_cancel_feedback_placeholder")} />
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button
                  className="mt-2 w-full sm:mt-0 sm:w-fit"
                  variant="secondary"
                >
                  {t("settings.billing.go_back")}
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  className="w-full sm:w-fit bg-red-600 text-white"
                  onClick={handleCancelSubscription}
                >
                  {t("settings.billing.confirm_cancel_button")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
