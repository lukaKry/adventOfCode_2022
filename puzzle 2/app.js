const fs = require("fs");

const transl = {
    "A": "rock",
    "B": "paper",
    "C": "scissors",
    "X": "loss",
    "Y": "draw",
    "Z": "win",
    "win": "6 points",
    "draw": "3 points",
    "loss": "0 points"
}
const dict2 = {
    "AX": 3,
    "AY": 4,
    "AZ": 8,
    "BX": 1,
    "BY": 5,
    "BZ": 9,
    "CX": 2,
    "CY": 6,
    "CZ": 7,
}
const dict = {
    "AX": 4,
    "AY": 8,
    "AZ": 3,
    "BX": 1,
    "BY": 5,
    "BZ": 9,
    "CX": 7,
    "CY": 2,
    "CZ": 6,
}

fs.readFile("input.txt", "utf8", (err, data) => {
  data = data.split("\n");
  data.pop();
  const mappedData = data.map(line => {
    return dict2[line[0]+line[2]];
  });

  // (B2) FILE DATA
  console.log(mappedData[0]);
  console.log(mappedData[1]);
  console.log(mappedData[mappedData.length -1]);
  console.log(mappedData[mappedData.length -2]);
  console.log('length: ', mappedData.length);
  console.log('sum: ', mappedData.reduce((acc, curr)=>acc+curr));
});