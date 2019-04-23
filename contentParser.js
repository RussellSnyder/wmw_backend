const { parsePage } = require("./parsers/pageParser");
const { parseSongs } = require("./parsers/songParser.js");
const { parseEpk } = require("./parsers/epkParser.js");

function parseContent(type, data) {
    let result;

    switch (type) {
        case "song":
            result = parseSongs(data);
        break;
        case "page":
            result = parsePage(data);
        break;
        case "epk":
            result = parseEpk(data);
        break;
    }

    return result;
}

module.exports = { parseContent }
