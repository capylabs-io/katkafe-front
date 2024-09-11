// import { getRolls } from "@/requests/roll";
import { useRollStore } from "../../../stores/roll/rollStore";

export const useFetchRolls = () => {
  const [setRolls] = useRollStore((state) => [state.setRolls]);

  const fetchRolls = async () => {
    try {
      // const response = await getRolls();
      // setRolls(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchRolls,
  };
};
