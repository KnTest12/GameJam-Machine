import * as Phaser from "phaser";

export default class MovementComponent {
  constructor(scene, sprite, grid, startCol = 0, startRow = 1) {
    this.scene = scene;
    this.sprite = sprite;
    this.grid = grid;
    this.gridPos = { col: startCol, row: startRow };
    this.shootCooldown = false;
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  tryMove(dx, dy) {
    const nextCol = this.gridPos.col + dx;
    const nextRow = this.gridPos.row + dy;

    if (!this.grid.isValid(nextCol, nextRow)) return;

    this.gridPos.col = nextCol;
    this.gridPos.row = nextRow;

    const pos = this.grid.gridToWorld(nextCol, nextRow);
    this.sprite.setPosition(pos.x, pos.y);

    if (this.grid.isTileDangerous(nextCol, nextRow)) {
      this.scene.player.takeDamage(1); //hard coded zone turret damage value, poor implementation, but can improve if we have enough time
    }
  }

  blockMovement(duration = 400) {
    this.shootCooldown = true;
    this.scene.time.delayedCall(duration, () => {
      this.shootCooldown = false;
    });
  }

  update() {
    if (this.scene.gameState !== "playing") return;
    if (this.shootCooldown) return;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.tryMove(-1, 0);
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.tryMove(1, 0);
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.tryMove(0, -1);
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.tryMove(0, 1);
    }
  }
}
