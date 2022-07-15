class StatusBarBottle extends DrawableObject {
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ]

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 20;
        this.y = 90;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0....5
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage > 20) {
            return 1;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage == 100) {
            return 5;
        } 
    } 
}