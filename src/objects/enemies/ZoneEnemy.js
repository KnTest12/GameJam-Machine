import Enemy from "./Enemy.js";
import AttackComponent from "../../components/AttackComponent.js";

export default class ZoneEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "zone", 15);
    this.type = "zone";
    this.attack = new AttackComponent(scene, this, {
      cooldown: 2000,
      telegraphDuration: 5000,
      activeDuration: 4000,
      damage: 1,
      mode: "persistent",
    });
    this.lastAttackWasRow = false;

    this.attack.getTargetTiles = () => {
      const playerPos = scene.player.movement.gridPos;
      this.lastAttackWasRow = !this.lastAttackWasRow;
      const rowAttack = [0, 1, 2, 3].map((col) => ({
        col,
        row: playerPos.row,
      }));
      const colAttack = [0, 1, 2, 3].map((row) => ({
        col: playerPos.col,
        row,
      }));

      if (this.lastAttackWasRow) {
        return colAttack;
      } else {
        return rowAttack;
      }
    };
  }
}
