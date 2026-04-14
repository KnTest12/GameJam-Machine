import * as Phaser from "phaser";
import HealthComponent from "../components/HealthComponent";
import MovementComponent from "../components/MovementComponent";
import ShootComponent from "../components/ShootComponent";
import Bullet from "./Bullet.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.health = new HealthComponent(3);
    this.movement = new MovementComponent(scene, this);
    this.shooter = new ShootComponent(scene, this);

    this.bullets = scene.physics.add.group({
      classType: Bullet,
      maxSize: 10,
      runChildUpdate: true,
    });

    this.body.setSize(30, 30);
    this.setColliderWorldBounds(true);
  }

  takeDamage(amount) {
    const isDead = this.health.takeDamage(amount);
    return isDead;
  }

  update() {
    this.movement.update();
    this.shooter.update(this.bullets);
  }
}
