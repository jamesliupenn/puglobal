const fs = require('fs');
const mongoose = require('mongoose');
const config = require('./config');
const Item = require('./Item');

const FILE_NAME = 'fulldata.txt';
const URI = `mongodb://${config.db.host}/${config.db.name}`;
let db;

function connectDB() {
    mongoose.connect(URI, {useNewUrlParser: true});
    db = mongoose.connection;
    hanes = db.collection('hanes');
    return db;
}

function constructItem(item, line) {
    let fields = ['Brand', 'StyleNumber', 'ProductName', 'SubBrand', 'Size', 'ColorCode', 'ColorName',
        'ColorFamily', 'UPC', 'MSRP', 'WHSP', 'Price', 'Description', 'CategoryName', 'SubCategory',
        'UnitPerPack', 'PackageWeight', 'FabricContent', 'CountryOfOrigin', 'Quantity', 'InventoryStatus',
        'BackorderStatus', 'BackorderDate', 'ImageURL1', 'ImageURL2', 'ImageURL3', 'ImageURL4'];

    for (var i = 0; i < line.length; ++i) {
        let field = fields[i];
        item[field] = line[i];
    }

    return item;
}

// parses the data into an array
function parseData(data) {
    let count = 0;
    let lines = data.split('\n');
    for (var i = 1; i < lines.length; ++i) {
        // Parses the lines and splitting them up from the delimiter
        let line = lines[i].slice(1, -1).replace(/","/g, '|').split('|');
        let item = new Item();
        constructItem(item, line);
        if (item.Brand == "Champion") {
            Item.findOne({UPC: item.UPC}, function(err, found) {
                if (found) {
                    console.log("Item found, update item in DB", count);
                    count++;
                }
                else {
                    console.log("Item not found, create item in DB", count);
                    count++;
                    item.save();
                }
            });
        }
    }
}


// Create the DB connection
db = connectDB();
// Error handling
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    // Confirmation that the DB connection has been made
    console.log("Connection Successful");
    }).then(() => { // Use a promise here
        fs.readFile(FILE_NAME, 'utf8', function (err, data) {
            if (err) throw err;
            let a = new Promise((resolve, reject) => {
                parseData(data);
            });
        });
    }
);

