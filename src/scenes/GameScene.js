import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";
import Player from "../objects/Player.js";
import Enemy from "../objects/enemies/Enemy.js";
import TurretEnemy from "../objects/enemies/TurretEnemy.js";
import CoilEnemy from "../objects/enemies/CoilEnemy.js";
import Bullet from "../objects/Bullet.js";
import AudioManager from "../systems/AudioManager.js";
import StageManager from "../systems/StageManager.js";

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
    this.stage = new StageManager(this);

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

    //stage logic
    this.gameState = "playing";
    this.stage.startStage();

    //enemy & player's bullet interaction
    this.physics.add.overlap(
      this.player.bullets,
      this.enemies,
      (bullet, enemy) => {
        bullet.setActive(false);
        bullet.setVisible(false);
        bullet.body.enable = false;

        const isDead = enemy.takeDamage(1);

        if (isDead && this.stage.isStageCleared()) {
          this.onStageClear();
        }
      },
      null,
      this,
    );
  }

  update() {
    this.player.update();
  }

  onStageClear() {
    this.gameState = "clearing";
    this.physics.pause();

    const text = this.add
      .text(400, 300, "STAGE CLEAR", {
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.time.delayedCall(1000, () => {
      text.destroy();

      this.stage.nextStage();
      this.player.resetPosition(200, 300);
      this.player.clearBullets();
      this.physics.resume();
      this.gameState = "playing";
    });
  }

  spawnEnemy(data) {
    let enemy;

    if (data.type === "turret") {
      enemy = new TurretEnemy(this, data.x, data.y);
    } else if (data.type === "coil") {
      enemy = new CoilEnemy(this, data.x, data.y);
    } else {
      enemy = new Enemy(this, data.x, data.y); //this won't be used, just checking to see if super class works
    }

    this.enemies.add(enemy);
  }
}
