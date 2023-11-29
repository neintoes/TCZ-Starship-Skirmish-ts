// personal note, probably should should have made an abstract class for enemy and boss to inherit 'movement' and props from
interface iEnemyShip {
    fire(): void;
    behaviour(formationCenter: Sprite): void;
}

// GH2
class Boss extends sprites.ExtendableSprite implements iEnemyShip {
    readonly maxHealth: number = 100;
    readonly shotSpeed: number = 60;
    readonly fireRate: number = 140;
    private xOffset: number;
    private yOffset: number;
    public healthbar: StatusBarSprite;

    constructor() {
        super(assets.image`boss`, SpriteKind.Boss);
        this.setPosition(randint(20, 140), -20);
        this.z = -5;
        this.xOffset = randint(-50, 50);
        this.yOffset = randint(-5, -25);
        this.initialiseHealthbar();
    }

    private initialiseHealthbar(): void {
        this.healthbar = statusbars.create(50, 4, StatusBarKind.Health);
        this.healthbar.attachToSprite(this, -5);
        this.healthbar.max = this.maxHealth;
        this.healthbar.value = this.healthbar.max
    }

    private movement(formationCenter: Sprite): void {
        this.vx = formationCenter.x + (this.xOffset - this.x);
        this.vy = formationCenter.y + (this.yOffset - this.y);
    }

    public fire(): void {
        new BossProjectile(this, this.shotSpeed, randint(80, 120));
    }

    public behaviour(formationCenter: Sprite): void {
        this.movement(formationCenter);
        if(randint(0, 120) == 0) {
            this.xOffset = randint(-50, 50);
            this.yOffset = randint(-5, -25);
        } 
        if(randint(0, this.fireRate) == this.fireRate) {
            this.fire();
        }
    }
}
// end GH2

class EnemyShip extends sprites.ExtendableSprite implements iEnemyShip {
    readonly shotSpeed: number = 70;
    readonly fireRate: number = 250;
    private xOffset: number;
    private yOffset: number;

    constructor(startX: number, startY: number) {
        super(randint(0, 1) == 1 ? assets.image`enemy ship 1`: assets.image`enemy ship 2`, SpriteKind.Enemy)
        this.setPosition(startX, startY);
        this.setOffset();
    }

    private setOffset(): void {
        this.xOffset = randint(-4, 4) * 16;
        this.yOffset = randint(-3, 1) * 16;
    }

    private movement(formationCenter: Sprite): void {
        this.vx = formationCenter.x + (this.xOffset - this.x);
        this.vy = formationCenter.y + (this.yOffset - this.y); 
    }

    public fire(): void {
        new EnemyProjectile(this, this.shotSpeed);
    }

    public behaviour(formationCenter: Sprite): void {
        if(randint(0, this.fireRate) == this.fireRate) {
            this.fire();
        }
        this.movement(formationCenter);
    }
}