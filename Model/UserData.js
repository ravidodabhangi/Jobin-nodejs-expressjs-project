const {model,Schema}=require("mongoose");
const userSchema = new Schema(
    {
      username: {
        type:String,
        required: true,
      },
      email: {
        type:String,
        required:true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  module.exports = model("user1", userSchema);
