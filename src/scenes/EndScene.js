import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";

export default class EndScene extends Phaser.Scene {
  constructor() {
    super(SCENES.END);
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 - 40, "ASSIMILATION COMPLETE.", {
        fontSize: "32px",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 20, "YOU ARE THE SYSTEM NOW.", {
        fontSize: "18px",
        color: "#aaaaaa",
      })
      .setOrigin(0.5);

    this.time.delayedCall(5000, () => {
      this.scene.start(SCENES.MENU);
    });
  }
}
