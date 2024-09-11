import { CAT_DIRECTIONS } from "@/constants/anims";
import { Direction } from "@/types/config";

export const ToCatDirection = (direction: Direction) => {
    switch (direction) {
        case "up":
            return CAT_DIRECTIONS.UP;
        default:
        case "down":
            return CAT_DIRECTIONS.DOWN;
        case "left":
            return CAT_DIRECTIONS.LEFT;
        case "right":
            return CAT_DIRECTIONS.RIGHT;
    }
};

