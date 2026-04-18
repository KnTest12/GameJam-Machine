import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super(SCENES.GAME_OVER);
  }

  create() {
    const stage = this.scene.settings.data?.stage || 0;

    this.add.text(
      150,
      250,
      "PROCESS TERMINATED. Press R to reboot from last restore point.",
      {
        fontSize: "32px",
      },
    );

    this.input.keyboard.once("keydown-R", () => {
      this.scene.start(SCENES.GAME, { stage });
    });
  }
}
