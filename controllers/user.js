const User = require("../models/user")

exports.createUser = async()=>{
    return await User.create({documents:[]})
}

exports.addDocument = async(user_id,document)=>{
    const user =  await User.findById(user_id).populate("documents");
    const d = user.documents.find(d=>{
        return d._id.equals(document._id)
    })
    console.log(d);
    if(!d) user.documents.push(document);
    return await user.save();
}