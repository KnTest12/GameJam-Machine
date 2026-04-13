import * as Phaser from "phaser";
import HealthComponent from "../components/HealthComponent.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "enemy");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.health = new HealthComponent(3);
    this.type = "default";

    this.body.setSize(30, 30);
    this.setImmovable(true);
  }

  takeDamage(amount) {
    const isDead = this.health.takeDamage(amount);
    if (isDead) {
      this.destroy;
    }
    return isDead;
  }
}
