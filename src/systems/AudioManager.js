export default class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.registerEvents();
  }

  registerEvents() {
    this.scene.events.on("playerShoot", () => this.play("playerShoot"));
    this.scene.events.on("playerHit", () => this.play("playerHit"));
    this.scene.events.on("playerDeath", () => this.play("playerDeath"));
    this.scene.events.on("enemyAttack", () => this.play("enemyAttack"));
    this.scene.events.on("enemyAttackResolve", () =>
      this.play("enemyAttackResolve"),
    );
    this.scene.events.on("enemyHit", () => this.play("enemyHit"));
    this.scene.events.on("enemyDeath", () => this.play("enemyDeath"));
    this.scene.events.on("bossTransition", () => {
      this.playBgm("bossBattle2");
    });
    this.scene.events.on("bossDeath", () => this.play("bossDeath"));
    this.scene.events.on("stageClear", () => this.play("stageClear"));
  }

  play(key, config = {}) {
    this.scene.sound.play(key, { volume: 0.2, ...config });
  }

  playBgm(key, config = {}) {
    if (this.bgm) this.bgm.stop();
    this.bgm = this.scene.sound.add(key, { volume: 0.8, loop: true });
    this.bgm.play();
  }

  stopBgm() {
    if (this.bgm) this.bgm.stop();
  }
}
