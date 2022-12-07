const fs = require("fs");

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function createDict() {
    let dict = {};
    alphabet.split('').map((letter, index) => {
        dict[letter] = index+1;
    })
    return dict;
}
const dict = createDict();

fs.readFile("input.txt", "utf8", (err, data) => {
    const backpacks = data.split("\n");
    

    let wages = [];

    for(let i = 0; i< backpacks.length; i += 3) {
        let letterArr = backpacks[i].split('');
        for(let j = 0; j<letterArr.length; j++) {
            if(backpacks[i+1].includes(letterArr[j])) {
                if(backpacks[i+2].includes(letterArr[j])) {
                    wages.push(letterArr[j]);
                    break;
                }
            }
        }
    }


  
    const mappedItems = wages.map( item => dict[item]);
    const result = mappedItems.reduce((acc, curr) => acc+curr);
  
    // (B2) FILE DATA
    console.log(wages);
    console.log(mappedItems);
    console.log(result);
  });

// fs.readFile("input.txt", "utf8", (err, data) => {
//   const backpacks = data.split("\n");
  
//   const commonItems = backpacks.map((itemList) => {
//         const middleIndex = (itemList.length/2)
//         const firstHalf = itemList.substring(0, middleIndex).split('');
//         const secondHalf = itemList.substring(middleIndex, itemList.length);

//         let commonItem = '';
//         firstHalf.forEach(letter => {
//             if(secondHalf.includes(letter)) commonItem = letter;
//         });

//         return commonItem;
//     }
//   );

//   const mappedItems = commonItems.map( item => dict[item]);
  
//   const result = mappedItems.reduce((acc, curr) => {
//     if(curr != null) {
//         return acc+curr;
//     } else {
//         return acc;
//     }
//   })

//   // (B2) FILE DATA
//   console.log(commonItems);
//   console.log(mappedItems);
//   console.log(result);
// });