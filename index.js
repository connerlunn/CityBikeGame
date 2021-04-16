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

function create ()
{
    leftArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    upArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    rightArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


    biker = this.physics.add.image(200, 200, 'biker');
    biker.setCollideWorldBounds(true);

    text = this.add.text(0, 0, 'Use Arrow Keys to Move', { font: '"Arial"' });
    graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });

    previousX = biker.x;
    previousY = biker.y;
}


function update()
{
    text.text = "Angle: " + Math.round(biker.angle) + "   // AngleRateOfChange: " + angleRateOfChange;

    if (upArrowKey.isDown){
        biker.angle += angleRateOfChange;

        biker.x += Math.sin(biker.angle*3.1415/180);
        biker.y -= Math.cos(biker.angle*3.1415/180);

        var line = new Phaser.Geom.Line(previousX, previousY, biker.x, biker.y);
        graphics.strokeLineShape(line);

        previousX = biker.x;
        previousY = biker.y;
    }
    if (leftArrowKey.isDown)
    {
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
}