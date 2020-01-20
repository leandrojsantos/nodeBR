const Mongoose = require('mongoose')

const QrcodeSchema = new Mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    urlCode: {
        type: String,
    },
    shortUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

//mocha workaround
module.exports = Mongoose.models.qrcode || Mongoose.model('qrcode', QrcodeSchema)