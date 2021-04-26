import MenuScene from './js/MenuScene.js'
import GameScene from './js/GameScene.js'

var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 640,
        height: 960
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [ MenuScene, GameScene ],
};

var game = new Phaser.Game(config);