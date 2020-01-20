const nanoid = require('nanoid')

class UrlHelper {

    static shortenURL = (db, originalUrl) => {
        const shortenedURLs = db._collection('shortenedURLs');
        return shortenedURLs.findOneAndUpdate({
            originalUrl: originalUrl
        }, {
            $setOnInsert: {
                originalUrl: originalUrl,
                shortId: nanoid(7),
            },
        }, {
            returnOriginal: false,
            upsert: true,
        })
    }

    static checkIfShortIdExists = (db, urlCode) => db._collection('shortenedURLs')
        .findOne({
            shortId: urlCode
        })


}
module.exports = UrlHelper