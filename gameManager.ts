namespace SpriteKind {
    export const EnemyProjectile = SpriteKind.create();
    // GH2
    export const Boss = SpriteKind.create();
    // end GH2
    // GH3
    export const Shield = SpriteKind.create();
    export const ShieldPickup = SpriteKind.create();
    // end GH3
}

class GameManager {
    private playerSprite: PlayerSprite;
    private enemyManager: EnemyManager;
    private overlapManager: OverlapManager;

    constructor() {
        this.initialisePlayer();
        this.enemyManager = new EnemyManager();
        this.overlapManager = new OverlapManager(this.playerSprite);
        // GH2
        this.scoreEvents();
        // end GH2
        this.onUpdates();
        this.onUpdateIntervals();
        effects.starField.startScreenEffect()
    }

    private initialisePlayer(): void {
        info.setScore(0);
        info.setLife(3);
        this.playerSprite = new PlayerSprite();
    }

    // GH2
    private scoreEvents(): void {
        info.onScore(5000, function(): void {
            new Boss();
        })
    }
    // end GH2

    private onUpdates(): void {
        game.onUpdate(function(): void {
            this.playerSprite.movement();
            this.enemyManager.constrainFormation();
            this.enemyManager.enemyBehaviour();
        })
    }

    private onUpdateIntervals(): void {
        game.onUpdateInterval(7500, function(): void {
            this.enemyManager.spawnWave();
        });
    }
}