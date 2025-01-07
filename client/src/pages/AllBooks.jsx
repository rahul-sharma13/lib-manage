import React, { useState } from 'react';
import Select from 'react-tailwindcss-select';

const options = [
    { value: "fox", label: "🦊 Fox" },
    { value: "Butterfly", label: "🦋 Butterfly" },
    { value: "Honeybee", label: "🐝 Honeybee" }
];

const AllBooks = () => {

    const [animal, setAnimal] = useState(null);

    const handleChange = value => {
        console.log("value:", value);
        setAnimal(value);
    };
    return (
        <div className="w-full h-[770px] max-w-[1100px] mx-auto mt-2 overflow-hidden rounded-lg shadow-lg font-poppins">
            {/* Header or any other content above the scrollable table */}
            <div className='flex flex-col mb-4 gap-2'>
                <h2 className="text-2xl font-bold text-gray-800">All Books</h2>
                <div className='flex flex-row gap-7'>
                    <input placeholder='Search' className='w-[80%] border-[1px] border-gray-300 hover:border-gray-400 focus:border-blue-400 p-2 px-4 focus:outline-none bg-white focus:ring focus:ring-blue-500/20 rounded text-gray-500 text-sm h-full shadow-sm' />
                    <div className='w-[20%] h-full'>
                        <Select
                            value={animal}
                            onChange={handleChange}
                            options={options}
                            classNames="max-w-[200px]"
                            placeholder='timing'
                        />
                    </div>
                </div>
            </div>

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