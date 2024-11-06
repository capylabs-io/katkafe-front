import { getRaidLog } from "@/requests/mini-game/mini-game";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import React, { useEffect, useState } from "react";
import { LogItem } from "./LogItem";
import { RaidLog, RaidLogResponse } from "@/types/mini-game";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Loading } from "@/components/ui/Loading";
import { ErrorStartApp } from "@/components/ui/ErrorStartApp";
import qs from "qs";
import { LOGS_PER_PAGE } from "@/constants/mini-game";
import { get } from "lodash";

export const LogPanel = () => {
  const [logs, setLogs] = useState<RaidLog[]>([]);

  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const showSnackbar = useSnackBarStore((state) => state.show);
  const { ref, inView } = useInView();

  // const fetchLogs = async (params: any) => {
  //   showLoading();
  //   try {
  //     const logs = await getRaidLog();
  //     console.log("logs", logs);
  //     const sortedLogs = logs.sort((a, b) =>
  //       moment(b.createdAt).isAfter(moment(a.createdAt))
  //     );
  //     setLogs(sortedLogs);
  //   } catch (error) {
  //     console.error(error);
  //     showSnackbar("Failed to fetch logs");
  //   } finally {
  //     hideLoading();
  //   }
  // };

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: ({ pageParam = 1 }): Promise<RaidLogResponse> => {
      const query = qs.stringify({
        page: pageParam,
        limit: LOGS_PER_PAGE,
        sort: "-createdAt",
      });
      return getRaidLog(query);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0 || lastPage.data.length < LOGS_PER_PAGE) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  const renderLogs = (
    <>
      <div className="grid grid-cols-1 gap-y-2 p-4 divide-y">
        {get(data, "pages", []).map((page) => {
          return page.data.map((log) => <LogItem key={log._id} log={log} />);
        })}
      </div>
      <div className="my-3 text-center" ref={ref}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? ""
          : "No more logs"}
      </div>
    </>
  );

  const renderContent = () => {
    switch (status) {
      case "pending":
        return (
          <div className="flex flex-col items-center">
            <span
              className="inline-block h-14 w-14 animate-spin rounded-full border-[3px] border-current border-t-transparent text-black"
              role="status"
              aria-label="loading"
            />
            <div className="text-black mt-4 text-base font-medium">
              Loading...
            </div>
          </div>
        );
      case "error":
        return <ErrorStartApp />;
      default:
        return renderLogs;
    }
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="w-full bg-[#fffeec] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 !min-h-[calc(100%-32px)] !h-[calc(100%-32px)] overflow-y-auto mt-8">
      {renderContent()}
    </div>
  );
};
