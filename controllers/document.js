const Document = require("../models/document")

exports.createDocument = async ()=>{
    return await Document.create({data:{}})
}

exports.getDocument = async (documentId)=>{
    if(documentId == null) return;
    const document = await Document.findById(documentId)
    if(document) return document
    return null;
}

exports.updateDocument = async (documentId,data)=>{
    await Document.findByIdAndUpdate(documentId,{data})
}

