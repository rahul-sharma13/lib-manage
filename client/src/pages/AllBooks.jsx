import React from 'react';

const AllBooks = () => {
    return (
        <div className="w-full h-[780px] max-w-[1100px] mx-auto mt-1 overflow-hidden rounded-lg shadow-lg font-poppins">
            {/* Header or any other content above the scrollable table */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">All Books</h2>

            {/* Scrollable container for the table */}
            <div className="h-full overflow-y-auto border rounded-lg">
                <table className="min-w-full bg-white border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 text-sm font-bold uppercase tracking-wider">
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Author</th>
                            <th className="px-4 py-3">Publish Year</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array(20).fill(1).map((_, index) => (
                            <tr
                                className="text-gray-800 hover:bg-gray-100 text-sm"
                                key={index}
                            >
                                <td className="px-4 py-3 border">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 mr-3 rounded-full bg-gray-200"></div>
                                        <div>
                                            <p className="font-medium">
                                                Book {index}{' '}
                                                <span className="font-light text-gray-400">
                                                    Subtitle {index}
                                                </span>
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                Detail {index}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 border text-center">
                                    Author {index}
                                </td>
                                <td className="px-4 py-3 border text-center">
                                    {2000 + index}
                                </td>
                                <td className="px-4 py-3 border text-center">
                                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded">
                                        Available
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBooks;