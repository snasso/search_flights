const readlineSync  = require('readline-sync');
const fs            = require('fs');
const parse         = require('csv-parse');

 
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
 
let parser1 = parse({delimiter: ','}, function (err, data) {

    data.forEach(function(line, index) {

        // array element at index 0 contains the row of headers
        if (index === 0) {

            title1 = line[0];
            title2 = line[1];
            title3 = line[2];
            title4 = line[3];
            title5 = line[4];

        } else {

            let result = { 
                [title1] : line[0], 
                [title2] : line[1],
                [title3] : line[2],
                [title4] : line[3],
                [title5] : line[4]
            };
    
            arr1.push(result);

            // console.log(JSON.stringify(result));
        }
    });
    
    console.log("\nProvider1.txt:");
    console.log(JSON.stringify(arr1));
});

let parser2 = parse({delimiter: ','}, function (err, data) {

    data.forEach(function(line, index) {

        if (index === 0) {

            title1 = line[0];
            title2 = line[1];
            title3 = line[2];
            title4 = line[3];
            title5 = line[4];

        } else {

            let result = { 
                [title1] : line[0], 
                [title2] : line[1],
                [title3] : line[2],
                [title4] : line[3],
                [title5] : line[4]
            };
    
            arr2.push(result);
        }
    });
    
    console.log("\nProvider2.txt:");
    console.log(JSON.stringify(arr2));
});

let parser3 = parse({delimiter: '|'}, function (err, data) {

    data.forEach(function(line, index) {

        if (index === 0) {

            title1 = line[0];
            title2 = line[1];
            title3 = line[2];
            title4 = line[3];
            title5 = line[4];

        } else {

            let result = { 
                [title1] : line[0], 
                [title2] : line[1],
                [title3] : line[2],
                [title4] : line[3],
                [title5] : line[4]
            };
    
            arr3.push(result);
        }
    });
    
    console.log("\nProvider3.txt:");
    console.log(JSON.stringify(arr3));
});


fs.createReadStream(inputFile1).pipe(parser1);
fs.createReadStream(inputFile2).pipe(parser2);
fs.createReadStream(inputFile3).pipe(parser3);


// var args = process.argv.slice(2);

/*
let message = "\nPlease enter 'searchFlights' and an origin and destination Airport code.";
message += "\nEx: searchFlights -o YYZ -d YYC \n>";
const selection = readlineSync.question(message);

let splitSelection = selection.split(" ");


console.log(splitSelection);
*/