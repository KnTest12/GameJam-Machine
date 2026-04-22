import Enemy from "./Enemy.js";
import AttackComponent from "../../components/AttackComponent.js";

export default class BossEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "boss", 45);
    this.type = "boss";
    this.phase = "first";
    this.phaseSpeeds = {
      first: 1000,
      second: 800,
      third: 500,
    };
    this.moveSpeed = this.phaseSpeeds.first;
    // temp, need it for testing out movement first
    this.attack = new AttackComponent(scene, this, {
      cooldown: 5000,
      telegraphDuration: 2000,
      damage: 99,
    });
  }

  setPhase() {
    if (this.health.hp <= 30 && this.health.hp > 15) {
      this.phase = "second";
      this.moveSpeed = this.phaseSpeeds.second;
    } else if (this.health.hp <= 15) {
      this.phase = "third";
      this.moveSpeed = this.phaseSpeeds.third;
    }
  }

  takeDamage(amount) {
    const isDead = super.takeDamage(amount);
    this.setPhase();
    return isDead;
  }

  startMoving() {
    this.scene.time.delayedCall(this.moveSpeed, () => this.move());
  }

  move() {
    if (!this.active) return;

    const moves = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
    ];

    const randomMovement = moves[Math.floor(Math.random() * moves.length)];
    const nextCol = this.gridPos.col + randomMovement.dx;
    const nextRow = this.gridPos.row + randomMovement.dy;

    if (!(nextRow < 0 || nextRow > 3 || nextCol < 4 || nextCol > 7)) {
      this.gridPos.col = nextCol;
      this.gridPos.row = nextRow;

      const pos = this.scene.grid.gridToWorld(
        this.gridPos.col,
        this.gridPos.row,
      );
      this.setPosition(pos.x, pos.y);
      this.scene.time.delayedCall(this.moveSpeed, () => this.move());
    } else {
      this.move();
    }
  }
}
