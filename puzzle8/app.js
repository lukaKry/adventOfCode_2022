const fs = require("fs");


fs.readFile("input.txt", "utf8", (err, data) => {
    
    data = data.split('\r\n');

    let treeCounter = 0;
    let maxScenicScore = 0;

    for(let x = 1; x < data[0].length-1; x++) {
        for(let y = 1; y < data.length-1; y++) {
            const isTreeVisible = checkTreeVisibility(x,y);
            if(isTreeVisible) treeCounter++;
            const treeScenicScore = scoreFromTop(x,y) * 
            scoreFromBottom(x,y) *
            scoreFromLeft(x,y) *
            scoreFromRight(x,y);
            maxScenicScore = treeScenicScore > maxScenicScore ? treeScenicScore : maxScenicScore;

        }
    }

    const borderTrees = data[0].length*2 + (data.length-2)*2
    console.log('visible tress: ', treeCounter+borderTrees);
    console.log('max scenic score for the forest: ', maxScenicScore);

    function checkTreeVisibility(x,y) {
        return visibleFromTop(x,y) ||
          visibleFromBottom(x,y) ||
          visibleFromLeft(x,y) ||
          visibleFromRight(x,y);
    }
    function visibleFromTop(x,y) {
        const treeHight = parseInt(data[y][x]);
        for(let i = y-1; i >= 0; i--) {
            const assertionHight = parseInt(data[i][x]);
            if(treeHight <= assertionHight) {
                return false;
            } 
        }
        console.log(`tree [${x},${y}] with high of ${treeHight} is visible from top`);
        return true;
    }
    function visibleFromBottom(x,y) {
        const treeHight = parseInt(data[y][x]);
        for(let i = y+1; i<data.length; i++) {
            const assertionHight = parseInt(data[i][x]);
            if(treeHight <= assertionHight) {
                return false;
            } 
        }
        console.log(`tree [${x},${y}] with high of ${treeHight} is visible from bottom`);
        return true;
    }
    function visibleFromLeft(x,y) {
        const treeHight = parseInt(data[y][x]);
        for(let j = x-1; j>=0; j--) {
            const assertionHight = parseInt(data[y][j]);
            if(treeHight <= assertionHight) {
                return false;
            } 
        }
        console.log(`tree [${x},${y}] with high of ${treeHight} is visible from left`);
        return true;
    }
    function visibleFromRight(x,y) {
        const treeHight = parseInt(data[y][x]);
        for(let j = x+1; j<data[0].length; j++) {
            const assertionHight = parseInt(data[y][j]);
            if(treeHight <= assertionHight) {
                return false;
            } 
        }
        console.log(`tree [${x},${y}] with high of ${treeHight} is visible from right`);
        return true;
    }

    function scoreFromTop(x,y) {
        const treeHight = parseInt(data[y][x]);
        for(let i = y-1; i >= 0; i--) {
            const assertionHight = parseInt(data[i][x]);
            if(assertionHight >= treeHight) {
                return y-i;
            }
        }
        return y;
    }

    function scoreFromBottom(x,y) {
        const treeHight = parseInt(data[y][x]);
        for(let i = y+1; i < data.length; i++) {
            const assertionHight = parseInt(data[i][x]);
            if(assertionHight >= treeHight) {
                return i-y;
            }
        }
        return data.length - 1 - y;
    }
    function scoreFromLeft(x,y) {
        const treeHight = parseInt(data[y][x]);
        for(let j = x-1; j>=0; j--) {
            const assertionHight = parseInt(data[y][j]);
            if(assertionHight >= treeHight) {
                return x-j;
            }
        }
        return x;
    }
    function scoreFromRight(x,y) {
        const treeHight = parseInt(data[y][x]);
        for(let j = x+1; j<data[0].length; j++) {
            const assertionHight = parseInt(data[y][j]);
            if(assertionHight >= treeHight) {
                return j-x;
            }
        }
        return data[0].length -1 -x;
    }

    
});