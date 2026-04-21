import * as Phaser from "phaser";

export default class AttackComponent {
  constructor(scene, enemy, config = {}) {
    this.scene = scene;
    this.enemy = enemy;
    this.cooldown = config.cooldown || 2500;
    this.telegraphDuration = config.telegraphDuration || 600;
    this.damage = config.damage || 1;
    this.telegraphedTiles = [];
    this.isAttacking = false;
    this.id = Math.random().toString(36).slice(2);
    this.mode = config.mode || "default";
  }

  getTargetTiles() {
    return [];
  }

  getSequentialTiles() {
    return [];
  }

  startCooldown() {
    this.scene.time.delayedCall(this.cooldown, () => {
      if (this.mode === "sequential") {
        this.beginSequentialAttack();
      } else {
        this.beginAttack();
      }
    });
  }

  beginAttack() {
    if (!this.enemy.active) return;
    if (this.scene.gameState !== "playing") return;
    this.isAttacking = true;

    this.telegraphedTiles = this.getTargetTiles();
    this.scene.grid.highlightTiles(this.telegraphedTiles, 0xff9900, this.id);

    this.scene.time.delayedCall(this.telegraphDuration, () => {
      this.resolveAttack();
    });
  }

  beginSequentialAttack() {
    if (!this.enemy.active) return;
    if (this.scene.gameState !== "playing") return;

    const groups = this.getSequentialTiles();
    let index = 0;

    const processGroup = () => {
      if (!this.enemy.active) return;
      if (index >= groups.length) {
        this.isAttacking = false;
        this.startCooldown();
        return;
      }

      const currentGroup = groups[index];
      this.scene.grid.highlightTiles(currentGroup, 0xff9900, this.id);

      this.scene.time.delayedCall(200, () => {
        if (!this.enemy.active) return;

        const playerPos = this.scene.player.movement.gridPos;
        const hit = currentGroup.some(
          (tile) => tile.col === playerPos.col && tile.row === playerPos.row,
        );

        if (hit) this.scene.player.takeDamage(this.damage);

        this.scene.grid.clearHighlights(currentGroup, this.id);
        index++;
        processGroup();
      });
    };

    this.isAttacking = true;
    processGroup();
  }

  resolveAttack() {
    if (!this.enemy.active) return;
    if (this.scene.gameState !== "playing") return;

    const playerPos = this.scene.player.movement.gridPos;

    const hit = this.telegraphedTiles.some(
      (tile) => tile.col === playerPos.col && tile.row === playerPos.row,
    );

    if (hit) {
      this.scene.player.takeDamage(this.damage);
    }

    this.scene.grid.clearHighlights(this.telegraphedTiles, this.id);
    this.telegraphedTiles = [];
    this.isAttacking = false;
    this.startCooldown();
  }
}
