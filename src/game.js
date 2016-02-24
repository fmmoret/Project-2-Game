/**
 * Project 2 Game
 *
 * Forrest Moret & Eric Schmidt
 * February 2016
 */

(function() {

    // GAME VARIABLES
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
    var loadingText;
    var menu;
    var playButton;
    var levelIndex;
    var gravities;
    var gravityIndex;
    var player;
    var goal;
    var platforms;
    var downArrow;
    var cursors;
    var jumpButton;
    var flipTimer;
    var gravityDirection = {x: 0, y: 0};

    // CONSTANTS
    var GRAVITY_STRENGTH = 500;
    var JUMP_VELOCITY = 300;
    var MOVE_VELOCITY = 250;
    var TIME_TO_FLIP = 6000;
    var WARNING_TIME = 3000;

    // HELPER FUNCTIONS

    // Gets the proper sprite rotation value given a gravity direction
    function getRotation(dir) {
        if (dir.x > 0 && dir.y === 0) {
            return Math.PI*1.5;
        }
        if (dir.x < 0 && dir.y === 0) {
            return Math.PI/2;
        }
        if (dir.x === 0 && dir.y > 0) {
            return 0;
        }
        if (dir.x === 0 && dir.y < 0) {
            return Math.PI;
        }
        return 0;
    }

    // Scales a vector (an object with x and y properties)
    function scaleVector(scale, vector) {
        return {x: scale*vector.x, y: scale*vector.y};
    }

    // Determines if the player can jump based on the current gravity
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

    // Displays & initializes the level with the given index
    function loadLevel(index) {
        // Get the level data from the index
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
        player.body.velocity.setTo(0, 0);
        player.visible = true;
        goal.position.setTo(level.goal.x, level.goal.y);
        // Set initial gravity
        setGravity(level.gravity[0]);
        gravities = level.gravity;
        gravityIndex = 0;
    }

    // Sets the gravity to be in the given direction (dir must be a unit vector)
    function setGravity(dir) {
        gravityDirection = dir;
        var gravity = scaleVector(GRAVITY_STRENGTH, dir);
        player.body.gravity.setTo(gravity.x, gravity.y);
        player.rotation = getRotation(dir);
    }

    // Displays an arrow indicating the next gravity direction and then changes the gravity
    function warnAndFlip() {
        if (!gravities || gravityIndex === gravities.length-1) return;
        gravityIndex = Math.min(gravityIndex+1, gravities.length-1);
        var dir = gravities[gravityIndex];
        downArrow.rotation = getRotation(dir);
        downArrow.alpha = 1;
        setTimeout(function() {
            downArrow.alpha = 0;
            setGravity(dir);
        }, WARNING_TIME);
    }

    // Actions to perform when the goal is reached
    function onGoalReached() {
        console.log('YOU WIN');
        displayMenu();
    }

    // Displays the menu
    function displayMenu() {
        if (platforms) platforms.destroy();
        goal.position.setTo(-100, -100);
        player.visible = false;
        downArrow.alpha = 0;
        menu.alpha = 1;
        playButton.visible = true;
    }

    // Hides the menu!
    function hideMenu() {
        menu.alpha = 0;
        playButton.visible = false;
    }

    // Handles clicking the 'play' button
    function onPlayClicked() {
        hideMenu();
        loadLevel(0);
    }

    // PHASER MAIN FUNCTIONS

    // Preload assets
    function preload() {
        game.stage.backgroundColor = '#ffffff';

        loadingText = game.add.text(400, 300, 'Loading...', {fill: '#007700', align: 'center'});
        loadingText.anchor.set(0.5);

        game.load.baseURL = 'assets/';
        game.load.crossOrigin = 'anonymous';

        game.load.image('menu', 'menu.png');
        game.load.image('playButton', 'play-button.png');
        game.load.spritesheet('player', 'dude.png', 48, 48);
        game.load.image('goal', 'diamond.png');
        game.load.image('platform', 'platform.png');
        game.load.image('arrow', 'down-arrow.png');
    }

    // Create the game objects
    function create() {
        // The menu
        menu = game.add.sprite(0, 0, 'menu');

        // The 'play' button
        playButton = game.add.button(264, 320, 'playButton', onPlayClicked);

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
        downArrow = game.add.sprite(400, 300, 'arrow');
        downArrow.alpha = 0;
        downArrow.scale.setTo(0.5, 0.5);
        downArrow.anchor.setTo(0.5, 0.5);

        // Set up input
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Set up gravity flipping timer
        flipTimer = game.time.events.add(TIME_TO_FLIP, warnAndFlip);
        flipTimer.loop = true;

        // Hide the loading message & display the menu screen
        loadingText.visible = false;
        displayMenu();
    }


    // Main update loop
    function update() {
        game.physics.arcade.collide(player, platforms);

        // Check if goal reached
        if (game.physics.arcade.overlap(player, goal)) {
            onGoalReached();
        }

        // Stop the player's walking velocity
        if (gravityDirection.x === 0) {
            player.body.velocity.x = 0;
        } else if(gravityDirection.y === 0) {
            player.body.velocity.y = 0;
        }

        // Handle walking input
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
        } else {
            player.animations.stop(null, true);
        }

        // Handle jumping input
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
