const fs = require("fs");

let path = [];
let directories = {};
// in order to debug add puzzle7/ in front of input.txt
fs.readFile("input.txt", "utf8", (err, data) => {
    data = data.split('\r\n');

    data.forEach(line => parse(line));

    console.log(directories);

    let result = 0;
    for(key in directories) {
        if(directories[key] <= 100000) {
            result += directories[key];
        }
    }

    console.log(result);
})


function parse(line) {
    if(line.startsWith('dir ')) {
        const dir = line.split(' ');
        directories[dir[1]] = 0;
    }

    if(/[0-9]/.test(line[0])) {
        const size = line.split(' ');
        path.forEach( dir => {
            directories[dir] += parseInt(size[0]);
        })
    }

    if(line.startsWith('$ cd ')) {
        const newDir = line.split(' ');
        if(newDir[2] === '/') {
            path.push('/');
            directories['/'] = 0;
        } else if(/[a-zA-Z]/.test(newDir[2])) {
            path.push(newDir[2]);
        } else {
            path.pop();
        }
    }
}