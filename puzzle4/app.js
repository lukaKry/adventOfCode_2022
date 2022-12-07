const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
    data = data.split("\r\n");
    const pattern = /^([0-9]*)-([0-9]*),([0-9]*)-([0-9]*)$/i;
    let counter = 0;
    data.forEach(line => {
        const s = line.match(pattern);
        if(parseInt(s[1]) < parseInt(s[3])) {
            if(parseInt(s[2]) >= parseInt(s[3])) {
                counter++;
            }
        } else if(parseInt(s[1]) > parseInt(s[3])) {
            if(parseInt(s[1]) <= parseInt(s[4])) {
                counter++;
            }
        } else if(parseInt(s[1])==parseInt(s[3])) {
            counter++;
        } else {

        }
    })

    
  
    // (B2) FILE DATA
    console.log(counter);
  });
