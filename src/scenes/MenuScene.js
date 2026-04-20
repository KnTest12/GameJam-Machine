import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENES.MENU);
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 - 80, "Placeholder Title Machine", {
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

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start(SCENES.GAME, { stage: 0 });
    });
  }
}
