import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

export const DeviceGuard = ({ children }: { children: React.ReactElement }) => {
  const [isDeviceMobile, setIsDeviceMobile] = useState(false);

  useEffect(() => {
    setIsDeviceMobile(isMobile);
  }, []);

  const renderNotMobile = (
    <div className="notMobile w-full h-full flex flex-col text-center items-center justify-center">
      <img className="w-[170px] rounded-lg" src="/images/QR.png" alt="" />
      <h1 className="mt-10 font-medium">Open KatKafe on your mobile</h1>
      <h2 className="text-bodyLg">
        We banned the game on desktop to make life harder for cheater
      </h2>
    </div>
  );

  return isDeviceMobile ? children : renderNotMobile;
};
