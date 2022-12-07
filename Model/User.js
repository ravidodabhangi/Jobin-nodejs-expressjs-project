const { Schema, model } = require("mongoose");

let userSchema = new Schema({
    profile_img:{
        type:[""]
    },
  
},
{timestamps:true})


module.exports = model('userProfile', userSchema)
