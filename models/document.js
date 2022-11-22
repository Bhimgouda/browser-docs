const {Schema, model} = require("mongoose");

const documentSchema = Schema({
    _id: String,
    data: Object
})

const Document = model('Document', documentSchema);

module.exports = Document;