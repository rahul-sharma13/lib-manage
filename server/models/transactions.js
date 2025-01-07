import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Books",
    required: true,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Users",
    required: true,
  },
  type:{
    type: String,
    enum: ["borrow","return"],
    required: true,
  },
  date:{
    type: Date,
    default:Date.now,
  }
});

export default mongoose.model("Transactions", transactionSchema);