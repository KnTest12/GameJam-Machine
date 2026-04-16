import Enemy from "./Enemy.js";
import TurretEnemy from "./TurretEnemy.js";
import CoilEnemy from "./CoilEnemy.js";

export const EnemyMap = {
  default: Enemy, //temporary, just to see if super class works
  turret: TurretEnemy,
  coil: CoilEnemy,
};

export { Enemy, TurretEnemy, CoilEnemy };
