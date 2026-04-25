import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";
import AudioManager from "../systems/AudioManager.js";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENES.MENU);
  }

  preload() {
    this.load.audio("menu", "../assets/audio/menu.wav");
  }

  create() {
    this.audio = new AudioManager(this);
    this.audio.playBgm("menu");

    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 - 80, "ROGUE.EXE", {
        fontSize: "48px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(
        width / 2,
        height / 2,
        "INITIALIZING... Press SPACE to begin purge sequence.",
        {
          fontSize: "24px",
          fill: "#aaaaaa",
        },
      )
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 60, "ARROW KEYS — move     SPACE — shoot", {
        fontSize: "16px",
        fill: "#666666",
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.audio.stopBgm();
      this.scene.start(SCENES.GAME, { stage: 0 });
    });
  }
}
