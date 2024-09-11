import {
  ASSETS,
  CATS_COUNT,
  CATS_FRAME_RATE,
  CAT_ASSET_FOLDER,
  CAT_AURA_ASSET_FOLDER,
  CAT_AURA_COUNT,
  CAT_BASE_ASSET_FOLDER,
  CAT_BASE_COUNT,
  CAT_BODY_ASSET_FOLDER,
  CAT_BODY_COUNT,
  CAT_CAPE_ASSET_FOLDER,
  CAT_CAPE_COUNT,
  CAT_CONFIGS,
  CAT_FACE_ASSET_FOLDER,
  CAT_FACE_COUNT,
  CAT_FRAME_HEIGHT,
  CAT_FRAME_WIDTH,
  CAT_HAT_ASSET_FOLDER,
  CAT_HAT_COUNT,
  LOCATIONS_COUNT,
  LOCATION_ASSETS,
  SPECIAL_CHARACTER_COUNT,
  SPECIAL_CHARACTER_FOLDER,
} from "@/constants/config";
import { waitForSeconds } from "@/utils/helpers";
import { GameObjects, Scene } from "phaser";
import { drawBackground } from "../utils/ui/sprite";
import { CAT_ANIMATIONS } from "@/constants/anims";
import { DIALOG_TYPES } from "@/constants/dialog";
import { CAT_AUDIO_COUNT, GUEST_AUDIO_COUNT } from "@/constants/audio";
import { getAllCatConfigs } from "@/requests/cat-config";
import { CatAssetType, CatConfig, CatLevelType } from "@/types/cat-config";

export class Preloader extends Scene {
  background: GameObjects.Image;
  txtLoading: GameObjects.Text;
  sptLoadingCat: GameObjects.Sprite;

  catConfigs: CatConfig[] = [];

  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here

    this.background = drawBackground(this, ASSETS.DEFAULT_BACKGROUND);

    // //  A simple progress bar. This is the outline of the bar.
    // this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    // //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    // const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

    // //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    // this.load.on('progress', (progress: number) => {

    //     //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
    //     bar.width = 4 + (460 * progress);

    // });

    this.sptLoadingCat = this.add
      .sprite(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        ASSETS.LOADING_CAT
      )
      .play("walking");

    this.txtLoading = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + this.sptLoadingCat.height / 2 + 14,
        "The Kafe is opening soon...",
        {
          fontFamily: "Pixelify Sans",
          fontSize: 20,
          color: "#000000",
          stroke: "#ffffff",
          strokeThickness: 4,
          align: "center",
          shadow: {
            offsetX: 0,
            offsetY: 4,
            color: "#00000033",
            fill: true,
          },
        }
      )
      .setOrigin(0.5)
      .setDepth(100);
    this.txtLoading = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + this.sptLoadingCat.height / 2 + 160,
        "Our kats are more chonky than usual \nso they might take sometimes to get ready",
        {
          fontFamily: "Pixelify Sans",
          fontSize: 16,
          color: "#000000",
          stroke: "#ffffff",
          strokeThickness: 4,
          align: "center",
          shadow: {
            offsetX: 0,
            offsetY: 4,
            color: "#00000033",
            fill: true,
          },
        }
      )
      .setOrigin(0.5)
      .setDepth(100);
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets");
    this.loadLocationAssets();
    this.loadDialogs();
    this.loadAudios();
    this.loadAllCatAssets();
    this.loadSpecialAssets();
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.
    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.waitBeforeGoToGame();
  }

  loadSprites() {
    this.load.image("logo");
  }

  loadLocationAssets() {
    //@TODO: Load location based on data from server
    for (let i = 1; i < LOCATIONS_COUNT + 1; i++) {
      this.load.image(
        `${LOCATION_ASSETS.BACKGROUND}-${i}`,
        `locations/location-${i}/${LOCATION_ASSETS.BACKGROUND}.png`
      );
      this.load.image(
        `${LOCATION_ASSETS.BTN_FRIEND}-${i}`,
        `locations/location-${i}/${LOCATION_ASSETS.BTN_FRIEND}.png`
      );
      this.load.image(
        `${LOCATION_ASSETS.BTN_QUEST}-${i}`,
        `locations/location-${i}/${LOCATION_ASSETS.BTN_QUEST}.png`
      );
      this.load.image(
        `${LOCATION_ASSETS.BTN_RANK}-${i}`,
        `locations/location-${i}/${LOCATION_ASSETS.BTN_RANK}.png`
      );
    }
  }

  loadDialogs() {
    const dialogTypes = Object.values(DIALOG_TYPES);
    for (let i = 0; i < dialogTypes.length; i++) {
      const dialogType = dialogTypes[i];
      this.load.image(`Dialog-${dialogType}`, `/dialogs/${dialogType}.png`);
    }
  }

  loadAudios() {
    this.load.audio("bgm", "/audios/sound-background.mp3");
    this.load.audio("ambience", "/audios/sound-ambience.wav");
    for (let i = 1; i < CAT_AUDIO_COUNT + 1; i++) {
      this.load.audio(`cat-${i}`, `/audios/sound-cat-${i}.wav`);
    }
    for (let i = 1; i < GUEST_AUDIO_COUNT + 1; i++) {
      this.load.audio(`guest-${i}`, `/audios/sound-guest-${i}.wav`);
    }
  }

  //Load assets
  loadSpecialAssets() {
    for (let i = 0; i < SPECIAL_CHARACTER_COUNT; i++) {
      this.load.spritesheet(
        `Special-${i + 1}`,
        `/${SPECIAL_CHARACTER_FOLDER}/${i + 1}/spritesheet.png`,
        {
          frameWidth: CAT_FRAME_WIDTH,
          frameHeight: CAT_FRAME_HEIGHT,
        }
      );
    }
  }

  loadAllCatAssets() {
    this.loadCatAssets(
      CatAssetType.Base,
      CAT_BASE_COUNT,
      CAT_BASE_ASSET_FOLDER
    );
    this.loadCatAssets(
      CatAssetType.Aura,
      CAT_AURA_COUNT,
      CAT_AURA_ASSET_FOLDER
    );
    this.loadCatAssets(
      CatAssetType.Body,
      CAT_BODY_COUNT,
      CAT_BODY_ASSET_FOLDER
    );
    this.loadCatAssets(
      CatAssetType.Cape,
      CAT_CAPE_COUNT,
      CAT_CAPE_ASSET_FOLDER
    );
    this.loadCatAssets(
      CatAssetType.Face,
      CAT_FACE_COUNT,
      CAT_FACE_ASSET_FOLDER
    );
    this.loadCatAssets(CatAssetType.Hat, CAT_HAT_COUNT, CAT_HAT_ASSET_FOLDER);
  }

  loadCatAssets(assetType: string, count: number, path: string) {
    for (let i = 0; i < count; i++) {
      this.load.spritesheet(
        `${assetType}-${i + 1}`,
        `/${CAT_ASSET_FOLDER}/${path}/${assetType}-${i + 1}.png`,
        {
          frameWidth: CAT_FRAME_WIDTH,
          frameHeight: CAT_FRAME_HEIGHT,
        }
      );
    }
  }

  async waitBeforeGoToGame() {
    this.createCatAnimations(CatAssetType.Base, CAT_BASE_COUNT);
    this.createCatAnimations(CatAssetType.Aura, CAT_AURA_COUNT);
    this.createCatAnimations(CatAssetType.Body, CAT_BODY_COUNT);
    this.createCatAnimations(CatAssetType.Cape, CAT_CAPE_COUNT);
    this.createCatAnimations(CatAssetType.Face, CAT_FACE_COUNT);
    this.createCatAnimations(CatAssetType.Hat, CAT_HAT_COUNT);
    this.createSpecialCharacterAnimations();
    await waitForSeconds(1);
    this.scene.start("Game");
  }

  createSpecialCharacterAnimations() {
    for (let i = 0; i < SPECIAL_CHARACTER_COUNT; i++) {
      this.anims.create({
        key: `Special-${i + 1}-${CAT_ANIMATIONS.IDLE}`,
        frames: this.anims.generateFrameNumbers(`Special-${i + 1}`, {
          start: 0,
          end: 3,
        }),
        frameRate: CATS_FRAME_RATE,
        repeat: -1,
      });
      this.anims.create({
        key: `Special-${i + 1}-${CAT_ANIMATIONS.SLEEP}`,
        frames: this.anims.generateFrameNumbers(`Special-${i + 1}`, {
          start: 4,
          end: 7,
        }),
        frameRate: CATS_FRAME_RATE,
        repeat: -1,
      });
      this.anims.create({
        key: `Special-${i + 1}-${CAT_ANIMATIONS.WALKING_DOWN}`,
        frames: this.anims.generateFrameNumbers(`Special-${i + 1}`, {
          start: 8,
          end: 11,
        }),
        frameRate: CATS_FRAME_RATE,
        repeat: -1,
      });
      this.anims.create({
        key: `Special-${i + 1}-${CAT_ANIMATIONS.WALKING_UP}`,
        frames: this.anims.generateFrameNumbers(`Special-${i + 1}`, {
          start: 12,
          end: 15,
        }),
        frameRate: CATS_FRAME_RATE,
        repeat: -1,
      });
      this.anims.create({
        key: `Special-${i + 1}-${CAT_ANIMATIONS.WALKING_RIGHT}`,
        frames: this.anims.generateFrameNumbers(`Special-${i + 1}`, {
          start: 16,
          end: 19,
        }),
        frameRate: CATS_FRAME_RATE,
        repeat: -1,
      });
      this.anims.create({
        key: `Special-${i + 1}-${CAT_ANIMATIONS.WALKING_LEFT}`,
        frames: this.anims.generateFrameNumbers(`Special-${i + 1}`, {
          start: 20,
          end: 23,
        }),
        frameRate: CATS_FRAME_RATE,
        repeat: -1,
      });
    }
  }

  createCatAnimations(assetType: string, count: number) {
    for (let i = 0; i < count; i++) {
      const assetName = `${assetType}-${i + 1}`;

      this.anims.create({
        key: `${assetType}-${i + 1}-${CAT_ANIMATIONS.IDLE}`,
        frames: this.anims.generateFrameNumbers(assetName, {
          start: 0,
          end: 3,
        }),
        frameRate: CATS_FRAME_RATE,
        repeat: -1,
      });
      this.anims.create({
        key: `${assetType}-${i + 1}-${CAT_ANIMATIONS.SLEEP}`,
        frames: this.anims.generateFrameNumbers(assetName, {
          start: 4,
          end: 7,
        }),
        frameRate: CATS_FRAME_RATE,
        repeat: -1,
      });
      this.anims.create({
        key: `${assetType}-${i + 1}-${CAT_ANIMATIONS.WALKING_DOWN}`,
        frames: this.anims.generateFrameNumbers(assetName, {
          start: 8,
          end: 11,
        }),
        frameRate: CATS_FRAME_RATE,
        repeat: -1,
      });
      this.anims.create({
        key: `${assetType}-${i + 1}-${CAT_ANIMATIONS.WALKING_UP}`,
        frames: this.anims.generateFrameNumbers(assetName, {
          start: 12,
          end: 15,
        }),
        frameRate: CATS_FRAME_RATE,
        repeat: -1,
      });
      this.anims.create({
        key: `${assetType}-${i + 1}-${CAT_ANIMATIONS.WALKING_RIGHT}`,
        frames: this.anims.generateFrameNumbers(assetName, {
          start: 16,
          end: 19,
        }),
        frameRate: CATS_FRAME_RATE,
        repeat: -1,
      });
      this.anims.create({
        key: `${assetType}-${i + 1}-${CAT_ANIMATIONS.WALKING_LEFT}`,
        frames: this.anims.generateFrameNumbers(assetName, {
          start: 20,
          end: 23,
        }),
        frameRate: CATS_FRAME_RATE,
        repeat: -1,
      });
    }
  }
}
