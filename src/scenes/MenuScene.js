import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENES.MENU);
  }

  create() {
    this.add
      .text(400, 260, "Placeholder Title Machine", {
        fontSize: "48px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(400, 340, "INITIALIZING... Press SPACE to begin purge sequence.", {
        fontSize: "24px",
        fill: "#aaaaaa",
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start(SCENES.GAME);
    });
  }
}
