import Books from "../models/books.js";
import Users from "../models/users.js";
import Transactions from "../models/transactions.js";

const newTransaction = async (req, res) => {
  const { bookId, userId, type } = req.body;

  if (!bookId || !userId || !type) {
    return res.status(400).json({ message: "Please provide all details" });
  }

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
      return res.status(400).json({ message: "Book is not available for borrowing" });
    }

    if (type === "return" && book.status === "Available") {
      return res.status(400).json({ message: "Book is already marked as 'Available'" });
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


export { newTransaction, allTransactions };
