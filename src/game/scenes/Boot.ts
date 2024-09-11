import { Scene } from "phaser";
import { drawSprite } from "../utils/ui/sprite";
import { LAYERS } from "@/constants/layers";
import { ASSETS } from "@/constants/config";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    this.load.setPath("assets");
    this.load.image(ASSETS.DEFAULT_BACKGROUND, "loading-bg.png");
    this.load.image(ASSETS.LOGO, "logo.png");
    this.load.spritesheet(ASSETS.LOADING_CAT, "loading-cat.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
  }

  create() {
    this.cameras.main.setBackgroundColor(0xffffff);

    drawSprite(
      this,
      ASSETS.LOGO,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      1,
      LAYERS.UI
    );

    this.anims.create({
      key: "walking",
      frames: this.anims.generateFrameNumbers(ASSETS.LOADING_CAT, {
        start: 0,
        end: 3,
      }),
      frameRate: 24,
      repeat: -1,
    });

    this.scene.start("Preloader");
  }
}
