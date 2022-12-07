const {model,Schema}=require("mongoose");
const adminSchema = new Schema(
    {
      username: {
        type: String,
        required:true,
      },
      email:{
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  module.exports = model("admin1", adminSchema);
