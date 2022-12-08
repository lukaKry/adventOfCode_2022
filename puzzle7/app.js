const fs = require("fs");

let path = [];
let directories = {};
fs.readFile("input.txt", "utf8", (err, data) => {
    data = data.split('\r\n');

    data.forEach(line => parse(line));

    let ans1 = 0;
    for(key in directories) {
        if(directories[key] <= 100000) {
            ans1 += directories[key];
        }
    }
    console.log(ans1);

    // calc needed space to free 
    const totalCapacity = 70000000;
    const freeSpaceLeft = totalCapacity - directories['/'];
    const remainingSpaceToRelease = 30000000 - freeSpaceLeft;
    const potentialDirsToDelete = [];
    for(key in directories) {
        if(directories[key] >= remainingSpaceToRelease) {
            potentialDirsToDelete.push(directories[key]);
        }
    }
    potentialDirsToDelete.sort((a,b) => a-b);
    console.log(potentialDirsToDelete[0]);

})


function parse(line) {
    if(/[0-9]/.test(line[0])) {
        const size = line.split(' ');
        for(let j = 0; j<path.length; j++) {
            const dirName = path.slice(0,j+1);
            directories[dirName.join('')] += parseInt(size[0]);
        }
    }

    if(line.startsWith('$ cd ')) {
        const newDir = line.split(' ');
        if(newDir[2] === '/') {
            path.push('/');
            const dirNameByPath = path.join('');
            directories[dirNameByPath] = 0;
        } else if(/[a-zA-Z]/.test(newDir[2])) {
            path.push(newDir[2]);
            const dirName = path.join('');
            directories[dirName] = 0;
        } else {
            path.pop();
        }
    }
}