import Enemy from "./Enemy.js";
import AttackComponent from "../../components/AttackComponent.js";

export default class BombEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "bomb", 8);
    this.type = "bomb";
    this.attack = new AttackComponent(scene, this, {
      cooldown: 5000,
      telegraphDuration: 2000,
      damage: 99,
    });

    this.attack.getTargetTiles = () => {
      const randomRow = Math.floor(Math.random() * 4);
      const randomCol = Math.floor(Math.random() * 4);
      const tiles = [
        { col: randomCol, row: randomRow },
        { col: randomCol, row: randomRow - 1 },
        { col: randomCol, row: randomRow + 1 },
        { col: randomCol - 1, row: randomRow },
        { col: randomCol + 1, row: randomRow },
      ];
      return tiles.filter(
        (tile) =>
          tile.col >= 0 && tile.col < 4 && tile.row >= 0 && tile.row < 4,
      );
    };
  }
}
