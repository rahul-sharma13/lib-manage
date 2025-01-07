import React from 'react'

const AddBook = () => {
    return (
        <div className='flex flex-col justify-center mx-auto gap-7'>
            <h1 className='text-2xl font-bold text-gray-800'>Add a new book</h1>
            <form className='flex flex-col items-start w-[800px] max-w-7xl mx-auto gap-3'>
                <div className='flex flex-col w-full gap-7'>
                    <input placeholder='Name' className='w-[80%] border-[1px] border-gray-300 hover:border-gray-400 focus:border-blue-400 p-2 px-4 focus:outline-none bg-white focus:ring focus:ring-blue-500/20 rounded text-gray-500 text-sm h-full shadow-sm' />
                    <input placeholder='Author' className='w-[80%] border-[1px] border-gray-300 hover:border-gray-400 focus:border-blue-400 p-2 px-4 focus:outline-none bg-white focus:ring focus:ring-blue-500/20 rounded text-gray-500 text-sm h-full shadow-sm' />
                    <input placeholder='Year' className='w-[80%] border-[1px] border-gray-300 hover:border-gray-400 focus:border-blue-400 p-2 px-4 focus:outline-none bg-white focus:ring focus:ring-blue-500/20 rounded text-gray-500 text-sm h-full shadow-sm' />
                </div>
                <button className='p-3 bg-black text-white w-[80%] rounded-lg items-end'>Add</button>
            </form>
            <div>
                <h2 className='text-xl font-bold text-gray-800'>Previously added</h2>
            </div>
        </div>
    )
}

export default AddBook