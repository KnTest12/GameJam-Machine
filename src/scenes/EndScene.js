import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";

export default class EndScene extends Phaser.Scene {
  constructor() {
    super(SCENES.END);
  }

  create() {
    this.add.text(150, 250, "ASSIMILATION COMPLETE.", {
      fontSize: "32px",
    });

    this.add
      .text(400, 310, "YOU ARE THE SYSTEM NOW.", {
        fontSize: "18px",
        color: "#aaaaaa",
      })
      .setOrigin(0.5);

    this.time.delayedCall(5000, () => {
      this.scene.start(SCENES.MENU);
    });
  }
}
