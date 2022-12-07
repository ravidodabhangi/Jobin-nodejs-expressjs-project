let {Schema,model} = require('mongoose')

let authSchema = new Schema({
    username:{
       type:String,
       required:true, 
    },
    email:{
        type:String,
       required:true,
       unique:true,  
    },
    password:{
        type:String,
        required:true, 
    },
    
},
{timestamps: true})

module.exports = model('jobin_auth', authSchema)