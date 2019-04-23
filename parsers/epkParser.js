const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const { parsePhoto } = require('./photoParser');
const { getAssetByID } = require('../contentfulService');

function parseEpk(epkData) {
    let { headline,
        subHeadline,
        logo,
        summary,
        facebookUrl,
        soundcloudUrl,
        instagramUrl,
        youtubUrl,
        shortBio,
        information } = epkData.fields;


    logo = logo && logo.sys.id
            ? getAssetByID(logo.sys.id)
            : new Promise((resolve, reject) => resolve(null))

    return Promise.all([logo]).then(values => {

        let data = {
            headline,
            subHeadline,
            logo: parsePhoto(values[0]),
            summary: documentToHtmlString(summary),
            facebookUrl,
            soundcloudUrl,
            instagramUrl,
            youtubUrl,
            shortBio: documentToHtmlString(shortBio),
            information: documentToHtmlString(information)
        }

        return data;
    })
}

module.exports = { parseEpk }
