import { useState, useEffect, createContext } from "react";
import Joyride, { Step, CallBackProps, STATUS, EVENTS } from "react-joyride";
import { useAppData } from "../contexts/StockDataContext";

const steps: Step[] = [
  {
    title: 'Welcome to Panopti!',
    target: 'body',
    content: 'This is your personal dashboard where you can track and manage bol.com products. Let’s explore our features.',
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '#product-table',
    content: 'Here, you can view all the products you’re tracking. It shows sales, revenue, and ratings in the date range you select. You can click on a product to see more details!',
    placement: 'bottom',
  },
  {
    target: '.date-range',
    content: 'That date range selection is done here! You can choose any date range to inspect sales in that time period.',
    placement: 'bottom',
  },
  {
    target: '#product-table',
    content: 'Sales are aggregated by day. When you start tracking a new product, it will take a few days to collect meaningful data. Please keep this in mind.',
    placement: 'top',
  },
  {
    target: '#button-add-product',
    content: 'Track new products here. You\'ll need the bol.com product page URL, and a snappy name of your choosing!',
    placement: 'right',
  },
  {
    target: '#product-list',
    content: 'This list shows all the products you’re tracking. You can click on a product to edit its name or delete it.',
    placement: 'right',
  },
  {
    target: '#mobile-sidebar-trigger',
    content: 'Open this menu to add new products to track. You\'ll need its bol.com product page URL, and a snappy name of your choosing!',
    placement: 'right',
  },
  {
    target: '#user-profile',
    content: 'Here you can change your password, language, the theme, or log out. You can also give feedback, or restart the tutorial!',
    placement: 'top',
  },
  {
    target: '#user-profile-mobile',
    content: 'Here you can change your password, language, the theme, or log out. You can also give feedback, or restart the tutorial!',
    placement: 'top',
  },
  {
    title: 'That’s it!',
    target: 'body',
    content: 'Feel free to explore, and subscribe today to start tracking your own products! Thank you for using Panopti.',
    placement: 'center',
  },
];

export const TourContext = createContext({
    restartTour: () => {},
  });
  
  interface TutorialProviderProps {
    children: React.ReactNode;
  }
  
  export function TutorialProvider({ children }: TutorialProviderProps) {
    const [run, setRun] = useState(false);
    const { user } = useAppData();
  
    const restartTour = () => {
      document.cookie = "tutorial=; max-age=0; path=/";
      setRun(false);
      setTimeout(() => {
        setRun(true);
      }, 100);
    };
  
    useEffect(() => {
      if (typeof document !== "undefined") {
        const shouldRunTutorial = () => {
          // Run tutorial on page load iff the tutorial cookie has not been set and we run a demo account
          return document.cookie.indexOf("tutorial=done") === -1 && user?.subscription === 0;
        };
        setRun(shouldRunTutorial());
      }
    }, []);
  
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
      <TourContext.Provider value={{ restartTour }}>
        <Joyride
          steps={steps}
          run={run}
          continuous={true}
          showSkipButton={true}
          disableOverlayClose={true}
          spotlightClicks={false}
          locale={{
            back: "Back",
            close: "Close",
            last: "Finish",
            next: "Next",
            skip: "Skip",
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