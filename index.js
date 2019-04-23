'use strict'
require ('custom-env').env(true)

const fastify = require('fastify')({ logger: true })

fastify.register(require('fastify-cors'), {
    origin: true
})

const { initializeClient, getSongs } = require('./contentfulService');
const { declareRoutes } = require("./routes/routes")

initializeClient();

declareRoutes(fastify);

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3001)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
