import { getUserBoosts } from "@/requests/boost/user-boost";
import { useUserBoostsStore } from "@/stores/boost/userBoostsStore";
import { useLoadingStore } from "@/stores/LoadingStore";

export const useFetchUserBoosts = () => {
  const [setUserBoosts] = useUserBoostsStore((state) => [state.setUserBoosts]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);

  const fetchUserBoosts = async () => {
    try {
      show();
      const response = await getUserBoosts();
      setUserBoosts(response);
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      hide();
    }
  };

  return {
    fetchUserBoosts,
  };
};
