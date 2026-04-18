import * as Phaser from "phaser";

import MenuScene from "./scenes/MenuScene.js";
import GameScene from "./scenes/GameScene.js";
import GameOverScene from "./scenes/GameOverScene.js";
import EndScene from "./scenes/EndScene.js";

import GridManager from "./systems/GridManager.js";

const grid = new GridManager();

const config = {
  type: Phaser.AUTO,
  width: grid.width,
  height: grid.height,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#1d1d1d",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [MenuScene, GameScene, GameOverScene, EndScene],
};

new Phaser.Game(config);
