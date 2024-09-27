"use client";
import { siteConfig } from "@/app/siteConfig";
import { Button } from "@/components/Button";
import { ArrowAnimated } from "@/components/ui/icons/ArrowAnimated";
import stripeServiceInstance from "@/services/StripeService";
import { RiHome2Line } from "@remixicon/react";
import React, { useState } from "react";

export default function ThankYouPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [email, setEmail] = useState("");

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(e.target.checked);
  };

  React.useEffect(() => {
    // Retrieve session_id from URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      stripeServiceInstance.verifyPayment(sessionId).then((response) => {
        if (response.data) {
          setEmail(response.data);
          console.log(response.data);
        }
      });
    } else {
      window.location.href = siteConfig.baseLinks.welcome;
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-gb-primary-600 via-gb-primarylite-800 to-gb-primary-600 flex items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center text-left">
          {/* Heading */}
          <h1 className="mt-6 mb-5 text-gray-200 text-5xl font-bold font-body sm:text-5xl">
            🎉 Thank you for subscribing to Panopti! 🎉
          </h1>

          {/* Subtitle for the password information */}
          <h2 className="mt-3 mb-3 text-gray-100 text-2xl font-semibold">
            Your temporary password can be found in your email: {email}
          </h2>

          {/* Instructions */}
          <p className="mt-3 max-w-xl text-gray-200">
            Once you’ve logged in, you can change your password by heading to your dashboard and clicking on the <RiHome2Line className="inline-block text-lg mb-1" aria-hidden="true" /> Home icon.
          </p>

          {/* Feedback Encouragement */}
          <p className="mt-3 max-w-xl text-gray-200">
            If you need help or have feedback, don't hesitate to reach out via the feedback button in your dashboard. We’re always here to assist! 💬
          </p>

          {/* Confirmation Checkbox */}
          <div className="mt-6">
            <label className="inline-flex items-center text-gray-200">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gb-accent-500 rounded border-gray-300 focus:ring-gb-secondary-500 transition duration-150"
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 text-base">
                I have read where to find my temporary password.
              </span>
            </label>
          </div>

          {/* Call to Action Button - Disabled until checkbox is checked */}
          <Button
            className={`group mt-6 p-2 w-1/4 rounded-lg ${!isConfirmed ? 'opacity-50 cursor-not-allowed' : ''}`}
            variant="accent"
            asChild
            disabled={!isConfirmed} // Disable button if not confirmed
          >
            <a href={isConfirmed ? siteConfig.baseLinks.login : '#'}>
              <p className="text-lg font-semibold">Go to your Dashboard</p>
              <ArrowAnimated
                className="stroke-gray-200 size-3"
                aria-hidden="true"
              />
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}

