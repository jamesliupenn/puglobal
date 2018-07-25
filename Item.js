var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    Brand: String,
    StyleNumber: String,
    ProductName: String,
    SubBrand: String,
    Size: String,
    ColorCode: String,
    ColorName: String,
    ColorFamily: String,
    UPC: {type: String, unique: true},
    MSRP: Number,
    WHSP: Number,
    Price: Number,
    Description: String,
    CategoryName: String,
    SubCategory: String,
    UnitPerPack: Number,
    PackageWeight: Number,
    FabricContent: String,
    CountryOfOrigin: String,
    Quantity: Number,
    InventoryStatus: String,
    BackorderStatus: String,
    BackorderDate: Date,
    ImageURL1: String,
    ImageURL2: String,
    ImageURL3: String,
    ImageURL4: String,
});

exports.create = function(req, res) {
    ItemSchema.create(req.body, function(err, result){
       if (!err) {
           return res.send(result);
       }
       else {
           return res.send(err);
       }
    });
};
// Item is the singular name of the collection (items) our model is for
const Item = mongoose.model('Item', ItemSchema);
module.exports.Item = Item;
// module.exports = mongoose.model('Item', ItemSchema);

