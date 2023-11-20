interface iEnemyShip {
    xOffset: number;
    yOffset: number;
    behaviour(formationCenter: Sprite): void;
}

class EnemyShip extends sprites.ExtendableSprite implements iEnemyShip {
    public xOffset: number;
    public yOffset: number;
    readonly shotSpeed: number = 70;
    readonly fireRate: number = 250;

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

    private fire(): void {
        new EnemyProjectile(this, this.shotSpeed);
    }

    public behaviour(formationCenter: Sprite): void {
        if(randint(0, this.fireRate) == this.fireRate) {
            this.fire();
        }
        this.movement(formationCenter);
    }
}