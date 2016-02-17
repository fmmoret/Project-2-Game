/**
 * Project 2 Game
 *
 * Forrest Moret & Eric Schmidt
 * February 2016
 */

(function() {

    // Game variables
    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;
    var game = new Phaser.Game(stageWidth, stageHeight, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    var player;
    var platforms;
    var cursors;
    var jumpButton;
    var facing = 'right';

    // Physical variables
    var gravityDirection = {x: 0, y: 1};
    var gravityStrength = 500;
    var jumpVelocity = 400;
    var moveVelocity = 250;

    var platformList = [
        {x: 0, y: 0, width: stageWidth, height: 20},
        {x: 0, y: 0, width: 20, height: stageHeight},
        {x: stageWidth-20, y: 0, width: 20, height: stageHeight},
        {x: 0, y: stageHeight-20, width: stageWidth, height: 20},
    ];

    // Helper functions
    function scaleVector(scale, vector) {
        return {x: scale*vector.x, y: scale*vector.y};
    }

    function playerCanJump() {
        return (player.body.touching.up || player.body.touching.down || player.body.touching.right || player.body.touching.left);
    }

    // Preload assets
    function preload() {
        game.stage.backgroundColor = '#ffffff';

        game.load.baseURL = 'assets/';
        game.load.crossOrigin = 'anonymous';

        game.load.spritesheet('player', 'dude.png', 32, 48);
        game.load.image('platform', 'platform.png');
    }

    // Create the environment
    function create() {
        player = game.add.sprite(200, 200, 'player');
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        game.physics.arcade.enable(player);

        player.body.collideWorldBounds = true;
        player.body.gravity.y = scaleVector(gravityStrength, gravityDirection).y;

        platforms = game.add.physicsGroup();
        for (var i=0; i < platformList.length; i++) {
            var p = platformList[i];
            var plat = platforms.create(p.x, p.y, 'platform');
            plat.scale.setTo(p.width/100, p.height/100);
        }
        platforms.setAll('body.immovable', true);

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    // Update loop
    function update() {
        game.physics.arcade.collide(player, platforms);

        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -moveVelocity;
            player.animations.play('left');
            facing = 'left';
        } else if (cursors.right.isDown) {
            player.body.velocity.x = moveVelocity;
            player.animations.play('right');
            facing = 'right';
        } else {
            player.animations.stop(null, true);
        }

        if (jumpButton.isDown && playerCanJump()) {
            player.body.velocity.y = scaleVector(-jumpVelocity, gravityDirection).y;
        }
    }

})();
