// GH1
class PowerupBar extends StatusBarSprite {
    public overheated: boolean = false;

    constructor(statusBar: statusbars.StatusBar) {
        super(statusBar);
        this.setPosition(128, 118);
        this.value = 0;
        this.z = 5;
    }

    public cooldown() {
        this.overheated = true;
        this.value = 0;
        this.setColor(2, 2);
        timer.after(5000, function (): void {
            this.overheated = false;
            this.setColor(8, 11)
            music.jumpUp.play()
        });
    }
}
// end GH1// Add your code here
