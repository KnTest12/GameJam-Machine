import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";
import Player from "../objects/Player.js";
import Enemy from "../objects/Enemy.js";
import Bullet from "../objects/Bullet.js";
import AudioManager from "../systems/AudioManager.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super(SCENES.GAME);
  }

  preload() {
    this.load.audio("playerShoot", "../assets/audio/playerShoot.wav");
    this.load.audio("enemyHit", "../assets/audio/enemyHit.wav");
    this.load.audio("enemyDeath", "../assets/audio/enemyDeath.wav");
  }

  create() {
    this.audio = new AudioManager(this);

    this.physics.world.setBounds(0, 0, 800, 600);

    //placeholders texture
    const playerGfx = this.make.graphics({ x: 0, y: 0, add: false });
    playerGfx.fillStyle(0x00ff00);
    playerGfx.fillRect(0, 0, 30, 30);
    playerGfx.generateTexture("player", 30, 30);

    const enemyGfx = this.make.graphics({ x: 0, y: 0, add: false });
    enemyGfx.fillStyle(0xff0000);
    enemyGfx.fillRect(0, 0, 30, 30);
    enemyGfx.generateTexture("enemy", 30, 30);

    const bulletGfx = this.make.graphics({ x: 0, y: 0, add: false });
    bulletGfx.fillStyle(0xffff00);
    bulletGfx.fillRect(0, 0, 10, 6);
    bulletGfx.generateTexture("bullet", 10, 6);

    //spawn objects
    this.player = new Player(this, 200, 300);
    this.enemies = this.physics.add.group({
      classType: Enemy,
    });

    //stage logic temporary
    this.currentStage = 1;
    this.loadStage(this.currentStage);
    this.events.on("stageClear", this.onStageClear, this);

    //enemy & player's bullet interaction
    this.physics.add.overlap(
      this.player.bullets,
      this.enemies,
      (bullet, enemy) => {
        bullet.setActive(false);
        bullet.setVisible(false);
        bullet.body.enable = false;

        const isDead = enemy.takeDamage(1);

        if (isDead) {
          this.checkStageClear();
        }
      },
      null,
      this,
    );
  }

  update() {
    this.player.update();
  }

  //temp
  loadStage(stage) {
    this.enemies.clear(true, true);

    switch (stage) {
      case 1:
        this.enemies.create(600, 300);
        break;

      case 2:
        this.enemies.create(600, 200);
        this.enemies.create(600, 400);
        break;

      case 3:
        this.enemies.create(500, 150);
        this.enemies.create(600, 300);
        this.enemies.create(500, 450);
        break;
    }
  }

  //temp
  checkStageClear() {
    if (this.enemies.countActive() === 0) {
      this.events.emit("stageClear", this.currentStage);
    }
  }

  //temp
  onStageClear(stage) {
    this.physics.pause();

    const text = this.add
      .text(400, 300, "STAGE CLEAR", {
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.time.delayedCall(1000, () => {
      text.destroy();

      this.currentStage++;
      this.resetPlayer();

      if (this.currentStage > 3) {
        this.scene.start(SCENES.GAME_OVER);
      } else {
        this.loadStage(this.currentStage);
        this.physics.resume();
      }
    });
  }

  //temp
  resetPlayer() {
    this.player.setPosition(200, 300);
    this.player.setVelocity(0, 0);
  }
}
