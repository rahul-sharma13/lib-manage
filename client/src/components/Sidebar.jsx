import { PiStudentDuotone } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/slices/userSlice";
import { useEffect, useState } from "react";
import { IoBookSharp, IoAddOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";

const Sidebar = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [page, setPage] = useState("/");

    const location = useLocation();
    useEffect(() => {
        setPage(location.pathname.split("/")[1]);
    }, [location]);


    const handleLogout = () => {
        dispatch(signOutSuccess());
    };

    const Menus = [
        { title: "Books", src: "", icon: IoBookSharp },
        ...(currentUser?.isAdmin ? [{ title: "Add book", src: "add-books", icon: IoAddOutline }] : []),
        { title: "Dashboard", src: "dashboard", icon: MdOutlineDashboard },
    ];

    return (
        <div className="flex">
            <div className="w-72 sticky h-[780px] mt-1 ml-2 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg p-5 pt-8 flex flex-col justify-between shadow-lg">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-x-4 mb-8">
                        <PiStudentDuotone color="#4F46E5" size={32} />
                        <h1 className="text-white font-semibold text-2xl">
                            Lib-manage
                        </h1>
                    </div>

                    {/* Menu Items */}
                    <ul className="space-y-3">
                        {Menus.map((Menu, index) => (
                            <Link to={`/${Menu.src}`} key={index}>
                                <li
                                    className={`flex items-center rounded-md px-4 py-2 cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 ${page === Menu.src && "bg-gray-700 text-white"}`}
                                >
                                    <Menu.icon className="mr-2" size={20} />
                                    <span>{Menu.title}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                {/* User Info or Login/Signup */}
                {currentUser ? (
                    <div className="bg-white rounded-lg p-5 shadow-lg text-center">
                        <h2 className="text-gray-800 font-bold mb-2 text-lg">
                            Welcome, {currentUser.name || "User"}
                        </h2>
                        <button
                            onClick={handleLogout}
                            className="w-full py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg p-5 shadow-lg">
                        <h2 className="text-gray-800 font-bold mb-4 text-center text-lg">
                            Get Started
                        </h2>
                        <div className="flex flex-col gap-3">
                            <Link to="/login">
                                <button className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-200">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="w-full py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-200">
                                    Signup
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
