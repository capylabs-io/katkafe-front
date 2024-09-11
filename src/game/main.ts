import { Boot } from "./scenes/Boot";
import { GameOver } from "./scenes/GameOver";
import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { GAME_HEIGHT, GAME_WIDTH } from "@/constants/config";
import WebFontLoader from "webfontloader";

//TODO: Add all the scenes here
export const GAME_SCENES = [Boot, Preloader, MainMenu, MainGame, GameOver];

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "game-container",
  scene: GAME_SCENES,
  scale: {
    mode: Phaser.Scale.NONE,
    parent: "game-container",
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
      // debug: true,
      // debugShowBody: true,
      // debugShowStaticBody: true,
    },
  },
};

const StartGame = (parent: string) => {
  try {
    // (window as any).Telegram.WebApp.expand();
    //@TODO: load config from server here

    //@TODO: load plugins

    //@TODO: load webfont
    WebFontLoader.load({
      google: {
        families: ["Pixelify Sans"],
      },
      active: () => {
        console.log("Fonts loaded");
      },
    });

    return new Game({ ...config, parent });
  } catch (error) {
    console.error("Failed to launch the game.", error);
    return null;
  }
};

export default StartGame;
