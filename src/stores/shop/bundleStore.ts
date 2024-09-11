import { Bundle } from "@/types/bundle";
import { create } from "zustand";

type States = {
    bundles: Bundle[];
    currentBundle: Bundle | null;
};

type Actions = {
    setBundles: (bundles: Bundle[]) => void;
    setCurrentBundle: (bundle: Bundle) => void;
};

const defaultStates = {
    bundles: [],
    currentBundle: null,
};

export const useBundleStore = create<States & Actions>((set, get) => ({
    ...defaultStates,
    setBundles: (bundles: Bundle[]) => {
        set({
            bundles,
        });
    },
    setCurrentBundle: (bundle: Bundle) => {
        set({
            currentBundle: bundle,
        });
    },
}));
