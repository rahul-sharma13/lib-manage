import React from 'react'

const Dashboard = () => {
    return (
        <div className='flex flex-col mt-1 gap-2 h-[770px] w-full overflow-hidden'>
            <div className='flex flex-row items-start gap-5'>
                <div className='h-48 w-48 flex flex-col items-center justify-center rounded-lg bg-gray-100 shadow-lg border'>
                    <span className='text-3xl'>34</span>
                    <span className='text-gray-400 font-normal text-xl'>Total books</span>
                </div>
                <div className='h-48 w-48 flex flex-col items-center justify-center rounded-lg bg-gray-100 shadow-lg border'>
                    <span className='text-3xl'>34</span>
                    <span className='text-gray-400 font-normal text-xl'>borrowed by you</span>
                </div>
            </div>
            <div className='max-w-[90%]'>
                <h1 className='text-xl font-bold text-gray-800 mb-4'>Borrowings</h1>
                <div className="h-full overflow-y-auto rounded-lg">
                    <table className="min-w-full bg-white rounded-lg border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm font-bold uppercase tracking-wider">
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Author</th>
                                <th className="px-4 py-3">Publish Year</th>
                                <th className="px-4 py-3">Return</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array(5).fill(1).map((_, index) => (
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
                                        <button className="px-2 py-1 bg-green-100 text-green-600 rounded cursor-pointer">
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
    )
}

export default Dashboard