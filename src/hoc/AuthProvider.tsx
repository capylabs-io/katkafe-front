"use client";
import { StartLoading } from "@/components/ui/StartLoading";
import { useUserStore } from "@/stores/userStore";
import { useExpand, useInitData } from "@zakarliuka/react-telegram-web-tools";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { ErrorStartApp } from "@/components/ui/ErrorStartApp";

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const expand = useExpand();
  const telegramData = useInitData();
  const [login, isLoggedIn] = useUserStore((state) => [
    state.login,
    state.isLoggedIn,
  ]);

  const loginUser = async () => {
    setIsLoading(true);
    try {
      const loginBody = {
        type: "local",
        initData: telegramData.initData,
        referralCode: telegramData.initDataUnsafe?.start_param,
      };
      await login(loginBody);
    } catch (error) {
      console.error("Error during login:", error);
      setError(get(error, "message", ""));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (telegramData.initData) {
      expand[1]?.();
      if (!isLoggedIn()) loginUser();
      else setIsLoading(false);
    }

    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.ready();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [telegramData.initData]);

  const renderContent = () => {
    if (isLoading) return <StartLoading></StartLoading>;
    else if (!isLoading && error) return <ErrorStartApp></ErrorStartApp>;
    else return children;
  };

  return renderContent();
};
