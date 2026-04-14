import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";
import Player from "../objects/Player.js";
import Enemy from "../objects/Enemy.js";
import Bullet from "../objects/Bullet.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super(SCENES.GAME);
  }

  create() {
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

    //bullet & enemy interaction
    this.physics.add.overlap(
      this.player.bullets,
      this.enemy,
      (bullet, enemy) => {
        bullet.setActive(false);
        bullet.setVisible(false);
        bullet.body.enable = false;

        const isDead = enemy.takeDamage(1);
        if (isDead) {
          console.log("enemy dead!");
        }
      },
      null,
      this,
    );

    //enemy & player interaction
    this.physics.add.overlap(
      this.player.bullets,
      this.enemies,
      (bullet, enemy) => {
        bullet.setActive(false);
        bullet.setVisible(false);
        bullet.body.enable = false;

        const isDead = enemy.takeDamage(1);

        if (isDead) {
          console.log("enemy dead!");
          this.scene.start(SCENES.GAME_OVER);
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
