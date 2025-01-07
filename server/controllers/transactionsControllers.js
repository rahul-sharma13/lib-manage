import Books from "../models/books.js";
import Users from "../models/users.js";
import Transactions from "../models/transactions.js";
import mongoose from "mongoose";

const newTransaction = async (req, res) => {
  const { bookId, userId, type } = req.body;

  if (!bookId || !userId || !type) {
    return res.status(400).json({ message: "Please provide all details" });
  }
  console.log(req.body);


  try {
    const book = await Books.findById(bookId);
    const user = await Users.findById(userId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (type === "borrow" && book.status !== "Available") {
      return res
        .status(400)
        .json({ message: "Book is not available for borrowing" });
    }

    if (type === "return" && book.status === "Available") {
      return res
        .status(400)
        .json({ message: "Book is already marked as 'Available'" });
    }

    const newTransaction = new Transactions({
      bookId,
      userId,
      type,
      date: Date.now(),
    });

    const savedTransaction = await newTransaction.save();

    if (type === "borrow") {
      book.status = "Not Available";
      await book.save();
    }

    if (type === "return") {
      book.status = "Available";
      await book.save();
    }

    return res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allTransactions = async (req, res) => {
  try {
    const allTransaction = await Transactions.find({});
    res.json(allTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserTransactions = async (req, res) => {
  const { userId } = req.params;

  try {
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Fetch transactions for the given user
    const transactions = await Transactions.find({ userId })
      .populate("bookId", "title author status year") // Populates book details (only title and author)
      .populate("userId") // Populates user details (only name and email)
      .sort({ date: -1 }); // Sort by most recent transactions

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user" });
    }

    const borrowCount = transactions.filter(
      (transaction) => transaction.type === "borrow"
    ).length;

    res.status(200).json({
      totalBorrowings: borrowCount,
      transactions,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching transactions" });
  }
};

export { newTransaction, allTransactions, getUserTransactions };
