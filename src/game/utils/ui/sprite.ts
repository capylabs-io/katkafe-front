import { LAYERS } from "@/constants/layers";
import { Scene } from "phaser";

export const drawBackground = (scene: Scene, sptName: string) => {
    const sprite = scene.add.image(
        scene.cameras.main.width / 2,
        scene.cameras.main.height / 2,
        sptName
    );
    let scaleX = scene.cameras.main.width / sprite.width;
    let scaleY = scene.cameras.main.height / sprite.height;
    let scale = Math.max(scaleX, scaleY);
    sprite.setScale(scale).setScrollFactor(0);
    sprite.setDepth(LAYERS.BACKGROUND);
    return sprite;
};

export const drawSprite = (
    scene: Scene,
    name: string,
    posX: number = 0,
    posY: number = 0,
    scale: number = 1,
    layer: number = LAYERS.UI,
    onClick?: Function
) => {
    const sprite = scene.add.image(posX, posY, name);
    sprite.setScale(scale);
    sprite.setDepth(layer);
    onClick && sprite.setInteractive().on("pointerdown", onClick);
    return sprite;
};

export const drawSpriteButton = (
    scene: Scene,
    name: string,
    posX: number = 0,
    posY: number = 0,
    scale: number = 1,
    layer: number = LAYERS.UI,
    text: {
        title: string;
        offset: number;
    },
    onClick?: Function
) => {
    const sprite = drawSprite(scene, name, posX, posY, scale, layer, onClick);
    const txt = scene.add.text(posX, posY + text.offset, text.title, {
        fontFamily: "Pixelify Sans",
        fontSize: 14,
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
    });
    txt.setOrigin(0.5);
    txt.setDepth(layer + 1);

    return {
        sprite,
        text: txt,
    };
};

