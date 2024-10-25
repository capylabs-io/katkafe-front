"use client";
import { WebAppProvider } from "@/provider/TelegramWebAppProvider";
import dynamic from "next/dynamic";

const AppWithoutSSR = dynamic(() => import("./App"), { ssr: false });

export default function Home() {
  return (
    <main>
      <WebAppProvider>
        <AppWithoutSSR />
      </WebAppProvider>
    </main>
  );
}
