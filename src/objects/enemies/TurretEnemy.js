import Enemy from "./Enemy.js";

export default class TurretEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 1);
    this.type = "turret";
  }
}
