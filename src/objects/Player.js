import * as Phaser from "phaser";
import HealthComponent from "../components/HealthComponent";
import MovementComponent from "../components/MovementComponent";
import ShootComponent from "../components/ShootComponent";
import Bullet from "./Bullet.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, grid, startCol = 0, startRow = 1) {
    const pos = grid.gridToWorld(startCol, startRow);
    super(scene, pos.x, pos.y, "player");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.health = new HealthComponent(3);
    this.movement = new MovementComponent(
      scene,
      this,
      grid,
      startCol,
      startRow,
    );
    this.startCol = startCol;
    this.startRow = startRow;
    this.shooter = new ShootComponent(scene, this);

    this.bullets = scene.physics.add.group({
      classType: Bullet,
      maxSize: 10,
      runChildUpdate: true,
    });

    this.body.setSize(30, 30);
  }

  takeDamage(amount) {
    if (this.invicible) return false;
    const isDead = this.health.takeDamage(amount);

    if (isDead) {
      this.scene.events.emit("playerDeath");
      this.destroyTween();
    } else {
      this.scene.events.emit("playerHit");
      this.triggerIframes();
    }
    return isDead;
  }

  destroyTween() {
    let jitters = 0;
    const originalX = this.x;
    const originalY = this.y;

    const jitter = () => {
      if (jitters >= 8) {
        this.scene.tweens.add({
          targets: this,
          alpha: 0,
          duration: 300,
          onComplete: () => this.setVisible(false),
        });
        return;
      }
      this.setPosition(
        originalX + Phaser.Math.Between(-6, 6),
        originalY + Phaser.Math.Between(-6, 6),
      );
      this.setAlpha(jitters % 2 === 0 ? 0.3 : 1);
      jitters++;
      this.scene.time.delayedCall(50, jitter);
    };
    jitter();
  }

  triggerIframes() {
    this.invicible = true;
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 80,
      yoyo: true,
      repeat: 5,
      onComplete: () => {
        this.setAlpha(1);
        this.invicible = false;
      },
    });
  }

  clearBullets() {
    this.bullets.getChildren().forEach((bullet) => {
      bullet.disableBody(true, true);
    });
  }

  resetPosition() {
    const pos = this.movement.grid.gridToWorld(this.startCol, this.startRow);
    this.setPosition(pos.x, pos.y);
    this.movement.gridPos = { col: this.startCol, row: this.startRow };
  }

  update() {
    this.movement.update();
    this.shooter.update(this.bullets);
  }
}
