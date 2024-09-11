import { getEvents } from "@/requests/event/events";
import { EventType } from "@/types/event";
import { Quest } from "@/types/quest";
import { useEffect, useState } from "react";

export const useEvent = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    fetchEvents,
    events,
  };
};
