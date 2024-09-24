"use client";
import LoginService from "@/services/LoginService";
import { Button, Card, TextInput, Divider } from "@tremor/react";
import React, { useEffect } from "react";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { useAppData } from "@/app/contexts/AppProvider";
import { useTranslation } from "react-i18next";
import { siteConfig } from "@/app/siteConfig";


export default function ForgotForm() {
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const { t } = useTranslation();

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="text-center text-gb-title font-semibold text-gb-primary-400 dark:text-gb-primary-300">
            {t("login.forgot_header")}
          </h3>
          <form
            action="#"
            method="post"
            onSubmit={handleLogin}
            className="mt-6 space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="text-gb-default font-medium text-gb-content-strong dark:text-gray-300"
              >
                {t("login.email")}
              </label>
              <TextInput
                // type="email"
                error={error}
                errorMessage={errorMessage}
                id="email"
                name="email"
                autoComplete="email"
                placeholder={t("login.email_placeholder")}
                className="mt-2 rounded-md"
                onValueChange={(value) => {
                  setError(false);
                  setUsername(value);
                }}
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full whitespace-nowrap rounded-gb-default py-2 text-center text-gb-default font-medium text-gb-primary-100 rounded-sm hover:text-gb-secondary-100 shadow-gb-input bg-gb-primary hover:bg-gb-secondary-600 dark:hover:bg-gb-secondary-700 dark:bg-gb-primary dark:text-gb-primary-100 dark:hover:text-gb-secondary-100"
            >
              {t("send")}
            </button>
          </form>
        </div>
      </div>
    </>
  );

  async function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission behavior

    try {

      // Create a request to the backend that will send a reset link to the user
      const response = LoginService.forgottenPassword(username.toLowerCase());

      // Redirect the user to the reset password page
      setError(true);
      setErrorMessage("Reset link is on it's way to your email");
      


    } catch (error) {
      // In case of no response
      if (error.code === "ERR_NETWORK") {
        setError(true);
        setErrorMessage(t("unknown.server"));
        // In case of 403 response (Unauthorized)
      } else {
        setError(true);
        setErrorMessage(t("unknown.error"));
      }
    }
  }
}
