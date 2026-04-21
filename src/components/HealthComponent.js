export default class HealthComponent {
  constructor(maxHp) {
    this.maxHp = maxHp;
    this.hp = maxHp;
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp < 0) this.hp = 0;
    return this.isDead();
  }

  isDead() {
    return this.hp <= 0;
  }

  getPercent() {
    return this.hp / this.maxHp;
  }
}
