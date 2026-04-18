import * as Phaser from "phaser";
import { SCENES } from "../constants/scenes.js";
import Player from "../objects/Player.js";
import { Enemy, EnemyMap } from "../objects/enemies";
import AudioManager from "../systems/AudioManager.js";
import StageManager from "../systems/StageManager.js";
import GridManager from "../systems/GridManager.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super(SCENES.GAME);
  }

  preload() {
    this.load.audio("playerShoot", "../assets/audio/playerShoot.wav");
    this.load.audio("enemyHit", "../assets/audio/enemyHit.wav");
    this.load.audio("enemyDeath", "../assets/audio/enemyDeath.wav");
    this.load.image(
      "placeholderbackground",
      "../assets/placeholderbackground.png",
    );
  }

  create() {
    const startStage = this.scene.settings.data?.stage || 0;

    this.audio = new AudioManager(this);
    this.stage = new StageManager(this, startStage);
    this.grid = new GridManager(this);

    this.physics.world.setBounds(0, 0, this.grid.width, this.grid.height);
    this.add.image(
      this.grid.width / 2,
      this.grid.height / 2,
      "placeholderbackground",
    );
    this.drawGrid();

    //placeholders texture
    const playerGfx = this.make.graphics({ x: 0, y: 0, add: false });
    playerGfx.fillStyle(0x00ff00);
    playerGfx.fillRect(0, 0, 30, 30);
    playerGfx.generateTexture("player", 30, 30);

    const enemyGfx = this.make.graphics({ x: 0, y: 0, add: false });
    enemyGfx.fillStyle(0xff0000);
    enemyGfx.fillRect(0, 0, 30, 30);
    enemyGfx.generateTexture("enemy", 30, 30);

    enemyGfx.clear();
    enemyGfx.fillStyle(0x0000ff);
    enemyGfx.fillRect(0, 0, 30, 30);
    enemyGfx.generateTexture("turret", 30, 30);

    enemyGfx.clear();
    enemyGfx.fillStyle(0xffffff);
    enemyGfx.fillRect(0, 0, 30, 30);
    enemyGfx.generateTexture("coil", 30, 30);

    const bulletGfx = this.make.graphics({ x: 0, y: 0, add: false });
    bulletGfx.fillStyle(0xffff00);
    bulletGfx.fillRect(0, 0, 10, 6);
    bulletGfx.generateTexture("bullet", 10, 6);

    //spawn objects
    const startCol = 0;
    const startRow = 1;
    this.player = new Player(this, this.grid, startCol, startRow);
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

    this.delayMovementAfterShooting();
    this.playerDeathRetry();
  }

  update() {
    this.player.update();
  }

  onStageClear() {
    this.gameState = "clearing";
    this.physics.pause();

    const text = this.add
      .text(400, 300, "DATA ABSORBED", {
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.time.delayedCall(1000, () => {
      text.destroy();

      this.stage.nextStage();
      this.player.resetPosition();
      this.player.clearBullets();
      this.physics.resume();
      this.gameState = "playing";
    });
  }

  spawnEnemy(data) {
    const EnemyClass = EnemyMap[data.type] || EnemyMap.default;
    const pos = this.grid.gridToWorld(data.col, data.row);
    const enemy = new EnemyClass(this, pos.x, pos.y);

    this.enemies.add(enemy);

    const offset = data.offset ?? 0;

    this.time.delayedCall(offset, () => {
      enemy.attack.startCooldown();
    });
  }

  delayMovementAfterShooting() {
    this.events.on("playerShoot", () => {
      this.player.movement.blockMovement();
    });
  }

  //temp
  playerDeathRetry() {
    this.events.on("playerDeath", () => {
      this.gameState = "dead";
      this.physics.pause();
      this.time.delayedCall(2500, () => {
        this.scene.start(SCENES.GAME_OVER, { stage: this.stage.currentStage });
      });
    });
  }

  drawGrid() {
    const graphics = this.add.graphics();

    for (let row = 0; row < this.grid.rows; row++) {
      for (let col = 0; col < this.grid.cols; col++) {
        const pos = this.grid.gridToWorld(col, row);

        const x = pos.x - this.grid.tileWidth / 2 + this.grid.spacing / 2;
        const y = pos.y - this.grid.tileHeight / 2 + this.grid.spacing / 2;

        const isBlue = this.grid.map[row][col] === 0;

        graphics.lineStyle(3, isBlue ? 0x007bff : 0xff3b3b, 1);
        graphics.fillStyle(0x000000, 0.3);
        graphics.fillRect(
          x,
          y,
          this.grid.tileWidth - this.grid.spacing,
          this.grid.tileHeight - this.grid.spacing,
        );
        graphics.strokeRect(
          x,
          y,
          this.grid.tileWidth - this.grid.spacing,
          this.grid.tileHeight - this.grid.spacing,
        );
        graphics.lineStyle(4, isBlue ? 0x3399ff : 0xff6666, 1);
        graphics.lineBetween(
          x,
          y,
          x + this.grid.tileWidth - this.grid.spacing,
          y,
        );
      }
    }
  }
}
