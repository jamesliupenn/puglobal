const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const graphql = require ('graphql').graphql  

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const itemSchema = require('./graphql/schema');

const URI = `mongodb://${config.db.host}/${config.db.name}`;

const app = express();

// let query = 'query { UPC }'
// graphql(itemSchema, query).then((result)=>{
// 	console.log(JSON.stringify(result, null, " "));
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', apiRouter);
app.use('/graphql', graphqlHTTP({
	schema: itemSchema,
	graphiql: true
}));
// app.use('/graphql', graphqlHTTP (req => ({
// 	schema: itemSchema,
// 	graphiql:true
// })));

// app.use('/graphql', graphqlHTTP({
// 	schema: ItemSchema.schema.obj,
// 	rootValue: root,
// 	graphiql: true,
// }));

// // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(5566, () => console.log('Listening on localhost:5566/graphql'));

module.exports = app;
