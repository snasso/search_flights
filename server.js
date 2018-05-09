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

let detailsArr = [];


function fileReader(inputFile, delimiter) {

    try {  
        let data = fs.readFileSync(inputFile, 'utf8');
    
        let splitData = data.split("\n");
    
        splitData.forEach(function(line, index) {
    
            let splitLine = line.split(delimiter);
    
            if (index === 0) {
    
                title1 = splitLine[0].trim();
                title2 = splitLine[1].trim();
                title3 = splitLine[2].trim();
                title4 = splitLine[3].trim();
                title5 = splitLine[4].trim();
    
            } else {

                let origin = splitLine[0].trim();
                let departureTime = splitLine[1].replace(/-/gi, '/').trim();
                let destination = splitLine[2].trim();
                let destinationTime = splitLine[3].replace(/-/gi, '/').trim();
                let price = splitLine[4].trim();

                let result = { 
                    [title1] : origin,
                    [title2] : departureTime,
                    [title3] : destination,
                    [title4] : destinationTime,
                    [title5] : price
                };

                console.log(`${origin} --> ${destination} (${departureTime} --> ${destinationTime}) - ${price}`);
        
                detailsArr.push(result);
            }
        });
    } catch(e) {
        console.log('Error:', e.stack);
    }
}

function removeDuplicates(arr) {
	let hashTable = {};

	return arr.filter(function (val) {
		let key     = JSON.stringify(val);
		let match   = Boolean(hashTable[key]);

		return (match ? false : hashTable[key] = true);
	});
}


console.log(`Provider1.txt:`);
fileReader(inputFile1, ",");

console.log(`Provider2.txt:`);
fileReader(inputFile2, ",");

console.log(`Provider3.txt:`);
fileReader(inputFile3, "|");


console.log("Details:");
console.log(detailsArr);
console.log(`detailsArr.length: ${detailsArr.length}`);


let uniqueArr = removeDuplicates(detailsArr);

console.log(uniqueArr);
console.log(`uniqueArr.length: ${uniqueArr.length}`);


// var args = process.argv.slice(2);

/*
let message = "\nPlease enter 'searchFlights' and an origin and destination Airport code.";
message += "\nEx: searchFlights -o YYZ -d YYC \n>";
const selection = readlineSync.question(message);

let splitSelection = selection.split(" ");


console.log(splitSelection);
*/