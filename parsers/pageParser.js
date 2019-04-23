const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const { parsePhoto } = require('./photoParser');
const { getAssetByID } = require('../contentfulService');

function parsePage(page) {
    let { title, featuredImage, featuredYoutubeVideo, description } = page.fields;

    featuredImage = featuredImage && featuredImage.sys.id
        ? getAssetByID(featuredImage.sys.id)
        : new Promise((resolve, reject) => resolve(null))

    return Promise.all([featuredImage]).then(values => {
        return {
            title,
            featuredYoutubeVideo,
            featuredPhoto: parsePhoto(values[0]),
            description: documentToHtmlString(description),
        }
    })
}

module.exports = { parsePage }
