import { useEffect } from "react";
import { Routes } from "./app/routes/route";
const App = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myWindow = window as any;
    // Ensure the SDK script has been loaded
    if (myWindow.telegram && myWindow.Telegram.WebApp) {
      // Initialize the Telegram Web App
      myWindow.Telegram.WebApp.init();
      myWindow.Telegram.WebApp.ready();
      myWindow.Telegram.WebApp.expand();
      myWindow.Telegram.WebApp.disableVerticalSwipes();
    } else {
      console.error("TelegramWebApp is not available.");
    }
  }, []);
  return <Routes />;
};

export default App;
