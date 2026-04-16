import Enemy from "./Enemy.js";

export default class CoilEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 2);
    this.type = "coil";
  }
}
