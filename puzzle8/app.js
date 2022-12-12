const fs = require("fs");


fs.readFile("input.txt", "utf8", (err, data) => {
    
    data = data.split('\r\n');

    let trees = [];

    let outerTrees = data[0].length*2 + (data.length-2)*2;

    data.forEach( (line, y) => {
        if(y==0 || y==data.length-1) return;

        // count from left
        line.split('').map(p=>parseInt(p)).reduce((prev, curr, x) => {
            if(x!=0 && x!=line.length-1){
                if(prev < curr) {
                    prev = curr;
                    if(!trees.includes([x,y])) {
                        trees.push([x,y]);
                    }
                }
            }
            return prev;
        }, line[0])

        // count from right
        line.split('').map(p=>parseInt(p)).reduceRight((prev, curr, x, arr) => {
            if(x!=0 && x!=line.length-1){
                if(prev < curr) {
                    prev = curr;
                    if(!trees.includes([arr.length-1-x,y])) {
                        trees.push([arr.length-1-x,y]);
                    }
                }
            }
            return prev;
        }, line[line.length-1])

        // count from top
        line.split('').map(p=>parseInt(p)).forEach( (tree, x) => {
            if(x!=0 && x!=line.length-1) {
                let topTrees = [];
                for(let p = 0; p < y; p++) {
                    topTrees.push(parseInt(data[p][x]));
                }
                if(topTrees.filter( topTree => topTree >= tree).length == 0) {
                    if(!trees.includes([x,y])) {
                        trees.push([x,y]);
                    }
                }
            }
        })
        

        // count from bottom
        line.split('').map(p=>parseInt(p)).forEach( (tree, x) => {
            if(x!=0 && x!=line.length-1) {
                let bottomTrees = [];
                for(let p = y+1; p < data.length; p++) {
                    bottomTrees.push(parseInt(data[p][x]));
                }
                if(bottomTrees.filter( bottomTree => bottomTree >= tree).length == 0) {
                    if(!trees.includes([x,y])) {
                        trees.push([x,y]);
                    }
                }
            }
        })
    })

    console.log(trees.length);
    
});