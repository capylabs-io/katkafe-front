import { GameManager } from "./../GameManager";
import {
  CAT_BASE_COUNT,
  CAT_CONFIGS,
  GUEST_MAX_GEN_DELAY,
  GUEST_MIN_GEN_DELAY,
  MAX_GUESTS,
  SPECIAL_CHARACTER_COUNT,
  SPECIAL_GUEST_PERCENTAGE,
} from "@/constants/config";
import { GuestObject } from "../models/Guest";
import { PathData } from "@/types/location";

export class GuestGenerator {
  gameManager: GameManager;
  scene: Phaser.Scene;

  paths: PathData[] = [];

  private guestGeneratorTimer: Phaser.Time.TimerEvent;

  constructor(
    gameManager: GameManager,
    scene: Phaser.Scene,
    paths: PathData[]
  ) {
    this.gameManager = gameManager;
    this.scene = scene;
    this.paths = paths;
  }

  play(startImmediately = true) {
    if (startImmediately) {
      this.generateGuest();
    }
    this.resetGeneratorTimer();
  }

  resetGeneratorTimer() {
    if (this.guestGeneratorTimer) {
      this.guestGeneratorTimer.remove();
    }
    this.guestGeneratorTimer = this.scene.time.addEvent({
      delay: Phaser.Math.Between(GUEST_MIN_GEN_DELAY, GUEST_MAX_GEN_DELAY),
      callback: this.generateGuest,
      callbackScope: this,
      loop: false,
    });
  }

  removeAllGuests() {
    this.gameManager.guestGroup.clear(true, false);
    this.guestGeneratorTimer.remove();
  }

  generateGuest() {
    if (this.gameManager.guestGroup.getLength() < MAX_GUESTS) {
      const rndPathIndex = Phaser.Math.Between(0, this.paths.length - 1);
      const rndGuestAsset = this.randomGuestCatAsset();
      this.gameManager.guestGroup.add(
        new GuestObject(
          this.scene,
          rndGuestAsset.index,
          this.paths[rndPathIndex],
          rndGuestAsset.isSpecial
        )
      );
    }
    this.resetGeneratorTimer();
  }

  private randomGuestCatAsset() {
    const rnd = Phaser.Math.Between(1, 100);
    if (rnd <= SPECIAL_GUEST_PERCENTAGE)
      return {
        isSpecial: true,
        index: Phaser.Math.Between(1, SPECIAL_CHARACTER_COUNT),
      };
    else
      return {
        isSpecial: false,
        index: Phaser.Math.Between(1, CAT_BASE_COUNT),
      };
  }
}
