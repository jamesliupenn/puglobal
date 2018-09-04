const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean
} = require('graphql/type');

const Item = require('../Item');
const mongoose = require('mongoose');
const config = require('../config');
const URI = `mongodb://${config.db.host}/${config.db.name}`;

// Connecting to the MongoDB database
mongoose.connect(URI, {useNewUrlParser: true});
mongoose.connection;

var ITEM = mongoose.model('item', {
  Brand: String,
  UPC: String, 
  ColorName: String,
  Size: String,
  StyleNumber: String,
  Price: Number,
  Quantity: Number,
  InventoryStatus: String
});

var itemType = new GraphQLObjectType({
  name: 'item',
  fields: () => ({
    Brand: {
      type: (GraphQLString),
      description: 'The brand of the item',
    },
    StyleNumber: {
      type: (GraphQLString),
      description: 'The style number of the item',
    },
    ProductName: {
      type: (GraphQLString),
      description: 'The product name of the item',
    },
    SubBrand: {
      type: (GraphQLString),
      description: 'The sub-brand of the item',
    },
    Size: {
      type: (GraphQLString),
      description: 'The size of the item',
    },
    ColorCode: {
      type: (GraphQLString),
      description: 'The color code of the item',
    },
    ColorName: {
      type: (GraphQLString),
      description: 'The color name of the item',
    },
    ColorFamily: {
      type: (GraphQLString),
      description: 'The color family of the item',
    },
    UPC: {
      type: (GraphQLString),
      description: 'The UPC of the item',
    },
    MSRP: {
      type: (GraphQLFloat),
      description: 'The MSRP of the item',
    },
    WHSP: {
      type: (GraphQLFloat),
      description: 'The WHSP of the item',
    },
    Price: {
      type: (GraphQLFloat),
      description: 'The price of the item',
    },
    Description: {
      type: (GraphQLString),
      description: 'The description of the item',
    },
    CategoryName: {
      type: (GraphQLString),
      description: 'The category name of the item',
    },
    SubCategory: {
      type: (GraphQLString),
      description: 'The sub-category of the item',
    },
    UnitPerPack: {
      type: (GraphQLInt),
      description: 'The unit-per-pack of the item',
    },
    PackageWeight: {
      type: (GraphQLFloat),
      description: 'The package weight of the item',
    },
    FabricContent: {
      type: (GraphQLString),
      description: 'The fabric content of the item',
    },
    CountryOfOrigin: {
      type: (GraphQLString),
      description: 'The country of origin of the item',
    },
    Quantity: {
      type: (GraphQLInt),
      description: 'The quantity of the item',
    },
    InventoryStatus: {
      type: (GraphQLString),
      description: 'The inventory status of the item',
    },
    BackorderStatus: {
      type: (GraphQLString),
      description: 'The backorder status of the item',
    },
    BackorderDate: {
      type: (GraphQLString),
      description: 'The back order date of the item',
    },
    ImageURL1: {
      type: (GraphQLString),
      description: 'The image URL1 of the item',
    },
    ImageURL2: {
      type: (GraphQLString),
      description: 'The image URL2 of the item',
    },
    ImageURL3: {
      type: (GraphQLString),
      description: 'The image URL3 of the item',
    },
    ImageURL4: {
      type: (GraphQLString),
      description: 'The image URL4 of the item',
    }
  })
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      item: {
        type: new GraphQLList(itemType),
        resolve: () => {
          return new Promise((resolve, reject) => {
            ITEM.find((err, item) => {
              if (err) reject(err);
              else resolve(item);
            });
          });
        }
      }
    }
  }
});

// var schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//       item: {
//         type: new GraphQLList(itemType),
//         args: {
//           UPC: {
//             name: 'UPC',
//             type: new GraphQLNonNull(GraphQLString)
//           }
//         },
//         resolve: (root, {UPC}, source, fieldASTs) => {
//           var projections = getProjection(fieldASTs);
//           var foundItems = new Promise((resolve, reject) => {
//               Item.find({itemId}, projections,(err, item) => {
//                   err ? reject(err) : resolve(item)
//               })
//           })

//           return foundItems
//         }
//       }
//     }
//   })
// });

// module.exports = schema;

module.exports = new GraphQLSchema({
  query: queryType
});
