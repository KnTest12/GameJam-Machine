import Enemy from "./Enemy.js";
import TurretEnemy from "./TurretEnemy.js";
import CoilEnemy from "./CoilEnemy.js";
import BombEnemy from "./BombEnemy.js";
import MobileEnemy from "./MobileEnemy.js";

export const EnemyMap = {
  default: Enemy, //temporary, just to see if super class works
  turret: TurretEnemy,
  coil: CoilEnemy,
  bomb: BombEnemy,
  mobile: MobileEnemy,
};

export { Enemy, TurretEnemy, CoilEnemy };
