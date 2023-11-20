namespace SpriteKind {
    export const EnemyProjectile = SpriteKind.create();
}

class GameManager {
    private playerSprite: PlayerSprite;
    private enemyManager: EnemyManager;
    private overlapManager: OverlapManager;

    constructor() {
        this.initialisePlayer();
        this.enemyManager = new EnemyManager();
        this.overlapManager = new OverlapManager(this.playerSprite);
        this.onUpdates();
        this.onUpdateIntervals();
        effects.starField.startScreenEffect()
    }

    private initialisePlayer(): void {
        info.setScore(0);
        info.setLife(3);
        this.playerSprite = new PlayerSprite();
    }

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