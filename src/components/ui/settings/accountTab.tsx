import { useAppData } from "@/app/contexts/AppProvider";
import { Input } from "@/components/Input";
import loginServiceInstance from "@/services/LoginService";
import { RiErrorWarningFill, RiMailOpenLine, RiKey2Line } from "@remixicon/react";
import { Callout } from "@/components/Callout";
import { t } from "i18next";
import React, { useState } from "react";
import { Button } from "@/components/Button";
import { Label } from "recharts";

export default function AccountTab() {
  const { user } = useAppData();
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = React.useState<string | null>(null);

  const isDemoUser = user?.subscription === 0;

  async function handleChangeEmail() {
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      setError(t("settings.account.error_invalid_email"));
      return;
    }

    if (newEmail === confirmEmail) {
      if (newEmail === user?.username) {
        setError(t("settings.account.error_same_email"));
        return;
      }
      const response = await loginServiceInstance.changeEmail(newEmail);

      if (response.status === 200) {
        setError(t("settings.account.email_changed_success"));
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(t("settings.account.error_generic"));
      }
    } else {
      setError(t("settings.account.error_emails_not_equal"));
    }
  }

  async function handleChangePassword() {
    setError(null);
    if (newPassword === confirmPassword) {
      const response = await loginServiceInstance.changePassword(newPassword);

      if (response.status === 200) {
        setError(t("settings.account.password_changed_success"));
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(t("settings.account.error_generic"));
      }
    } else {
      setError(t("settings.account.error_passwords_not_equal"));
    }
  }

  return (
    <>
      <Callout
        title={t("settings.account.redirect_message")}
        icon={RiErrorWarningFill}
      />
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-8">
        <div className="col-span-8 md:col-span-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            {t("settings.account.change_email_header")}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-500">
            {t("settings.account.current_email")}: {user?.username}
          </p>
        </div>
        <div className="col-span-8 md:col-span-5 grid grid-cols-1 md:grid-cols-8 gap-x-4 gap-y-6">
          <div className="col-span-8 md:col-span-3">
            <Label>{t("settings.account.insert_email_label")}</Label>
            <Input
              placeholder={t("settings.account.enter_email_placeholder")}
              id="new-email"
              name="new-email"
              type="email"
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={isDemoUser} // Disable input if user is in demo mode
            />
          </div>
          <div className="col-span-8 md:col-span-3">
            <Label>{t("settings.account.confirm_email_label")}</Label>
            <Input
              placeholder={t("settings.account.enter_email_placeholder")}
              id="confirm-email"
              name="confirm-email"
              type="email"
              onChange={(e) => setConfirmEmail(e.target.value)}
              disabled={isDemoUser} // Disable input if user is in demo mode
            />
          </div>
          <Button
            onClick={() => handleChangeEmail()}
            type="submit"
            className="w-full sm:w-fit h-fit col-span-8 md:col-span-2"
            disabled={isDemoUser} // Disable button if user is in demo mode
          >
            <RiMailOpenLine className="size-5 mr-1" />
            {t("settings.account.save_button")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-8">
        <div className="col-span-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            {t("settings.account.change_password_header")}
          </h2>
        </div>
        <div className="col-span-8 md:col-span-5 grid grid-cols-1 md:grid-cols-8 gap-x-4 gap-y-6">
          <div className="col-span-8 md:col-span-3">
            <Label>{t("settings.account.insert_password_label")}</Label>
            <Input
              placeholder={t("settings.account.new_password_placeholder")}
              id="new-password"
              name="new-password"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isDemoUser} // Disable input if user is in demo mode
            />
          </div>
          <div className="col-span-8 md:col-span-3">
            <Label>{t("settings.account.confirm_password_label")}</Label>
            <Input
              placeholder={t("settings.account.confirm_password_placeholder")}
              id="confirm-password"
              name="confirm-password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isDemoUser} // Disable input if user is in demo mode
            />
          </div>
          <Button
            onClick={() => handleChangePassword()}
            type="submit"
            className="col-span-8 md:col-span-2 w-full sm:w-fit h-fit"
            disabled={isDemoUser} // Disable button if user is in demo mode
          >
            <RiKey2Line className="size-5 mr-1" />
            {t("settings.account.save_button")}
          </Button>
        </div>
        {error && (
          <p className="text-red-500 col-span-8 text-sm mt-2 w-full">{error}</p>
        )}
      </div>
    </>
  );
}
