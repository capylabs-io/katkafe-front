import { Lightbulb } from "lucide-react";
import Image from "next/image";

export const StartLoading = () => {
  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center bg-[url('/images/loading.png')] bg-center bg-no-repeat bg-cover !z-20">
      <div className="!z-20 w-[60%] flex flex-col justify-center items-center">
        <Image
          src="/images/KatKafeLogo.png"
          width={400}
          height={400}
          alt="icon"
          className="mb-6"
        />
        {/* <ProgressBar progress={progress} /> */}
      </div>
      <div className="absolute bottom-4 !z-20">
        <div className="flex gap-x-3 mt-10">
          <Lightbulb />
          <div>Tip: Tap to the screen to claim coin.</div>
        </div>
      </div>
    </div>
  );
};
