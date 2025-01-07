import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import AddBook from './pages/AddBook'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import { Provider } from 'react-redux'
import store from './redux/store'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
    return (
        <Provider store={store}>
            <div className="flex w-full h-full gap-3">
                <Sidebar />
                <Routes>
                    <Route path='/' element={<AllBooks />} />
                    <Route path='/add-books' element={<AddBook />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path='/dashboard' element={<Dashboard />} />
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
            </div>
        </Provider>
    )
}

export default App