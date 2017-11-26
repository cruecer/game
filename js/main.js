var game = new Phaser.Game(1024,600, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render});

var player;
var starfield;
var cursor;
var bankx;
var bullets;
var fireButton;
var bulletTimer = 0;
var ACCLERATION = 1500;
var DRAG = 500;
var MAXSPEED = 600;

function preload() {
    game.load.image('starfield', '../img/background.jpg');
    game.load.image('ship', '../img/player0000.png');
    game.load.image('bullet', '../img/bullet.png')
}

function create() {
    starfield = game.add.tileSprite(0, 0, 1024, 600, 'starfield');
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    player = game.add.sprite(512, 500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    player.body.drag.setTo(DRAG, DRAG);
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    starfield.tilePosition.y += 1;
    player.body.acceleration.x = 0;
    player.body.acceleration.y = 0;
    if (fireButton.isDown) {
        fireBullet();
    }
    if (cursors.left.isDown) {
        player.body.acceleration.x = -ACCLERATION;
    } else if (cursors.right.isDown) {
        player.body.acceleration.x = ACCLERATION;
    }
    if (cursors.up.isDown) {
        player.body.acceleration.y = -ACCLERATION/2;
    } else if (cursors.down.isDown) {
        player.body.acceleration.y = ACCLERATION/2;
    }
    if (player.x > game.width - 40) {
        player.x = game.width - 40;
        player.body.acceleration.x = 0;
    }
   if (player.x < 40) {
        player.x = 40;
        player.body.acceleration.x = 0;
    }
    if (player.y > game.height - 50) {
        player.y = game.height - 50;
        player.body.acceleration.y = 0;
    }
    if (player.y < 50) {
        player.y = 50;
        player.body.acceleration.y = 0;
    }
    bankx = player.body.velocity.x / MAXSPEED;
    player.scale.x = 1 - Math.abs(bankx) / 20;
    player.angle = bankx * 2;

}

function render() {

}
function fireBullet() {
    if (game.time.now > bulletTimer) {
        var BULLET_SPACING = 100;
        var bullet = bullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(player.x, player.y - 30);
            bullet.body.velocity.y = -700;
            bulletTimer = game.time.now + BULLET_SPACING;
        }
    }
}
