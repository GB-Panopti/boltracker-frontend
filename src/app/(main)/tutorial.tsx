"use client";
import { useState, useEffect, createContext } from "react";
import Joyride, { Step, CallBackProps, STATUS, EVENTS } from "react-joyride";
import { useAppData } from "../contexts/AppProvider";
import { useTranslation } from "react-i18next";
import LoginService from "@/services/LoginService";
import { TextInput } from "@tremor/react";
import React from "react";

export const TourContext = createContext({
  restartTour: () => { },
  setRun: (value: boolean) => { },
});

interface TutorialStepProps {
  handleDemoEmail: () => void;
  msgs: string[];
}

const TutorialStep: React.FC<TutorialStepProps> = ({
  handleDemoEmail,
  msgs,
}) => {
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const { t } = useTranslation();
  const hasTutorialDone = msgs.includes("tutorial.done_demo");

  return (
    <div>
      <div>
        <div>
          {hasTutorialDone && (
            <div className="relative flex items-center w-full max-w-lg">
              <TextInput
                // type="email"
                error={error}
                id="email"
                type="email"
                placeholder={t("Enter your email")}
                className="w-full px-4 text-base font-medium border dark:text-black border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gb-secondary-500 focus:border-gb-secondary-500 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={handleDemoEmail}
                className="px-4 py-2 h-full text-white font-medium bg-gradient-to-r from-gb-secondary-500 to-gb-accent-500 hover:bg-gradient-to-r hover:from-gb-primary-400 hover:to-gb-accent-500 border border-gb-secondary-500 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-gb-secondary-500 transition-all duration-300"
              >
                {t("Submit")}
              </button>
            </div>
          )}

          {msgs.map((msg, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: t(msg) }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialStep;

interface TutorialProviderProps {
  children: React.ReactNode;
}

export function TutorialProvider({ children }: TutorialProviderProps) {
  const [run, setRun] = useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [activeSteps, setActiveSteps] = useState<Step[]>([]);
  const { user } = useAppData();
  const { t } = useTranslation();

  const handleDemoEmail = async () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    if (email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError(true);
        // alert('Invalid email format');
        return;
      }
      const source = "demo";
      try {
        // Await the result of the post request
        const response = await LoginService.saveEmailAddr(email, source);

        // Check if the response was successful (status code 200)
        if (response.status === 200) {
          setError(false);
          document.cookie = "tutorial=done; max-age=31536000; path=/"; // Set the cookie for 1 year
          setRun(false); // Stop the Joyride tour
        } else {
          setError(true);
          setErrorMessage("Failed to save email. Please try again.");
        }
      } catch (error) {
        // Handle any errors that occurred during the request
        setError(true);
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  const steps: Step[] = [
    {
      title: t("tutorial.welcome_title"),
      target: "body",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.welcome", "tutorial.welcome_1"]}
        />
      ),
      placement: "center",
      disableBeacon: true,
    },
    {
      target: "#product-table",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step2"]}
        />
      ),
      placement: "bottom",
    },
    {
      target: "#product-table-mobile",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step2"]}
        />
      ),
      placement: "bottom",
    },
    {
      target: ".date-range",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step3"]}
        />
      ),
      placement: "bottom",
    },
    {
      target: "#revenue-table-head",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step4"]}
        />
      ),
      placement: "top",
    },
    {
      target: "#revenue-table-head-mobile",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step4"]}
        />
      ),
      placement: "bottom",
    },
    {
      title: t("tutorial.step5_title"),
      target: "#button-add-product",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step5", "tutorial.step5_1"]}
        />
      ),
      placement: "right",
    },
    {
      target: "#product-list",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step6"]}
        />
      ),
      placement: "right",
    },
    {
      // mobile only
      target: "#mobile-sidebar-trigger",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step7"]}
        />
      ),
      placement: "right",
    },
    {
      target: "#user-profile",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step8"]}
        />
      ),
      placement: "top",
    },
    {
      target: "#user-profile-mobile",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step9"]}
        />
      ),
      placement: "top",
    },
    {
      title: t("tutorial.done_title"),
      target: "body",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.done", "tutorial.done_1"]}
        />
      ),
      placement: "center",
    },
  ];

  const stepsDemo: Step[] = [
    {
      title: t("tutorial.welcome_title"),
      target: "body",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.welcome", "tutorial.welcome_1"]}
        />
      ),
      placement: "center",
      disableBeacon: true,
    },
    {
      target: "#product-table",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step2"]}
        />
      ),
      placement: "bottom",
    },
    {
      target: "#product-table-mobile",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step2"]}
        />
      ),
      placement: "bottom",
    },
    {
      target: ".date-range",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step3"]}
        />
      ),
      placement: "bottom",
    },
    {
      target: "#revenue-table-head",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step4"]}
        />
      ),
      placement: "top",
    },
    {
      target: "#revenue-table-head-mobile",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step4"]}
        />
      ),
      placement: "bottom",
    },
    {
      title: t("tutorial.step5_title"),
      target: "#button-add-product",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step5", "tutorial.step5_1"]}
        />
      ),
      placement: "right",
    },
    {
      target: "#product-list",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step6"]}
        />
      ),
      placement: "right",
    },
    {
      // mobile only
      target: "#mobile-sidebar-trigger",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step7"]}
        />
      ),
      placement: "right",
    },
    {
      target: "#user-profile",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step8"]}
        />
      ),
      placement: "top",
    },
    {
      target: "#user-profile-mobile",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.step9"]}
        />
      ),
      placement: "top",
    },
    {
      title: t("tutorial.done_title_demo"),
      target: "body",
      content: (
        <TutorialStep
          handleDemoEmail={handleDemoEmail}
          msgs={["tutorial.done_demo", "tutorial.done_1_demo"]}
        />
      ),
      placement: "center",
      hideFooter: true,
    },
  ];

  const restartTour = () => {
    document.cookie = "tutorial=; max-age=0; path=/";
    setRun(false); // Set non-demo steps for the restart
    setActiveSteps(steps);
    setTimeout(() => {
      setRun(true);
    }, 100);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      const shouldRunTutorial = () => {
        return document.cookie.indexOf("tutorial=done") === -1;
      };

      if (user?.username === "demo@panopti.nl") {
        setActiveSteps(stepsDemo);
      } else {
        setActiveSteps(steps);
      }

      setRun(shouldRunTutorial());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;

    // Listen for the 'finished' or 'skipped' status to set the cookie
    if (
      status === STATUS.FINISHED ||
      status === STATUS.SKIPPED ||
      (type === EVENTS.TOUR_END && status === STATUS.READY)
    ) {
      document.cookie = "tutorial=done; max-age=31536000; path=/";
      setRun(false);
    }
  };

  return (
    <TourContext.Provider value={{ restartTour, setRun }}>
      <Joyride
        key={run ? "running" : "stopped"}
        steps={activeSteps}
        run={run}
        continuous={true}
        disableOverlayClose={true}
        disableCloseOnEsc={true}
        hideCloseButton={true}
        spotlightClicks={false}
        locale={{
          back: t("tutorial.btn_back"),
          close: t("tutorial.btn_close"),
          last: t("tutorial.btn_last"),
          next: t("tutorial.btn_next"),
          skip: t("tutorial.btn_skip"),
        }}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#16302b",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            height: "100vh",
            top: 0,
            bottom: 0,
          },
          spotlight: {
            zIndex: 10010,
          },
        }}
      />
      {children}
    </TourContext.Provider>
  );
}
