const fs = require('fs');
const mongoose = require('mongoose');
const config = require('./config');
let Item = require('./Item');

/**
 * Set FILE_NAME and URI
 */
const FILE_NAME = 'fulldata.txt';
const URI = `mongodb://${config.db.host}/${config.db.name}`;
let db;
let counter = 0;

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
        let item = new Item;
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
    return new Promise((resolve, reject) => {
        resolve('Resolving the promise');
    });
}

function main() {
    let result;
    let isDoneWithDB = false;
    db = connectDB();
    // db.on('error', console.log('Connection error'));
    result = fs.readFile(FILE_NAME, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            parseData(data).then(()=>{
                console.log('Updating database');
            });
        }
    });
}

main();