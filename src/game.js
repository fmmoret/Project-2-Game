/**
 * Project 2 Game
 *
 * Forrest Moret & Eric Schmidt
 * February 2016
 */

(function() {

    // Game variables
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    var player;
    var platforms;
    var cursors;
    var jumpButton;

    // Preload assets
    function preload() {
        game.stage.backgroundColor = '#ffffff';

        game.load.baseURL = 'assets/';
        game.load.crossOrigin = 'anonymous';

        game.load.image('player', 'dude.png');
        game.load.image('platform', 'platform.png');
    }

    // Create the environment
    function create() {
        player = game.add.sprite(100, 200, 'player');

        game.physics.arcade.enable(player);

        player.body.collideWorldBounds = true;
        player.body.gravity.y = 500;

        platforms = game.add.physicsGroup();

        platforms.create(500, 150, 'platform');
        platforms.create(-200, 300, 'platform');
        platforms.create(400, 450, 'platform');

        platforms.setAll('body.immovable', true);

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    // Update loop
    function update() {
        game.physics.arcade.collide(player, platforms);

        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -250;
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = 250;
        }

        if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down || player.body.touching.right)) {
            player.body.velocity.y = -400;
        }
    }

})();
