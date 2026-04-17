import Enemy from "./Enemy.js";
import AttackComponent from "../../components/AttackComponent.js";

export default class CoilEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "coil", 2);
    this.type = "coil";
    this.attack = new AttackComponent(scene, this, {
      cooldown: 3500,
      telegraphDuration: 1000,
      damage: 1,
    });

    this.attack.getTargetTiles = () => {
      const playerPos = scene.player.movement.gridPos;
      return [0, 1, 2, 3].map((col) => ({ col, row: playerPos.row }));
    };
  }
}
