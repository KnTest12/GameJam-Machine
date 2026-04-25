export default class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.registerEvents();
  }

  registerEvents() {
    this.handlers = {
      playerShoot: () => this.play("playerShoot"),
      playerHit: () => this.play("playerHit"),
      playerDeath: () => this.play("playerDeath"),
      enemyAttack: () => this.play("enemyAttack"),
      enemyAttackResolve: () => this.play("enemyAttackResolve"),
      enemyHit: () => this.play("enemyHit"),
      enemyDeath: () => this.play("enemyDeath"),
      bossTransition: () => this.playBgm("bossBattle2"),
      bossDeath: () => {
        this.play("bossDeath");
        this.stopBgm();
      },
      stageClear: () => this.play("stageClear"),
    };

    Object.entries(this.handlers).forEach(([event, handler]) => {
      if (event === "bossTransition" || event === "playerDeath") {
        this.scene.events.once(event, handler);
      } else {
        this.scene.events.on(event, handler);
      }
    });

    this.scene.events.once("shutdown", () => {
      Object.entries(this.handlers).forEach(([event, handler]) => {
        this.scene.events.off(event, handler);
      });
    });
  }

  play(key, config = {}) {
    this.scene.sound.play(key, { volume: 1.0, ...config });
  }

  playBgm(key, config = {}) {
    if (this.bgm) this.bgm.stop();
    this.bgm = this.scene.sound.add(key, { volume: 3.0, loop: true });
    this.bgm.play();
  }

  stopBgm() {
    if (this.bgm) this.bgm.stop();
  }
}
