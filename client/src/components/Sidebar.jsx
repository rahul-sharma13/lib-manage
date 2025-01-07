import { PiStudentDuotone } from "react-icons/pi";

const Sidebar = () => {
    const Menus = [
        { title: "Books", src: "Books" },
        { title: "Add book", src: "add-bool" },
        { title: "Dashboard", src: "Dashboard" },
    ];
    return (
        <div className="flex">
            <div
                className="w-72 sticky h-[780px] mt-1 ml-2 bg-black rounded-lg p-5 pt-8 duration-300"
            >

                <div className="flex gap-x-4 items-center">
                    <PiStudentDuotone color="#ffffff" size={30} />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                        Lib-manage
                    </h1>
                </div >
                <ul className=" pt-6">
                    {
                        Menus.map((Menu, index) => (
                            <li
                                key={index}
                                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
 ${Menu.gap ? " mt-9" : " mt-2"} ${index === 0 && "bg-white text-black"
                                    } `}
                            >
                                <span className={``}>
                                    {Menu.title}
                                </span>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}
export default Sidebar