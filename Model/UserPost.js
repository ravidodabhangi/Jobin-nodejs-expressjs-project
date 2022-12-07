const { Schema, model } = require("mongoose");

let userPost = new Schema({
    post:{
        type:String,
    },
    post_img:{
        type:[""],
    },
    post_video:{
        type:["",]
    },
   
},{timestamps:true})

module.exports = model('userPost', userPost)