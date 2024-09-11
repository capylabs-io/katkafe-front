"use client";
import { getOneStaff } from "@/requests/staff";
import { useLoadingStore } from "@/stores/LoadingStore";
import { Staff } from "@/types/common-types";
import { useEffect, useState } from "react";

export const useOneStaff = (id: string) => {
  const [staff, setStaff] = useState<Staff>();
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        show();
        const response = await getOneStaff(id);
        setStaff(response);
      } catch (error) {
        console.error("Error fetching staff", error);
      } finally {
        hide();
      }
    };

    fetchStaff();
  }, [id]);

  return staff;
};
