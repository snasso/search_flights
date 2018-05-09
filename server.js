const readlineSync  = require('readline-sync');
const fs            = require('fs');


let inputOrigin         = "YYZ";
let inputDestination    = "YYC";
 
let inputFile1 = 'Provider1.txt';
let inputFile2 = 'Provider2.txt';
let inputFile3 = 'Provider3.txt';

let title1 = "";
let title2 = "";
let title3 = "";
let title4 = "";
let title5 = "";

let detailsArr = [];

// Start application
enterInputArguments();


function enterInputArguments() {

    let message = "\nPlease enter query title 'searchFlights' followed by -o and the Airport origin code then -d and a destination code.";
    message += "\nEx: searchFlights -o YYZ -d YYC \n>";
    const query = readlineSync.question(message);

    let splitQuery = query.split(" ");

    checkArguments(splitQuery);
}


function checkArguments(args) {

    let argList = [];

    args.forEach(function(arg, index) {

        if (arg !== "") {
            argList.push(arg);
        }
    });

    if (args.length < 5) {

        let message = "Error: You did not provide enough arguments. 5 are required.";
        console.log(message);

    } else {

        parseDetails(argList);
        return;
    }

    // Fallback if any errors encountered
    enterInputArguments();
}


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

                let origin          = splitLine[0].trim();
                let departureTime   = splitLine[1].replace(/-/gi, '/').trim();
                let destination     = splitLine[2].trim();
                let destinationTime = splitLine[3].replace(/-/gi, '/').trim();
                let price           = splitLine[4].trim();

                if (origin === inputOrigin && destination === inputDestination) {

                    let result = { 
                        [title1] : origin,
                        [title2] : departureTime,
                        [title3] : destination,
                        [title4] : destinationTime,
                        [title5] : price
                    };
    
                    detailsArr.push(result);
                }
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


function parseDetails(argList) {

    console.log(`argList: ${argList}`)

    fileReader(inputFile1, ",");
    fileReader(inputFile2, ",");
    fileReader(inputFile3, "|");


    if (detailsArr.length === 0) {

        console.log(`No Flights Found for ${inputOrigin} --> ${inputDestination}`);

    } else {

        let uniqueArr = removeDuplicates(detailsArr);

        // Copy values from uniqueArr
        let newArr = uniqueArr.slice(0);

        // Sort Array by Price
        newArr.sort((a, b) => parseFloat((a.Price).replace("$", "")) - parseFloat((b.Price).replace("$", "")));

        console.log("Flight details by price ($):");
        newArr.forEach(function(line) {

            console.log(`${line["Origin"]} --> ${line["Destination"]} (${line["Departure Time"]} --> ${line["Destination Time"]}) - ${line["Price"]}`);
        });


        // Sort Array by date (earliest first)
        newArr.sort((a,b) => new Date(a["Departure Time"]) - new Date(b["Departure Time"]));

        console.log("\nFlight details by date (earliest flight first):");
        newArr.forEach(function(line) {

            console.log(`${line["Origin"]} --> ${line["Destination"]} (${line["Departure Time"]} --> ${line["Destination Time"]}) - ${line["Price"]}`);
        });
    }
}