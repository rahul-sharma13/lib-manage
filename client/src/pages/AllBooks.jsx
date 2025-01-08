import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-tailwindcss-select';
import axios from "axios";
import Borrow from '../components/Dialogs/Borrow';

const options = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
];

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null); // To store the book to be borrowed
    const currentUser = useSelector((state) => state.auth.currentUser);

    useEffect(() => {
        const fetchAllBooks = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get("https://lib-manage-wzei.vercel.app/api/v1/books/all-books");
                setBooks(response.data);
            } catch (err) {
                setError(err.response ? err.response.data : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchAllBooks();
    }, []);

    // Filtered and sorted books based on search and sortOrder
    const filteredBooks = books
        .filter((book) =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm)
        )
        .sort((a, b) => {
            if (sortOrder?.value === "newest") {
                return b.year - a.year;
            }
            if (sortOrder?.value === "oldest") {
                return a.year - b.year;
            }
            return 0; // No sorting
        });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleSortChange = (value) => {
        setSortOrder(value);
    };

    const handleOpenDialog = (bookId) => {
        setSelectedBookId(bookId); // Store the selected book's ID
        setOpenDialog(true); // Open the dialog
    };

    const handleBorrow = async () => {
        try {
            const response = await axios.post("https://lib-manage-wzei.vercel.app/api/v1/transaction/new", {
                bookId: selectedBookId, // Use the selectedBookId
                userId: currentUser._id,
                type: "borrow",
            }, { withCredentials: true });

            alert("Book borrowed successfully!");
            // Update the book's status locally
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book._id === selectedBookId ? { ...book, status: "Not Available" } : book
                )
            );
        } catch (error) {
            alert(error.response?.data?.message || "Failed to borrow the book.");
        } finally {
            setOpenDialog(false); // Close the dialog
        }
    };

    return (
        <div className="w-full h-[770px] max-w-[1100px] mx-auto mt-2 overflow-hidden rounded-lg shadow-lg font-poppins">
            <div className="flex flex-col mb-4 gap-2">
                <h2 className="text-2xl font-bold text-gray-800">All Books</h2>
                <div className="flex flex-row gap-7">
                    <input
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-[80%] border-[1px] border-gray-300 hover:border-gray-400 focus:border-blue-400 p-2 px-4 focus:outline-none bg-white focus:ring focus:ring-blue-500/20 rounded text-gray-500 text-sm h-full shadow-sm"
                    />
                    <div className="w-[20%] h-full">
                        <Select
                            value={sortOrder}
                            onChange={handleSortChange}
                            options={options}
                            classNames="max-w-[200px]"
                            placeholder="Sort by"
                        />
                    </div>
                </div>
            </div>

            <div className="h-full overflow-y-auto border rounded-lg">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="min-w-full bg-white border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm font-bold uppercase tracking-wider">
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Author</th>
                                <th className="px-4 py-3">Publish Year</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Borrowing</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.length > 0 ? (
                                filteredBooks.map((book, index) => (
                                    <tr
                                        className="text-gray-800 hover:bg-gray-100 text-sm"
                                        key={index}
                                    >
                                        <td className="px-4 py-3 border">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 mr-3 rounded-full bg-gray-200"></div>
                                                <div>
                                                    <p className="font-medium">{book.title}</p>
                                                    <p className="text-xs text-gray-600">{book.subtitle}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border text-center">{book.author}</td>
                                        <td className="px-4 py-3 border text-center">{book.year}</td>
                                        <td className="px-4 py-3 border text-center">
                                            <span
                                                className={`px-2 py-1 rounded ${book.status === "Available"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {book.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 border text-center">
                                            <button
                                                onClick={() => handleOpenDialog(book._id)}
                                                disabled={book.status !== "Available"}
                                                className={`px-4 py-2 text-white rounded ${book.status === "Available"
                                                    ? "bg-blue-500 hover:bg-blue-600"
                                                    : "bg-gray-400 cursor-not-allowed"
                                                    }`}
                                            >
                                                Borrow
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-600">
                                        No books found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Borrow Dialog */}
            {openDialog && (
                <Borrow
                    setOpenDialog={setOpenDialog}
                    setAllowed={handleBorrow}
                />
            )}
        </div>
    );
};

export default AllBooks;
