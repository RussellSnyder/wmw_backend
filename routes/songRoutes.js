const { getSongs } = require("../contentfulService");
const { parseContent } = require("../contentParser");

function songRoutes(fastify) {
    fastify.get(process.env.API_URL + 'songs', async (request, reply) => {
        getSongs().then(data => {
            return parseContent('song', data)
        }).then(songs => {
            reply
                .code(200)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send(JSON.stringify(songs))
        })
    })
}

module.exports = { songRoutes }
