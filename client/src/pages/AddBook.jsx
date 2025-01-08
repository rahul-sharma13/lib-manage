import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [formData, setFormData] = useState({
        name: '',
        author: '',
        year: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        console.log(formData);

        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post(
                'https://lib-manage-wzei.vercel.app/api/v1/books/add',
                {
                    title : formData.name,
                    author : formData.author,
                    year : formData.year
                },
                {
                    withCredentials: true
                }
            );

            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center mx-auto gap-7">
            <h1 className="text-2xl font-bold text-gray-800">Add a New Book</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-start w-[800px] max-w-7xl mx-auto gap-3">
                <div className="flex flex-col w-full gap-7">
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-[80%] border-[1px] border-gray-300 hover:border-gray-400 focus:border-blue-400 p-2 px-4 focus:outline-none bg-white focus:ring focus:ring-blue-500/20 rounded text-gray-500 text-sm h-full shadow-sm"
                        required
                    />
                    <input
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Author"
                        className="w-[80%] border-[1px] border-gray-300 hover:border-gray-400 focus:border-blue-400 p-2 px-4 focus:outline-none bg-white focus:ring focus:ring-blue-500/20 rounded text-gray-500 text-sm h-full shadow-sm"
                        required
                    />
                    <input
                        name="year"
                        type="number"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="Year"
                        className="w-[80%] border-[1px] border-gray-300 hover:border-gray-400 focus:border-blue-400 p-2 px-4 focus:outline-none bg-white focus:ring focus:ring-blue-500/20 rounded text-gray-500 text-sm h-full shadow-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`p-3 text-white w-[80%] rounded-lg ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </form>

            {/* Error or Success Messages */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">Book added successfully!</p>}

            {/* Section for previously added books */}
            <div>
                <h2 className="text-xl font-bold text-gray-800">Previously Added</h2>
                {/* Display previously added books here */}
            </div>
        </div>
    );
};

export default AddBook;
