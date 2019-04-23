const {pageRoutes} = require("./pageRoutes");
const {songRoutes} = require("./songRoutes");

function declareRoutes(fastify) {
    pageRoutes(fastify);
    songRoutes(fastify);
}

module.exports = { declareRoutes }
