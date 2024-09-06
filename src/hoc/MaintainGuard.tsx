import { Cog } from "lucide-react";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

const maintainGuard = process.env.NEXT_PUBLIC_MAINTAIN_MODE_GUARD ?? 0;

export const MaintainGuard = ({ children }: { children: React.ReactElement }) => {
  const [isMaintainMode, setIsMaintainMode] = useState(false);

  useEffect(() => {
    setIsMaintainMode(Number(maintainGuard) == 1 ? true : false);
  }, []);

  const renderMaintainMode = (
    <div className="relative w-full h-screen flex flex-col justify-center items-center bg-[url('/images/bg-notmobile.jpg')] bg-center bg-no-repeat bg-cover !z-20 text-center">
      <img className="w-[170px] rounded-lg" src="/images/barista.png" alt="" />
      <div className="w-[80%] flex flex-col justify-center items-center text-xl font-medium mt-5">
        Kafe is under construction
      </div>
      <div className="w-[70%] flex flex-col justify-center items-center text-gray-30 text-md  mt-1">
        Our kats are cleaning up the kafe. Will be back soon!
      </div>
    </div>
  );

  return !isMaintainMode ? children : renderMaintainMode;
};
