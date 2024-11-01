import { getRaidLog } from "@/requests/mini-game/mini-game";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import React, { useEffect, useState } from "react";
import { LogItem } from "./LogItem";
import { RaidLog } from "@/types/mini-game";
import moment from "moment";

export const LogPanel = () => {
  const [logs, setLogs] = useState<RaidLog[]>([]);
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const showSnackbar = useSnackBarStore((state) => state.show);

  const fetchLogs = async () => {
    showLoading();
    try {
      const logs = await getRaidLog();
      console.log("logs", logs);
      const sortedLogs = logs.sort((a, b) =>
        moment(b.createdAt).isAfter(moment(a.createdAt))
      );
      setLogs(sortedLogs);
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to fetch logs");
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="w-full bg-[#fffeec] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] overflow-y-auto mt-8">
      <div className="grid grid-cols-1 gap-y-2 p-4 divide-y">
        {logs.map((log) => (
          <LogItem log={log} />
        ))}
      </div>
    </div>
  );
};
