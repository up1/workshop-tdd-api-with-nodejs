const env = process.env.NODE_ENV || "test";
const config = require("../../knexfile")[env];
const knex = require("knex")(config);
const index = async ctx => {
  try {
    const beers = await knex("beer").select();
    ctx.body = {
      data: beers
    };
  } catch (error) {
    console.error(error);
  }
};
module.exports = { index };
