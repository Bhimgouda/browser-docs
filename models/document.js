const {Schema, model} = require("mongoose");

const documentSchema = Schema({
    data: Object
})

const Document = model('Document', documentSchema);

module.exports = Document;