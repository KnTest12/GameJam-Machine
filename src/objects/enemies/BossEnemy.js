import Enemy from "./Enemy.js";
import AttackComponent from "../../components/AttackComponent.js";

export default class BossEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "boss", 45);
    this.type = "boss";
    this.phase = "first";
  }

  setPhase() {
    if (this.health.hp <= 30 && this.health.hp > 15) {
      this.phase = "second";
    } else if (this.health.hp <= 15) {
      this.phase = "third";
    }
  }

  takeDamage(amount) {
    const isDead = super.takeDamage(amount);
    this.setPhase();
    return isDead;
  }
}
