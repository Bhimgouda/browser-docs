const User = require("../models/user")
const { catchAsync } = require("../utils")

exports.createUser = async()=>{
    return await User.create({documents:[]})
}

exports.sendUser = catchAsync(async(req,res)=>{
    const user = await User.findById(req.session.user_id)
    res.send(user._id);
})

exports.addDocumentToUser = async(user_id,document)=>{
    const user =  await User.findById(user_id).populate("documents");
    const d = user.documents.find(d=>{
        return d._id.equals(document._id)
    })
    if(!d) user.documents.push(document);
    return await user.save();
}