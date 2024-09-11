import { CAT_ANIM_PERCENTAGE, CAT_STATES } from "@/constants/anims";

export const getRandomCatAnimationByPercentage = () => {
    const random = Math.random() * 100;
    let total = 0;
    for (const key in CAT_ANIM_PERCENTAGE) {
        total += CAT_ANIM_PERCENTAGE[key];
        if (random < total) {
            return key;
        }
    }
    return CAT_STATES.IDLE;
};

export const getRandomMaxAnimationDuration = (state: string) => {
    switch(state){
        default:
        case CAT_STATES.IDLE:
            return Phaser.Math.Between(1000, 4000);
        case CAT_STATES.WALKING:
            return Phaser.Math.Between(1000, 6000);
        case CAT_STATES.SLEEP:
            return Phaser.Math.Between(3000, 8000);
    }
}