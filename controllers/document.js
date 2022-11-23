const Document = require("../models/document")
const User = require("../models/user")
const { catchAsync } = require("../utils")

exports.createDocument = catchAsync(async (req,res)=>{
    const document = await Document.create({data:{}})
    res.send(document)
 })

exports.getDocument = async (documentId)=>{
    try {
        if(documentId == null) return;
        const document = await Document.findById(documentId)
        if(document) return document
    } catch (error) {
        return null;
    }
}

exports.updateDocument = async (documentId,data)=>{
        await Document.findByIdAndUpdate(documentId,{data})
}

exports.getUserDocuments = catchAsync(async(req,res)=>{
    const {documents} = await User.findById(req.session.user_id).populate("documents");
    res.send(documents)

})


