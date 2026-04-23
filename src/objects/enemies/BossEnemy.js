import Enemy from "./Enemy.js";
import AttackComponent from "../../components/AttackComponent.js";

export default class BossEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "boss", 30);
    this.type = "boss";
    this.phase = "second";
    this.phaseSpeeds = {
      first: 1000,
      second: 500,
    };
    this.moveSpeed = this.phaseSpeeds.first;
    this.phaseOneAttacks = [
      this.createTurretAttack(scene),
      this.createBombAttack(scene),
      this.createCoilAttack(scene),
      this.createNovaAttack(scene),
      this.createWaveAttack(scene),
    ];
    this.phaseTwoAttacks = [
      this.createRowWaveAttack(scene),
      this.createColumnWaveAttack(scene),
      this.createRingWaveAttack(scene),
    ];
    this.currentAttackIndex = 0;
  }

  setPhase() {
    if (this.health.hp <= 15) {
      this.phase = "second";
      this.moveSpeed = this.phaseSpeeds.second;
    }
  }

  takeDamage(amount) {
    const isDead = super.takeDamage(amount);
    console.log(this.health.hp);
    this.setPhase();
    return isDead;
  }

  startMoving() {
    this.scene.time.delayedCall(this.moveSpeed, () => this.move());
  }

  startAttacking() {
    this.scene.time.delayedCall(1000, () => this.nextAttack());
  }

  move() {
    if (!this.active) return;

    const moves = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
    ];

    const randomMovement = moves[Math.floor(Math.random() * moves.length)];
    const nextCol = this.gridPos.col + randomMovement.dx;
    const nextRow = this.gridPos.row + randomMovement.dy;

    if (!(nextRow < 0 || nextRow > 3 || nextCol < 4 || nextCol > 7)) {
      this.gridPos.col = nextCol;
      this.gridPos.row = nextRow;

      const pos = this.scene.grid.gridToWorld(
        this.gridPos.col,
        this.gridPos.row,
      );
      this.setPosition(pos.x, pos.y);
      this.scene.time.delayedCall(this.moveSpeed, () => this.move());
    } else {
      this.move();
    }
  }

  nextAttack() {
    let attack;

    if (this.phase == "first") {
      attack = this.phaseOneAttacks[this.currentAttackIndex];
      this.currentAttackIndex =
        (this.currentAttackIndex + 1) % this.phaseOneAttacks.length;
    } else {
      const index = Math.floor(Math.random() * this.phaseTwoAttacks.length);
      attack = this.phaseTwoAttacks[index];
    }

    if (attack.mode === "sequential") attack.beginSequentialAttack();
    else attack.beginAttack();
  }

  //phase one attacks
  createTurretAttack(scene) {
    const attack = new AttackComponent(scene, this, {
      cooldown: 0,
      telegraphDuration: 500,
      damage: 1,
      onComplete: () => this.nextAttack(),
    });
    attack.getTargetTiles = () => {
      const playerPos = scene.player.movement.gridPos;
      return [{ col: playerPos.col, row: playerPos.row }];
    };
    return attack;
  }

  createCoilAttack(scene) {
    const attack = new AttackComponent(scene, this, {
      cooldown: 0,
      telegraphDuration: 500,
      damage: 1,
      onComplete: () => this.nextAttack(),
    });
    attack.getTargetTiles = () => {
      const playerPos = scene.player.movement.gridPos;
      return [0, 1, 2, 3].map((col) => ({ col, row: playerPos.row }));
    };
    return attack;
  }

  createBombAttack(scene) {
    const attack = new AttackComponent(scene, this, {
      cooldown: 0,
      telegraphDuration: 700,
      damage: 99,
      onComplete: () => this.nextAttack(),
    });
    attack.getTargetTiles = () => {
      const playerPos = scene.player.movement.gridPos;
      const tiles = [
        { col: playerPos.col, row: playerPos.row },
        { col: playerPos.col, row: playerPos.row - 1 },
        { col: playerPos.col, row: playerPos.row + 1 },
        { col: playerPos.col - 1, row: playerPos.row },
        { col: playerPos.col + 1, row: playerPos.row },
      ];
      return tiles.filter(
        (tile) =>
          tile.col >= 0 && tile.col < 4 && tile.row >= 0 && tile.row < 4,
      );
    };
    return attack;
  }

  createNovaAttack(scene) {
    const attack = new AttackComponent(scene, this, {
      cooldown: 0,
      telegraphDuration: 700,
      damage: 99,
      mode: "sequential",
      onComplete: () => this.nextAttack(),
    });
    attack.getSequentialTiles = () => {
      const playerPos = scene.player.movement.gridPos;
      const tiles = [
        [{ col: playerPos.col, row: playerPos.row }],
        [
          { col: playerPos.col - 1, row: playerPos.row - 1 },
          { col: playerPos.col - 1, row: playerPos.row + 1 },
          { col: playerPos.col + 1, row: playerPos.row - 1 },
          { col: playerPos.col + 1, row: playerPos.row + 1 },
        ],
      ];

      return tiles
        .map((group) =>
          group.filter(
            (tile) =>
              tile.col >= 0 && tile.col < 4 && tile.row >= 0 && tile.row < 4,
          ),
        )
        .filter((group) => group.length > 0);
    };
    return attack;
  }

  createWaveAttack(scene) {
    const attack = new AttackComponent(scene, this, {
      cooldown: 0,
      telegraphDuration: 200,
      damage: 1,
      mode: "sequential",
      onComplete: () => this.nextAttack(),
    });
    attack.getSequentialTiles = () => {
      const currentRow = this.gridPos.row;
      return [
        [{ col: 3, row: currentRow }],
        [{ col: 2, row: currentRow }],
        [{ col: 1, row: currentRow }],
        [{ col: 0, row: currentRow }],
      ];
    };
    return attack;
  }

  //phase two attacks
  createRowWaveAttack(scene) {
    const attack = new AttackComponent(scene, this, {
      cooldown: 0,
      telegraphDuration: 500,
      damage: 1,
      mode: "sequential",
      damageOnEntry: true,
      onComplete: () => this.nextAttack(),
    });

    let lastAttackTop = false;
    attack.getSequentialTiles = () => {
      const safeCol = Math.floor(Math.random() * 4);
      let direction;

      if (lastAttackTop) {
        direction = [3, 2, 1, 0];
        lastAttackTop = !lastAttackTop;
      } else {
        direction = [0, 1, 2, 3];
        lastAttackTop = !lastAttackTop;
      }

      return direction.map((row) =>
        [0, 1, 2, 3]
          .filter((col) => col !== safeCol)
          .map((col) => ({ col, row })),
      );
    };
    return attack;
  }

  createColumnWaveAttack(scene) {
    const attack = new AttackComponent(scene, this, {
      cooldown: 0,
      telegraphDuration: 500,
      damage: 1,
      mode: "sequential",
      damageOnEntry: true,
      onComplete: () => this.nextAttack(),
    });

    let lastAttackLeft = false;
    attack.getSequentialTiles = () => {
      const safeRow = Math.floor(Math.random() * 4);
      let direction;

      if (lastAttackLeft) {
        direction = [3, 2, 1, 0];
        lastAttackLeft = !lastAttackLeft;
      } else {
        direction = [0, 1, 2, 3];
        lastAttackLeft = !lastAttackLeft;
      }

      return direction.map((col) =>
        [0, 1, 2, 3]
          .filter((row) => row !== safeRow)
          .map((row) => ({ col, row })),
      );
    };
    return attack;
  }

  createRingWaveAttack(scene) {
    const attack = new AttackComponent(scene, this, {
      cooldown: 0,
      telegraphDuration: 1000,
      damage: 1,
      mode: "sequential",
      onComplete: () => this.nextAttack(),
    });
    attack.getSequentialTiles = () => {
      const outerRing = [
        { col: 0, row: 0 },
        { col: 1, row: 0 },
        { col: 2, row: 0 },
        { col: 3, row: 0 },
        { col: 0, row: 1 },
        { col: 3, row: 1 },
        { col: 0, row: 2 },
        { col: 3, row: 2 },
        { col: 0, row: 3 },
        { col: 1, row: 3 },
        { col: 2, row: 3 },
        { col: 3, row: 3 },
      ];
      const innerRing = [
        { col: 1, row: 1 },
        { col: 2, row: 1 },
        { col: 1, row: 2 },
        { col: 2, row: 2 },
      ];
      return [innerRing, outerRing];
    };
    return attack;
  }
}
