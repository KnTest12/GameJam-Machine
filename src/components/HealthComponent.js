export default class HealthComponent {
  constructor(maxHp) {
    this.maxHp = maxHp;
    this.hp = maxHp;
  }

  takeDamage(amount) {
    if (amount >= this.maxHp) amount = this.maxHp;
    this.hp -= amount;
    return this.isDead();
  }

  isDead() {
    return this.hp <= 0;
  }

  getPercent() {
    return this.hp / this.maxHp;
  }
}
