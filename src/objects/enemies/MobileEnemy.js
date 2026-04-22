import Enemy from "./Enemy.js";
import AttackComponent from "../../components/AttackComponent.js";

export default class MobileEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "mobile", 6);
    this.type = "mobile";
    this.moveSpeed = 1000;
    this.moveDirection = 1;
    this.attack = new AttackComponent(scene, this, {
      cooldown: 1500,
      telegraphDuration: 200,
      damage: 1,
      mode: "sequential",
    });

    this.attack.getSequentialTiles = () => {
      const currentRow = this.gridPos.row;
      return [
        [{ col: 3, row: currentRow }],
        [{ col: 2, row: currentRow }],
        [{ col: 1, row: currentRow }],
        [{ col: 0, row: currentRow }],
      ];
    };

    // this.startMoving();
  }

  startMoving() {
    this.moveDirection = this.gridPos.row >= 3 ? -1 : 1;
    this.scene.time.delayedCall(this.moveSpeed, () => this.move());
  }

  move() {
    if (!this.active) return;

    const nextRow = this.gridPos.row + this.moveDirection;

    if (nextRow < 0 || nextRow > 3) {
      this.moveDirection *= -1;
    } else {
      this.gridPos.row = nextRow;
      const pos = this.scene.grid.gridToWorld(
        this.gridPos.col,
        this.gridPos.row,
      );
      this.setPosition(pos.x, pos.y);
    }

    this.scene.time.delayedCall(this.moveSpeed, () => this.move());
  }
}
