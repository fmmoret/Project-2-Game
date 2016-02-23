/**
 * Project 2 Game
 *
 * Forrest Moret & Eric Schmidt
 * February 2016
 */

(function() {

    // Game variables
    var stageWidth = 800;
    var stageHeight = 600;
    var game = new Phaser.Game(stageWidth, stageHeight, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
    var player;
    var goal;
    var levelIndex;
    var platforms;
    var downArrow;
    var cursors;
    var jumpButton;
    var flipTimer;
    var facing = 'right';
    var gravityDirection = {x: 0, y: 1};

    // Constants
    var GRAVITY_STRENGTH = 500;
    var JUMP_VELOCITY = 300;
    var MOVE_VELOCITY = 250;
    var TIME_TO_FLIP = 6000;
    var WARNING_TIME = 3000;
    var GRAVITY_DIRECTIONS = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}];
    var ROTATIONS = [Math.PI*3.0/2.0, Math.PI/2, 0, Math.PI];

    // Helper functions
    function scaleVector(scale, vector) {
        return {x: scale*vector.x, y: scale*vector.y};
    }

    function playerCanJump() {
        if (gravityDirection.x === 0 && gravityDirection.y > 0) {
            return (player.body.touching.down);// || player.body.touching.right || player.body.touching.left);
        }
        if (gravityDirection.x === 0 && gravityDirection.y < 0) {
            return (player.body.touching.up); // || player.body.touching.right || player.body.touching.left);
        }
        if (gravityDirection.y === 0 && gravityDirection.x > 0) {
            return (player.body.touching.right); // || player.body.touching.up || player.body.touching.down);
        }
        if (gravityDirection.y === 0 && gravityDirection.x < 0) {
            return (player.body.touching.left); // || player.body.touching.up || player.body.touching.down);
        }
    }

    function loadLevel(index) {
        levelIndex = index;
        var level = window._levels[index];
        // Place platforms
        if (platforms) platforms.destroy();
        platforms = game.add.physicsGroup();
        for (var i = 0; i < level.platforms.length; i++) {
            var data = level.platforms[i];
            var platform = platforms.create(data.x, data.y, 'platform');
            platform.scale.setTo(data.width/100, data.height/100);
        }
        platforms.setAll('body.immovable', true);
        // Place player & goal
        player.position.setTo(level.start.x, level.start.y);
        goal.position.setTo(level.goal.x, level.goal.y);
        // Set initial gravity
        setGravity(level.gravity[0]);
    }

    function setGravity(dir) {
        gravityDirection = dir;
        var gravity = scaleVector(GRAVITY_STRENGTH, dir);
        player.body.gravity.setTo(gravity.x, gravity.y);
    }

    function changeGravity(index) {
        setGravity(GRAVITY_DIRECTIONS[index]);
        player.rotation = ROTATIONS[index];
        player.scale.x = (index === 3) ? -1 : 1;
    }

    function warnAndFlip() {
        // warn and flip gravity
        var index = Math.floor(Math.random() * 4);
        downArrow.rotation = ROTATIONS[index];
        downArrow.alpha = 1;
        setTimeout(function() {
            downArrow.alpha = 0;
            changeGravity(index);
        }, WARNING_TIME);
    }

    function goalReached() {
        console.log('YOU WIN');
    }

    // Preload assets
    function preload() {
        game.stage.backgroundColor = '#ffffff';

        game.load.baseURL = 'assets/';
        game.load.crossOrigin = 'anonymous';

        game.load.spritesheet('player', 'dude.png', 48, 48);
        game.load.image('goal', 'diamond.png');
        game.load.image('platform', 'platform.png');
        game.load.image('arrow', 'down-arrow.png');
    }

    // Create the game objects
    function create() {
        // The goal
        goal = game.add.sprite(0, 0, 'goal');
        game.physics.arcade.enable(goal);

        // The player
        player = game.add.sprite(0, 0, 'player');
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        // Set up player physics
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.anchor.setTo(0.5, 0.5);

        // Create the warning arrow
        downArrow = game.add.sprite(stageWidth/2, stageHeight/2, 'arrow');
        downArrow.alpha = 0;
        downArrow.scale.setTo(0.5, 0.5);
        downArrow.anchor.setTo(0.5, 0.5);

        // Set up input
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Set up gravity flipping timer
        flipTimer = game.time.events.add(TIME_TO_FLIP, warnAndFlip);
        flipTimer.loop = true;

        // Load the first level
        loadLevel(0);
    }


    // Main update loop
    function update() {
        game.physics.arcade.collide(player, platforms);

        // Check if goal reached
        if (game.physics.arcade.overlap(player, goal)) {
            goalReached();
        }

        // Stop the player
        if (gravityDirection.x === 0) {
            player.body.velocity.x = 0;
        } else if(gravityDirection.y === 0) {
            player.body.velocity.y = 0;
        }

        // Handle moving input
        if (cursors.left.isDown) {
            if (gravityDirection.x === 0 && gravityDirection.y > 0) {
                player.body.velocity.x = -MOVE_VELOCITY;
            }
            if (gravityDirection.x === 0 && gravityDirection.y < 0) {
                player.body.velocity.x = -MOVE_VELOCITY;
            }
            if (gravityDirection.y === 0 && gravityDirection.x > 0) {
                player.body.velocity.y = MOVE_VELOCITY;
            }
            if (gravityDirection.y === 0 && gravityDirection.x < 0) {
                player.body.velocity.y = -MOVE_VELOCITY;
            }
            player.animations.play('left');
            facing = 'left';
        } else if (cursors.right.isDown) {
            if (gravityDirection.x === 0 && gravityDirection.y > 0) {
                player.body.velocity.x = MOVE_VELOCITY;
            }
            if (gravityDirection.x === 0 && gravityDirection.y < 0) {
                player.body.velocity.x = MOVE_VELOCITY;
            }
            if (gravityDirection.y === 0 && gravityDirection.x > 0) {
                player.body.velocity.y = -MOVE_VELOCITY;
            }
            if (gravityDirection.y === 0 && gravityDirection.x < 0) {
                player.body.velocity.y = MOVE_VELOCITY;
            }
            player.animations.play('right');
            facing = 'right';
        } else {
            player.animations.stop(null, true);
        }

        if (jumpButton.isDown && playerCanJump()) {
            var jump = scaleVector(-JUMP_VELOCITY, gravityDirection);
            if (gravityDirection.x === 0) {
                player.body.velocity.y = jump.y;
            } else if(gravityDirection.y === 0) {
                player.body.velocity.x = jump.x;
            }
        }
    }

})();
