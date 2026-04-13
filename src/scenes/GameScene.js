import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super(SCENES.GAME);
  }

  create() {
    this.add
      .text(400, 260, "This is the GameScene", {
        fontSize: "48px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);
  }
}
