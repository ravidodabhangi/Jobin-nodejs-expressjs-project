const {Schema,model}=require("mongoose");
const CompanyMailSchema=new Schema(
    {
        userEmail:{
            type:String,
            required:true,
        },
        companyEmail:{
            type:String,
            required:true,
        },
    },
    {timestamps:true}
)

module.exports=model("companyMailData",CompanyMailSchema);

