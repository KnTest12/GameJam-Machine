export default class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.registerEvents();
  }

  registerEvents() {
    this.scene.events.on("playerShoot", () => this.play("playerShoot"));
    this.scene.events.on("enemyHit", () => this.play("enemyHit"));
    this.scene.events.on("enemyDeath", () => this.play("enemyDeath"));
  }

  play(key, config = {}) {
    this.scene.sound.play(key, { volume: 0.5, ...config });
  }
}
