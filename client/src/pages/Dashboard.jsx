import React from 'react';

const Dashboard = () => {
    return (
        <div className="flex w-full">
            {/* Main Content */}
            <div className="flex-1 flex flex-col p-6">
                {/* Cards Section */}
                <div className="flex flex-wrap gap-6">
                    {[
                        { title: 'Total Books', value: 34, color: 'bg-blue-500' },
                        { title: 'Borrowed by You', value: 10, color: 'bg-green-500' },
                    ].map((card, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center h-48 w-48 rounded-lg ${card.color} shadow-lg text-white`}
                        >
                            <span className="text-4xl font-bold">{card.value}</span>
                            <span className="text-xl font-medium">{card.title}</span>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="mt-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                        Borrowings
                    </h1>
                    <div className="overflow-x-auto rounded-lg shadow-md">
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
                                {Array(5)
                                    .fill(1)
                                    .map((_, index) => (
                                        <tr
                                            key={index}
                                            className={`${
                                                index % 2 === 0
                                                    ? 'bg-gray-50'
                                                    : 'bg-gray-100'
                                            } text-gray-800 hover:bg-gray-200 transition duration-200`}
                                        >
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 mr-3 rounded-full bg-blue-100"></div>
                                                    <div>
                                                        <p className="font-semibold">
                                                            Book {index}{' '}
                                                            <span className="text-gray-500 font-light">
                                                                Subtitle {index}
                                                            </span>
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Detail {index}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 border text-left">
                                                Author {index}
                                            </td>
                                            <td className="px-4 py-3 border text-center">
                                                {2000 + index}
                                            </td>
                                            <td className="px-4 py-3 border text-center">
                                                <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200">
                                                    Return
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
