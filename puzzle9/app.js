const fs = require("fs");


fs.readFile("input.txt", "utf8", (err, data) => {
    
    data = data.split('\r\n');


    // [x,y] x is horizontal axis, y is vertical axis
    let tail = [0,0];
    let head = [0,0];

    let visited = [];


    data.forEach( line => {
        const order = line.split(' ')
        moveHead(order);
        // console.log('head', head);
        // console.log('tail', tail);
        // console.log('visited', visited);
        // drawVisited();
    })


    function drawVisited() {
        let arr = [];
        for(let i = 0; i<10;i++){
            for(let j=0; j<10;j++){
                arr.push
            }
        }
    }

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

    function moveRight(distance) {
        for(let i = 0; i < distance; i++) {
            head[0]++;
            moveTail();
            markVisited();
        }
    }
    function moveLeft(distance) {
        for(let i = 0; i < distance; i++) {
            head[0]--;
            moveTail();
            markVisited();
        }
    }
    function moveUp(distance) {
        for(let i = 0; i < distance; i++) {
            head[1]++;
            moveTail();
            markVisited();
        }
    }
    function moveDown(distance) {
        for(let i = 0; i < distance; i++) {
            head[1]--;
            moveTail();
            markVisited();
        }
    }


    function markVisited() {
        const position = `${tail[0]};${tail[1]}`;
        if(!visited.some( q => q === position)) {
            visited.push(position);
        }
    }

    
    console.log('visited', visited);
    console.log(visited.length);
});