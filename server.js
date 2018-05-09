const readlineSync  = require('readline-sync');
const fs            = require('fs');

 
let inputFile1 = 'Provider1.txt';
let inputFile2 = 'Provider2.txt';
let inputFile3 = 'Provider3.txt';

let title1 = "";
let title2 = "";
let title3 = "";
let title4 = "";
let title5 = "";

let arr1 = [];
let arr2 = [];
let arr3 = [];


try {  
    let data = fs.readFileSync(inputFile1, 'utf8');

    let splitData = data.split("\n");

    splitData.forEach(function(line, index) {

        console.log(`line: ${line}`);

        let splitLine = line.split(",");

        // array element at index 0 contains the row of headers
        if (index === 0) {

            title1 = splitLine[0];
            title2 = splitLine[1];
            title3 = splitLine[2];
            title4 = splitLine[3];
            title5 = splitLine[4];

        } else {

            let result = { 
                [title1] : splitLine[0], 
                [title2] : splitLine[1],
                [title3] : splitLine[2],
                [title4] : splitLine[3],
                [title5] : splitLine[4].trim()
            };
    
            arr1.push(result);

            // console.log(JSON.stringify(result));
        }
    });

    console.log(`arr1:`);
    console.log(arr1);    
} catch(e) {
    console.log('Error:', e.stack);
}


try {  
    let data = fs.readFileSync(inputFile2, 'utf8');

    let splitData = data.split("\n");

    splitData.forEach(function(line, index) {

        let splitLine = line.split(",");

        if (index === 0) {

            title1 = splitLine[0];
            title2 = splitLine[1];
            title3 = splitLine[2];
            title4 = splitLine[3];
            title5 = splitLine[4];

        } else {

            let result = { 
                [title1] : splitLine[0], 
                [title2] : splitLine[1],
                [title3] : splitLine[2],
                [title4] : splitLine[3],
                [title5] : splitLine[4].trim()
            };
    
            arr2.push(result);
        }
    });

    console.log(`arr2:`);
    console.log(arr2);    
} catch(e) {
    console.log('Error:', e.stack);
}


try {  
    let data = fs.readFileSync(inputFile3, 'utf8');

    let splitData = data.split("\n");

    splitData.forEach(function(line, index) {

        let splitLine = line.split("|");

        if (index === 0) {

            title1 = splitLine[0];
            title2 = splitLine[1];
            title3 = splitLine[2];
            title4 = splitLine[3];
            title5 = splitLine[4];

        } else {

            let result = { 
                [title1] : splitLine[0], 
                [title2] : splitLine[1],
                [title3] : splitLine[2],
                [title4] : splitLine[3],
                [title5] : splitLine[4].trim()
            };
    
            arr3.push(result);
        }
    });

    console.log(`arr3:`);
    console.log(arr3);    
} catch(e) {
    console.log('Error:', e.stack);
}


// var args = process.argv.slice(2);

/*
let message = "\nPlease enter 'searchFlights' and an origin and destination Airport code.";
message += "\nEx: searchFlights -o YYZ -d YYC \n>";
const selection = readlineSync.question(message);

let splitSelection = selection.split(" ");


console.log(splitSelection);
*/