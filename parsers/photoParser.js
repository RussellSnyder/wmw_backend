function parsePhoto(photo) {
    if (!photo) {
        return {}
    }

    let { title, file } = photo.fields
    let { url } = file

    return {
        title,
        url
    }
}

module.exports = { parsePhoto }
