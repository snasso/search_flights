const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');


// MARK: boilerplate express setup
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});


app.get('/searchFlights/:origin/:destination', (req, res) => {
    inputOrigin         = req.params.origin;
    inputDestination    = req.params.destination;

    detailsArr = [];


    providerReader(Provider1, ",");
    providerReader(Provider2, ",");
    providerReader(Provider3, "|");

    uniqueArr = removeDuplicates(detailsArr);

    res.json({"uniqueArr": uniqueArr});
});


app.get('/searchFlights/', (req, res) => {

    if (detailsArr.length === 0) {

        providerReader(Provider1, ",");
        providerReader(Provider2, ",");
        providerReader(Provider3, "|");

        uniqueArr = removeDuplicates(detailsArr);

        uniqueArr.forEach(function(line, index) {
    
            if (index !== 0) {
    
                let origin          = line["Origin"].trim();
                let destination     = line["Destination"].trim();
    
                originArr.push(origin);
                destinationArr.push(destination);
            }
        });

        originArr = originArr.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        })

        destinationArr = destinationArr.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        })
    }

    res.json({"originArr": originArr, "destinationArr": destinationArr});
});



const Provider1 = [ 
    'Origin,Departure Time,Destination,Destination Time,Price ',
    'LAS,6/23/2014 13:30:00,LAX,6/23/2014 14:40:00,$151.00 ',
    'YYZ,6/15/2014 6:45:00,YYC,6/15/2014 8:54:00,$578.00 ',
    'MIA,6/23/2014 19:40:00,ORD,6/23/2014 21:45:00,$532.00 ',
    'YYC,6/12/2014 11:00:00,YVR,6/12/2014 11:24:00,$379.00 ',
    'LHR,6/21/2014 11:05:00,BOS,6/21/2014 17:06:00,$975.00 ',
    'YVR,6/18/2014 9:10:00,YYZ,6/18/2014 19:47:00,$1093.00 ',
    'LAX,6/19/2014 8:45:00,YYC,6/19/2014 12:45:00,$356.00 ',
    'MIA,6/20/2014 7:45:00,ORD,6/20/2014 12:36:00,$422.00' 
];

const Provider2 = [ 
    'Origin,Departure Time,Destination,Destination Time,Price ',
    'JFK,6-21-2014 17:55:00,YEG,6-21-2014 23:23:00,$589.00 ',
    'LAS,6-22-2014 9:45:00,YYZ,6-22-2014 21:20:00,$549.00 ',
    'YVR,6-23-2014 9:20:00,YYZ,6-23-2014 15:22:00,$1122.00 ',
    'MSY,6-19-2014 5:55:00,YUL,6-19-2014 10:58:00,$480.00 ',
    'YYZ,6-26-2014 12:00:00,YYC,6-26-2014 14:09:00,$630.00 ',
    'LAX,6-19-2014 11:00:00,YYC,6-19-2014 17:45:00,$543.00 ',
    'YYC,6-23-2014 12:40:00,YYZ,6-23-2014 14:54:00,$541.00 ',
    'MIA,6-23-2014 19:40:00,ORD,6-23-2014 21:45:00,$532.00 ',
    'YVR,6-23-2014 22:10:00,YYZ,6-24-2014 2:22:00,$1151.00 ',
    'LAS,6-16-2014 8:11:00,YYZ,6-16-2014 19:28:00,$703.00 ',
    'LAX,6-21-2014 8:55:00,YYC,6-21-2014 15:10:00,$577.00 ',
    'YYZ,6-15-2014 7:00:00,YVR,6-15-2014 9:00:00,$647.00 ',
    'LHR,6-19-2014 6:30:00,BOS,6-19-2014 12:42:00,$1243.00' 
];

const Provider3 = [ 
    'Origin|Departure Time|Destination|Destination Time|Price ',
    'LAS|6/29/2014 14:55:00|LAX|6/29/2014 16:10:00|$201.00 ',
    'MIA|6/17/2014 14:55:00|ORD|6/17/2014 17:10:00|$542.00 ',
    'LAS|6/29/2014 7:30:00|YYZ|6/29/2014 13:58:00|$678.00 ',
    'YYZ|6/22/2014 12:00:00|YYC|6/22/2014 14:09:00|$630.00 ',
    'JFK|6/15/2014 9:30:00|YEG|6/15/2014 17:50:00|$730.00 ',
    'YYZ|6/13/2014 7:00:00|YVR|6/13/2014 9:00:00|$648.00 ',
    'MIA|6/22/2014 6:50:00|ORD|6/22/2014 9:02:00|$576.00 ',
    'YYC|6/23/2014 14:15:00|YYZ|6/23/2014 21:59:00|$573.00 ',
    'YYZ|6/15/2014 18:00:00|YVR|6/15/2014 20:00:00|$698.00 ',
    'LAS|6/16/2014 8:11:00|YYZ|6/16/2014 19:28:00|$703.00 ',
    'LHR|6/27/2014 16:40:00|BOS|6/27/2014 18:50:00|$1616.00 ',
    'MSY|6/19/2014 14:55:00|YUL|6/19/2014 23:24:00|$645.00' 
];


let inputOrigin         = "";
let inputDestination    = "";

let title1 = "";
let title2 = "";
let title3 = "";
let title4 = "";
let title5 = "";

let detailsArr  = [];
let uniqueArr   = [];

let originArr       = [];
let destinationArr  = [];


function providerReader(arr, delimiter) {

    arr.forEach(function(line, index) {
    
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

            let result = { 
                [title1] : origin,
                [title2] : departureTime,
                [title3] : destination,
                [title4] : destinationTime,
                [title5] : price
            };

            if (origin === inputOrigin && destination === inputDestination) {

                detailsArr.push(result);

            } else if (inputOrigin === "" && inputDestination === "") {

                detailsArr.push(result);
            }
        }
    });
}


function removeDuplicates(arr) {
	let hashTable = {};

	return arr.filter(function (val) {
		let key     = JSON.stringify(val);
		let match   = Boolean(hashTable[key]);

		return (match ? false : hashTable[key] = true);
	});
}