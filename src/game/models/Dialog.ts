import { LAYERS } from "@/constants/layers";
import { CatObject } from "./Cat";
import { GuestObject } from "./Guest";

export class DialogObject extends Phaser.GameObjects.Image {
  parent: GuestObject | CatObject;
  offsetX: number;
  offsetY: number;

  constructor(
    scene: Phaser.Scene,
    parent: GuestObject | CatObject,
    dialogType: string,
    scale: number,
    offsetX: number,
    offsetY: number,
    duration: number = 5000
  ) {
    super(
      scene,
      parent.x + offsetX,
      parent.y + offsetY,
      `Dialog-${dialogType}`
    );

    scene.add.existing(this);
    this.setDepth(LAYERS.DIALOG);
    this.setScale(scale);

    this.parent = parent;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.scene.events.on("update", (time: number, delta: number) =>
      this.update(time, delta)
    );

    this.scene.time.addEvent({
      delay: duration,
      callback: () => {
        this.destroy(true);
      },
      callbackScope: this,
      loop: false,
    });
  }

  update(time: number, delta: number) {
    this.x = this.parent.x + this.offsetX;
    this.y = this.parent.y + this.offsetY;
  }
}
