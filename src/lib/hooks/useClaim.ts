import { useState } from "react";
import { getClaim } from "@/requests/user";
import { useUserStore } from "@/stores/userStore";
import { UserType } from "@/types/user";

const useClaim = () => {
  const [response, setResponse] = useState<UserType | null>(null);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);

  const handleClaim = async () => {
    try {
      const response = await getClaim();
      if (response) {
        setUser(response);
        setResponse(response);
      }
    } catch (error) {
      console.log("Error Claim", error);
    }
  };

  return { response, handleClaim, user };
};

export default useClaim;
