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

    this.startCooldown();
  }

  getTargetTiles() {
    return [];
  }

  startCooldown() {
    this.scene.time.delayedCall(this.cooldown, () => {
      this.beginAttack();
    });
  }

  beginAttack() {
    if (!this.enemy.active) return;
    this.isAttacking = true;

    this.telegraphedTiles = this.getTargetTiles();
    this.scene.grid.highlightTiles(this.telegraphedTiles, 0xff9900, this.id);

    this.scene.time.delayedCall(this.telegraphDuration, () => {
      this.resolveAttack();
    });
  }

  resolveAttack() {
    if (!this.enemy.active) return;

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
