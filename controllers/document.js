const Document = require("../models/document")

exports.getDocument = async (documentId)=>{
    if(documentId == null) return;
    const document = await Document.findById(documentId)
    if(document) return document
    
    return await Document.create({_id:documentId, data:""});
}

exports.updateDocument = async (documentId,data)=>{
    await Document.findByIdAndUpdate(documentId,{data})
}