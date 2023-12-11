class PlayerSprite extends sprites.ExtendableSprite {
    readonly speed: number = 20;
    readonly deceleration: number = 0.9;
    private shotSpeed: number = 100;
    // GH1
    public powerupBar: PowerupBar;
    // end GH1
    // GH3
    private shield: Shield;
    // end GH3
    
    constructor() {
        super(assets.image`ship`, SpriteKind.Player);
        this.y = 108;
        this.z = 5;
        this.setStayInScreen(true);
        this.registerControls();
        // GH1
        this.initialisePowerup();
        // end GH1
    }

    private registerControls(): void {
        controller.A.onEvent(ControllerButtonEvent.Pressed, function(): void {
            new PlayerProjectile(this, this.shotSpeed);
        });

        // GH1
        controller.B.onEvent(ControllerButtonEvent.Pressed, function(): void {
            if(this.powerupBar.value == this.powerupBar.max) {
                this.powerupBar.cooldown();
                let launchAngle = 10;
                for(let i: number = 0; i < 2; i++) {
                    console.log(launchAngle)
                    for(let j: number = 0; j < 17; j++) {
                        launchAngle += 10;
                        console.log(launchAngle)
                        new PlayerProjectile(this, this.shotSpeed, launchAngle);
                    }
                    for(let k: number = 0; k < 17; k ++) {
                        launchAngle -= 10;
                        console.log(launchAngle)
                        new PlayerProjectile(this, this.shotSpeed, launchAngle);
                    }
                }
            }
        });
        // end GH1
    }

    // GH1
    private initialisePowerup(): void {
        let statusBar = new statusbars.StatusBar(
            60,
            3,
            8,
            11,
            11,
            100,
            StatusBarKind.Magic
        );
        this.powerupBar = new PowerupBar(statusBar);
    }
    // end GH1

    // GH3
    public activateShield(): void {
        this.shield = new Shield(this);
    }
    // end GH3


    private movement() {
        if(controller.left.isPressed()) {
            this.vx -= this.speed;
        }
        if(controller.right.isPressed()) {
            this.vx += this.speed;
        }
        this.vx *= this.deceleration;
        // GH3
        if(this.shield) {
            this.shield.setPosition(this.x, this.y);
        }
        // end GH3
    }
}