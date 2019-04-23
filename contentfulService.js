const contentful = require('contentful')

let client;

function initializeClient() {
    client = contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: process.env.CONTENTFUL_SPACE_ID,
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    })
}

function fetchEntriesForContentType (contentType) {
    return client.getEntries({
        content_type: contentType
    })
    .then((response) => response.items)
    .catch((error) => {
        console.error(error)
    })
}

function getSongs() {
    return fetchEntriesForContentType('song');
}

function getContentByID(ID) {
    return client.getEntry(ID)
}

function getAssetByID(ID) {
    return client.getAsset(ID)
}

module.exports = { initializeClient, getSongs, getContentByID, getAssetByID }
