import Enemy from "./Enemy.js";
import AttackComponent from "../../components/AttackComponent.js";

export default class NovaEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "nova", 3);
    this.type = "nova";
    this.attack = new AttackComponent(scene, this, {
      cooldown: 5000,
      telegraphDuration: 2000,
      damage: 99,
      mode: "sequential",
    });

    this.attack.getSequentialTiles = () => {
      const playerPos = scene.player.movement.gridPos;
      const tiles = [
        [{ col: playerPos.col, row: playerPos.row }],
        [
          { col: playerPos.col - 1, row: playerPos.row - 1 },
          { col: playerPos.col - 1, row: playerPos.row + 1 },
          { col: playerPos.col + 1, row: playerPos.row - 1 },
          { col: playerPos.col + 1, row: playerPos.row + 1 },
        ],
      ];

      return tiles
        .map((group) =>
          group.filter(
            (tile) =>
              tile.col >= 0 && tile.col < 4 && tile.row >= 0 && tile.row < 4,
          ),
        )
        .filter((group) => group.length > 0);
    };
  }
}
