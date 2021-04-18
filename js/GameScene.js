export default class GameScene extends Phaser.Scene
{
    //Input Variables
    leftArrowKey;
    upArrowKey;
    rightArrowKey;

    biker;

    //graphics;

    //Physics values
    previousX = 0;
    previousY = 0;
    angleRateOfChange = 0;
    bikerSpeed = 0;

    constructor (){
        super('GameScene');
    }

    preload ()
    {
        this.load.image('biker', './assets/sprites/bikerv1.png');
        this.load.image('straightRoad', './assets/sprites/straightRoad.png');
        this.load.image('curveRoad', './assets/sprites/curveRoad.png')
    }

    create(){
        //Setup Input Variables
        this.leftArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.upArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.rightArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //TODO: Setup Map
        var road1 = this.add.sprite(200,200, 'straightRoad');
        var road2 = this.add.sprite(200,264, 'straightRoad');
        var road3 = this.add.sprite(200,328, 'curveRoad');
        road3.angle  = 180;
        //graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });

        //Setup Biker
        this.biker = this.physics.add.image(200, 200, 'biker');
        this.biker.setCollideWorldBounds(true);
        this.previousX = this.biker.x;
        this.previousY = this.biker.y;

        //Setup Camera
        var camera = this.cameras.main;
        camera.setBounds(0, 0, 800, 600);
        camera.startFollow(this.biker);
        camera.setZoom(4);
    }

    update(time, delta){
        if (this.upArrowKey.isDown) {
            //accelerate
            if(this.bikerSpeed < 2){
                this.bikerSpeed += .0002*delta;
            }
        }
        else {
            //decelearate
            if(this.bikerSpeed > 0){
                this.bikerSpeed -= .0002*delta;

                //straighten out player as they slow down
                if (this.angleRateOfChange < 0) {
                    this.angleRateOfChange += .002*delta/(this.bikerSpeed+.1);
                }
                if (this.angleRateOfChange > 0){
                    this.angleRateOfChange -= .002*delta/(this.bikerSpeed+.1);
                }
            }
        }
        if (this.leftArrowKey.isDown) {
            if (this.angleRateOfChange > -1.5) {
                this.angleRateOfChange -= .005*delta;
            }
        }
        if (this.rightArrowKey.isDown)
        {
            if (this.angleRateOfChange < 1.5) {
                this.angleRateOfChange += .005*delta;
            }
        }

        //update biker position based on speed
        if (this.bikerSpeed > 0){
        
            this.biker.angle += this.angleRateOfChange*this.bikerSpeed*delta/10;

            this.biker.x += Math.sin(this.biker.angle*3.1415/180)*this.bikerSpeed*delta/10;
            this.biker.y -= Math.cos(this.biker.angle*3.1415/180)*this.bikerSpeed*delta/10;

            //Draw line
            //var line = new Phaser.Geom.Line(previousX, previousY, biker.x, biker.y);
            //graphics.strokeLineShape(line);

            this.previousX = this.biker.x;
            this.previousY = this.biker.y;
        }
    }
}