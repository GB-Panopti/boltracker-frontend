import { Button } from "@/components/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/Dialog";
import { useTranslation } from "react-i18next";
import { RiDoorClosedLine } from "@remixicon/react";
import { useAppData } from "@/app/contexts/AppProvider";
import { Input } from "@/components/Input";
import LoginService from "@/services/LoginService";
import { useState, useEffect } from "react";

export default function BillingTab() {
  const { t } = useTranslation();
  const { user } = useAppData();

  // State for formatted subscription details, reason, and comment
  const [subscriptionType, setSubscriptionType] = useState<string>("non-active");
  const [subscribedSince, setSubscribedSince] = useState<string>("?");
  const [billingDate, setBillingDate] = useState<string>("?");
  const [unsubscribeReason, setUnsubscribeReason] = useState<string>(""); // State for reason
  const [unsubscribeComment, setUnsubscribeComment] = useState<string>(""); // State for comment

  const formatDate = (timestamp: string | number): string => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (user?.subscriptionDetails) {
      const subscriptionStatus = user.subscriptionDetails.subscriptionStatus;
      const subscriptionType =
        subscriptionStatus === "active"
          ? "Premium"
          : t("settings.billing.demo");

      setSubscriptionType(subscriptionType);

      setSubscribedSince(
        user.subscriptionDetails.subscribedSince
          ? formatDate(user.subscriptionDetails.subscribedSince)
          : "-"
      );

      setBillingDate(
        user.subscriptionDetails.billingCycleEnd
          ? formatDate(user.subscriptionDetails.billingCycleEnd)
          : "-"
      );
    }
  }, [user, t]);

  async function handleCancelSubscription() {
    const response = await LoginService.cancelSubscription(unsubscribeReason, unsubscribeComment);
    if (response.status === 200) {
      alert(
        t("settings.billing.subscription_cancel_success")
      );
    } else if (response.status === 500) {
      alert(
        t("settings.billing.subscription_cancel_server_error")
      );
    } else {
      alert(
        t("settings.billing.subscription_cancel_error")
      );
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10 2xl:grid-cols-5">
        <div className="col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            {t("settings.billing.title")}
          </h2>
        </div>

        <div className="col-span-1 md:col-span-1">
          <h3 className="text-gray-500 dark:text-gray-400">
            {t("settings.billing.subscription_type")}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {subscriptionType}
          </p>
        </div>

        <div className="col-span-1 md:col-span-1">
          <h3 className="text-gray-500 dark:text-gray-400">
            {t("settings.billing.subscribed_since")}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {subscribedSince}
          </p>
        </div>

        <div className="col-span-1 md:col-span-1">
          <h3 className="text-gray-500 dark:text-gray-400">
            {t("settings.billing.billing_date")}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {billingDate}
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
              <DialogTitle>
                {t("settings.billing.confirm_cancel_title")}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm leading-6 grid-flow-row">
                <div>{t("settings.billing.confirm_cancel_description")}</div>
                
                {/* Dropdown for reasons */}
                <div>
                  <label htmlFor="unsubscribe-reason" className="block text-sm font-medium text-gray-700">
                    {t("settings.billing.confirm_cancel_reason")}
                  </label>
                  <select
                    id="unsubscribe-reason"
                    name="unsubscribe-reason"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={unsubscribeReason}
                    onChange={(e) => setUnsubscribeReason(e.target.value)}  // Set the selected reason
                  >
                    <option value="">{t("settings.billing.select_reason")}</option>
                    <option value="customer_service">{t("settings.billing.reason.customer_service")}</option>
                    <option value="low_quality">{t("settings.billing.reason.low_quality")}</option>
                    <option value="missing_features">{t("settings.billing.reason.missing_features")}</option>
                    <option value="switched_service">{t("settings.billing.reason.switched_service")}</option>
                    <option value="too_complex">{t("settings.billing.reason.too_complex")}</option>
                    <option value="too_expensive">{t("settings.billing.reason.too_expensive")}</option>
                    <option value="unused">{t("settings.billing.reason.unused")}</option>
                    <option value="other">{t("settings.billing.reason.other")}</option>
                  </select>
                </div>

                {/* Input for comment */}
                <div className="mt-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                    {t("settings.billing.confirm_cancel_feedback")}
                  </label>
                  <Input
                    id="comment"
                    type="text"
                    placeholder={t("settings.billing.confirm_cancel_feedback_placeholder")}
                    value={unsubscribeComment}
                    onChange={(e) => setUnsubscribeComment(e.target.value)}  // Set the comment
                  />
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
