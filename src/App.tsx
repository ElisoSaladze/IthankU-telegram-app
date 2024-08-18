import { useEffect } from "react";
import { Routes } from "./app/routes/route";
import {} from "@telegram-apps/sdk";

const App = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app = (window as any).Telegram!.WebApp;
    // Ensure the SDK script has been loaded
    if (app) {
      app.ready();
      app.expand();
      app.disableVerticalSwipes();
    } else {
      console.error("TelegramWebApp is not available.");
    }
  }, []);
  return <Routes />;
};

export default App;
