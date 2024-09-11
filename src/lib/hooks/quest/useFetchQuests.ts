import { getQuestsWithProgress } from "@/requests/quest/quests";
import { Quest } from "@/types/quest";
import { useCallback, useEffect, useState } from "react";

export const useFetchQuests = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [questTasks, setQuestsTasks] = useState<string[]>([]);

  const fetchQuests = useCallback(async () => {
    try {
      const response = await getQuestsWithProgress();
      setQuests(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  }, []);

  useEffect(() => {
    fetchQuests();
  }, [fetchQuests]);

  useEffect(() => {
    const setQuestTasks = new Set(quests.map((quest) => quest.task));
    setQuestsTasks(Array.from(setQuestTasks));
  }, [quests]);

  return {
    quests,
    questTasks,
    refetchQuests: fetchQuests,
  };
};
