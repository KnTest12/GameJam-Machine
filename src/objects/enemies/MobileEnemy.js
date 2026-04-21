import Enemy from "./Enemy.js";
import AttackComponent from "../../components/AttackComponent.js";

export default class MobileEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "mobile", 5);
    this.type = "mobile";
    this.attack = new AttackComponent(scene, this, {
      cooldown: 1500,
      telegraphDuration: 500,
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
  }
}
