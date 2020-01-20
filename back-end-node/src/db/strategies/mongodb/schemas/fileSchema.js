const Mongoose = require('mongoose')

const FileSchema = new Mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//mocha workaround
module.exports = Mongoose.models.file || Mongoose.model('file', FileSchema)

