import * as Phaser from "phaser";

export default class MovementComponent {
  constructor(scene, sprite, grid) {
    this.scene = scene;
    this.sprite = sprite;
    this.grid = grid;

    this.cursors = scene.input.keyboard.createCursorKeys();

    this.gridPos = { col: 0, row: 0 };
    this.locked = false;
  }

  tryMove(dx, dy) {
    if (this.locked) return;

    const nextCol = this.gridPos.col + dx;
    const nextRow = this.gridPos.row + dy;

    if (!this.grid.isValid(nextCol, nextRow)) return;

    this.gridPos.col = nextCol;
    this.gridPos.row = nextRow;

    const pos = this.grid.gridToWorld(nextCol, nextRow);
    this.sprite.setPosition(pos.x, pos.y);
  }

  lock() {
    this.locked = true;
    this.scene.time.delayedCall(150, () => {
      this.locked = false;
    });
  }

  update() {
    if (this.locked || this.scene.gameState !== "playing") return;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.tryMove(-1, 0);
      this.lock();
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.tryMove(1, 0);
      this.lock();
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.tryMove(0, -1);
      this.lock();
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.tryMove(0, 1);
      this.lock();
    }
  }
}
