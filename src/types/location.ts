import { LOCATION_ASSETS } from "@/constants/config";
import { Direction } from "./config";

export type AssetData = {
    x: number;
    y: number;
};

export type PathData = PathPointData[];

export type PathPointData = {
    position: {
        x: number;
        y: number;
    };
    behavior?: {
        type: "forward" | "path";
        direction: Direction;
    };
};

export type LocationsData = {
    [x: string]: LocationData;
};

export type LocationData = {
    assets: any;
    spawnPoints: AssetData[];
    paths: PathData[];
};

