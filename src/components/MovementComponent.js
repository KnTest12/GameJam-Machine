export default class MovementComponent {
  constructor(scene, sprite, speed = 200) {
    this.sprite = sprite;
    this.speed = speed;
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    this.sprite.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.sprite.body.setVelocityX(-this.speed);
    } else if (this.cursors.right.isDown) {
      this.sprite.body.setVelocityX(this.speed);
    } else if (this.cursors.up.isDown) {
      this.sprite.body.setVelocityY(-this.speed);
    } else if (this.cursors.down.isDown) {
      this.sprite.body.setVelocityY(this.speed);
    }
  }
}
