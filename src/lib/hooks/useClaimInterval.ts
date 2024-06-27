import { useEffect, useRef } from "react";
import useClaim from "./useClaim";

const useClaimInterval = () => {
  const { handleClaim, user } = useClaim();
  const intervalRef = useRef<number | null>(null);

  const clearClaimInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (user && !user.isLoginFirstTime) {
      intervalRef.current = window.setInterval(() => {
        handleClaim();
      }, 5000);
    }

    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.ready();
    }

    return () => {
      clearClaimInterval();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { clearClaimInterval };
};

export default useClaimInterval;
