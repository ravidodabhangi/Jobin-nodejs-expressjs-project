const { Schema, model } = require("mongoose");

let commentSchema = new Schema({
    comment:{
        type:String,
    },
    comments:
    {
        type:[""],
    },
},{timestamps:true})

module.exports = model('comment', commentSchema)