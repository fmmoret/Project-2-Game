/**
 * Project 2 Game - Level Editor
 *
 * Forrest Moret & Eric Schmidt
 * February 2016
 */

(function() {

    var canvas;
    var stage;
    var drawing = false;
    var curX;
    var curY;
    var platforms = [];

    function onLoaded() {
        canvas = document.getElementsByTagName('canvas')[0];
        stage = canvas.getContext('2d');
        bindEventListeners();
    }

    function bindEventListeners() {
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mousemove', onMouseMove);
        document.getElementById('btn-undo').addEventListener('click', undo);
    }

    function onMouseDown(e) {
        drawing = true;
        curX = e.offsetX;
        curY = e.offsetY;
    }

    function onMouseUp(e) {
        drawing = false;
        var width = e.offsetX - curX;
        var height = e.offsetY - curY;
        addPlatform({x: curX, y: curY, width: width, height: height});
    }

    function onMouseMove(e) {
        if (drawing) {
            var width = e.offsetX - curX;
            var height = e.offsetY - curY;
            drawPlatforms();
            drawRect(curX, curY, width, height);
        }
    }

    function drawRect(x, y, width, height) {
        stage.fillStyle = '#007700';
        stage.fillRect(x, y, width, height);
    }

    function addPlatform(plat) {
        if (plat.width < 0) {
            plat.x += plat.width;
            plat.width *= -1;
        }
        if (plat.height < 0) {
            plat.y += plat.height;
            plat.height *= -1;
        }
        platforms.push(plat);
        getCode();
    }

    function drawPlatforms() {
        stage.clearRect(0, 0, 800, 600);
        for (var i = 0; i < platforms.length; i++) {
            var p = platforms[i];
            drawRect(p.x, p.y, p.width, p.height);
        }
    }

    function undo() {
        platforms.pop();
        drawPlatforms();
        getCode();
    }

    function getCode() {
        document.getElementById('code').innerHTML = JSON.stringify(platforms);
    }

    window.setPlatforms = function(data) {
        platforms = data;
        drawPlatforms();
        getCode();
    }

    // Add event listeners
    window.addEventListener('DOMContentLoaded', onLoaded);

})();
