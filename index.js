var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('biker', './assets/sprites/bikerv1.png')
}


var leftArrowKey;
var upArrowKey;
var rightArrowKey;
var angleRateOfChange = 0;

var biker;
var graphics;
var text;
var previousX;
var previousY;

var bikerSpeed = 0;

var gameHasStarted = false;

function create ()
{
    leftArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    upArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    rightArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    text = this.add.text(0, 0, 'Up Arrow to Accelerate.\nLeft and Right Arrows to turn. \nPress any arrow key to start. ', { font: '"Arial"' });
    graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });

    var Physics = this.physics;

    this.input.keyboard.on('keyup', function (event) {
        if ( !gameHasStarted && (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40))
        {
            biker = Physics.add.image(200, 200, 'biker');
            biker.setCollideWorldBounds(true);

            previousX = biker.x;
            previousY = biker.y;
        
            gameHasStarted = true;
        }
    });

}

function update()
{
    if (gameHasStarted) {
        text.text = "Angle: " + Math.round(biker.angle) + "   // AngleRateOfChange: " + Math.round(angleRateOfChange);

        if (upArrowKey.isDown) {
            if(bikerSpeed < 1){
                bikerSpeed += .001
            }

        }
        else {
            //decelearate
            if(bikerSpeed > 0){
                bikerSpeed -= .001;

                //straighten out player as they slow down
                if (angleRateOfChange < 0) {
                    angleRateOfChange += .001/(bikerSpeed+.1);
                }
                if (angleRateOfChange > 0){
                    angleRateOfChange -= .001/(bikerSpeed+.1);
                }
            }
        }
        if (leftArrowKey.isDown) {
            if (angleRateOfChange > -1.5) {
                angleRateOfChange -= .05;
            }
        }
        if (rightArrowKey.isDown)
        {
            if (angleRateOfChange < 1.5) {
                angleRateOfChange += .05;
            }
        }

        //update biker position based on speed
        if (bikerSpeed > 0){
        
            biker.angle += angleRateOfChange*bikerSpeed;

            biker.x += Math.sin(biker.angle*3.1415/180)*bikerSpeed;
            biker.y -= Math.cos(biker.angle*3.1415/180)*bikerSpeed;

            var line = new Phaser.Geom.Line(previousX, previousY, biker.x, biker.y);
            graphics.strokeLineShape(line);

            previousX = biker.x;
            previousY = biker.y;
        }
    }
}