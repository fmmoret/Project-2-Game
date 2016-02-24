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
        goal: {x: 750, y: 255},
        gravity: [
            {x: 0, y: 1},
            {x: 0, y: -1}
        ],
        platforms: [
            {"x":0,"y":0,"width":800,"height":20},
            {"x":0,"y":0,"width":20,"height":600},
            {"x":780,"y":0,"width":20,"height":600},
            {"x":0,"y":580,"width":800,"height":20},
            {"x":536,"y":536,"width":17,"height":49},
            {"x":682,"y":200,"width":102,"height":16},
            {"x":682,"y":300,"width":102,"height":16},
        ]
    },
    // Level 1
    {
        start: {x: 50, y: 530},
        goal: {x: 750, y: 160},
        gravity: [
            {x: 0, y: 1},
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: -1},
            {x: 1, y: 0}
        ],
        platforms: [
            {"x":780,"y":0,"width":20,"height":600},
            {"x":0,"y":580,"width":800,"height":20},
            {"x":170,"y":221,"width":99,"height":13},
            {"x":537,"y":224,"width":14,"height":88},
            {"x":356,"y":383,"width":190,"height":14},
            {"x":358,"y":126,"width":63,"height":15},
            {"x":641,"y":121,"width":143,"height":15},
            {"x":643,"y":200,"width":142,"height":15},
        ]
    },
    // Level 3
    {
        start: {x: 80, y: 530},
        goal: {x: 30, y: 310},
        gravity: [
            {x: 0, y: 1},
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: -1, y: 0},
        ],
        platforms: [
            {"x":45,"y":582,"width":74,"height":15},
            {"x":268,"y":584,"width":72,"height":12},
            {"x":407,"y":133,"width":93,"height":14},
            {"x":751,"y":297,"width":18,"height":93},
            {"x":7,"y":283,"width":16,"height":100},
            {"x":45,"y":442,"width":5,"height":144},
            {"x":49,"y":436,"width":212,"height":15}
        ]
    },
    // Level 4
    {
        start: {x: 80, y: 0},
        goal: {x: 540, y: 210},
        gravity: [
            {x: 0, y: 1},
            {x: 0, y: -1},
        ],
        platforms: [
            {"x":553,"y":240,"width":0,"height":0},
            {"x":325,"y":585,"width":28,"height":10},
            {"x":523,"y":171,"width":9,"height":85},
            {"x":593,"y":171,"width":9,"height":85},
            {"x":523,"y":245,"width":73,"height":11}
        ]
    },

];
