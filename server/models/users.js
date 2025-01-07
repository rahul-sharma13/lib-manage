import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 64,
    required: true,
  },
  phone:{
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true,
},
  isAdmin:{
    type: Boolean,
    default: false,
  }
});

export default mongoose.model("Users", userSchema);