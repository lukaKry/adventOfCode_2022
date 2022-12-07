const fs = require("fs");


fs.readFile("input.txt", "utf8", (err, data) => {
    
    const mark = [];

    let result = [];
    data.split('').forEach((char, idx) => {
        
        mark.push(char);
        if(mark.length >= 15) {
            mark.shift();
        }

        if(mark.length >= 14) {
            const s = new Set(mark);
            if(s.size === mark.length) {
                result.push(idx+1);
            }
        }
    })

    console.log(result[0])
});