import Enemy from "./Enemy.js";
import AttackComponent from "../../components/AttackComponent.js";

export default class TurretEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "turret", 1);
    this.type = "turret";
    this.attack = new AttackComponent(scene, this, {
      cooldown: 2500,
      telegraphDuration: 600,
      damage: 1,
    });

    this.attack.getTargetTiles = () => {
      const playerPos = scene.player.movement.gridPos;
      return [{ col: playerPos.col, row: playerPos.row }];
    };
  }
}
