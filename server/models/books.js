import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 64,
    unique: true,
  },
  author:{
    type: String,
    required: true,
  },
  year:{
    type: Number,
    required: true,
  },
  status:{
    type: String,
    enum: ["Available", "Not Available"],
    default: "Available",
  }
});

export default mongoose.model("Books", bookSchema);