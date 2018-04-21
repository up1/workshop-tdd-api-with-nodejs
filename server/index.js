'use strict';
const Koa = require('koa');
const beerRoutes = require('./routes/beer.routes');
const app = new Koa();
const PORT = process.env.PORT || 8081;
app.use(beerRoutes.routes());
const server = app.listen(PORT).on('error', err => {
  console.error(err);
});
module.exports = server;
