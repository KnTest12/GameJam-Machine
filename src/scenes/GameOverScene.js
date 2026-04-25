import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";
import { createSceneOverlay } from "../ui/SceneOverlay.js";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super(SCENES.GAME_OVER);
  }

  create() {
    const stage = this.scene.settings.data?.stage || 0;
    const { width, height } = this.scale;
    createSceneOverlay(this, width, height);

    this.add
      .text(
        width / 2,
        height / 2,
        "PROCESS TERMINATED. Press R to reboot from last restore point.",
        {
          fontSize: "32px",
          fontFamily: "monospace",
          color: "#00ff41",
          align: "center",
          wordWrap: { width: width - 160 },
        },
      )
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-R", () => {
      this.scene.start(SCENES.GAME, { stage });
    });
  }
}
