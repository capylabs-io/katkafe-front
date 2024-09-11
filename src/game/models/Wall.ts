import { COLLISION_CATEGORIES } from "@/constants/config";

export class WallObject extends Phaser.Physics.Arcade.Sprite {
    width: number;
    height: number;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number
    ) {
        super(scene, x, y, "");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setAlpha(0)
        this.setOrigin(0, 0);

        this.setCollisionCategory(COLLISION_CATEGORIES.WALL);
        this.setCollidesWith([COLLISION_CATEGORIES.CAT, COLLISION_CATEGORIES.GUEST]);

        this.body?.setSize(width, height);
        this.setImmovable(true);
        this.setDebugBodyColor(0xff0000);
    }
}

