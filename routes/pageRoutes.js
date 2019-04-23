const NodeCache = require( "node-cache" );
const pageCache = new NodeCache({
    stdTTL: 60 * 60 * 12,
});


const { getSongs, getContentByID } = require("../contentfulService");
const { parseContent } = require("../contentParser");
const { PAGE_ID_LOOKUP, EPK_CONTENT_ID } = require("../constants");

function replySuccess(data, reply) {
    reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(JSON.stringify(data))
}

function pageRoutes(fastify) {
    const apiPageRoot = process.env.API_URL + 'page/';

    fastify.get(apiPageRoot + "home", async (request, reply) => {
        pageCache.get("home", (err, cachedData) => {
            if (cachedData) {
                replySuccess(cachedData, reply);
            } else {
                getContentByID(PAGE_ID_LOOKUP.HOME)
                    .then(data => parseContent('page', data))
                    .then(data => {
                        replySuccess(data, reply);
                        return data;
                    })
                    .then(data => pageCache.set( 'home', data))
                    .catch(e => "failed to parse page home: " + e)
                }
            })
        })

    fastify.get(apiPageRoot + "about", async (request, reply) => {
        pageCache.get("about", (err, cachedData) => {
            if (cachedData) {
                replySuccess(cachedData, reply);
            } else {
                getContentByID(PAGE_ID_LOOKUP.ABOUT)
                    .then(data => parseContent('page', data))
                    .then(data => {
                        replySuccess(data, reply);
                        pageCache.set('about', data)
                    })
                    .catch(e => "failed to parse page about: " + e)
            }
        })
    })

    fastify.get(apiPageRoot + "shows", async (request, reply) => {
        pageCache.get("shows", (err, cachedData) => {
            if (cachedData) {
                replySuccess(cachedData, reply);
            } else {
                getContentByID(PAGE_ID_LOOKUP.SHOWS)
                    .then(data => parseContent('page', data))
                    .then(data => {
                        replySuccess(data, reply)
                        pageCache.set('shows', data)
                    })
                    .catch(e => "failed to parse page shows: " + e)
            }
        })
    })

    fastify.get(apiPageRoot + "contact", async (request, reply) => {
        pageCache.get("contact", (err, cachedData) => {
            if (cachedData) {
                replySuccess(cachedData, reply);
            } else {
                getContentByID(PAGE_ID_LOOKUP.CONTACT)
                        .then(data => parseContent('page', data))
                        .then(data => {
                            replySuccess(data, reply)
                            pageCache.set('contact', data)
                        })
                        .catch(e => "failed to parse page contact: " + e)
            }
        })
    })

    fastify.get(apiPageRoot + "music", async (request, reply) => {
        let musicPageData;
        pageCache.get("music", (err, cachedData) => {
            if (cachedData) {
                replySuccess(cachedData, reply);
            } else {

                getContentByID(PAGE_ID_LOOKUP.MUSIC)
                    .then(data => parseContent('page', data))
                    .then(data => {
                        musicPageData = data;
                        getSongs().then(songs => {
                            musicPageData.songs = parseContent('song', songs)
                        }).then(data => {
                            replySuccess(musicPageData, reply)
                            pageCache.set('music', musicPageData)
                        })
                        .catch(e => "failed to parse songs: " + e)
                    })
                    .catch(e => "failed to parse page music: " + e)
            }
        })
    })

    fastify.get(apiPageRoot + "epk", async (request, reply) => {
        let epkData;
        pageCache.get("epk", (err, cachedData) => {
            if (cachedData) {
                replySuccess(cachedData, reply);
            } else {
                getContentByID(PAGE_ID_LOOKUP.EPK)
                    .then(data => parseContent('page', data))
                    .then(data => {
                        epkData = data;
                        return epkData
                    })
                    .then(whatever => {
                        return getContentByID(EPK_CONTENT_ID)
                    })
                    .then(epkContentData => {
                        return parseContent('epk', epkContentData)
                    }).then(parsedData => {
                        epkData.epk = parsedData
                        return epkData
                    })
                    .then(data => {
                        replySuccess(epkData, reply)
                        pageCache.set('epk', epkData)
                    })
                    .catch(e => "failed to parse page epk: " + e)
                }
        })
    })
}

module.exports = { pageRoutes }
