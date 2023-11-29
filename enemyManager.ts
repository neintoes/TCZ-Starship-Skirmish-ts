class EnemyManager {
    private formationCenter: Sprite;

    constructor() {
        this.formationCenter = sprites.create(image.create(1, 1));
        this.formationCenter.setVelocity(randint(-10, 10), randint(-10, 10));
    }

    public enemyBehaviour(): void {
        sprites.allOfKind(SpriteKind.Enemy).forEach(function (enemy: EnemyShip) {
            enemy.behaviour(this.formationCenter);
        });
        // GH2
        sprites.allOfKind(SpriteKind.Boss).forEach(function(boss: Boss) {
            boss.behaviour(this.formationCenter);
        });
        // end GH2
    }

    public spawnWave(): void {
        let startX = randint(0, 1) * 160;
        let startY = randint(0, 90);
        for(let i: number = 0; i < randint(3, 6); i++) {
            new EnemyShip(startX, startY);
        }
    }

    public constrainFormation(): void {
        if (this.formationCenter.x < 70) {
            this.formationCenter.vx = randint(5, 10);
        }
        if (this.formationCenter.x > 90) {
            this.formationCenter.vx = randint(-5, -10);
        }
        if (this.formationCenter.y < 55) {
            this.formationCenter.vy = randint(5, 10);
        }
        if (this.formationCenter.y > 65) {
            this.formationCenter.vy = randint(-5, -10);
        }
    }
}