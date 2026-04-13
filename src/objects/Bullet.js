import * as Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bullet");
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  fire(x, y) {
    this.setPosition(x + 20, y);
    this.setActive(true);
    this.setVisible(true);
    this.body.enable;
    this.setVelocityX(600);
  }

  update() {
    if (this.x > 900 || this.x < -100) {
      this.setActive(false);
      this.setVisible(false);
      this.body.enable = false;
    }
  }
}
