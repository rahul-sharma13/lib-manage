import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import AddBook from './pages/AddBook'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'


const App = () => {
    return (
        <div className="flex w-full h-full gap-3">
            <Sidebar />
            <Routes>
                <Route path='/' element={<AllBooks />} />
                <Route path='/add-books' element={<AddBook />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </div>
    )
}

export default App