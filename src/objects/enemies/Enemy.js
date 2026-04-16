import * as Phaser from "phaser";
import HealthComponent from "../../components/HealthComponent.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = "enemy", hp = 3) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.health = new HealthComponent(hp);
    this.type = "default";

    this.body.setSize(30, 30);
    this.setImmovable(true);
  }

  takeDamage(amount) {
    const isDead = this.health.takeDamage(amount);
    this.scene.events.emit("enemyHit");
    if (isDead) {
      this.scene.events.emit("enemyDeath");
      this.destroy();
    }
    return isDead;
  }
}
