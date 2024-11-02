import {
  MINIGAME_BACKGROUND_MUSIC,
  MINIGAME_SFX_TYPES,
  RAID_ANIMATION_DURATION_DELAY,
} from "./../../constants/mini-game";
import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { GameManager } from "../GameManager";
import { GameUI } from "../ui/GameUI";
import { SoundManager } from "../SoundManager";
import { AUDIO_EVENTS, EVENT_BUS_TYPES } from "@/constants/events";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import { getRestaurant } from "@/requests/restaurant";
import { Restaurant } from "@/types/restaurant";
import {
  MINIGAME_ANIMATION,
  MINIGAME_SFX,
  MINIGAME_VFX,
  MINIGAME_VFX_TYPES,
  RAID_ANIMATION_COUNT,
  RAID_ANIMATION_DURATION,
} from "@/constants/mini-game";
import { GAME_HEIGHT, GAME_WIDTH } from "@/constants/config";
import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";
import { MINI_GAME_MODULES } from "@/types/mini-game";
import { get } from "lodash";
import { LAYERS } from "@/constants/layers";

let target: any;
let explosions: any;
let fires: any;
let shields: any;
let cinematicActive = true;

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;

  gameUI: GameUI;
  gameManager: GameManager;
  soundManager: SoundManager;

  currentLocation: number;
  restaurantSubscriber: any;

  constructor() {
    super("Game");
    this.gameUI = new GameUI(this);
    this.gameManager = new GameManager(this);
  }

  async generateCatsByRestaurant(restaurant: Restaurant) {
    const response = await getRestaurant(restaurant._id);
    this.gameManager.createCats(response.cats, restaurant.order);
    this.gameManager.generateGuests(restaurant.order);
  }

  async onChooseNewRestaurant(restaurant?: Restaurant | null) {
    if (!restaurant) return;
    try {
      this.gameUI.enableLoadingLocation();
      this.currentLocation = restaurant.order;
      await this.generateCatsByRestaurant(restaurant!);
      this.gameUI.drawLocation(this.currentLocation);
    } catch (error) {
      console.error(error);
      EventBus.emit(EVENT_BUS_TYPES.IN_GAME_ERROR, error);
    } finally {
      this.gameUI.disableLoadingLocation();
    }

    const isRaiding =
      useMiniGameStore.getState().currentModule === MINI_GAME_MODULES.RAIDING;
    const minigameState = useMiniGameStore.getState();
    const isBlocked =
      get(minigameState, "raidResult.status", "success") === "blocked";

    fires && fires.clear(true, true);
    shields && shields.clear(true, true);
    target && target.destroy();

    this.soundManager.stopAllSounds();

    if (isRaiding) {
      cinematicActive = true;
      this.animateRaid(isBlocked);
      this.soundManager.playSFX(
        `${MINIGAME_SFX}-${MINIGAME_SFX_TYPES.BACKGROUND_MUSIC}`,
        {
          loop: true,
        }
      );
    } else {
      this.soundManager.playAmbience();
      this.soundManager.playBGM();
    }
  }

  async animateRaid(isBlocked = false) {
    // Create target
    target = this.physics.add.image(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      `${MINIGAME_VFX}-${MINIGAME_VFX_TYPES.MARK}`
    );
    target.setScale(0.8);
    target.setOrigin(0.5, 0.5);
    target.setDepth(LAYERS.RAID_MARK);

    // Create explosions group
    explosions = this.physics.add.group();
    fires = this.physics.add.group();
    shields = this.physics.add.group();

    // Start the cinematic
    this.time.addEvent({
      delay: RAID_ANIMATION_DURATION / RAID_ANIMATION_COUNT,
      callback: () => this.animateTarget(isBlocked),
      callbackScope: this,
      loop: true,
    });

    const raidDuration =
      RAID_ANIMATION_DURATION + RAID_ANIMATION_DURATION_DELAY;
    // Call the callback function after cinematic duration
    this.time.delayedCall(raidDuration, this.finishAnimateRaid, [], this);
  }

  async animateTarget(isBlocked = false) {
    if (!cinematicActive) return;
    // Move the target to a random position
    const randomX = Phaser.Math.Between(0, GAME_WIDTH);
    const randomY = Phaser.Math.Between(0, GAME_HEIGHT);

    // Tween for smooth movement
    this.tweens.add({
      targets: target,
      x: randomX,
      y: randomY,
      duration: 1000, // Duration of the movement in milliseconds
      ease: "Power2", // Easing function
      onComplete: () => {
        // Create explosion when movement is complete
        this.soundManager.playSFX(
          `${MINIGAME_SFX}-${MINIGAME_SFX_TYPES.SHOOT}`,
          {
            volume: 0.6,
          }
        );
        if (isBlocked) this.createShieldImage(randomX, randomY);
        else this.createExplosion(randomX, randomY);
      },
    });
  }

  createShieldImage(x, y) {
    const shield = shields.create(
      x,
      y,
      `${MINIGAME_VFX}-${MINIGAME_VFX_TYPES.SHIELD}`
    );
    shield.setOrigin(0.5, 0.5);
    shield.setScale(0.5); // Adjust scale as needed
    shield.setAlpha(0);
    shield.setDepth(LAYERS.RAID_OBJECTS);

    this.soundManager.playSFX(`${MINIGAME_SFX}-${MINIGAME_SFX_TYPES.SHIELD}`, {
      volume: 0.8,
    });

    // Fade in the shield  effect
    this.tweens.add({
      targets: shield,
      alpha: 1,
      duration: RAID_ANIMATION_DURATION / RAID_ANIMATION_COUNT,
      onComplete: () => {
        // Optional: Set a duration for how long the fire lasts
        this.soundManager.playSFX(
          `${MINIGAME_SFX}-${MINIGAME_SFX_TYPES.SHIELD}`
        );
        this.tweens.add({
          targets: shield,
          alpha: 0, // Fade out
          duration: RAID_ANIMATION_DURATION / RAID_ANIMATION_COUNT,
          onComplete: () => {
            shield.destroy(); // Clean up the fire
          },
        });
      },
    });
  }

  createExplosion(x, y) {
    const explosion = explosions.create(
      x,
      y,
      `${MINIGAME_VFX}-${MINIGAME_VFX_TYPES.BOOM}`
    );
    explosion.play(`${MINIGAME_ANIMATION}-${MINIGAME_VFX_TYPES.BOOM}`);
    explosion.setOrigin(0.5, 0.5);
    explosion.setScale(0.6);
    explosion.setDepth(LAYERS.RAID_OBJECTS);

    this.soundManager.playSFX(
      `${MINIGAME_SFX}-${MINIGAME_SFX_TYPES.EXPLOSION}`,
      {
        volume: 0.6,
      }
    );

    explosion.on("animationcomplete", () => {
      this.createFire(x, y); // Create fire after the explosion animation completes
      explosion.destroy(); // Clean up the explosion sprite
    });
  }

  createFire(x, y) {
    const fire = fires.create(
      x,
      y,
      `${MINIGAME_VFX}-${MINIGAME_VFX_TYPES.FIRE}`
    );
    this.soundManager.playSFX(`${MINIGAME_SFX}-${MINIGAME_SFX_TYPES.FIRE}`, {
      loop: true,
      volume: 0.6,
    });
    fire.play(`${MINIGAME_ANIMATION}-${MINIGAME_VFX_TYPES.FIRE}`);
    fire.setOrigin(0.5, 0.5);
    fire.setScale(0.35);
    fire.setDepth(LAYERS.RAID_OBJECTS);
  }

  async finishAnimateRaid() {
    console.log("Cinematic scene finished!");
    cinematicActive = false; // Mark cinematic as inactive
    target.setAlpha(0);

    this.tweens.killAll();
    // Remove all timed events
    this.time.removeAllEvents();

    EventBus.emit(EVENT_BUS_TYPES.SHOW_RAID_RESULT);
    this.soundManager.playSFX(`${MINIGAME_SFX}-${MINIGAME_SFX_TYPES.SUCCESS}`, {
      volume: 0.75,
    });
    // You can trigger further actions or scenes here
  }

  init() {
    // Events
    EventBus.on(
      AUDIO_EVENTS.PLAY_SFX,
      (key: string, config?: Phaser.Types.Sound.SoundConfig) => {
        this.soundManager.playSFX(key, config);
      },
      this.scene
    );
    EventBus.on(
      AUDIO_EVENTS.STOP_BGM,
      () => {
        this.soundManager.stopBGM();
      },
      this.scene
    );
    EventBus.on(
      AUDIO_EVENTS.STOP_AMBIENCE,
      () => {
        this.soundManager.stopAmbience();
      },
      this.scene
    );
  }

  create() {
    this.gameUI.drawLoadingLocation();
    this.soundManager = new SoundManager(
      this,
      // @ts-ignore: Unreachable code error
      Phaser.Sound.SoundManagerCreator.create(this.game),
      // @ts-ignore: Unreachable code error
      Phaser.Sound.SoundManagerCreator.create(this.game)
    );

    this.restaurantSubscriber = useRestaurantStore.subscribe(
      (state) => state.currentRestaurant,
      (newRestaurant, restaurant) => this.onChooseNewRestaurant(newRestaurant)
    );

    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.gameManager.createGroups();
    this.gameManager.createWalls();

    this.physics.world.addCollider(
      this.gameManager.catGroup,
      this.gameManager.wallGroup
    );
    this.physics.world.addCollider(
      this.gameManager.catGroup,
      this.gameManager.catGroup
    );
    this.physics.world.addCollider(
      this.gameManager.guestGroup,
      this.gameManager.wallGroup
    );
    this.physics.world.addCollider(
      this.gameManager.guestGroup,
      this.gameManager.guestGroup
    );
    this.onChooseNewRestaurant(
      useRestaurantStore.getState().currentRestaurant!
    );

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.restaurantSubscriber();
    });

    EventBus.emit(EVENT_BUS_TYPES.SCENE_READY, this);

    // Audios
    // this.soundManager.playBGM();
    // this.soundManager.playAmbience();
  }
}
