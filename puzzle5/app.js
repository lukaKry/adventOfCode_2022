const fs = require("fs");

const grid = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: []
}
const instructions = [];
const isLetter = /[A-Z]/;
const decodePattern = /^move ([0-9]*) from ([0-9]*) to ([0-9]*)$/;


fs.readFile("input.txt", "utf8", (err, data) => {
    const lines = data.split("\r\n");
    
    populateGrid(lines);
    populateInstructions(lines);
    followInstructions9001();

    // console.log(grid);
    // console.log(instructions);
    // console.log(grid);
    // (B2) FILE DATA
    const result = grid[1][0]+grid[2][0]+grid[3][0]+grid[4][0]+grid[5][0]+grid[6][0]+grid[7][0]+grid[8][0]+grid[9][0];
    console.log(result);
  });

  function populateGrid(data) {
    for(let i=0; i<8; i++) {
        data[i].split('').forEach((char, idx) => {
            if(isLetter.test(char)) {
                const columnNum = (idx+3)/4;
                grid[columnNum].push(char);
            }
        })
    }
  }
  function populateInstructions(data) {
    for(let i = 10; i<data.length; i++) {
        const s = data[i].match(decodePattern);
        instructions.push([parseInt(s[1]),parseInt(s[2]),parseInt(s[3])]);
    }
  }
  function followInstructions() {
    instructions.forEach( move => {
        // move = [howMany, from, to]
        for(let i = 0; i<move[0]; i++) {
            const crate = grid[move[1]].shift();
            grid[move[2]].unshift(crate);
        }
    })
  }
  function followInstructions9001() {
    instructions.forEach( move => {
        // move = [howMany, from, to]
        const crates = grid[move[1]].splice(0,move[0]);
        grid[move[2]] = crates.concat(grid[move[2]]);
    })
  }
