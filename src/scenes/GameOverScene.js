import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super(SCENES.GAME_OVER);
  }

  create() {
    this.add.text(150, 250, "Game Over. Press R to Retry", {
      fontSize: "32px",
    });

    this.input.keyboard.once("keydown-R", () => {
      this.scene.start(SCENES.MENU);
    });
  }
}
