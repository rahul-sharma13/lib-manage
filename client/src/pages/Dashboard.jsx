import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [dashboardData, setDashboardData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openReturnDialog, setOpenReturnDialog] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const mapTransactionsToBorrowings = (transactions) => {
        return transactions.map((transaction) => ({
            id: transaction._id,
            book: {
                _id: transaction.bookId?._id,
                title: transaction.bookId?.title || "Unknown Title",
                author: transaction.bookId?.author || "Unknown Author",
                year: transaction.bookId?.year || "Unknown Year",
            },
            status : transaction.type
        }));
    };

    const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/transaction/${currentUser?._id}`,
                { withCredentials: true }
            );
            const mappedBorrowings = mapTransactionsToBorrowings(response.data.transactions);

            setDashboardData({
                totalBorrowings: response.data.totalBorrowings,
                borrowings: mappedBorrowings,
            });
        } catch (err) {
            setError(err.response ? err.response.data : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleReturn = async () => {
        if (!selectedBook) return;

        try {
            await axios.post(
                "http://localhost:3000/api/v1/transaction/new",
                {
                    bookId: selectedBook._id,
                    userId: currentUser._id,
                    type: "return",
                },
                { withCredentials: true }
            );

            alert("Book returned successfully!");
            setDashboardData((prevData) => ({
                ...prevData,
                borrowings: prevData.borrowings.filter(
                    (borrowing) => borrowing.book._id !== selectedBook._id
                ),
            }));
        } catch (error) {
            alert(error.response?.data?.message || "Failed to return the book.");
        } finally {
            setOpenReturnDialog(false);
        }
    };

    return (
        <div className="flex w-full">
            {/* Main Content */}
            <div className="flex-1 flex flex-col p-6">
                {/* Cards Section */}
                <div className="flex flex-wrap gap-6">
                    {loading ? (
                        <p>Loading cards...</p>
                    ) : error ? (
                        <p className="text-red-500">Failed to load cards</p>
                    ) : (
                        [
                            { title: "Total Books", value: 16, color: "bg-blue-500" },
                            { title: "Borrowed by You", value: dashboardData.totalBorrowings, color: "bg-green-500" },
                        ].map((card, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center justify-center h-48 w-48 rounded-lg ${card.color} shadow-lg text-white`}
                            >
                                <span className="text-4xl font-bold">{card.value}</span>
                                <span className="text-xl font-medium">{card.title}</span>
                            </div>
                        ))
                    )}
                </div>

                {/* Table Section */}
                <div className="mt-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Borrowings</h1>
                    <div className="overflow-x-auto rounded-lg shadow-md">
                        {loading ? (
                            <p>Loading table...</p>
                        ) : error ? (
                            <p className="text-red-500">Failed to load table</p>
                        ) : (
                            <table className="min-w-full bg-white rounded-lg border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700 uppercase text-sm font-medium tracking-wide">
                                        <th className="px-4 py-3 text-left">Name</th>
                                        <th className="px-4 py-3 text-left">Author</th>
                                        <th className="px-4 py-3 text-center">Publish Year</th>
                                        <th className="px-4 py-3 text-center">Return</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboardData.borrowings && dashboardData.borrowings.length > 0 ? (
                                        dashboardData.borrowings.map((borrowing, index) => (
                                            <tr
                                                key={index}
                                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                                                    } text-gray-800 hover:bg-gray-200 transition duration-200`}
                                            >
                                                <td className="px-4 py-3 border">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 mr-3 rounded-full bg-blue-100"></div>
                                                        <div>
                                                            <p className="font-semibold">{borrowing.book.title}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 border text-left">{borrowing.book.author}</td>
                                                <td className="px-4 py-3 border text-center">{borrowing.book.year}</td>
                                                <td className="px-4 py-3 border text-center">
                                                    {borrowing.status === "return" ? (
                                                        <span className="text-blue-500 font-semibold">Returned</span>
                                                    ) : (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedBook(borrowing.book);
                                                                setOpenReturnDialog(true);
                                                            }}
                                                            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                                                        >
                                                            Return
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4 text-gray-600">
                                                No borrowings found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Return Dialog */}
                {openReturnDialog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                            <h2 className="text-xl font-semibold mb-4">Confirm Return</h2>
                            <p className="text-gray-700 mb-6">
                                Are you sure you want to return{" "}
                                <span className="font-bold">{selectedBook?.title}</span>?
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setOpenReturnDialog(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReturn}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
