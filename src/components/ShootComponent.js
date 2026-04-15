import * as Phaser from "phaser";

export default class ShootComponent {
  constructor(scene, sprite) {
    this.scene = scene;
    this.sprite = sprite;
    this.canShoot = true;
    this.cooldown = 500;
    this.spacebar = scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
  }

  update(bulletGroup) {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.fire(bulletGroup);
    }
  }

  fire(bulletGroup) {
    if (!this.canShoot || this.scene.gameState !== "playing") return;

    const bullet = bulletGroup.get(this.sprite.x + 20, this.sprite.y);
    if (!bullet) return;

    bullet.fire(this.sprite.x, this.sprite.y);
    this.scene.events.emit("playerShoot");
    this.canShoot = false;

    this.scene.time.delayedCall(this.cooldown, () => {
      this.canShoot = true;
    });
  }
}
