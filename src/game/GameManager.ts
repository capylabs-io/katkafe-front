import { CatObject } from "./models/Cat";
import { WallObject } from "./models/Wall";

import Locations from "@/game/config/locations.json";
import { LocationsData, PathData } from "@/types/location";
import { LAYERS } from "@/constants/layers";
import { GuestGenerator } from "./components/GuestGenerator";
import { Staff } from "@/types/common-types";
import { EventBus } from "./EventBus";
import { EVENT_BUS_TYPES } from "@/constants/events";
import { GuestObject } from "./models/Guest";

export class GameManager {
  scene: Phaser.Scene;
  locationsData: LocationsData;

  guestGenerator: GuestGenerator;

  catGroup: Phaser.GameObjects.Group;
  wallGroup: Phaser.GameObjects.Group;
  guestGroup: Phaser.GameObjects.Group;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.locationsData = Locations as LocationsData;
  }

  removeAllCats() {
    this.catGroup.clear(true, false);
  }

  createGroups() {
    this.catGroup = this.scene.add.group();
    this.wallGroup = this.scene.add.group();
    this.guestGroup = this.scene.add.group();
  }

  createCats(cats: Staff[], currentLocation: number, showSpawnPoints = false) {
    if (this.catGroup && this.catGroup.getLength() > 0) this.removeAllCats();
    const spawnPoints =
      this.locationsData[`location-${currentLocation}`].spawnPoints;
    if (showSpawnPoints) this.createEmptyPointsForSpawn(currentLocation);
    for (let i = 0; i < cats.length; i++) {
      const cat = cats[i];
      const catObj = new CatObject(
        this.scene,
        spawnPoints[i].x,
        spawnPoints[i].y,
        cat
      );
      this.catGroup.add(catObj);
    }
  }

  createTempCats(currentLocation: number) {
    const spawnPoints =
      this.locationsData[`location-${currentLocation}`].spawnPoints;
    for (let i = 0; i < spawnPoints.length; i++) {
      const cat = new CatObject(
        this.scene,
        spawnPoints[i].x,
        spawnPoints[i].y,
        {} as Staff
      );
      this.catGroup.add(cat);
    }
  }

  private createEmptyPointsForSpawn(currentLocation: number) {
    const spawnPoints =
      this.locationsData[`location-${currentLocation}`].spawnPoints;
    for (let i = 0; i < spawnPoints.length; i++) {
      const point = spawnPoints[i];
      const renderedPoint = new Phaser.GameObjects.Rectangle(
        this.scene,
        point.x,
        point.y,
        8,
        8,
        0x00ff00
      ).setDepth(LAYERS.DEBUG);
      this.scene.add.existing(renderedPoint);
    }
  }

  generateGuests(currentLocation: number, showPath = false) {
    const paths = this.locationsData[`location-${currentLocation}`].paths;
    if (this.guestGroup.getLength() > 0) this.guestGenerator.removeAllGuests();
    if (showPath) this.createEmptyPointsForPaths(paths);
    this.guestGenerator = new GuestGenerator(this, this.scene, paths);
    this.guestGenerator.play();
  }

  private createEmptyPointsForPaths(paths: PathData[]) {
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      this.createEmptyPointsForPath(path);
    }
  }

  private createEmptyPointsForPath(points: PathData) {
    const renderedPoints = [];
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const renderedPoint = new Phaser.GameObjects.Rectangle(
        this.scene,
        point.position.x,
        point.position.y,
        8,
        8,
        0x00ff00
      );
      renderedPoint.setDepth(LAYERS.DEBUG);
      renderedPoints.push(renderedPoint);
      this.scene.add.existing(renderedPoint);
    }
    return renderedPoints;
  }

  createWalls() {
    this.wallGroup.addMultiple([
      new WallObject(this.scene, 0, 358, 36, 296),
      new WallObject(this.scene, 384 / 2 - 16, 226, 384, 32),
      new WallObject(this.scene, 384 - 36, 358, 32, 296),
      new WallObject(this.scene, 384 / 2 - 16, 554 - 64, 384, 32),
    ]);
  }
}
