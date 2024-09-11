import {
  ACTIVE_AREA,
  ASSETS,
  ASSET_SCALE,
  GAME_HEIGHT,
  GAME_WIDTH,
  LOCATION_ASSETS,
} from "@/constants/config";
import {
  drawBackground,
  drawSprite,
  drawSpriteButton,
} from "../utils/ui/sprite";
import { LAYERS } from "@/constants/layers";
import { EventBus } from "../EventBus";
import { EVENT_BUS_TYPES, UI_BUTTON } from "@/constants/events";
import Locations from "@/game/config/locations.json";
import { LocationsData } from "@/types/location";

export class GameUI {
  locationsData: LocationsData;

  //Loading Location
  loadingBg: Phaser.GameObjects.Image;
  loadingLogo: Phaser.GameObjects.Image;
  loadingText: Phaser.GameObjects.Text;

  //Texts
  gameText: Phaser.GameObjects.Text;
  txtQuest: Phaser.GameObjects.Text;
  txtFriend: Phaser.GameObjects.Text;
  txtRank: Phaser.GameObjects.Text;

  //Images
  background: Phaser.GameObjects.Image;
  btnQuest: Phaser.GameObjects.Image;
  btnRank: Phaser.GameObjects.Image;
  btnFriend: Phaser.GameObjects.Image;

  //States
  isLoadingUI: boolean;

  scene: Phaser.Scene;
  uiGroup: Phaser.GameObjects.Group;
  loadingGroup: Phaser.GameObjects.Group;

  constructor(scene: Phaser.Scene) {
    this.isLoadingUI = false;
    this.scene = scene;
    this.locationsData = Locations as LocationsData;
  }

  drawLoadingLocation() {
    this.loadingGroup = this.scene.add.group();
    this.loadingBg = drawBackground(this.scene, ASSETS.DEFAULT_BACKGROUND);
    this.loadingBg.setSize(GAME_WIDTH, GAME_HEIGHT).setDepth(LAYERS.DEBUG);

    this.loadingLogo = drawSprite(
      this.scene,
      ASSETS.LOGO,
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      1 / 8,
      LAYERS.DEBUG
    );

    this.loadingText = this.scene.add.text(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2 + 64,
      "Opening Restaurant...",
      {
        fontFamily: "Pixelify Sans",
        fontSize: 22,
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
    );
    this.loadingText.setOrigin(0.5);
    this.loadingText.setDepth(LAYERS.DEBUG);

    this.loadingGroup.add(this.loadingBg);
    this.loadingGroup.add(this.loadingLogo);
    this.loadingGroup.add(this.loadingText);
  }

  disableLoadingLocation() {
    this.loadingGroup.setVisible(false);
  }

  enableLoadingLocation() {
    this.loadingGroup.setVisible(true);
  }

  drawLocation(currentLocation: number) {
    if (this.uiGroup && this.uiGroup.getLength() > 0)
      this.uiGroup.clear(true, true);
    else this.uiGroup = this.scene.add.group();

    const assets = this.locationsData[`location-${currentLocation}`].assets;

    this.uiGroup.add(
      drawBackground(
        this.scene,
        `${LOCATION_ASSETS.BACKGROUND}-${currentLocation}`
      )
    );

    this.uiGroup.add(
      this.scene.add
        .text(GAME_WIDTH / 2, 402, "Collect", {
          fontFamily: "Pixelify Sans",
          fontSize: 36,
          color: "#ffffff",
          stroke: "#5D5D5D",
          strokeThickness: 3,
          align: "center",
          shadow: {
            offsetX: 0,
            offsetY: 2,
            color: "#000000",
            fill: true,
          },
        })
        .setDepth(LAYERS.OBJECT)
        .setOrigin(0.5, 0.5)
        .setAlpha(0.5)
    );

    const renderedBtnQuest = drawSpriteButton(
      this.scene,
      `${LOCATION_ASSETS.BTN_QUEST}-${currentLocation}`,
      assets[LOCATION_ASSETS.BTN_QUEST].x,
      assets[LOCATION_ASSETS.BTN_QUEST].y,
      ASSET_SCALE,
      LAYERS.OBJECT,
      {
        title: "Quest",
        offset: 36,
      },
      () => EventBus.emit(EVENT_BUS_TYPES.UI_BUTTON_CLICK, UI_BUTTON.QUEST)
    );
    this.uiGroup.add(renderedBtnQuest.sprite);
    this.uiGroup.add(renderedBtnQuest.text);

    const renderedBtnRank = drawSpriteButton(
      this.scene,
      `${LOCATION_ASSETS.BTN_RANK}-${currentLocation}`,
      assets[LOCATION_ASSETS.BTN_RANK].x,
      assets[LOCATION_ASSETS.BTN_RANK].y,
      ASSET_SCALE,
      LAYERS.OBJECT,
      {
        title: "Rank",
        offset: 64,
      },
      () => EventBus.emit(EVENT_BUS_TYPES.UI_BUTTON_CLICK, UI_BUTTON.RANK)
    );
    this.uiGroup.add(renderedBtnRank.sprite);
    this.uiGroup.add(renderedBtnRank.text);

    const renderedBtnFriend = drawSpriteButton(
      this.scene,
      `${LOCATION_ASSETS.BTN_FRIEND}-${currentLocation}`,
      assets[LOCATION_ASSETS.BTN_FRIEND].x,
      assets[LOCATION_ASSETS.BTN_FRIEND].y,
      ASSET_SCALE,
      LAYERS.OBJECT,
      {
        title: "Friend",
        offset: 64,
      },
      () => EventBus.emit(EVENT_BUS_TYPES.UI_BUTTON_CLICK, UI_BUTTON.FRIEND)
    );
    this.uiGroup.add(renderedBtnFriend.sprite);
    this.uiGroup.add(renderedBtnFriend.text);
  }
}
