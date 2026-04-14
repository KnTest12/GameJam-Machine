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
    this.enemies.create(600, 300);
    this.enemies.create(500, 250);
    this.enemies.create(500, 350);

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
          if (this.enemies.countActive() === 0) {
            this.scene.start(SCENES.GAME_OVER);
          }
        }
      },
      null,
      this,
    );
  }

  update() {
    this.player.update();
  }
}
