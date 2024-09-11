import {
    DEFAULT_AMBIENCE_CONFIG,
    DEFAULT_AMBIENCE_KEY,
    DEFAULT_BGM_CONFIG,
    DEFAULT_BGM_KEY,
    DEFAULT_SFX_CONFIG,
} from "./../constants/audio";

export class SoundManager {
    scene: Phaser.Scene;
    bgm: Phaser.Sound.BaseSoundManager;
    sfx: Phaser.Sound.BaseSoundManager;

    constructor(
        scene: Phaser.Scene,
        musicAudioManager: Phaser.Sound.BaseSoundManager,
        soundAudioManager: Phaser.Sound.BaseSoundManager
    ) {
        this.scene = scene;
        this.bgm = musicAudioManager;
        this.sfx = soundAudioManager;
    }

    playBGM(config?: Phaser.Types.Sound.SoundConfig) {
        this.bgm.stopByKey(DEFAULT_BGM_KEY);
        this.bgm.play(DEFAULT_BGM_KEY, {
            ...DEFAULT_BGM_CONFIG,
            ...config,
        });
    }

    playAmbience(config?: Phaser.Types.Sound.SoundConfig) {
        this.bgm.stopByKey(DEFAULT_AMBIENCE_KEY);
        this.bgm.play(DEFAULT_AMBIENCE_KEY, {
            ...DEFAULT_AMBIENCE_CONFIG,
            ...config,
        });
    }

    stopBGM() {
        if (this.bgm) {
            this.bgm.stopByKey(DEFAULT_BGM_KEY);
        }
    }

    stopAmbience() {
        if (this.bgm) {
            this.bgm.stopByKey(DEFAULT_AMBIENCE_KEY);
        }
    }

    playSFX(key: string, config?: Phaser.Types.Sound.SoundConfig) {
        this.sfx.play(key, {
            ...DEFAULT_SFX_CONFIG,
            ...config,
        });
    }
}

