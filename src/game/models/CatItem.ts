import { LAYERS } from "@/constants/layers";
import { CatObject } from "./Cat";
import { GuestObject } from "./Guest";
import { getCatTextureName, getCatItemLayer } from "../utils/anim";
import { CATS_SCALE } from "@/constants/config";

export class CatItemObject extends Phaser.GameObjects.Sprite {
  parent: GuestObject | CatObject;
  offsetX: number;
  offsetY: number;
  assetType: string;
  index: number;

  constructor(
    scene: Phaser.Scene,
    parent: GuestObject | CatObject,
    assetType: string,
    index: number,
    offsetX: number,
    offsetY: number
  ) {
    super(
      scene,
      parent.x + offsetX,
      parent.y + offsetY,
      getCatTextureName(assetType, index)
    );

    scene.add.existing(this);
    this.setScale(CATS_SCALE);
    this.setOrigin(0.5, 0.5);
    this.setDepth(getCatItemLayer(assetType));

    this.index = index;
    this.assetType = assetType;
    this.parent = parent;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.scene.events.on("update", (time: number, delta: number) =>
      this.update(time, delta)
    );
  }

  update(time: number, delta: number) {
    this.x = this.parent.x + this.offsetX;
    this.y = this.parent.y + this.offsetY;
  }

  playAnimation(animName: string) {
    this.play(`${getCatTextureName(this.assetType, this.index)}-${animName}`);
  }
}
