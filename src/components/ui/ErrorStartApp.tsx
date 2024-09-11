// import { Lightbulb } from "lucide-react";
// import Image from "next/image";

export const ErrorStartApp = () => {
  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center bg-[url('/images/bg-notmobile.jpg')] bg-center bg-no-repeat bg-cover !z-20 text-center">
      <div className="w-[60%] flex flex-col justify-center items-center text-lg font-medium">
        Please try again later!
      </div>
      <div className="w-[70%] flex flex-col justify-center items-center text-md text-red-500 mt-1">
        Errors occured when running app.
      </div>
    </div>
  );
};
