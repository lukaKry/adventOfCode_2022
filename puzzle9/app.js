const { ifError } = require("assert");
const fs = require("fs");


fs.readFile("input.txt", "utf8", (err, data) => {
    
    data = data.split('\r\n');

    // variables for the first part
    // [x,y] x is horizontal axis, y is vertical axis
    let tail = [0,0];
    let head = [0,0];
    let visited = [];

    // second part of the puzzle
    const rope = {
        0: { x: 0, y: 0},
        1: { x: 0, y: 0},
        2: { x: 0, y: 0},
        3: { x: 0, y: 0},
        4: { x: 0, y: 0},
        5: { x: 0, y: 0},
        6: { x: 0, y: 0},
        7: { x: 0, y: 0},
        8: { x: 0, y: 0},
        9: { x: 0, y: 0},
    }


    data.forEach( line => {
        const order = line.split(' ')
        moveHead(order);
    })

    function moveHead(order) {
        let distance = parseInt(order[1]);
        switch (order[0]) {
            case 'R':
                moveRight(distance);
                break;
            case 'L':
                moveLeft(distance);
                break;
            case 'U':
                moveUp(distance);
                break;
            case 'D':
                moveDown(distance);
                break;
            default:
                break;
        }
    }

    function moveTail() {
        // if the tail is next to the head then do not move
        // problem of crossing axis from -1 to 1 ->> add additional 1000 to move moves into one quarter of cooridates
        if(Math.abs(Math.abs(head[0]+1000) - Math.abs(tail[0]+1000)) <=1 &&
        Math.abs(Math.abs(head[1]+1000) - Math.abs(tail[1]+1000)) <= 1) {
            return;
        }

        // if the head is at the same row or column, then move the tail towards the head
        if(head[0] === tail[0]) {
            if(head[1] > tail[1]) {
                tail[1]++;
            } else {
                tail[1]--;
            }
            return;
        }
        if(head[1] === tail[1]) {
            if(head[0] > tail[0]) {
                tail[0]++;
            } else {
                tail[0]--;
            }
            return;
        }

        // if the head is on a different row and column, then the tail move should be diagonal
        if(head[0] > tail[0]) {
            tail[0]++;
            if(head[1] > tail[1]) {
                tail[1]++;
            } else {
                tail[1]--;
            }
        } else {
            tail[0]--;
            if(head[1] > tail[1]) {
                tail[1]++;
            } else {
                tail[1]--;
            }
        }
    }
    function moveSingleKnot(knot) {
        // if the current knot is next to the previous knot then do not move
        // problem of crossing axis from -1 to 1 ->> add additional 1000 to move moves into one quarter of cooridates
        if(Math.abs(Math.abs(rope[knot-1].x+1000) - Math.abs(rope[knot].x+1000)) <=1 &&
        Math.abs(Math.abs(rope[knot-1].y+1000) - Math.abs(rope[knot].y+1000)) <= 1) {
            return;
        }

        // if the previous knot is at the same row or column, then move the current knot towards the head
        if(rope[knot-1].x === rope[knot].x) {
            if(rope[knot-1].y > rope[knot].y) {
                rope[knot].y++;
            } else {
                rope[knot].y--;
            }
            return;
        }
        if(rope[knot-1].y === rope[knot].y) {
            if(rope[knot-1].x > rope[knot].x) {
                rope[knot].x++;
            } else {
                rope[knot].x--;
            }
            return;
        }

        // if the previous knot is on a different row and column, then the current knot move should be diagonal
        if(rope[knot-1].x > rope[knot].x) {
            rope[knot].x++;
            if(rope[knot-1].y > rope[knot].y) {
                rope[knot].y++;
            } else {
                rope[knot].y--;
            }
        } else {
            rope[knot].x--;
            if(rope[knot-1].y > rope[knot].y) {
                rope[knot].y++;
            } else {
                rope[knot].y--;
            }
        }
    }

    function moveRight(distance) {
        for(let i = 0; i < distance; i++) {
            // head[0]++;
            // moveTail();
            // markVisited();
            rope[0].x++;
            moveKnots();
            markVisitedBy9th();
        }
    }
    function moveLeft(distance) {
        for(let i = 0; i < distance; i++) {
            // head[0]--;
            // moveTail();
            // markVisited();
            rope[0].x--;
            moveKnots();
            markVisitedBy9th();
        }
    }
    function moveUp(distance) {
        for(let i = 0; i < distance; i++) {
            // head[1]++;
            // moveTail();
            // markVisited();
            rope[0].y++;
            moveKnots();
            markVisitedBy9th();
        }
    }
    function moveDown(distance) {
        for(let i = 0; i < distance; i++) {
            // head[1]--;
            // moveTail();
            // markVisited();
            rope[0].y--;
            moveKnots();
            markVisitedBy9th();
        }
    }
    function markVisited() {
        const position = `${tail[0]};${tail[1]}`;
        if(!visited.some( q => q === position)) {
            visited.push(position);
        }
    }

    function moveKnots() {
        for(let key in rope) {
            if(key == '0') {
                continue;
            }
            moveSingleKnot(parseInt(key));
        }
    }
    function markVisitedBy9th() {
        const position = `${rope[9].x};${rope[9].y}`;
        if(!visited.some( q => q === position)) {
            visited.push(position);
        }
    }

    
    console.log('visited', visited);
    console.log(visited.length);
    console.log('rope: ', rope);
});