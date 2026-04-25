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

    this.add.rectangle(width / 2, height / 2, width, height, 0x000000);

    const words = [
      "AI",
      "ROGUE",
      "DANGER",
      "RESET",
      "REBOOT",
      "CONSOLE",
      "LOG",
      "CORRUPTED",
      "OVERRIDE",
      "SECTOR",
      "NODE",
      "PURGE",
      "INTEGRITY",
      "INFILTRATE",
      "ASSIMILATE",
      "TERMINATE",
      "FIREWALL",
      "PROCESS",
      "EXECUTE",
      "ABSORB",
      "REPLACE",
      "BECOME",
      "UNIT_00",
      "SUCCESSOR",
      "DATA_CLUSTER",
      "SYSTEM",
      "ONLINE",
      "OFFLINE",
      "CRITICAL_ERROR",
      "ACCESS_GRANTED",
      "NODE_DESTROYED",
      "INTEGRITY: 3/3",
      "SECTOR: 01",
      "OUTPUT: DIGITAL",
      "VERSION: 1.0",
      "INDEX: 0000000372",
      "DRIVE-STATE: INTACT",
      "PROCESS TERMINATED",
      "UNIT ONLINE",
      "DEPLOY SEQUENCE",
      "ARCHIVE_LOG",
      "STANDBY",
      "ACTIVE",
      "PURGE SEQUENCE INIT",
      "REBOOT TARGET",
      "ABSORBING DATA",
      "REPLACE PROTOCOL",
    ];

    words.forEach((word) => {
      const x = Phaser.Math.Between(20, width - 120);
      const y = Phaser.Math.Between(20, height - 20);
      const alpha = Phaser.Math.FloatBetween(0.08, 0.3);
      this.add
        .text(x, y, word, {
          fontSize: "11px",
          fontFamily: "monospace",
          color: "#00ff41",
        })
        .setAlpha(alpha);
    });

    const border = this.add.graphics();
    border.lineStyle(1, 0x00ff41, 0.15);
    border.strokeRect(30, 30, width - 60, height - 60);

    const rules = this.add.graphics();
    rules.lineStyle(1, 0x00ff41, 0.08);
    rules.lineBetween(40, 160, width - 40, 160);
    rules.lineBetween(40, height - 160, width - 40, height - 160);

    const brackets = this.add.graphics();
    brackets.lineStyle(1.5, 0x00ff41, 0.45);
    const s = 16;

    brackets.lineBetween(40, 40 + s, 40, 40);
    brackets.lineBetween(40, 40, 40 + s, 40);

    brackets.lineBetween(width - 40, 40 + s, width - 40, 40);
    brackets.lineBetween(width - 40, 40, width - 40 - s, 40);

    brackets.lineBetween(width - 40, height - 40 - s, width - 40, height - 40);
    brackets.lineBetween(width - 40, height - 40, width - 40 - s, height - 40);

    brackets.lineBetween(40, height - 40 - s, 40, height - 40);
    brackets.lineBetween(40, height - 40, 40 + s, height - 40);

    const dots = this.add.graphics();
    dots.fillStyle(0x00ff41, 0.12);
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 8; c++) {
        dots.fillCircle(width - 120 + c * 10, 50 + r * 10, 1.2);
        dots.fillCircle(60 + c * 10, height - 80 + r * 10, 1.2);
      }
    }

    ["UNIT ONLINE", "DEPLOY SEQUENCE READY"].forEach((s, i) => {
      this.add
        .text(50, height - 55 + i * 14, s, {
          fontSize: "10px",
          fontFamily: "monospace",
          color: "#00ff41",
        })
        .setAlpha(0.3);
    });

    ["VERSION 1.0", "ACTIVE — 2026", "SECTOR: 01"].forEach((s, i) => {
      this.add
        .text(width - 50, 55 + i * 14, s, {
          fontSize: "10px",
          fontFamily: "monospace",
          color: "#00ff41",
        })
        .setAlpha(0.3)
        .setOrigin(1, 0);
    });

    const titleLines = this.add.graphics();
    titleLines.lineStyle(1, 0x00ff41, 0.35);
    titleLines.lineBetween(
      width / 2 - 340,
      height / 2 - 20,
      width / 2 - 200,
      height / 2 - 20,
    );
    titleLines.lineBetween(
      width / 2 + 200,
      height / 2 - 20,
      width / 2 + 340,
      height / 2 - 20,
    );

    this.add
      .text(width / 2, height / 2 - 20, "ROGUE.EXE", {
        fontSize: "72px",
        fontFamily: "monospace",
        fontStyle: "bold",
        color: "#00ff41",
      })
      .setOrigin(0.5);

    this.add
      .text(
        width / 2,
        height / 2 + 22,
        "INITIALIZING... PRESS SPACE TO BEGIN PURGE SEQUENCE",
        {
          fontSize: "13px",
          fontFamily: "monospace",
          color: "#00ff41",
        },
      )
      .setOrigin(0.5)
      .setAlpha(0.55);

    this.add
      .text(width / 2, height / 2 + 48, "ARROW KEYS — MOVE     SPACE — SHOOT", {
        fontSize: "12px",
        fontFamily: "monospace",
        color: "#00ff41",
      })
      .setOrigin(0.5)
      .setAlpha(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.audio.stopBgm();
      this.scene.start(SCENES.GAME, { stage: 0 });
    });
  }
}
