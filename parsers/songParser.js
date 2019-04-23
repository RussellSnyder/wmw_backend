const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

function parseSongs(songs) {
    return songs.map(song => {
        let { title, description, youtubeUrl, soundcloudUrl } = song.fields;

        const parsedSong = {
            title,
            description: documentToHtmlString(description),
            youtubeUrl,
            soundcloudUrl
        }

        // console.log(parsedSong)

        return parsedSong
    })
}

module.exports = { parseSongs }
