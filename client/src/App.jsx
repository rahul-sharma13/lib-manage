import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import AddBook from './pages/AddBook'
import Sidebar from './components/Sidebar'

const App = () => {
    return (
        <div className="">
            <div
                className={`flex w-full h-full gap-3`}
            >
                <Sidebar />
                <Routes>
                    <Route path='/' element={<AllBooks />} />
                    <Route path='add-books' element={<AddBook />} />
                </Routes>
            </div>

        </div>
    )
}

export default App