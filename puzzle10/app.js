const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
    
    data = data.split('\r\n');

    let X = 1;
    let cycleNo = 0;
    const levels = [ 20, 60, 100, 140, 180, 220 ];
    let sum = 0;
    const display = []

    data.forEach( line => {
        execute(line);
    })

    function execute(line) {
        if(line.startsWith('noop')) {
            makeCycle();
        } else {
            // starts with addx -> perform 2 cycles
            makeCycle();
            makeCycle();
            
            // update X value
            const instruction = line.split(' ');
            X += parseInt(instruction[1]);
        }
    }

    function makeCycle() {
        cycleNo++;
        if(levels.some( q => q === cycleNo)) {
            sum += cycleNo * X;
        }
        const pixel = getPixelValue();
        display.push(pixel);
    }

    function getPixelValue() {
        const rowNum = Math.floor(cycleNo/40);
        if( cycleNo-rowNum*40-1 >= X-1 && cycleNo-rowNum*40-1 <= X+1) {
            return '#'
        } else {
            return '.'
        }
    }

    function printCRT() {
        console.log(display.slice(0,39).join(''));
        console.log(display.slice(40,79).join(''));
        console.log(display.slice(80,119).join(''));
        console.log(display.slice(120,159).join(''));
        console.log(display.slice(160,199).join(''));
        console.log(display.slice(200,239).join(''));
    }

    // console.log(sum);
    printCRT();
});