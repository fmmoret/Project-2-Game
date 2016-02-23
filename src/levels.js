/**
 * Project 2 Game - Levels
 *
 * Forrest Moret & Eric Schmidt
 * February 2016
 */

window._levels = [
    // Level 0
    {
        start: {x: 50, y: 530},
        goal: {x: 410, y: 130},
        gravity: [
            {x: 0, y: 1},
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: 1},
        ],
        platforms: [
            {x: 0, y: 0, width: 800, height: 20},
            {x: 0, y: 0, width: 20, height: 600},
            {x: 780, y: 0, width: 20, height: 600},
            {x: 0, y: 580, width: 800, height: 20},
            {x: 325, y: 100, width: 175, height: 25},
            {x: 325, y: 250, width: 175, height: 25},
            {x: 500, y: 100, width: 25, height: 175},
            {x: 250, y: 180, width: 200, height: 10},
            {x: 225, y: 0, width: 25, height: 325},
            {x: 265, y: 380, width: 10, height: 105},
            {x: 365, y: 380, width: 10, height: 75},
            {x: 265, y: 380, width: 110, height: 10},
            {x: 155, y: 420, width: 110, height: 10},
            {x: 445, y: 360, width: 10, height: 75},
            {x: 545, y: 360, width: 10, height: 140},
            {x: 545, y: 360, width: 80, height: 10},
            {x: 445, y: 490, width: 110, height: 10},
            {x: 605, y: 180, width: 90, height: 10},
            {x: 685, y: 20, width: 10, height: 170},
            {x: 605, y: 180, width: 10, height: 180},
        ]
    },
];
