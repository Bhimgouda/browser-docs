const {Schema,model} = require("mongoose");

const userSchema = new Schema({
    documents : [
        {
            type:Schema.Types.ObjectId,
            ref:"Document",
        },
    ],
})

const User = model("User", userSchema);

module.exports = User;