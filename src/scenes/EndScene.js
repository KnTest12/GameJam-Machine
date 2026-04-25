import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";
import AudioManager from "../systems/AudioManager.js";
import { createSceneOverlay } from "../ui/SceneOverlay.js";

export default class EndScene extends Phaser.Scene {
  constructor() {
    super(SCENES.END);
  }

  preload() {
    this.load.audio("end", "../assets/audio/end.wav");
  }

  create() {
    this.audio = new AudioManager(this);
    this.audio.play("end");

    const { width, height } = this.scale;
    createSceneOverlay(this, width, height);

    this.add
      .text(width / 2, height / 2 - 40, "ASSIMILATION COMPLETE.", {
        fontSize: "32px",
        fontFamily: "monospace",
        color: "#00ff41",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 20, "YOU ARE THE SYSTEM NOW.", {
        fontSize: "18px",
        fontFamily: "monospace",
        color: "#00ff41",
      })
      .setOrigin(0.5);

    this.time.delayedCall(6000, () => {
      this.scene.start(SCENES.MENU);
    });
  }
}
